const asyncWrapper = (req, res, next) => {
  try {
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = asyncWrapper;
