import { parseIsoDateUTC, startOfDayUTC, endOfDayUTC, formatDateOnly } from '../utils/dateFormatter.js';
import Reservation from '../models/reservation.js';

async function dateValidation(req, res, next) {
  let { startDate, endDate } = req.body;
  const { idReservation } = req.body;

  const reservation = await Reservation.findById(idReservation);
  //Présence
  if(!startDate){
    const startUTC = reservation.startDate;
    startDate = formatDateOnly(startUTC);
  }

  if(!endDate){
    const endUTC = reservation.endDate;
    endDate = formatDateOnly(endUTC);
  }

  if (!startDate || !endDate) {
    return res.status(400).json({
      message: 'Start and end reservation date are required.',
    });
  }
  //Type
  if (typeof startDate !== 'string' || typeof endDate !== 'string') {
    return res.status(400).json({
      message: 'Start and end dates must be ISO strings (YYYY-MM-DD).',
    });
  }

  // Date UTC formatter
  const parsedStart = parseIsoDateUTC(startDate);
  const parsedEnd = parseIsoDateUTC(endDate);

  if (!parsedStart || !parsedEnd) {
    return res.status(400).json({
      message: 'Invalid date format.',
    });
  }

  const start = startOfDayUTC(parsedStart);
  const end = endOfDayUTC(parsedEnd);

  if (start.getTime() > end.getTime()) {
    return res.status(400).json({
      message: 'Start reservation date must occur before end reservation date.',
    });
  }

  const todayUTC = startOfDayUTC(new Date());

  if (start.getTime() < todayUTC.getTime()) {
    return res.status(400).json({
      message: 'Start reservation date must occur in the future.',
    });
  }

  //assignation des new value de start et end
  req.body.startDate = start;
  req.body.endDate = end;

  next();
}

export default dateValidation;
