const express = require('express');
const router = express.Router({mergeParams: true});
const adventurePlace = require ('../models/adventureplace');
const Review = require ('../models/review');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const ExpressError = require ('../utils/ExpressError');
const catchAsync = require ('../utils/catchAsync');



router.post('/',isLoggedIn,validateReview, catchAsync(async(req, res) => {
    const adventureplace = await adventurePlace.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    adventureplace.reviews.push(review);
    await review.save();
    await adventureplace.save();
    req.flash('success','Sucessfully added your review!!');
    res.redirect(`/adventureplaces/${adventureplace._id}`);
 }))

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(async(req, res) => {
    const {id, reviewId} = req.params;
    await adventurePlace.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Sucessfully deleted your review!!');
    res.redirect(`/adventureplaces/${id}`);
}))

module.exports = router;
