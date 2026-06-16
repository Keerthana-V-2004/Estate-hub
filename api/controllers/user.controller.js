import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'Hello world',
  });
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    console.log(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};