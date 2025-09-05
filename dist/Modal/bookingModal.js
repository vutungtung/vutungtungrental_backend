"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = createBooking;
exports.getAllBookingModal = getAllBookingModal;
exports.getUserBookingModal = getUserBookingModal;
exports.cancelBookingModal = cancelBookingModal;
exports.getBookingDetailByIdModal = getBookingDetailByIdModal;
exports.getVehicleForBooking = getVehicleForBooking;
const db_1 = require("../db");
function createBooking(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("data to be store:", data);
        const book = yield db_1.prisma.bookingInfo.create({
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
        const updateVehiclStatus = yield db_1.prisma.vehicle.update({
            where: {
                v_id: data.vechId,
            },
            data: {
                status: "RENTED",
            },
        });
        return book;
    });
}
function getAllBookingModal() {
    return __awaiter(this, void 0, void 0, function* () {
        const getBooking = yield db_1.prisma.bookingInfo.findMany();
        return getBooking;
    });
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
function getUserBookingModal(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchUserBooking = yield db_1.prisma.bookingInfo.findMany({
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
        }
        catch (err) {
            console.log("User booking details error:", err);
        }
    });
}
// cancel booking
function cancelBookingModal(bookingID, vehicleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cancel = yield db_1.prisma.bookingInfo.update({
            where: {
                bookingId: bookingID,
            },
            data: {
                deliverystatus: "cancled",
            },
        });
        const updateVehicleStatus = yield db_1.prisma.vehicle.update({
            where: {
                v_id: vehicleId,
            },
            data: {
                status: "AVAILABLE",
            },
        });
        return;
    });
}
// getBooking details by booking id
function getBookingDetailByIdModal(bookingId) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookingDetailById = yield db_1.prisma.bookingInfo.findUnique({
            where: {
                bookingId: bookingId,
            },
            select: {
                bookingDate: true,
                username: true,
                vehicleId: true,
                vehicleName: true,
                categoryName: true,
                price: true,
                pickuplocation: true,
                droplocation: true,
                licenseNo: true,
                paymentMethod: true,
                paymentStatus: true,
                deliverystatus: true,
            },
        });
        return bookingDetailById;
    });
}
function getVehicleForBooking(vehicleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield db_1.prisma.vehicle.findUnique({
            where: {
                v_id: vehicleId,
            },
            select: {
                name: true,
                status: true,
            },
        });
        return data;
    });
}
