import asyncHandler from '../utils/asyncHandler.js';
import Reservation from '../models/reservation.js';
import Catways from '../models/catways.js';

export const validateCatwayId = asyncHandler(async (req, res, next) => {
  //trouve catwayNumber via catway's ID
  const { id } = req.params;
  if (!id){
    return res.status(400).json({
      message:'catid is required'
    })
  }
  const catway = await Catways.findById(id);
  if (!catway){
    return res.status(400).json({
      message: 'Catway not found.'
    })
  }
  const catwayNumber = catway.number;
  req.catwayNumber = catwayNumber;
  return next();
});

export const validateReservationId = asyncHandler(async (req, res, next) => {
  const catwayNumber = req.catwayNumber;
  const idReservation = req.params.idReservation || req.body.idReservation;
  
  if (!idReservation) {
    return next();
  }

  const reservationId = await Reservation.findById(idReservation);

  if (!reservationId) {
    return res.status(404).json({
      message: 'Reservation not found.',
    });
  }

  if (reservationId.catwayNumber !== catwayNumber) {
    return res.status(400).json({
      message: 'The reservation does not belong to the specified catway.',
    });
  }

  req.reservation = reservationId;
  return next();
});

