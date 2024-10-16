const express = require('express');
const router = express.Router();
const catchAsync = require ('../utils/catchAsync');
const ExpressError = require ('../utils/ExpressError');
const adventurePlace = require ('../models/adventureplace');
const Joi = require('joi');
const {isLoggedIn, isAuthor, validateAdventureplace} = require('../middleware');



router.get('/', catchAsync(async(req,res) => {
    const adventureplaces = await adventurePlace.find({});
    res.render('adventureplaces/index',{adventureplaces})
}));

router.get('/new',isLoggedIn, (req,res) => {
    res.render('adventureplaces/new');
})


router.post('/',isLoggedIn, validateAdventureplace, catchAsync(async(req, res,next) => { 
   // if(!req.body.adventureplace) throw new ExpressError('Invalid Adventureplace Data',400);
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
  if(error)
  {
    const msg= error.details.map(el => el.message).join(',')
    throw new ExpressError(error.details, 400)
  }
  const adventureplace = new adventurePlace(req.body.adventureplace);
  adventureplace.author = req.user._id;
  await adventureplace.save();
  req.flash('success','Sucessfully made a new adventureplace!!');
  res.redirect(`/adventureplaces/${adventureplace._id}`)
}))

router.get('/:id', catchAsync(async (req,res,) => {
   const adventureplace = await adventurePlace.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
        path: 'author'
    }
   }).populate('author');
   if(!adventureplace){
    req.flash('error','cannot find adventureplace');
    return res.redirect('/adventureplaces');
   }
   res.render('adventureplaces/show',{ adventureplace });
}));

router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(async (req,res,) => {
    const { id }= req.params;
  const adventureplace = await adventurePlace.findById(id)
    if(!adventureplace){
        req.flash('error','cannot find adventureplace');
        return res.redirect('/adventureplaces');
       }
     res.render('adventureplaces/edit',{ adventureplace });
 }));

 router.put('/:id',isLoggedIn,isAuthor, validateAdventureplace, catchAsync(async (req,res) => {
     const { id }= req.params;
     const adventureplace = await adventurePlace.findByIdAndUpdate(id,{...req.body.adventureplace});
     req.flash('success','Sucessfully updated adventureplace!!');
     res.redirect(`/adventureplaces/${adventureplace._id}`)
 }));

 router.delete('/:id',isLoggedIn,isAuthor,catchAsync(async (req,res) => {
    const { id } = req.params;
    await adventurePlace.findByIdAndDelete(id);
    req.flash('success','Sucessfully deleted adventureplace!!');
    res.redirect('/adventureplaces');
 }));

 module.exports = router;
