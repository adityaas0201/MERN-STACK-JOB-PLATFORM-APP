import { UnauthenticatedError, UnauthorizedError , BadRequestError} from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser= (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        throw new UnauthenticatedError('authentication error')
    }
    try {
        const {userId,role}=verifyJWT(token);
        const testUser=userId==='6abdf487aaba2b49b9ec70e1';

        req.user={userId,role,testUser};
        next();
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid')
    }
};

export const authorizePermission=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError('unathorized to access this route')
        }
        next();
    };
}

export const checkForTestUser=(req,res,next)=>{
    if(req.user.testUser){
        throw new BadRequestError('Demo User.Read Only')
    }
    next();
}
