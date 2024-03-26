const e = require('express');
let mongoose = require('mongoose')

// connect database
mongoose.connect('mongodb://127.0.0.1/test-blog').then(
    res => {
        console.log('connect successfully');
    }
).catch(err => {
    console.log('failed to connect');
})
// Create Schema
let Schema = mongoose.Schema
// thead / article structure
let ArticleSchema = new Schema(
    {
        title: String,
        content: String,
        // refer UserSchema --> get author id
        author: {type : Schema.Types.ObjectId, ref : 'User'},
        tag: String,
        views: {
            type: Number,
            default: 0,
        }
    },
    {
        // updateAt, CreateAt
        timestamps: true,
    }
)

// virtual ref to Comment , need to create before add model!
ArticleSchema.virtual('coms', {
    // ref model
    ref : 'Comment',
    localField : '_id',
    foreignField : 'article_id',
    // get an array
    justOne : false,
    // if count == true, only show length
    count : true
})
// set
ArticleSchema.set('toObject', {virtuals : true})
ArticleSchema.set('toJSON', {virtuals : true})

// Create Model by Schema
let Article = mongoose.model('Article', ArticleSchema)

/* Create Article*/
// Example :
// {
//     title: 'TEST',
//     content: 'test',
//     author: 'Yannan Zhang',
//     tag: 'test',
//     views: 0,
//     _id: new ObjectId('6602facdd7d1e3b8d467a5c6'),
//     createdAt: 2024-03-26T16:41:49.720Z,
//     updatedAt: 2024-03-26T16:41:49.720Z,
//     __v: 0
//   }
// Article.create(
//     {
//         title: 'TEST0',
//         content: 'test0',
//         author: '66033c4d8871370db6922045',
//         tag: 'test',
//     },
//     {
//         title: 'TEST1',
//         content: 'test1',
//         author: '66033c6e523ecc31fdc6bce1',
//         tag: 'test',
//     }
// ).then(r => {
//     console.log(r);
//     console.log('Create Successfully');
// })

// let a1 = new Article({
//     title: 'TEST2',
//     content: 'test2',
//     // match author as userid
//     author: '66033c77dae9dcc32a5f2a8c',
//     tag: 'test',
// })

// a1.save().then(r => {
//     console.log(r);
//     console.log('Create Successfully');
// })

/* Delete One Article*/
// Article.deleteOne({
//     _id: '6602fc0fdcafdee3254b2967'
// }).then(r => {
//     console.log(r);
// }).catch(err => {
//     console.log(err);
// })

// /* Delete Articles*/
// Article.deleteMany({
//     content : /test1/
// }).then(r => {
//     console.log(r);
// }).catch(err => {
//     console.log(err);
// })

/* Modify One Article*/
// Article.updateOne({
//     // match condition
//     _id: '6602fc0fdcafdee3254b2965'
// }, {
//     // modify parts
//     title: 'test modify',
//     content: 'test modify',
//     // views ++
//     $inc: { views: 1 },
// }, {
//     // no impact to timestamp
//     timestamps: false
// }).then(r => {
//     console.log(r);
// }).catch(err => {
//     console.log(err);
// })

/* Search One Article*/
// Article.findById('6602fc0fdcafdee3254b2965').then(r => {
//     console.log(r);
// })

/* Search One Article And Update*/
// Article.findByIdAndUpdate('6602fc0fdcafdee3254b2965', {
//     $inc: { views: 1 },
// }, {
//     timestamps: false,
// })

/* Search All Articles By Multi Conditions*/
// Article.find({
//     views: { $gte: 0, $lte: 1000 },
//     title: /TEST/
// })
// .sort({_id : -1})
// .skip(1)
// .limit(10)
// .select({updatedAt : 0, __v : 0})
// // show reference author
// .populate('author', {
//     // not show password
//     password : 0,
// })
// // show reference comments
// .populate('coms')
// .exec()
// .then(r => {
//     console.log(r);
// })

// thead / user structure
let UserSchema = new Schema(
    {
        username : {
            type : String,
            unique : true,
            required : true,
        },
        password : String,
        nickname : String,
        headImgUrl : String,
    },
    {
        timestamps : true,
    }
)

let User = mongoose.model('User', UserSchema)

/* Create User*/
// User.create(
//     {
//         username : 'admin3',
//         password : 'admin',
//         nickname : 'admin',
//         headImage : '../public/images/1711461154404.png',
//     }
// ).then(
//     r => {
//         console.log(r);
//         console.log('Create User Successfully');
//     }
// ).catch(
//     err => {
//         console.log(err);
//     }
// )

// thead / comment structure
let CommentSchema = new Schema(
    {
        content : String,
        article_id : {type : Schema.Types.ObjectId, ref : 'Article'},
        reply_user_id : {type : Schema.Types.ObjectId, ref : 'User'}
    }
)

let Comment =mongoose.model('Comment', CommentSchema)

/* Create Comment*/
// Comment.create(
//     {
//         content : 'Test',
//         article_id : '66033cdfbda921e0e73f6334',
//         reply_user_id : '66033c6e523ecc31fdc6bce1'
//     },
//     {
//         timestamps : true,
//     }
// ).then( r => {
//     console.log(r);
// })

// Comment.create(
//     {
//         content : 'Test2',
//         article_id : '66033cdfbda921e0e73f6336',
//         reply_user_id : '66033c77dae9dcc32a5f2a8c'
//     },
//     {
//         timestamps : true,
//     }
// ).then( r => {
//     console.log(r);
// })

// Comment.find({article_id : '66033cdfbda921e0e73f6336'})
// .populate('reply_user_id', {password : 0})
// .then(r => {
//     console.log(r);
// })

module.exports = {
    Comment,Article,User
}