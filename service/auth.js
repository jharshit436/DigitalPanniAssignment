const jwt=require("jsonwebtoken");


const jwtAuthMiddleware=(req,res,next)=>{
    // retrive token in the body
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'unauthorized'});
    }

    try{
       const decoded= jwt.verify(token,process.env.JWT_SECRET);
       req.userPayload=decoded;
       next();
    }catch{
        console.log(err);
        return res.status(401).json({error: 'Invalid token'});
    }
}


function generatetoken(userDAta){
    return jwt.sign(userDAta,process.env.JWT_SECRET)
}

module.exports={jwtAuthMiddleware,generatetoken}