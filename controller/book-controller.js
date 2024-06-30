const {UserModel, BookModel} = require("../models");
const IssuedBook = require("../dtos/book-dto");
// (req,res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// }
exports.getallbooks = async(req,res) => {
    const books = await BookModel.find();

    if(books.length===0){
        return res.status(404).json({
            success: true,
            msg : "no book found"
        })
    }else{
        return res.status(200).json({
            success: true,
            data : books
        })
    }
};

exports.getsinglebookbyid = async(req,res) => {
    const {id} = req.params;
    const book = await BookModel.findById (id);

    if(!book){
        return res.status(404).json({
            success : false,
            msg : "book with this id don't exist"
        })
    }else{
        return res.status(200).json({
            success : true,
            data : book
        })
    }
};

exports.getallissuedbooks = async(req,res) => {
    const users = await UserModel.find({
        issuedBook: {$exists : true},
    }).populate("issuedBook")
    const issuedBooks = users.map((each) => new IssuedBook(each))
    if(issuedBooks.length === 0){
        return res.status(404).json({
            success : false,
            msg : " no issued books yet"
        })
    }else{
        return res.status(200).json({
            success : true,
            data : issuedBooks
        })
    }
}

exports.addNewBook = async (req,res) => {
    const {data} = req.body;

        if(!data){
            return res.status(400).json({
                success: false,
                message: "No data provided"
            })
        }else{
            await BookModel.create(data);
            const allBooks = await BookModel.find();
            res.status(200).json({
                success : true,
                data : allBooks
            })
        }
}

exports.updateBookById = async (req,res) => {
    const {id} = req.params;
    const {data} = req.body;
    const updatedBook = await BookModel.findOneAndUpdate({
        _id: id
    },data,{
        new:true
    });
    return res.status(200).json({
                        success: true,
                        data : updatedBook
                    })
}






// module.exports(getallbooks,getsinglebookbyid);