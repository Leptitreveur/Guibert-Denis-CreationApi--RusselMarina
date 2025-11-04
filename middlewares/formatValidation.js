import asyncHandler from "../utils/asyncHandler.js";
import { parseIsoDateUTC, startOfDayUTC, endOfDayUTC } from '../utils/dateFormatter.js';
import { sequentialPatterns, validationSchema } from '../utils/validationSchema.js';

export const validateObjectId = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
        return res.status(400).json({
            message: "Invalid objectId format."
        });
    }
    next();
});

export const validateObjectEmail = asyncHandler (async (req, res, next) => {
    const { email } = req.body;
    
    if (!email || !validationSchema.user.test(email)) {
        return res.status(400).json({
            message: "Invalid objectEmail format."
        })
    }
    next();
})

export const validateObjectDate = asyncHandler (async (req, res, next) => {
    const { startDate, endDate } = req.body;
    //Présence
    if (! startDate || !endDate) {
        return res.status(400).json({
            message: "Start and end reservation date are required."
        });
    }

    // Date UTC formatter
    const parsedStart = parseIsoDateUTC(startDate);
    const parsedEnd = parseIsoDateUTC(endDate);
    
    if (!parsedStart || !parsedEnd){
        return res.status(400).json({
            message: "Invalid date format."
        })
    }

    const start = startOfDayUTC(parsedStart);
    const end = endOfDayUTC(parsedEnd);


    if (start.getTime() > end.getTime()) {
        return res.status(400).json({
            message: "Start reservation date must occur before end reservation date."
        })
    }

    const todayUTC = parseIsoDateUTC(Date.now());

    if (start.getTime() < todayUTC.getTime()){
        return res.status(400).json({
            message: "Start reservation date must occur in the futur."
        })
    }

    //assignation des new value de start et end
    req.body.startDate = start;
    req.body.endDate = end;
    
    next();
})

export const validatePassword = asyncHandler(async (req,res, next) => {
    const { password } = req.body;

    if(!password){
        return res.status(400).json({
            message: "Missing password",
        })
    }
    if (!validationSchema.user.test(password)) {
        return res.status(400).json({
            message: "Invalid password format",
        })
    }
    next();
}) 

