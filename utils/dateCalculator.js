function calculateDuration(start, end) {
  if (!start || !end) {
    const error = {
      message: "Start and end date are required",
      type: "BAD REQUEST",
      statusCode: 400,
      details: {
        startDate: start,
        endDate: end,
      }
    }
    throw error;
  }
  const timeDifference = end - start;
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

export default calculateDuration;
