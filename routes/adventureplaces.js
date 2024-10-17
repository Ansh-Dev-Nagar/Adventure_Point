const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateAdventureplace } = require('../middleware');
const adventureplaces = require('../controllers/adventureplaces');

router.route('/')
    .get(catchAsync(adventureplaces.index))
    .post(isLoggedIn, validateAdventureplace, catchAsync(adventureplaces.createAdventureplace))

router.get('/new', isLoggedIn, adventureplaces.renderNewForm)

router.route('/:id')
    .get(catchAsync(adventureplaces.showAdventureplace))
    .put(isLoggedIn, isAuthor, validateAdventureplace, catchAsync(adventureplaces.updateAdventureplace))
    .delete(isLoggedIn, isAuthor, catchAsync(adventureplaces.deleteAdventureplace))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(adventureplaces.renderEditForm))

module.exports = router;
