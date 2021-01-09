import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import AddJobForm from './addJob/AddJobForm'
import './styles/AddJob.css'

function AddJob() {
    const history = useHistory();
    const location = useLocation();
    const [userId, setUserId] = useState("");
    const [userpass, setUserPass] = useState("");

    function checkLocation() {
        try {
            let comingFrom = location.state.comingFrom;
            const user_id = location.state.user_id;
            const userPass = location.state.userpass;
            setUserPass(userPass);
            setUserId(user_id);
        } catch(error) {
            history.push({
                pathname: "/overview"
            });
        }
    }

    useEffect(() => {
        checkLocation();
    },[]);

    return (
        <div className="background">
            <h1 className="overview-title">Add New Job Application</h1>
            <AddJobForm user_id={userId} userpass={userpass}></AddJobForm>
        </div>
    )
}

export default AddJob;