const adventurePlace = require('../models/adventureplace');
const ExpressError = require('../utils/ExpressError');
const { adventureplaceSchema } = require('../schemas');
const { cloudinary } = require('../cloudinary');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });

module.exports.index = async (req, res) => {
    const adventureplaces = await adventurePlace.find({});
    res.render('adventureplaces/index', { adventureplaces });
}

module.exports.renderNewForm = (req, res) => {
    res.render('adventureplaces/new');
}

module.exports.createAdventureplace = async (req, res, next) => {
    const adventureplace = new adventurePlace(req.body.adventureplace);
    adventureplace.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    adventureplace.author = req.user._id;
    await adventureplace.save();
    req.flash('success', 'Successfully made a new adventureplace!');
    res.redirect(`/adventureplaces/${adventureplace._id}`);
}

module.exports.showAdventureplace = async (req, res) => {
    const adventureplace = await adventurePlace.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!adventureplace) {
        req.flash('error', 'Cannot find adventureplace');
        return res.redirect('/adventureplaces');
    }
  //  console.log(adventureplace);
    res.render('adventureplaces/show', { adventureplace });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const adventureplace = await adventurePlace.findById(id);
    if (!adventureplace) {
        req.flash('error', 'Cannot find adventureplace');
        return res.redirect('/adventureplaces');
    }
    res.render('adventureplaces/edit', { adventureplace });
}

module.exports.updateAdventureplace = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const adventureplace = await adventurePlace.findByIdAndUpdate(id, { ...req.body.adventureplace });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    adventureplace.images.push(...imgs);
    await adventureplace.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await adventureplace.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated adventureplace!');
    res.redirect(`/adventureplaces/${adventureplace._id}`);
}

module.exports.deleteAdventureplace = async (req, res) => {
    const { id } = req.params;
    await adventurePlace.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted adventureplace!');
    res.redirect('/adventureplaces');
}
