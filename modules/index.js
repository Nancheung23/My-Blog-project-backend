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
        author: String,
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
//         author: 'Yannan Zhang',
//         tag: 'test',
//     },
//     {
//         title: 'TEST1',
//         content: 'test1',
//         author: 'Yannan Zhang',
//         tag: 'test',
//     }
// ).then(r => {
//     console.log(r);
//     console.log('Create Successfully');
// })

// let a1 = new Article({
//     title: 'TEST2',
//     content: 'test2',
//     author: 'Yannan Zhang',
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
Article.findById('6602fc0fdcafdee3254b2965').then(r => {
    console.log(r);
})

/* Search One Article And Update*/
Article.findByIdAndUpdate('6602fc0fdcafdee3254b2965', {
    $inc: { views: 1 },
}, {
    timestamps: false,
})

/* Search All Articles By Multi Conditions*/
Article.find({
    views: { $gte: 0, $lte: 1000 },
    title: /TEST/
})
.sort({_id : -1})
.skip(1)
.limit(1)
.select({updatedAt : 0, __v : 0})
.exec()
.then(r => {
    console.log(r);
})