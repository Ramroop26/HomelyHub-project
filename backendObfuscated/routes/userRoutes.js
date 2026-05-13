const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
const propertyController = require('../controllers/propertyController');
const router = express.Router();

// Routes based on deobfuscation
router.route('/newAccommodation').post(authController.protect, propertyController.createProperty);
router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/me').get(authController.isLoggedIn);
router.route('/logout').get(authController.logout);
router.route('/updateMe').patch(authController.protect, authController.updateMe);
router.route('/updateMyPassword').patch(authController.protect, authController.updatePassword);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

router.route('/booking').get(authController.protect, bookingController.getUserBookings);
router.route('/booking/:bookingId').get(authController.protect, bookingController.getBookingDetails);
router.route('/checkout-session').get(authController.protect, bookingController.getcheckOutSession);
router.route('/booking/new').post(authController.protect, bookingController.createBookings);
router.route('/myAccommodation').get(authController.protect, propertyController.getUsersProperties);

module.exports = router;