import React from 'react'

function ResetPasswordAuth() {

    function parseQueryParams() {
        const query = window.location.search.substring(1);        
        const token = query.split("=")[1];       
        console.log(token) ;
    }

    return (
        <div>
            <h1>Reset your password here</h1>
            <button className="button" onClick={parseQueryParams}>Click me</button>
        </div>
    )
}

export default ResetPasswordAuth;