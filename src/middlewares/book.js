const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid book id',
      });
    }

    next(); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
    }); 
  }
}

module.exports = {
  validateObjectId,
};
