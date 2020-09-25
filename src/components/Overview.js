import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Overview() {
    const [userName, setUserName] = useState("")
    

    const location = useLocation();
    const token = location.state.token;
    var login = token + ":unused";    

    useEffect(() => {

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
                setUserName(data["data"]);
            });
    }, [login]);


    return <h1>{userName}</h1>;
}

export default Overview;
