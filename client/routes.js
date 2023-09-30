const express = require('express');
const ContactController = require('.//controllers/cotactsController')
const contactsRepository = require('.//controllers/contactsRepository')
const passport = require('passport')



const router = express.Router()

router.get('/', (req, res)=> {
    res.send('rodando')
});
router.get("/users/login",checkAuthenticated, (req,res)=>{
    res.render("login")
});
router.get("/users/register",checkAuthenticated,(req,res)=>{
    res.render("register")
    
});
router.get("/users/dashboard" ,checkNotAuthenticated,(req, res) =>{
    res.render("dashboard");
});
  

router.post(
    "/users/login",
    passport.authenticate("local", {
      successRedirect: "/users/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true
    })
  );
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/users/dashboard");
    }
    next();
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } 
    res.redirect("/users/login");
  }  

router.post("/users/register",ContactController.Register)





module.exports = router;