import Reservation from "../models/reservation.js";

export async function creationValidator(catwayId, startDate, endDate) {
  const invalidPeriod = await Reservation.findOne({
    catwayId: catwayId,
    startDate: { $lt: endDate },
    endDate: { $gt: startDate },
  });

  if (invalidPeriod) {
    const error = {
      message: "Data conflict detected.",
      type: "CONFLICT",
      statusCode: 409,
      details: {
        catwayId: invalidPeriod.catwayId,
        existingPeriod: {
          start: invalidPeriod.startDate,
          end: invalidPeriod.endDate,
        },
        requestedPeriod: {
          start: startDate,
          end: endDate,
        },
      },
    };
    throw error;
  }

  return true;
}

export async function updateValidator(catwayId, startDate, endDate, excludeReservationId) {
  const invalidPeriod = await Reservation.findOne({
    catwayId: catwayId,
    startDate: { $lt: endDate },
    endDate: { $gt: startDate },
    _id: { $ne: excludeReservationId },
  });

  if (invalidPeriod) {
    const error = {
      message: "Data conflict detected.",
      type: "CONFLICT",
      statusCode: 409,
      details: {
        catwayId: invalidPeriod.catwayId,
        existingPeriod: {
          start: invalidPeriod.startDate,
          end: invalidPeriod.endDate,
        },
        requestedPeriod: {
          start: startDate,
          end: endDate,
        },
        updatingReservationId: excludeReservationId,
      },
    };
    throw error;
  }

  return true;
}
