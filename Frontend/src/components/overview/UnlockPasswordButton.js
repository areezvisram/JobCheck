import React, { useState } from 'react';
import '../styles/OverviewComponents.css'
import Modal from 'react-bootstrap/Modal'
import PasswordForm from '../passwordUnlock/PasswordForm';

function UnlockPasswordButton({ clickHandler }) {
    const [show, setShow] = useState(false);

    // const reload = () => {
    //     window.location.reload();
    // }

    const handleClose = () => {
        setShow(false);        
    }

    // const handleCloseSubmit = () => {
    //     setShow(false);
    //     reload();
    // }
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="eye-button" onClick={handleShow}><i className="fas fa-eye" id="eye"></i>Show Passwords</button>
            <Modal show={show} onHide={handleClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Login with Master Password to Unlock Passwords</Modal.Title>
                </Modal.Header>
                <Modal.Body><PasswordForm clickHandler={clickHandler} submitClickHandler={handleClose} /></Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className="modal-button">
                    Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default UnlockPasswordButton;