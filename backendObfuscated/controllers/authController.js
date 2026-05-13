const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const cloudinary = require('../utils/Cloudinary');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      avatar: req.body.avatar || { url: 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg' }
    });
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Please provide email and password');
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) throw new Error('Incorrect email or password');
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token || token === 'loggedout') throw new Error('You are not logged in! Please log in to get access.');

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) throw new Error('The user belonging to this token does not exist.');

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ status: 'fail', message: err.message });
  }
};

exports.isLoggedIn = async (req, res) => {
  try {
    if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
      const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return res.status(200).json({ status: 'fail', user: null });
      return res.status(200).json({ status: 'success', user: currentUser });
    }
    res.status(200).json({ status: 'fail', user: null });
  } catch (err) {
    res.status(200).json({ status: 'fail', user: null });
  }
};

exports.updateMe = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        };

        if (req.body.avatar) {
            const result = await cloudinary.uploader.upload(req.body.avatar, {
                folder: 'avatars',
                width: 150,
                height: 150,
                crop: 'scale'
            });
            updateData.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: { user: updatedUser }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            throw new Error('Your current password is wrong');
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();

        createSendToken(user, 200, res);
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error('There is no user with this email address.');

        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        // Note: In real app, you would send an email here.
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
            resetToken // Sending token back for test/dev purposes
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) throw new Error('Token is invalid or has expired');

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        createSendToken(user, 200, res);
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};