import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname=dirname(fileURLToPath(import.meta.url));
// In-memory post storage
let posts=[{id: 1, topic: 'Sample Topic', author: 'John Doe', content: 'This is a sample post content.'},
{id: 2, topic: 'Sample Topic', author: 'John Doe', content: 'This is a sample post content.'}
]

const app=express();
const port=3000;
app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

app.get("/",(req,res)=>{
  res.sendFile(__dirname +"/public/index.html");
})

app.get("/post1",(req,res)=>{
  res.sendFile(__dirname +"/public/post1.html");
})

app.get("/post2",(req,res)=>{
  res.sendFile(__dirname +"/public/post2.html");
  
})

app.get("/post3",(req,res)=>{
  res.sendFile(__dirname +"/public/post3.html");
})

app.get("/post4",(req,res)=>{
  res.sendFile(__dirname +"/public/post4.html");
})

app.get("/post5",(req,res)=>{
  res.sendFile(__dirname +"/public/post5.html");
})

app.get("/post6",(req,res)=>{
  res.sendFile(__dirname +"/public/post6.html");
})

app.get("/createpost",(req,res)=>{
  res.render("createnewpost.ejs"); 
});

app.get("/blogs",(req,res)=>{
  res.render("blogs.ejs",{posts}); 
});





//route to handle new post creation
app.post("/submit",(req,res)=>{
    
    const newPost={
      id:posts.length+1,
      topic:req.body["topic"],
      author:req.body["author"],
      content:req.body["post"],
      date:new Date(),
    };
    posts.push(newPost);

    res.redirect("/blogs");

});

//route to display a specific post for view
app.get("/posts/view/:id",(req,res)=>{
  const postId=parseInt(req.params.id,10);
  const post=posts.find(p=> p.id===postId);
  if(!posts){
    res.status(404).send("Post not found");
  }
  res.render("recentpost.ejs",{post});
});

//route to edit post
app.get("/posts/edit/:id",(req,res)=>{
  const postId=parseInt(req.params.id,10);
  const post=posts.find(p=> p.id===postId);
  if(!posts){
    res.status(404).send("Post not found");
  }
  res.render("editpost.ejs",{post});
});

//handle post update
app.post("/post/edit/:id",(req,res)=>{
  const postId=parseInt(req.params.id,10);
  const post=posts.find(p=> p.id===postId);
  if(!post){
    return res.sendStatus(404).send("post not found");

  }
  post.topic=req.body.topic;
  post.author=req.body.author;
  post.content=req.body.post;
  res.render("recentpost.ejs",{post});
});

// Route to handle post deletion
app.post("/posts/delete/:id",(req,res)=>{
  const postId=parseInt(req.params.id,10);
  posts=posts.filter(post=> post.id!==postId);
  
  res.redirect("/blogs"); 
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});