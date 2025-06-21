// import { PrismaClient } from "./generated/prisma";
import { PrismaClient } from "../../generated/prisma"
export const prisma =new PrismaClient()

// store login details

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

// check already login or not

async function checkAlreadyLoggedIn(email: string) {
  const findUser = await prisma.login.findFirst({
    where: {
      email: email,
    },
  });
  return findUser;
}
// check user register already or not
async function checkExistingUser(email: string,password:string) {
  const findUser = await prisma.user.findFirst({
    where: {
      email: email,
      password:password
    },
  });
  console.log(findUser)
  return findUser;
}


export{careeteLoginModal,checkAlreadyLoggedIn,checkExistingUser}