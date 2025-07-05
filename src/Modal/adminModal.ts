import { Role } from "@prisma/client";
import { prisma } from "../db";

async function createOwner(data: {
  username: string;
  email: string;
  password: string;

}) {
    console.log("data in modal:",data.email,data.username,data.password)
  const newOwner = await prisma.admin.create({
    data: {
      ownername: data.username,
      email: data.email,
      passowrd: data.password,
  
    },
  });
  return newOwner
}
export {createOwner}
