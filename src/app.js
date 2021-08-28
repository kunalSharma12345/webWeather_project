const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
// require express in const app ..
const port = process.env.PORT || 8000  

//path of public folder in staticPath..
const staticPath = path.join(__dirname,"../public");

//path of templates folder in templatePath..
const templatePath = path.join(__dirname,"../templates/views");

//path of partials folder in partialPath..
const partialPath = path.join(__dirname,"../templates/partials");

app.use(express.static(staticPath)); // to run html file in public folder..

//using template engine to make webpages dynamic in nature from static..
app.set("view engine","hbs");
app.set("views",templatePath);

//registering partials..
hbs.registerPartials(partialPath);

//routing..
app.get("/",(req,res)=>{
    // res.send("hello from the express server :)");
    res.render("index");
});

app.get("/about",(req,res)=>{
    // res.send("hello from the aboutus");
    res.render("about");
});

app.get("/weather",(req,res)=>{
    // res.send("hello from the weather page");
    res.render("weather");
});

app.get("*",(req,res)=>{
    // res.send("404 error page opps");
    res.render("404error",{
        errorMsg:"Opps Page Not Found"
    });
});

app.listen(port, () => {
    console.log(`listening to the port ${port}`)
});