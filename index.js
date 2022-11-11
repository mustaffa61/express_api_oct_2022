//import the express package as expressRef
let expressRef = require('express')
let mongoose = require('mongoose')
let gmModel = require('./goodmorning_model')
let cors=require("cors")

let PORT  = 1234

//use expressRef to create express app
let app = expressRef()
app.use(expressRef.json())
app.use(cors())

//connect to mngodb in the cloud
let connectionString = "mongodb+srv://admin:password230361@clustermus.x2u8hnf.mongodb.net/thoughts"
mongoose.connect(connectionString)
let db = mongoose.connection 

//check if database is connected from express code
db.once("open", ()=>{
    console.log("Connected to mongodb database in the cloud!")
})



//create GET endopoint http://localhost:1234/ <-  / root end point 
app.get("/", (request, response)=>{
    console.log("GET Request received from: " )
    console.log( request.body)
    //send the response to the client after encoding it in JSON format
    response.json({
        "message": "GET request received"
    })
})

//create POST endpoint http://localhost:1234/ <- / root end point
app.post("/", (request, response)=>{
    console.log("POST Request received from: ")
    console.log( request.body)
    //send the response to the client after encoding it in JSON format
     response.json({
        "message": "POST request received"
    })
})

//create endpoint http://localhost:1234/welcome  <- /weclome end point
app.get("/welcome", (request, response)=>{
    console.log("GET request received from: ")
    console.log(request.url)
    //send the response to the client for encoding it in JSON format
    response.json({
        "message":"Welcome to express app!"
    })

})

//get the list of quotes from mongodb database in cloud
app.get("/goodmorning/all", (request, response)=>{
    console.log("Get all quotes from goodmornign collection....")
    gmModel.find({}, (error, data)=>{
        if (error) {
            response.json(error)
        }else{
            response.json(data)
        }
    })

})


//expose the express app to PORT 1234
app.listen(PORT, ()=>{
    console.log("Listening to port: " + PORT)
})