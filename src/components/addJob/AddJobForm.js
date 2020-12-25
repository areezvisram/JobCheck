import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

function AddJobForm({user_id, token, userpass}) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [link, setLink] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("");
    const [portalPassword, setPortalPassword] = useState("");
    const [documents, setDocuments] = useState([]);

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        var data = {
            "id": user_id,
            "position": position,
            "company": company,
            "link_to_application": link,
            "application_deadline": deadline,
            "application_status": status,
            "portal_password": portalPassword,
            "documents_required": documents.toString()
        }

        var obj = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        fetch("http://127.0.0.1:5000/api/addApplication", obj)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if(data['status'] === 1) {
            history.push({
                pathname: "/overview",
                state: { comingFrom: "addJob", login:userpass },
              });
          }
        })
        .catch(error => alert(error));
    }
    

    function setJobStatus(event) {
        setStatus(event.target.value);
    }

    function setRequiredDocs() {
        var selected = [];
        for (var option of document.getElementById("documents").options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }

        setDocuments(selected);
    }
    
    function validateForm() {
        return company.length > 0 && position.length > 0
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Company: </label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}></input><br></br>
            <label>Position: </label>
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)}></input><br></br>
            <label>Link To Application: </label>
            <input type="text" value={link} onChange={(e) => setLink(e.target.value)}></input><br></br>
            <label>Application Deadline: </label>
            <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)}></input><br></br>
            <label>Application Status: </label>
            <select onChange={setJobStatus}>
                <option value="Not Applied">Not Applied</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
            </select><br></br>
            <label>Portal Password: </label>
            <input type="password" value={portalPassword} onChange={(e) => setPortalPassword(e.target.value)}></input><br></br>
            <label>Documents Required: </label>
            <select id="documents" onChange={setRequiredDocs} multiple>
                <option value="None">None</option>
                <option value="Resume">Resume</option>
                <option value="Cover Letter">Cover Letter</option>
                <option value="Transcript">Transcript</option>
                <option value="Essay Questions">Essay Questions</option>
            </select><br></br>
            <button type="submit" disabled={!validateForm()}>Submit</button>
        
        </form>
    )
}

export default AddJobForm;