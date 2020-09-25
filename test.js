//Sample fetch request to get user token

const fetch = require("node-fetch");

// var obj = {
//     method: 'GET',
//     mode: 'no-cors',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic '+Buffer.from('areez:tester123').toString('base64'),
//     },

// }

// async function getData() {
//     fetch('http://127.0.0.1:5000/api/token', obj)
//     .then(response => response.json())
//     .then(data => console.log(data))
// }

// getData();

let token =
  "eyJhbGciOiJIUzI1NiIsImlhdCI6MTYwMDk4Mjk4NCwiZXhwIjoxNjAwOTgzNTg0fQ.eyJpZCI6MX0.dcF6eVu1Y_DKNjTeOIk1-aY06XrFEHHfPKPbHdyc7_Y";

fetch("http://127.0.0.1:5000/api/resource", {
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: "Basic " + token + ":unused",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
