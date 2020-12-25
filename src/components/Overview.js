import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import AddJobButton from './overview/AddJobButton';
import DeleteJobButton from './overview/DeleteJobButton';
import EditJobButton from './overview/EditJobButton'

function Overview() {
    const [userName, setUserName] = useState("");
    const [jobApplications, setJobApplications]  = useState([]);
    const [id, setId] = useState("");
    const history = useHistory();
    const location = useLocation();
    const [userPassAdd, setUserPassAdd] = useState("");
    var token = '';
    var userpass = '';
    

    function checkLocation() {
        try {
            userpass = location.state.login;
            setUserPassAdd(userpass);
            let comingFrom = location.state.comingFrom;
            if (comingFrom === "addJob" || comingFrom === "editJob") {
                console.log("entered from add job or edit job")
                var obj = {
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                      "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json",
                      Authorization: "Basic " + Buffer.from(userpass).toString("base64"),
                    },
                  };
              
                  fetch("http://127.0.0.1:5000/api/token", obj)
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      const response = data;
                      if (response["status"] === "OK") {
                        token = response['token'];
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
                      }
                    })
                    .catch(error => alert(error));
            }
            else {
                console.log("entered from login");
                token = location.state.token;
                
    
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
            }

            
        } catch(error) {
            // history.push({
            //     pathname: "/login"
            //   });
            console.log(error);
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
                        <p>ID: {data.id}</p>
                        <DeleteJobButton application_id={data.id}></DeleteJobButton>
                        <EditJobButton application_id={data.id} userpass={userPassAdd}></EditJobButton>
                    </div>
                )
            })}

            <AddJobButton user_id={id} userpass={userPassAdd}></AddJobButton>
            
        </div>
    
    
    );
}

export default Overview;
