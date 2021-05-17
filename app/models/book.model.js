const sql = require("./db.js");

// constructor
const Book = function(book) {
        this.id = book.id;
        this.title = book.title;
        this.author = book.author;
        this.pub_year = book.pub_year;
        this.tag =  book.tag;
};


const table = "books";

Book.prototype.create = (newBook) =>{
        sql.query( `INSERT INTO ${table} SET ?`, newBook, (err, res) => {
                if (err) {
                        return err;
                }
        });
};




Book.prototype.findID = ( bookID,bookTitle , bookAuthor  )=> {
        return new Promise(  (resolve, reject) => {
                sql.query( `SELECT * FROM ${table} WHERE idbooks = '${bookID}' OR title =  '${bookTitle}' OR author  = '${bookAuthor}'`,  (err, res)=>{
                        if(err){
                                // console.log("error: ", err);
                                resolve(err);
                        }
                        //If I found the element
                        if(res.length){


                                // console.log("Kikikilll!!!");
                                // this.id =  res[0].idbooks;
                                // this.title =  res[0].title;
                                // this.author =  res[0].author;
                                // this.pub_year = res[0].pub_year;
                                // this.tag =  res[0].tag;
                                // console.log("This is res:",  res, "dddd");
                                resolve(res);
                        }else{
                                // this.idbooks =  null;
                                // this.title =  null;
                                // this.author =  null;
                                // this.pub_year = null;
                                // this.tag = null;
                                
                                // console.log("Customer not found customer: ");
                                resolve([]);
                        }
                });
        })
}

Book.prototype.findTitleAutorPub = (bookTitle, bookAuthor, bookPub) =>{
        return new Promise(  (resolve, reject) => {
                sql.query( `SELECT * FROM ${table} WHERE title = '${bookTitle}' AND author  = '${bookAuthor}' AND pub_year = ${bookPub}`,  (err, res)=>{
                        if(err){
                                console.log("Book not found error: ");
                                resolve(false);
                        }
                        //If I found the element
                        if(res.length){
                                this.title =  res[0].title;
                                this.author =  res[0].author;
                                this.id =  res[0].idbooks;
                                console.log("found book: ");
                                resolve(true);
                        }else{
                                this.idbooks =  null;
                                this.title =  null;
                                this.author =  null;
                                this.pub_year = null;
                                this.tag = null;
                                
                                console.log("Book not found: ");
                                resolve(false);
                        }
                });
        })
}







Book.prototype.findAll = ( )=> {
        return new Promise(  (resolve, reject) => {
                sql.query( `SELECT * FROM ${table}`,  (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        //If I found the element
                        if(res.length){
                                console.log("books: ",  res );
                                
                                const result = res.reduce( (accu = [], element)=> {
                                        accu =  [...accu].concat(element);
                                        return accu;
                                }, [])
                                resolve(result);
                        }else{
                                this.idbooks =  null;
                                this.title =  null;
                                this.author =  null;
                                this.pub_year = null;
                                this.tag = null;
                                resolve([])
                        }
                });
        })

}



Book.prototype.getAtributes =  () => {
        return { 
                idbooks: this.idbooks,
                title:   this.title,
                author: this.author,
                pub_year: this.pub_year,
                tag: this.tag,
        };
}

Book.prototype.removeID =  ( id) =>{
        return new Promise((resolve, reject) =>{
                sql.query( `DELETE FROM ${table} WHERE idbooks = '${id}'`, (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        if( res.affectedRows == 0){
                                resolve(false);
                        }
                        resolve(true);
                });
        });
}
Book.prototype.removeAll=  ()=>{
        return new Promise( (resolve, reject) => {
                sql.query(`DELETE FROM ${table}`, (err,res) => {
                        if(err){
                                resolve(false);
                        }
                        resolve(true);
                })
        }) 
}

Book.prototype.updateTitle = (id, title)=>{
        return new Promise( (resolve, reject)=> {

                sql.query( `UPDATE ${table} SET title = '${title}' WHERE idbooks = '${id}'`, (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        if( res.affectedRows == 0){
                                resolve(false);
                        }
                        resolve(true);
                });

        });
}
Book.prototype.updatePub = (id, pub_year)=>{
        return new Promise( (resolve, reject)=> {

                sql.query( `UPDATE ${table} SET pub_year = '${pub_year}' WHERE idbooks = '${id}'`,  (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        if( res.affectedRows == 0){
                                resolve(false);
                        }
                        resolve(true);
                });

                
        });
}


Book.prototype.updateAutor = (id, author)=>{
        return new Promise( (resolve, reject)=> {

                sql.query( `UPDATE ${table} SET author = '${author}' WHERE idbooks = '${id}'`,  (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        if( res.affectedRows == 0){
                                resolve(false);
                        }
                        resolve(true);
                });

                
        });
}

Book.prototype.updateTag = (id, tag)=>{
        return new Promise( (resolve, reject)=> {

                sql.query( `UPDATE ${table} SET tag = '${tag}' WHERE idbooks = '${id}'`,  (err, res)=>{
                        if(err){
                                resolve(false);
                        }
                        resolve(true); 
                });

                
        });
}





module.exports = Book;
