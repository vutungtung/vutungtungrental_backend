import { prisma } from "../../db";

async function logoutUserModal(email: string, password: string) {
  const logout = await prisma.login.deleteMany({
    where: {
      email: email,
      password: password,
    },
  });
  return logout;
}
async function checkRefreshToken(refreshToken: string) {
  const checkRefresh = await prisma.login.findFirst({
    where: {
      refreshToken: refreshToken,
    },
    select: {
      email: true,
      password: true,
    },
  });
  console.log("modal refresh token data:", checkRefresh);
  // if (checkRefresh !== null) {
  //     const deleteLogin = await prisma.login.deleteMany({
  //         where: {
  //             refreshToken: refreshToken,
  //         },
  //     });
  //     return deleteLogin;
  // }
  return checkRefresh;
}

export { logoutUserModal, checkRefreshToken };
