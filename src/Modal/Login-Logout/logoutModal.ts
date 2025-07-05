import { PrismaClient } from "../../generated/prisma";
const prisma=new PrismaClient()

async function logoutUserModal(email:string,password:string) {
    const logout=await prisma.login.deleteMany({
        where:{
            email:email,
            password:password,
        }
    })
    return logout
}
async function checkRefreshToken(refreshToken:string) {
    const checkRefresh=await prisma.login.findMany({
        where:{
            refreshToken:refreshToken
        }
    })
    if(checkRefresh!==null){
        const deleteLogin=await prisma.login.deleteMany({
            where:{
                refreshToken:refreshToken
            }
        })
        return deleteLogin
    }
}

export{logoutUserModal,checkRefreshToken}