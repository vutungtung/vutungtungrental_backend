// import { PrismaClient } from "./generated/prisma";
import { PrismaClient } from "../../generated/prisma"
export const prisma =new PrismaClient()

async function careeteLoginModal(data:{
    userId:number,
    refreshToken:string,
    email:string,
    password:string,
}) {    
    const createLogin=await prisma.login.create({
        data:{
            userId:data.userId,
            refreshToken:data.refreshToken,
            email:data.email,
            password:data.password
        }
    })
    return createLogin
}

async function checkAlreadyLoggedIn(email: string) {
  const findUser = await prisma.login.findMany({
    where: {
      email: email,
    },
  });
  return findUser;
}
async function checkExistingUser(email: string,password:string) {
  const findUser = await prisma.user.findMany({
    where: {
      email: email,
      password:password
    },
  });
  return findUser;
}


export{careeteLoginModal,checkAlreadyLoggedIn,checkExistingUser}