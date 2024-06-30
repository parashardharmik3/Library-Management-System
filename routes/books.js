const express = require("express");

// JSON data import
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");
const {getallbooks, getsinglebookbyid ,getallissuedbooks,updateBookById} = require("../controller/book-controller")
const {UserModel, BookModel} = require("../models");
const router = express.Router();

router.get("/",getAllbooks);

// router.get("/:id",(req,res) => {
//     const {id} = req.params;
//     const book = books.find((each) => each.id === id)
//     if(!book){
//         res.status(404).json({
//             success: false,
//             msg : "book not available"
//         })
//     }else{
//         res.status(200).json({
//             success: true,
//             data: book
//         })
//     }
// })
router.get("/:id",getsinglebookbyid)

// router.get("/issued/books", (req, res)=>{
//     const usersWithIssuedBooks = users.filter((each)=>{
//         if(each.issuedBook) return each;
//     })

//     const issuedBooks = [];

//     usersWithIssuedBooks.forEach((each)=>{
//         const book = books.find((book)=> book.id ===each.issuedBook);

//         book.issuedBy = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;

//         issuedBooks.push(book)
//     })
//     if(issuedBooks.length===0)
//     return res.status(404).json({
// success: false,
// message: "No issued books yet"
// })
// })

router.get("/issued/books", getallissuedbooks);
// router.post("/",(req, res)=>{
//     const {data} = req.body;

//     if(!data){
//         return res.status(400).json({
//             success: false,
//             message: "No data provided"
//         })
//     }
//     const book = books.find((each)=> each.id ===data.id)

//     if(book){
//         return res.status(404).json({
//             success: false,
//             message: "Book with given id already exists"
//         })
//     }
//     const allBooks = [...books, data]

//     return res.status(200).json({
//         success: true,
//         data: allBooks
//     })
// } )


router.post("/", addNewBook);

// router.put("/:id",(req,res) => {
//     const {id} = req.params;
//     const {data} = req.body;
//     const book = books.find((book) => book.id = id);
//     if(!book){
//         return res.status(200).json({
//             success: false,
//             msg : "book with this id do not exist"
//         })
//     }else{
//         if(!data){
//             return res.status(200).json({
//                 success: true,
//             msg : "no data for updation"
//             })
//         }else{

//         }
//     }
// })

router.put("/:id",updateBookById);


module.exports = router;