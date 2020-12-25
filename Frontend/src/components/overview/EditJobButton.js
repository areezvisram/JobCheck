import React from 'react';
import { useHistory } from "react-router-dom";

function EditJobButton({ application_id, userpass }) {
    const history = useHistory();
    function updateApplication() {
        history.push({
            pathname: "/editJob",
            state: {comingFrom: "overview", application_id: application_id, userpass: userpass }
        })
    }

    return (
        <div onClick={updateApplication}>
            <button>Edit Application Status</button>
        </div>
    )

}

export default EditJobButton;