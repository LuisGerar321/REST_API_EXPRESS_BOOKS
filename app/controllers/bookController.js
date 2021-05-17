const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Book = require("../models/book.model.js")

////Local functions////

const checkUnique  =  ( body )=> {
        console.log("This...", body  );
        const newBook  = new Book( {title:null, author:null} ); //Obj to use its methods.
        return newBook.findTitleAutorPub(body.title, body.author, body.pub_year);
}

const checkValidBody = (title, author, pub_year, tag, res)=> {

        if(title){
                if( typeof title  !== "string" ){
                        return res.status(400).send({
                                error_message: 'Bad Request: title is not a string...',
                                status_code: 400,
                                location: "./app/controllers/bookController.js"  
                        });
                }
        }

        if(author){
                if ( typeof  author  !== "string"   ){
                        return res.status(400).send({
                                error_message: 'Bad Request: author is not a string...',
                                status_code: 400,
                                location: "./app/controllers/bookController.js"  
                        });     
                }
        }


        if(pub_year){
                if ( typeof  pub_year !==  "number"    ){
                        return res.status(400).send({
                                error_message: 'Bad Request: pub year is not a number...',
                                status_code: 400,
                                location: "./app/controllers/bookController.js"  
                        });     
                }
        }


        if(tag){
                if (  !Array.isArray( tag )  ){
                
                        return res.status(400).send({
                                error_message: 'Bad Request: tag is not an array...',
                                status_code: 400,
                                location: "./app/controllers/bookController.js"  
                        });
                }
        }

}

const stringToArray  = ( str)=>{
        str =str.replace(" ", "");
        if(str[0] !=  "[" || str[  str.length  -1 ] !==  "]" ){
                return str;
        };
        return str.slice(1, -1).split(",");
}



//Exports functions//
const createBook =  async (req, res) =>{        
        //Getting the body params
        const bookID  = uuidv4();
        const { title, author, pub_year, tag  } = req.body;




        //Converting tag to array//
        const  tagArray = stringToArray( tag );
        console.log('this is thag', tagArray)        

        //Check  typo///
        checkValidBody( title, author, pub_year, tagArray, res );
        

        //if year is not valid//
        if(pub_year<1454){
                return res.status(400).send({
                        error_message: 'publication year is not valid...',
                        status_code: 400,
                        location: "./app/controllers/bookController.js"  
                });
        }

        //Validating//
        const bookExist = await checkUnique(req.body);
        console.log( bookExist );

        if(bookExist){
                // console.log( "Data exist!!!")
                return res.status(409).send({
                        error_message: 'Books is already in our database...',
                        status_code: 409,
                        location: "./app/controllers/bookController.js"  
                });
        };

        //Creating the data in MySQL
        const newBookDB = new Book({idbooks: bookID,   title: title, author: author, pub_year:  pub_year, tag: tag });
        newBookDB.create( {idbooks: bookID,   title: title, author: author, pub_year:  pub_year, tag: tag },res);

        //Sending the output to user//
        return res.status(201).send({
                message: 'User has been created sucessfully...',
                guid: bookID,
        })
}

const getAll =  async (request, response ) =>{
        const { query } = request //Si hay query parameters find the book!
        console.log("My queries: ", query );
        if(Object.entries(query).length){
                const foundBookC  = new Book( {title:null, author:null} );
                // await foundBookC.findID( '', query.title, query.author, query.pub_year );
                response.status(200).send(await foundBookC.findID( '', query.title, query.author, query.pub_year ));
        }else{ //Find all the boooks
                const allBooks = new Book({title:null, author:null});
                await allBooks.findAll();
                response.status(200).send(await allBooks.findAll());
        }
}

const getById = async (request, response ) =>{
        //Getting the id
        const {id} = request.params;
        //Find the book into the dataBase
        const foundBookC  = new Book( {title:null, author:null} );
        const fountID = await foundBookC.findID( id );
        if(fountID.length>=1){
                response.status(200).send( fountID);
        }else{
                response.status(404).send({error_message: 'Not Found: Book is not in database',
                status_code: 404,
                location: "in request"} )
        }
        
}

const deleteID =  async  (request, response )  =>{
        const {id} =  request.params;
        //Creating my obj to use my module
        const nodeDelete =  new Book({title:null, author:null});
        if(await nodeDelete.removeID(id)){
                response.status(200).send({
                        message: 'Book has been delated sucessfully...',
                        guid: id,
                })
        }else{
                response.status(404).send({error_message: 'Not Found: Book is not in database',
                status_code: 404,
                location: "in request"} )
        }
}

const updateID = async  (request, response ) => {

        const {id} = request.params;
        const { title, author, pub_year, tag} = request.body;



        const tagArray = stringToArray( tag );  

        checkValidBody( title, author, pub_year, tagArray  , response );

        const foundBook =  new Book({title:null, author:null})
        console.log("pub_year: ", pub_year);
        
        if( title ){
                await foundBook.updateTitle(id, title)
        };
        if( author){
                await foundBook.updateAutor(id, author);
        };
        if(pub_year){
                await foundBook.updatePub(id, pub_year); 
        }

        if(tag){
                await foundBook.updateTag(id, tag); 
        }

        response.status(200).send({
                message: 'Book has been updated sucessfully...',
                guid: id,
        })

}

const deleteAll = async (req, res ) =>{
        const nodeDelete =  new Book({title:null, author:null});
        if(await nodeDelete.removeAll()){
                return res.status(200).send({message: 'All data delated',
                status_code: 200,
                location: ""} )
        }else{
                return res.status(404).send({message: 'Not posible to delate',
                status_code: 404,
                location: ""} )

        }
}

module.exports = {
        createBook,
        getAll,
        getById,
        deleteID,
        updateID,
        deleteAll,
}