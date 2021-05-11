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
        if(newBook.pub_year>1454){
                sql.query( `INSERT INTO ${table} SET ?`, newBook, (err, res) => {
                        if (err) {
                          console.log("The Book Title or Book ID has alrready exist, try again...");
                          return;
                        }
                        console.log("created book: ", {...newBook });
                });
        }else{
                console.log("You must insert a valid year publication... ", {...newBook });
        }

};




Book.prototype.findID = ( bookID,bookTitle , bookAuthor  )=> {
        return new Promise(  (resolve, reject) => {
                sql.query( `SELECT * FROM ${table} WHERE idbooks = '${bookID}' OR title =  '${bookTitle}' OR author  = '${bookAuthor}'`,  (err, res)=>{
                        if(err){
                                // console.log("error: ", err);
                                console.log("Customer not found customer: ");
                                resolve(true);
                        }
                        //If I found the element
                        if(res.length){
                                this.title =  res[0].title;
                                this.author =  res[0].author;
                                this.id =  res[0].idbooks;
                                console.log("found customer: ");
                                resolve(true);
                        }else{
                                this.idbooks =  null;
                                this.title =  null;
                                this.author =  null;
                                this.pub_year = null;
                                this.tag = null;
                                
                                console.log("Customer not found customer: ");
                                resolve([]);
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
                                console.log( result);
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
