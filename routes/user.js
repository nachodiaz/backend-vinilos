'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: __dirname + './../uploads/users'
});

var md_auth = require('./../middlewares/authenticate');

api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;