const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateAdventureplace } = require('../middleware');
const adventureplaces = require('../controllers/adventureplaces');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(adventureplaces.index))
    .post(isLoggedIn, upload.array('image'), validateAdventureplace, catchAsync(adventureplaces.createAdventureplace));

router.get('/new', isLoggedIn, adventureplaces.renderNewForm);

router.route('/:id')
    .get(catchAsync(adventureplaces.showAdventureplace))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateAdventureplace, catchAsync(adventureplaces.updateAdventureplace))
    .delete(isLoggedIn, isAuthor, catchAsync(adventureplaces.deleteAdventureplace));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(adventureplaces.renderEditForm));

module.exports = router;
