import React from 'react';

function DeleteJobButton({ application_id }) {

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
        fetch("http://127.0.0.1:5000/api/deleteApplication", obj)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.reload();
          })
          .catch(error => alert(error));
    }

    return (
        <div onClick={deleteJob}>
            <button>Delete Job</button>
        </div>
    )

}

export default DeleteJobButton;