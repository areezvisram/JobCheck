import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import AddJobButton from './overview/AddJobButton';
import DeleteJobButton from './overview/DeleteJobButton';
import EditJobButton from './overview/EditJobButton'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './styles/Overview.css'
import UnlockPasswordButton from './overview/UnlockPasswordButton'
import OverviewNavbar from './overview/OverviewNavbar'
import OverviewBurger from "./burgers/OverviewBurger"

function Overview() {
    const [userName, setUserName] = useState("");
    const [jobApplications, setJobApplications]  = useState([]);
    const [id, setId] = useState("");
    const history = useHistory();
    const location = useLocation();
    const [userPassAdd, setUserPassAdd] = useState("");    
    const [passwordState, setPasswordState] = useState("password")
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
            history.push({
                pathname: "/login"
              });
            console.log(error);
        }
    }

    useEffect(() => {
        checkLocation();
    },[]);

    function updatePasswordState() {
        setPasswordState("text")
    }

    function renderTableData() {
        return jobApplications.map((data, index) => {
            const { company, position, application_status, application_deadline, documents_required, link_to_application, portal_password } = data;
            return (
                <Tr>
                <Td className="border">{company}</Td>
                <Td className="border">{position}</Td>
                <Td className="border">{application_status}</Td>
                <Td className="border">{application_deadline}</Td>
                <Td className="border">{documents_required}</Td>
                <Td className="border">{link_to_application}</Td>
                <Td className="border"><input type={passwordState} value={portal_password} readOnly className="password-input"></input></Td>
                <Td className="border"><EditJobButton application_id={data.id} userpass={userPassAdd}></EditJobButton><DeleteJobButton application_id={data.id}></DeleteJobButton></Td>

                {/* application_id={data.id} userpass={userPassAdd} */}
            </Tr>
            )
        })
    }

    return (
        <div className="background">
            <OverviewNavbar />
            <OverviewBurger />
            <h1 className="overview-title">Your Job Applications</h1>
            <Table className="border-table">
            <Thead>
                <Tr>
                    <Th className="border">Company</Th>
                    <Th className="border">Position</Th>
                    <Th className="border">Application Status</Th>
                    <Th className="border">Application Deadline</Th>
                    <Th className="border">Documents</Th>
                    <Th className="border">Link To Application</Th>
                    <Th className="border">Portal Password</Th>
                    <Th className="border">Options</Th>
                </Tr>
            </Thead>
            <Tbody>
                {renderTableData()}
            </Tbody>
            </Table>

            <div className="overview-buttons">
                <AddJobButton user_id={id} userpass={userPassAdd} className="flex_child"></AddJobButton>
                <UnlockPasswordButton clickHandler={updatePasswordState} className="flex_child" />
            </div>
        </div>  
    );
}

export default Overview;
