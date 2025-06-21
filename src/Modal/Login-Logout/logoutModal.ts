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

export{logoutUserModal}