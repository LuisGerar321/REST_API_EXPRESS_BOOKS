var express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Book = require("../models/book.model.js")



let  books  = [];

router.get("/", async ( request, response )  =>{

        const { query } = request //Si hay query parameters find the book!
        console.log("My queries: ", query );
        if(Object.entries(query).length){
                const foundBookC  = new Book( {title:null, author:null} );
                await foundBookC.findID( '', query.title, query.author, query.pub_year );
                response.send( foundBookC.getAtributes() );
        }else{ //Find all the boooks
                const allBooks = new Book({title:null, author:null});
                await allBooks.findAll();
                response.send(await allBooks.findAll());
        }
        


});
router.post("/", (req, res ) => { //Fine
       
        
        console.log("POST ROUTE REACHED");
        const bookID  = uuidv4();
        const bookTitle = req.body.title;
        const bookAuthor =  req.body.author;
        const bookPubYear = req.body.pub_year
        const bookTag =  req.body.tag;
        
        
        const newBookDB = new Book({idbooks: bookID,   title: bookTitle, author: bookAuthor, pub_year:  bookPubYear, tag: bookTag });
        //Creating the books into the dataBase
        newBookDB.create( {idbooks: bookID,   title: bookTitle, author: bookAuthor, pub_year:  bookPubYear, tag: bookTag },res);
        res.send(`Book with title: ${bookTitle}  and id: ${bookID} was added to database`);
}); 
router.get("/:id" , async ( req, res ) =>{ //Fine
        const {id} = req.params;
        console.log(id);
        // const foundBook = books.find( (book) => {return book.id  === id});
        // // res.send(foundBook);

        const foundBookC  = new Book( {title:null, author:null} );
        await foundBookC.findID( id );
        res.send( foundBookC.getAtributes() );

});
router.delete("/:id", async (req, res)  => {
        const {id} =  req.params;
        books =  books.filter( (book)=> book.id !== id);
        const nodeDelete =  new Book({title:null, author:null});
        if(await nodeDelete.removeID(id)){
                res.send(`Book with the id ${id} was deleted!`)
        }else{
                res.send(`Book with the id ${id} was not able to be delated!`)

        }
});


router.delete("/", async (req, res)  => {
        // books =  books.filter( (book)=> book.id !== id);
        const nodeDelete =  new Book({title:null, author:null});
        if(await nodeDelete.removeAll()){
                res.send(`All elements was delated`)
        }else{
                res.send(`None item could be delated!`)

        }
});


//Working in that feature!!!!!!!
router.patch( "/:id", async (req, res) =>{
        const {id} = req.params;
        const { title, author, tag, pub_year} = req.body;
        const foundBook =  new Book({title:null, author:null})
        
        if( title ){
                await foundBook.updateTitle(id, title)
        };
        if( author){
                await foundBook.updateAutor(id, author);
        };
        if(pub_year){
                await foundBook.updatePub(id, author); 
        }

        if(tag){
                await foundBook.updateTag(id, tag); 
        }

        res.send(`Book with the ID ${id} has been updated\n `);
});

module.exports = router;