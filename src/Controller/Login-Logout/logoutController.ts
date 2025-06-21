import { Request,Response } from "express";
import { checkAlreadyLoggedIn } from "../../Modal/Login-Logout/loginModal";
import { logoutUserModal } from "../../Modal/Login-Logout/logoutModal";

async function logoutUserController(req:Request,res:Response) {
    try{
        const {email,password}=req.body
        // check if user loged in or not
        const logExist=await checkAlreadyLoggedIn(email)
        if(!logExist){
            res.status(401).json({
                message:"Login first"
            })
        }
        const logout=await logoutUserModal(email,password)

        if(logout !== null){
            res.clearCookie("refresh_token")
            res.clearCookie("access_token")
            res.status(200).json({
                message:"Logout Successfuly"
            })
        }
        res.status(404).json({
            message:"Cannot Logout"
        })
    }catch(err){
        res.status(500).json({
            message:"Server Error: Unable to logout"
        })

    }
}

export{logoutUserController}