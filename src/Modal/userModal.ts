import { prisma } from "../db";

// create user

async function createUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  const newUser = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
    },
  });
  return newUser;
}
//get user

async function getALlUserMdoal() {
  const getusers = await prisma.user.findMany();
  return getusers;
}

// exprt function
export { createUser, getALlUserMdoal };
