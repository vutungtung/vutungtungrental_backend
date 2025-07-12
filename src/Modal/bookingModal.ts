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

export { createBooking };
