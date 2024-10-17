const adventurePlace = require('../models/adventureplace');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const adventureplace = await adventurePlace.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    adventureplace.reviews.push(review);
    await review.save();
    await adventureplace.save();
    req.flash('success', 'Successfully added your review!');
    res.redirect(`/adventureplaces/${adventureplace._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await adventurePlace.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted your review!');
    res.redirect(`/adventureplaces/${id}`);
}

