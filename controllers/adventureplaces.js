const adventurePlace = require('../models/adventureplace');
const ExpressError = require('../utils/ExpressError');
const Joi = require('joi');

module.exports.index = async (req, res) => {
    const adventureplaces = await adventurePlace.find({});
    res.render('adventureplaces/index', { adventureplaces })
}

module.exports.renderNewForm = (req, res) => {
    res.render('adventureplaces/new');
}

module.exports.createAdventureplace = async (req, res, next) => {
    const adventureplaceSchema = Joi.object({
        adventureplace: Joi.object({
            title: Joi.string().required(),
            price: Joi.number().required().min(0),
            image: Joi.string().required(),
            location: Joi.string().required(),
            description: Joi.string().required()
        }).required()
    })
    const { error } = adventureplaceSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    const adventureplace = new adventurePlace(req.body.adventureplace);
    adventureplace.author = req.user._id;
    await adventureplace.save();
    req.flash('success', 'Successfully made a new adventureplace!');
    res.redirect(`/adventureplaces/${adventureplace._id}`)
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
    res.render('adventureplaces/show', { adventureplace });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const adventureplace = await adventurePlace.findById(id)
    if (!adventureplace) {
        req.flash('error', 'Cannot find adventureplace');
        return res.redirect('/adventureplaces');
    }
    res.render('adventureplaces/edit', { adventureplace });
}

module.exports.updateAdventureplace = async (req, res) => {
    const { id } = req.params;
    const adventureplace = await adventurePlace.findByIdAndUpdate(id, { ...req.body.adventureplace });
    req.flash('success', 'Successfully updated adventureplace!');
    res.redirect(`/adventureplaces/${adventureplace._id}`);
}

module.exports.deleteAdventureplace = async (req, res) => {
    const { id } = req.params;
    await adventurePlace.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted adventureplace!');
    res.redirect('/adventureplaces');
}
