import { DeliveryStatus, PayemntMethod, Payment } from "@prisma/client";
import { prisma } from "../db";

async function createBooking(data: {
  username: string;
  ownername: string;
  bookingDate: Date;
  returnDate: Date;
  useremail: string;
  vehicleId: number;
  categoryId: number;
  price: string;
  pickuplocation: string;
  droplocation: string;
  paymentMethod: PayemntMethod;
}) {
  console.log("data to be store:", data);
  const book = await prisma.bookingInfo.create({
    data: {
      username: data.username,
      ownername: data.ownername,
      bookingDate: data.bookingDate,
      returnDate: data.returnDate,
      useremail: data.useremail,
      vehicleId: data.vehicleId,
      categoryId: data.categoryId,
      price: data.price,
      pickuplocation: data.pickuplocation,
      droplocation: data.droplocation,
      paymentMethod: data.paymentMethod,
    },
  });
  return book;
}
async function getAllBookingModal() {
  const getBooking = await prisma.bookingInfo.findMany({});
  return getBooking;
}
async function getSpecificBookingModal(data: {
  useremail?: string;
  username?: string;
  vehicleId?: number;
}) {
  const findBooking = await prisma.bookingInfo.findMany({
    where: {
      useremail: data.useremail,
      username: data.username,
      vehicleId: data.vehicleId,
    },
    select: {
      vehicle: {
        select: {
          name: true,
          categoryName: true,
        },
      },
      User: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
  return findBooking;
}

export { createBooking, getAllBookingModal, getSpecificBookingModal };
