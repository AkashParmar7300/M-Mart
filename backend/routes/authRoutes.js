const express = require('express');
const { userRegister, adminRegister, userLogin, adminLogin } = require('../controllers/authController');

const router = express.Router();

// User routes
router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

// Admin routes
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);

module.exports = router;
