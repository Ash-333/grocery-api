const jwt=require('jsonwebtoken')
const User=require('../database/User')
const dotenv=require('dotenv').config()

const auth=(req,res,next)=>{
    try {
        let token=req.headers.authorization

        if(token){
            token=token.split(' ')[1]
            let user=jwt.verify(token,process.env.SECRET_KEY)
            req.userId=user.id
        }
        else{
            return res.status(401).json({msg:'Unauthorized user'})
        }
        next()
    } catch (error) {
        res.status(401).json({msg:`${error}`})
    }
}

const checkAdminStatus = async (req, res, next) => {
    try {
      // Check if the user is authenticated (you should have an authentication middleware)
      if (!req.userId) {
        return res.status(401).json({ msg: 'Unauthorized user' });
      }
  
      // Find the user by their ID (you should handle any errors if the user doesn't exist)
      const user = await User.findById(req.userId);
  
      // Check if the user is an admin
      if (user && user.isAdmin) {
        req.isAdmin = true;
      } else {
        req.isAdmin = false;
      }
  
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
   

module.exports={auth,checkAdminStatus}