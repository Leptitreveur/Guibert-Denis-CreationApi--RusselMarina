import asyncHandler from '../utils/asyncHandler.js';

function paramsValidation(layout) {
  return asyncHandler(async (req, res, next) => {
    if (layout !== 'catways' || layout !== 'reservation' || !layout) {
      return res.status(500).json({
        message: 'Invalid layout parameter',
      });
    }

    if (layout === 'catways') {
      const { id } = req.params;
      const isValidId = mongoose.Type.ObjectId(id);
      if (!isValidId) {
        return res.status(500).json({
          message: 'Invalid ID params.',
        });
      }
      return next();
    }

    if (layout === 'user') {
      const { email } = req.params;
      const emailRegex = /^[\w\_\-\.]+@[\w\-\.]+\.[a-zA-Z]{2,6}$/;
      
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: 'Invalid Email format.',
        });
      }
      return next();
    }
  });
}

export default paramsValidation;
