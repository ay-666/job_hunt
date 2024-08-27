import jwt from 'jsonwebtoken'
const userAuth = async(req, res,next) =>{
    try{
        const token = req.cookies.jwtToken;
        if(!token){
            return res.status(401).json({
                msg:'User not authenticated',
                success:false
            });
        }

        const decoded = await jwt.verify(token,process.env.SECRET_KEY);
        if(!decoded){
            return res.status(401).json({
                msg:'Invalid Token',
                success:false
            });
        }

        req.id = decoded.userId;
        next();
    }catch(error){
        console.log(error);
    }
}

export default userAuth;