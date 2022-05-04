const express = require('express');
const client = require("./grpcClient");
const app = express();


app.get("/", (req, res) => {


    client.getItem({}, (err,data)=> {
        if(err){
            console.log(err)
            console.log("hola");
        }
        else{
            res.json({data});
        }
    })
    
})
app.listen(3000)
