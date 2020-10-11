import os
from flask import Flask, abort, request, jsonify, g, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate

# initialization
app = Flask(__name__)
cors = CORS(app)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['CORS_HEADERS'] = 'Content-Type'

# extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
auth = HTTPBasicAuth()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    password_hash = db.Column(db.String(64))

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration=600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None    # valid token, but expired
        except BadSignature:
            return None    # invalid token
        user = User.query.get(data['id'])
        return user

class JobApplication(db.Model):
    __tablename__ = 'job_applications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    position = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    link_to_application = db.Column(db.String(255), nullable=True)
    application_deadline = db.Column(db.String(255), nullable=True)
    application_status = db.Column(db.String(255), nullable=False)
    portal_password = db.Column(db.String(255), nullable=True)
    documents_required = db.Column(db.String(255), nullable=False)


    def __init__(self, user_id, position, company, link_to_application, application_deadline, application_status, portal_password, documents_required):
        self.user_id = user_id
        self.position = position
        self.company = company
        self.link_to_application = link_to_application
        self.application_deadline = application_deadline
        self.application_status = application_status
        self.portal_password = portal_password
        self.documents_required = documents_required


@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@app.route('/api/users', methods=['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)    # missing arguments
    if User.query.filter_by(username=username).first() is not None:
        abort(400)    # existing user
    user = User(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return (jsonify({'username': user.username}), 201,
            {'Location': url_for('get_user', id=user.id, _external=True)})


@app.route('/api/users/<int:id>')
def get_user(id):
    user = User.query.get(id)
    if not user:
        abort(400)
    return jsonify({'username': user.username})


@app.route('/api/token')
@auth.login_required
@cross_origin()
def get_auth_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600, "status": "OK"})


@app.route('/api/resource')
@auth.login_required
def get_resource():
    # change the last argument to get specific attribute
    return jsonify({'name': g.user.username, 'id': g.user.id})


@app.route('/api/getApplications', methods=["POST"])
def get_applications():
    try:
        req_json = request.get_json()
        curr_user = req_json['id']
    except:
        response = {'status': 0, 'error': 'No jobs exist for this user.'}
        return jsonify(response)
    
    user_applications = JobApplication.query.filter_by(user_id=curr_user)
    user_applications_dict ={'status': 1, 'applications': []}

    for application in user_applications:
        user_applications_dict['applications'].append(makeJson(dict(application.__dict__)))
    
    return jsonify(user_applications_dict)
    

@app.route('/api/addApplication', methods=["POST"])
@cross_origin()
def add_application():
    try:
        req_json = request.get_json()

        curr_application_user_id = req_json['id'] if req_json['id'] else None
        curr_application_position = req_json['position'] if req_json['position'] else None
        curr_application_company = req_json['company'] if req_json['company'] else None
        curr_link_to_application = req_json['link_to_application'] if req_json['link_to_application'] else None
        curr_application_deadline = req_json['application_deadline'] if req_json['application_deadline'] else None
        curr_application_status = req_json['application_status'] if req_json['application_status'] else None
        curr_portal_password = req_json['portal_password'] if req_json['portal_password'] else None
        curr_documents_required = req_json['documents_required'] if req_json['documents_required'] else None


    except:
        response = {'status': 0, 'error': 'KeyError. Missing parameters'}
        return jsonify(response)
    
    try:
        application = JobApplication(curr_application_user_id, curr_application_position, curr_application_company, curr_link_to_application, curr_application_deadline, 
            curr_application_status, curr_portal_password, curr_documents_required)
        db.session.add(application)
        db.session.commit()
        response = {'status': 1}
    except:
        response = {'status': 0, 'error': 'Database error. Check for empty fields'}
        return jsonify(response)
    return jsonify(response)

# Global
def makeJson(result):
    del result['_sa_instance_state']
    return result

# VIEWS
@app.route('/viewUsers')
def users_view():
    users = User.query.all()
    user_dict = {'users': []}

    for user in users:
        user_dict['users'].append(makeJson(dict(user.__dict__)))

    return jsonify(user_dict)

@app.route('/viewApplications')
def applications_view():
    applications = JobApplication.query.all()
    application_dict = {'applications': []}

    for application in applications:
        application_dict['applications'].append(makeJson(dict(application.__dict__)))
    
    return jsonify(application_dict)

@app.route('/api/deleteApplication')
def application_delete():
    req_json = request.get_json()
    application_id = req_json['id']

    application = JobApplication.query.filter_by(id=application_id).first()

    db.session.delete(application)
    db.session.commit()

    response = {'status': 1, 'message': "Record deleted"}

    return jsonify(response)


@app.before_first_request
def create_tables():
    db.create_all()

