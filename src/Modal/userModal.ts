import { prisma } from "../db";
import { Role } from "@prisma/client";
// create user

async function createUser(data: {
  username: string;
  email: string;
  password: string;
  role?: Role;
}) {
  const newUser = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
    },
  });
  return newUser;
}
//get user

async function getALlUserMdoal() {
  const getusers = await prisma.user.findMany();
  return getusers;
}
async function updateUserModal(data: {
  email?: string;
  username?: string;
  password?: string;
}) {
  const update = await prisma.user.updateMany({
    where: {
      email: data.email,
    },
    data: {
      username: data.username,
      password: data.password,
    },
  });
  return update;
}

// delete user

async function deleteUserModal(email: string, password: string) {
  const deleteUser = await prisma.user.delete({
    where: {
      email: email,
      password: password,
    },
  });
  return deleteUser;
}
// get user from email
async function getUserByEmail(email: string) {
  const findUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return findUser;
}

// exprt function
export {
  createUser,
  getALlUserMdoal,
  updateUserModal,
  deleteUserModal,
  getUserByEmail,
};
