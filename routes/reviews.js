const express = require('express');
const router = express.Router({mergeParams: true});
const adventurePlace = require ('../models/adventureplace');
const Review = require ('../models/review');
const {reviewSchema} = require ('../schemas.js');
const ExpressError = require ('../utils/ExpressError');
const catchAsync = require ('../utils/catchAsync');

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error) { 
        const msg= error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
      }
      else{
        next();
      }
}

router.post('/',validateReview, catchAsync(async(req, res) => {
    const adventureplace = await adventurePlace.findById(req.params.id);
    const review = new Review(req.body.review);
    adventureplace.reviews.push(review);
    await review.save();
    await adventureplace.save();
    req.flash('success','Sucessfully added your review!!');
    res.redirect(`/adventureplaces/${adventureplace._id}`);
 }))

router.delete('/:reviewId',catchAsync(async(req, res) => {
    const {id, reviewId} = req.params;
    await adventurePlace.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Sucessfully deleted your review!!');
    res.redirect(`/adventureplaces/${id}`);
}))

module.exports = router;
