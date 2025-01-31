const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,`${process.env.JWT_token}`);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    const token = req.headers.authorization.split(" ")[1];
    //console.log(token);
    const decodedToken = jwt.verify(token,`${process.env.JWT_token}`);
    res.status(401).json({  
      message: 'pas authentifié',
      error: new Error('Invalid request!')
    });
  }
};