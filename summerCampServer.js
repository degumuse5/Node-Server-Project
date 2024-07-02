const express = require("express")
const path = require("path");
let portNumber = 0;
const app = express()
const process = require('node:process');
const bodyParser = require("body-parser");
const dbOps = require('./database');


app.use(bodyParser.urlencoded({extended:false}));

app.set("views", path.resolve(__dirname, "templates"));

app.set("view engine", "ejs");


if (process.argv.length === 2 || process.argv.length > 3 ) {
    console.error('Usage supermarketServer.js jsonFile');
    process.exit(0);
}

portNumber = process.argv[2]

app.listen(portNumber, (err) => {
    if (err) {
      console.log("Starting server failed.");
    } else {
      console.log(`Web server started and running at: http://localhost:${portNumber}`);
    }
});

app.get('/',(request, response) => {

    response.render("welcome")
})

app.get('/apply',(request, response) => {

    response.render("apply")
})

app.get('/review',(request, response) => {

    response.render("review")
})

app.get('/gpaList',(request, response) => {

    response.render("gpa")
})

app.get('/removeApp',(request, response) => {

    response.render("remove")
})

app.post('/apply', async (request, response) => {
    let {name, email, gpa, paragraph} = request.body;
    let ob = {name, email, gpa: Number(gpa), background: paragraph}
    await dbOps.insertToDb(ob)
    response.render("process",ob)
})

app.post('/review', async (request, response) => {
    let email = request.body.email;
    
    let result = await dbOps.getFormEmail(email)
    if(result === null){
        let ob = {name:"NONE", email:"NONE", gpa: "NONE", background: "NONE"}
        response.render("process",ob)
    }
    else{
        response.render("process",result)
    }
})

app.post('/gpaList',async (request, response) => {
    try {
        let gpa = parseFloat(request.body.gpa);
        if (isNaN(gpa)) {
            return response.status(400).send("Invalid GPA value.");
        }
    
        let result = await dbOps.getGpa(gpa);
        
        // Convert cursor to array
        let documents = await result.toArray();
    
        let tableStart = `<table style="border: 1px solid black;">
            <tr style="border: 1px solid black;">
                <th style="border: 1px solid black;">Name</th>
                <th style="border: 1px solid black;">GPA</th>
            </tr>`;
    
        // Use map on the array of documents
        let tableRows = documents.map(doc => `
            <tr style="border: 1px solid black;">
                <td style="border: 1px solid black;">${doc.name}</td>
                <td style="border: 1px solid black;">${doc.gpa}</td>
            </tr>
        `).join('');
    
        let table = tableStart + tableRows + '</table>';
        let tableOb = {table: table}
        response.render("processAdminGPA",tableOb); // Send the complete HTML table as the response
    } catch (e) {
        console.error(e);
        response.status(500).send("Server error");
    }
})

app.post('/removeApp', async (request, response) => {
    let result = await dbOps.deleteCol()
    let ob = {num: result}
    response.render("processAdmin",ob)
})