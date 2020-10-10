import React from 'react'
import { useHistory } from "react-router-dom";

function AddJobButton({user_id}) {
    const history = useHistory();

    function buttonOnClick() {
        history.push({
            pathname: "/addJob",
            state: {comingFrom: "login", user_id: user_id}
        })
    }
    return (
        <button onClick={buttonOnClick}>
            Add Job
        </button>
    )
}

export default AddJobButton;