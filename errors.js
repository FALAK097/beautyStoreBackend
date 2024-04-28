exports.handleError = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

exports.handleNotFound = (req, res, next) => {
  res.status(404).json({ message: 'Not found' });
};
