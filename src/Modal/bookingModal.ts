import { DeliveryStatus, PaymentMethod, Payment } from "@prisma/client";
import { prisma } from "../db";

async function createBooking(data: {
  bookingDate: Date;
  returnDate: Date;
  useremail: string;
  vechId: number;
  vehicleName: string;
  categoryName: string;
  categId: number;
  price: number;
  pickuplocation: string;
  droplocation: string;
  paymentMethod: PaymentMethod;
  licenseNo: string;
  licenseImg?: string | null;
  username: string;
}) {
  console.log("data to be store:", data);
  const book = await prisma.bookingInfo.create({
    data: {
      bookingDate: data.bookingDate,
      returnDate: data.returnDate,
      useremail: data.useremail,
      username: data.username,
      paymentMethod: data.paymentMethod,
      vehicleId: data.vechId,
      vehicleName: data.vehicleName,
      categoryName: data.categoryName,
      categoryId: data.categId,
      licenseImg: data.licenseImg,
      price: data.price,
      pickuplocation: data.pickuplocation,
      droplocation: data.droplocation,
      licenseNo: data.licenseNo,
    },
  });
  const updateVehiclStatus = await prisma.vehicle.update({
    where: {
      v_id: data.vechId,
    },
    data: {
      status: "RENTED",
    },
  });
  return book;
}
async function getAllBookingModal() {
  const getBooking = await prisma.bookingInfo.findMany();
  return getBooking;
}
// async function getSpecificBookingModal(data: {
//   useremail?: string;
//   username?: string;
//   vehicleId?: number;
// }) {
//   const findBooking = await prisma.bookingInfo.findMany({
//     where: {
//       useremail: data.useremail,
//       username: data.username,
//       vehicleId: data.vehicleId,
//     },
//     select: {
//       vehicle: {
//         select: {
//           name: true,
//           categoryName: true,
//         },
//       },
//       User: {
//         select: {
//           username: true,
//           email: true,
//         },
//       },
//     },
//   });
//   return findBooking;
// }
async function getUserBookingModal(email: string) {
  try {
    const searchUserBooking = await prisma.bookingInfo.findMany({
      where: {
        useremail: email,
      },
      select: {
        vehicleName: true,
        categoryName: true,
        pickuplocation: true,
        droplocation: true,
        bookingDate: true,
        returnDate: true,
        deliverystatus: true,
        paymentMethod: true,
        paymentStatus: true,
        price: true,
        licenseNo: true,
      },
    });
    return searchUserBooking;
  } catch (err) {
    console.log("User booking details error:", err);
  }
}
async function cancelBookingModal(vid: number, email: string) {
  const cancel = await prisma.bookingInfo.deleteMany({
    where: {
      vehicleId: vid,
      useremail: email,
    },
  });
  const updateVehicleStatus = await prisma.vehicle.update({
    where: {
      v_id: vid,
    },
    data: {
      status: "AVAILABLE",
    },
  });
  return;
}

export {
  createBooking,
  getAllBookingModal,
  getUserBookingModal,
  cancelBookingModal,
};
