import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Rider from '../models/user.js';
// import Driver from '../models/user.js';

const signup = (req, res) => {
  Rider.findOne({
    where: {
      email: req.body.email,
    }})
    .then(user => {
      if (user) {
        return res.status(409).json({ message: 'email already exists' });
      } else if (req.body.email && req.body.password) {
        bcrypt.hash(req.body.password, 12, (err, pwHash) => {
          if (err) {
            res.status(500).json({ message: 'could not hash password' });
          } else if (pwHash) {
            return Rider.create(({
              email: req.body.email,
              name: req.body.name,
              phone: req.body.phone,
              password: pwHash,
            }))
              .then(() => {
                res.status(200).json({ message: 'user created' });
              })
              .catch(err => {
                console.log(err);
                res.status(502).json({ message: 'error while creating user' });
              });
          };
        });
      } else if (!req.body.password) {
        return res.status(400).json({ message: 'password not provided' });
      } else if (!req.body.email) {
        return res.status(400).json({ message: 'email not provided' });
      };
    })
    .catch(err => {
      console.log(err);
    });
};

const login = (req, res) => {
  console.log(req.body);
  Rider.findOne({ where: {
    email: req.body.email,
  }})
    .then(user => {
      if (!user) {
        return res.status(404).json({message: 'user not found'});
      } else {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (err) {
            res.status(502).json({message: 'error checking password'});
          } else if (match) {
            const token = jwt.sign({ email: req.body.email}, 'secret', { expiresIn: '1h' });
            res.status(200).json({ message: 'user logged in', 'token': token});
          } else {
            res.status(401).json({message: 'invalid credentials'});
          };
        });
      };
    })
    .catch(err => {
      console.log(err)
    });
};

const isAuth = (req, res) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'not authenticated' });
  };
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (err) {
    return res.status(500).json({ message: err.message || 'could not decode token'});
  };
  if (!decodedToken) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    res.status(200).json({ message: 'authorized' });
  };
};

export { signup, login, isAuth };
