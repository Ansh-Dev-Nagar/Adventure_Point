console.log('Starting app...');
const express=require('express');
const path = require('path');
const mongoose = require ('mongoose');
const ejsMate = require ('ejs-mate');
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

app.get('/',(req,res) => {
    res.render('home')
});

app.get('/adventureplaces', async(req,res) => {
    const adventureplaces = await adventurePlace.find({});
    res.render('adventureplaces/index',{adventureplaces})
});

app.get('/adventureplaces/new',(req,res) => {

    res.render('adventureplaces/new');
})

app.post('/adventureplaces', async(req, res) => {
  const adventureplace = new adventurePlace(req.body.adventureplace);
  await adventureplace.save();
  res.redirect(`/adventureplaces/${adventureplace._id}`)
})

app.get('/adventureplaces/:id', async (req,res,) => {
   const adventureplace = await adventurePlace.findById(req.params.id)
    res.render('adventureplaces/show',{ adventureplace });
});

app.get('/adventureplaces/:id/edit', async (req,res,) => {
    const adventureplace = await adventurePlace.findById(req.params.id)
     res.render('adventureplaces/edit',{ adventureplace });
 });

 app.put('/adventureplaces/:id',async (req,res) => {
     const { id }= req.params;
     const adventureplace = await adventurePlace.findByIdAndUpdate(id,{...req.body.adventureplace});
     res.redirect(`/adventureplaces/${adventureplace._id}`)
 });

 app.delete('/adventureplaces/:id',async (req,res) => {
    const { id } = req.params;
    await adventurePlace.findByIdAndDelete(id);
    res.redirect('/adventureplaces');
 })

app.listen(3000, ()=> {
  console.log('serving on port 3000')
})