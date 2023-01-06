const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const app = express()

const posts = [
    {
        username:"esral",
        title:"title1"
    },
    {
        username:"bilom",
        title:"title2"
    }
]



app.use(express.json())

app.get("/posts",authenticateToken,(req,res)=>{
    res.json(posts.filter(post=>post.username == req.user.name))
})



function authenticateToken(req,res,next){
    console.log(req.headers);
    const authHeader =  req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    console.log(token);
    // Bearer Token
    if(token == null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
            
        console.log(user);
        req.user  = user
        next()
    })

}

app.listen(6000,"0.0.0.0",()=>{
    console.log("server running on port 6000");
})