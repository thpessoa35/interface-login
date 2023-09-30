const contactsRepository = require('./contactsRepository');
const db = require('../db/db');
const bcrypt = require('bcrypt')

class ContactController{

    async  Register(req, res) {
    const { email, password, password2 } = req.body;

    const erros = [];
    if (!email || !password || !password2) {
      erros.push({ message: "Dados incorretos!" });
    }
    if (password.length < 6) {
      erros.push({ message: "Senha deve ter no mínimo 6 caracteres" });
    }
    if (password !== password2) {
      erros.push({ message: "Confirmação de senha incorreta" });
    }
    if (erros.length > 0) {
      return res.render('register', { erros });
    }
    
    const hashpassword = await bcrypt.hash(password, 10);
    const ExistEmail = await contactsRepository.Email(email);
    if(ExistEmail){
        erros.push({message: "email já cadastrado"})
         res.render('register', { erros });
    } else{
      const contacts = await contactsRepository.Register({email, password:hashpassword})
       req.flash("sucess_msg", "Voce esta cadastrado!") 
       return res.redirect('/users/login')
    }
          
  
  }    
}    
   
module.exports = new ContactController(); 