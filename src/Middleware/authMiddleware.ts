import { Request,Response,NextFunction } from "express";

async function authenMiddleware(req:Request,res:Response,next:NextFunction) {
    try{
        const authenHeader=req.headers.authorization || req.cookies['refresh_token']
        if(!authenHeader){
            res.status(401).json({
                message:"Token are not found in header"
            })
        }

    }catch{

    }
    
}
