var express  = require('express');
var bodyParser = require("body-parser");
var userRouters =  require("./app/routes/books.js");
var cors = require("cors");


const app = express();
app.use(cors());
const PORT = 5000; 

app.use(bodyParser.json()); 


// parse requests of content-type: application/json
app.use("/books", userRouters);

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (request, response) =>{
        console.log("[TEST]");
        response.send("Ending point of '/books'. If you want to query all the data: 'http://localhost:5000/books', if you want to query a data 'http://localhost:5000/books/:id'. Also, u can find books with query parameters");
})

// set port, listen for requests
app.listen(PORT, () => console.log(`Server Running on port:  http://localhost:${PORT}`)); 
