import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

function EditJobForm({application_id, userpass}) {
    const [status, setStatus] = useState("");

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        var data = {
            "id": application_id,
            "status": status
        }

        var obj = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch("http://127.0.0.1:5000/api/updateApplication", obj)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if(data['status'] === 1) {
            history.push({
                pathname: "/overview",
                state: { comingFrom: "editJob", login:userpass },
              });
          }
        })
        .catch(error => alert(error));

    }
    

    function setJobStatus(event) {
        setStatus(event.target.value);
    }

    
    function validateForm() {
        return status;
    }

    return (
        <form onSubmit={handleSubmit}>
            <select onChange={setJobStatus}>
                <option value="Not Applied">Not Applied</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
            </select><br></br>
            <button type="submit" disabled={!validateForm()}>Submit</button>
        
        </form>
    )
}

export default EditJobForm;