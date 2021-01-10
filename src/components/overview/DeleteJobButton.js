import React, { useState } from 'react';
import '../styles/OverviewComponents.css';
import Modal from 'react-bootstrap/Modal';

function DeleteJobButton({ application_id }) {

    const [show, setShow] = useState(false);

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

    function deleteJob() {
        var data = {
            "id": application_id
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
        fetch("https://job-check.herokuapp.com/api/deleteApplication", obj)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            handleCloseSubmit();
          })
          .catch(error => alert(error));
    }

    return (
        <>
            <button className="delete-button" onClick={handleShow}>Delete Job</button>
            <Modal show={show} onHide={handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Job Application Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you would like to delete this application?</Modal.Body>
                <Modal.Footer>
                    <button onClick={deleteJob} className="modal-button">
                    Yes
                    </button>
                    <button onClick={handleClose} className="modal-button">
                    No
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default DeleteJobButton;