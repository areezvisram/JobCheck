import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import AddJobButton from './overview/AddJobButton'

function Overview() {
    const [userName, setUserName] = useState("");
    const [jobApplications, setJobApplications]  = useState([]);
    const [id, setId] = useState("");
    const history = useHistory();
    const location = useLocation();

    function checkLocation() {
        try {
            let comingFrom = location.state.comingFrom;
            const token = location.state.token;
            var login = token + ":unused"; 
            fetch("http://127.0.0.1:5000/api/resource", {
                    headers: {
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: "Basic " + Buffer.from(login).toString("base64"),
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    setUserName(data["name"]);
                    var id = data["id"];
                    setId(id);
                    fetch("http://127.0.0.1:5000/api/getApplications", {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json",
                            //Authorization: "Basic " + Buffer.from(login).toString("base64"),
                        },
                        body: JSON.stringify({"id": id})
                    })
                    .then((response) => response.json())
                    .then((data2) => {
                        console.log(data2);
                        var jobObject = data2['applications'];
                        var jobs = Object.values(jobObject);                        
                        setJobApplications(jobs); 
                        console.log(jobs);
                    })
                });
            
        } catch(error) {
            history.push({
                pathname: "/login"
              });
        }
    }

    useEffect(() => {
        checkLocation();
    },[]);

   


    return (
        <div>
            <h1>{userName}</h1>
            {jobApplications.map((data, key) => {
                return (
                    <div key={key}>
                        <h4>Company: {data.company}</h4>
                        <p>Position: {data.position}</p>
                        <p>Application Status: {data.application_status}</p>
                        <p>Application Deadline: {data.application_deadline}</p>
                        <p>Documents: {data.documents_required}</p>
                        <p>Link to Application: {data.link_to_application}</p>
                        <p>Portal Password: {data.portal_password}</p>
                    </div>
                )
            })}

            <AddJobButton user_id={id}></AddJobButton>
            
        </div>
    
    
    );
}

export default Overview;
