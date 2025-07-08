import { DeliveryStatus, Payment } from "@prisma/client";
import { prisma } from "../db";

async function createBooking(data: {
  username: string;
  ownername: string;
  bookingDate: string;
  returnDate: string;
  useremail: string;
  vehicleId: number;
  categoryId: number;
  price: string;
  pickuplocation: string;
  droplocation: string;
  paymentstatus: Payment;
  deliverystatus: DeliveryStatus;
}) {
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
      paymentStatus: data.paymentstatus,
      deliverystatus: data.deliverystatus,
    },
  });
  return book;
}

export { createBooking };
