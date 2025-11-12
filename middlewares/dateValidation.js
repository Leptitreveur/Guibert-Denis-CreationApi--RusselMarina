import { parseIsoDateUTC, startOfDayUTC, endOfDayUTC } from '../utils/dateFormatter.js';

function dateValidation(req, res, next) {
  const { startDate, endDate } = req.body;
  //Présence
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
