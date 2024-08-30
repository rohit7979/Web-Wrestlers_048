import jwt from 'jsonwebtoken';
import {} from 'dotenv/config';
import Customer from '../Models/Loginmodel.js';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const roleMiddleware = (role) => {
  return async (req, res, next) => {
    try {
      const user = await Customer.findById(req.user.id);
      if (user.role !== role) {
        return res.status(403).json({ msg: 'Access denied' });
      }
      next();
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
};


export default protect;