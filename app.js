console.log('Starting app...');
const express=require('express');
const path = require('path');
const mongoose = require ('mongoose');
const ejsMate = require ('ejs-mate');
const {adventureplaceSchema} = require ('./schemas.js');
const catchAsync = require ('./utils/catchAsync');
const ExpressError = require ('./utils/ExpressError');
const methodOverride = require('method-override');
const adventurePlace = require ('./models/adventureplace');

mongoose.connect('mongodb://localhost:27017/adventure-point');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app=express();

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

const validateAdventureplace = (req, res, next) => {
     const { error } = adventureplaceSchema.validate(req.body);
  if(error) { 
    const msg= error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  }
  else{
    next();
  }
}

app.get('/',(req,res) => {
    res.render('home')
});

app.get('/adventureplaces', catchAsync(async(req,res) => {
    const adventureplaces = await adventurePlace.find({});
    res.render('adventureplaces/index',{adventureplaces})
}));

app.get('/adventureplaces/new',(req,res) => {

    res.render('adventureplaces/new');
})


app.post('/adventureplaces', validateAdventureplace, catchAsync(async(req, res,next) => { 
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
  await adventureplace.save();
  res.redirect(`/adventureplaces/${adventureplace._id}`)
}))

app.get('/adventureplaces/:id', catchAsync(async (req,res,) => {
   const adventureplace = await adventurePlace.findById(req.params.id)
    res.render('adventureplaces/show',{ adventureplace });
}));

app.get('/adventureplaces/:id/edit', catchAsync(async (req,res,) => {
    const adventureplace = await adventurePlace.findById(req.params.id)
     res.render('adventureplaces/edit',{ adventureplace });
 }));

 app.put('/adventureplaces/:id', validateAdventureplace, catchAsync(async (req,res) => {
     const { id }= req.params;
     const adventureplace = await adventurePlace.findByIdAndUpdate(id,{...req.body.adventureplace});
     res.redirect(`/adventureplaces/${adventureplace._id}`)
 }));

 app.delete('/adventureplaces/:id',catchAsync(async (req,res) => {
    const { id } = req.params;
    await adventurePlace.findByIdAndDelete(id);
    res.redirect('/adventureplaces');
 }));

 app.all('*', (req,res,next) => {
    next(new ExpressError('Page Not Found',404))
 })
 app.use((err,req,res,next) => {
    if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'Invalid AdventurePlace ID';
    }
    const { statusCode = 500 } = err ;
    if (!err.message) err.message = 'Oh No, Something went wrong'
    res.status(statusCode).render('error',{ err })
 })

app.listen(3000, ()=> {
  console.log('serving on port 3000')
})