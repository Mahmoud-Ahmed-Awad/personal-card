const asyncWrapper = (fn) => {
  return async (req, res, next = null) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
      console.log(error);
    }
  };
};

export default asyncWrapper;
