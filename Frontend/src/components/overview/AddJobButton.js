import React from 'react'
import { useHistory } from "react-router-dom";
import '../styles/OverviewComponents.css'

function AddJobButton({user_id, userpass}) {
    const history = useHistory();
    function buttonOnClick() {
        history.push({
            pathname: "/addJob",
            state: {comingFrom: "login", user_id: user_id, userpass:userpass }
        })
    }
    return (
        <button onClick={buttonOnClick} className="add-button">
            + Add Job
        </button>
    )
}

export default AddJobButton;