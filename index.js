const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secretKey";

app.get("/",(req, resp) => {
    resp.json({
        message: "a sample api"
    })
})

app.post("/login",(req, resp) => {
    const user={
        "id": 1,
        "username" : "aniket",
        "email" : "aniketchauhan12@gmail.com"
    }
    jwt.sign({user},secretKey, {expiresIn: '300s'}, (err, token) => {
        resp.json({
            token
        })
    })
})
app.post("/profile",verifyToken,(req,resp) =>{
    jwt.verify(req.token, secretKey,(err,authData) => {
        if(err){
            resp.send({result:"invalid token"})
        }else{
           resp.json({
            message: "profile accessed",
            authData
           })
        }
    })

})
function verifyToken(req, resp,next){
const bearerheader = req.headers['authorization'];
if(typeof bearerheader !=='undefined'){
const bearer = bearerheader.split(" ");
const token = bearer[1];
req.token = token;
next();
}else{
    resp.send({
        result: 'token is not valid'
    })
}
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });