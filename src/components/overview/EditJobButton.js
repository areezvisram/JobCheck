import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../styles/OverviewComponents.css'
import Modal from 'react-bootstrap/Modal'
import EditJobForm from '../editJob/EditJobForm'

function EditJobButton({ application_id, userpass }) {
    const [show, setShow] = useState(false);
    // const history = useHistory();
    // function updateApplication() {
    //     history.push({
    //         pathname: "/editJob",
    //         state: {comingFrom: "overview", application_id: application_id, userpass: userpass }
    //     })
    // }

    const reload = () => {
        window.location.reload();
    }

    const handleClose = () => {
        setShow(false);        
    }

    const handleCloseSubmit = () => {
        setShow(false);
        reload();
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="edit-button" onClick={handleShow}>Edit Application Status</button>
            <Modal show={show} onHide={handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Job Application Status</Modal.Title>
                </Modal.Header>
                <Modal.Body><EditJobForm application_id={application_id} userpass={userpass} onClickFunction={handleCloseSubmit}/></Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className="modal-button">
                    Close
                    </button>
                    <button onClick={handleClose} className="modal-button">
                    Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default EditJobButton;