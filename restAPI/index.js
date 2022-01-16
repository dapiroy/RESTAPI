var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoutes')
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const BlogSchema = require('./src/models/crmModels');
const blogModel = mongoose.model('blog', BlogSchema);

app.post('/newBlog', (req, res) =>{
    let blog = blogModel(req.body);
    blog.save((err, blogModel)=>{
        if(err){
            res.send(err);
        }
          res.json(blog);
    })
});

let getAllBlogs =(req, res) =>{
    blogModel.find({}, (err, blogs) =>{
        if(err){
            res.send(err);
        }else{
            res.json(blogs);
        }    
        
    })
}

app.get('/getBlogs', getAllBlogs);

let getBlogByID = (req, res) =>{
    blogModel.findById((req.params.blogId), (err, blog)=>{
        if(err){
            res.send(err);
        }
    })    

}
app.get('/blog/:blogId', getBlogByID);

// const cat = mongoose.model('cat', {name: String});

// const kitty = new cat({name: 'mimi'});

// kitty.save().then((res)=>{
//     console.log(res);
//     console.log('Meow');
// })

// app.use(function(req, res, next){
//     console.log('Time', Date.now());
// })

// app.get('/', function(req, res, next){
//     console.log('Req Method: ', req.method)
//     next();
// },    function(req, res, next){
//     console.log('Request Original Url', req.originalurl)
//     next()
// },    function(req, res, next){
//         res.send('Request Was Successful');
// })

let updateBlog = (req, res) =>{
    blogModel.findOneAndUpdate({_id: req.params.blogId}, req.body, {new: true}, (err, updateBlog)=>{
        if(err){
            res.send(err);
        }
        res.json(updateBlog);
    })
}

app.put('/blog/:blogId', updateBlog);

let deleteBlog = (req, res) =>{
    blogModel.remove({_id: req.params.blogId}, (err, blog) =>{
        if(err){
            res.send(err);
        }
        res.json({message: 'Blog Deleted Successfully'})
    })
}

app.delete('/blog/:blogId', deleteBlog);

app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})