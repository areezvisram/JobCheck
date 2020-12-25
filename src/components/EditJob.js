import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import EditJobForm from './editJob/EditJobForm'

function EditJob() {
    const history = useHistory();
    const location = useLocation();
    const [applicationId, setApplicationId] = useState("")
    const [userpass, setUserPass] = useState("");

    function checkLocation() {
        try {
            let comingFrom = location.state.comingFrom;
            const application_id = location.state.application_id;
            const userPass = location.state.userpass;
            setUserPass(userPass);
            setApplicationId(application_id);
        } catch(error) {
            history.push({
                pathname: "/"
            });
        }
    }

    
    useEffect(() => {
        checkLocation();
    },[]);

    return (
        <div>
            <p>Application Id: {applicationId}</p>
            <EditJobForm application_id={applicationId} userpass={userpass}></EditJobForm>
        </div>
    )
}

export default EditJob;