const express = require("express");
const { json } = require("express/lib/response");
const app = express();
const https = require("https");
const bodyParser= require("body-parser");
const { ppid } = require("process");

app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
   
        res.sendFile(__dirname +"/index.html");
    });
    
app.post("/",function(req,res){
        const city=req.body.cityName;
        const apiKey="952840218898ff3f684359c95a67fa20"
        const units ="metric";
        const url ="https://api.openweathermap.org/data/2.5/weather?q= "+city+"&appid="+ apiKey+"&units="+units+""
        https.get(url,function(response){
            console.log(response.statusCode);
            response.on("data",function(data){
             const weatherData = JSON.parse(data);
             console.log(weatherData);
             const temperature = weatherData.main.temp;
             const temp = weatherData.weather[0].description;
             console.log(temp);
             const icon = weatherData.weather[0].icon
             const imageUrl="http://openweathermap.org/img/wn/"+ icon+"@2x.png"
             res.write("<p> The weather is " + temp +" </p>")
             res.write("<h1>The temperature in "+city+" is " +temperature + " degree celcius</h1>");
             res.write("<img src =" +imageUrl +">")
             res.send();
            //  console.log(JSON.stringify(object));

        })

        
    })
    
});


        

         //this is use to stringigy the object in one line 
        //  const object={
        //     name:"sandeep",
        //     favouriteFood:"katli"
        //  }
        

    
    
    






app.listen(3000,function(){
    console.log("The server is running on port 3000")
});