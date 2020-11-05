const jwt = require('jsonwebtoken');

const auth =  ( req, res, next ) => {
    
    try{
        const token = req.header("x-auth-token");
        if(!token)
            return res.status(401).json({msg: "no authentication token, authorization denied"});

        
        const verified = jwt.verify(token, process.env.JWT_PASSWORD)
        if(!verified){
            return res.status(401).json({msg: "verification failed, authorization denied"});
        }

        req.user = verified.id;
        next();
    } catch(e) {
        res.status(500).json({error: e.message});
    }
    
}

module.exports = auth;