var express = require('express');
const router = express.Router();
const Book = require("../models/book.model.js")
const Controller = require("../controllers/bookController");


router.get("/", async ( request, response )  =>{

        console.log("POST ROUTE REACHED");
        Controller.getAll(request, response); 

});
router.post("/", (req, res ) => { //Fine   
        console.log("POST ROUTE REACHED");
        Controller.createBook( req, res); 

}); 
router.get("/:id" , async ( req, res ) =>{
        console.log("POST ROUTE REACHED");
        Controller.getById(req, res)
});
router.delete("/:id", async (req, res)  => {
        console.log("POST ROUTE REACHED");
        Controller.deleteID(req, res); 
        //Getting the id

});
router.delete("/", async (req, res)  => {

        Controller.deleteAll(req, res);

});
router.patch( "/:id", async (req, res) =>{

        Controller.updateID(req, res); 


});
module.exports = router;