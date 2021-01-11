//estratégia de login (Local) - passaporte local
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const model = require("../../projeto-db/models");

const Administrador = model.administradorModel;

const UserLogin = (request, response, next) => {
  passport.authenticate("local", (err, user, info)=>{
    if(err) 
        return next(err);

    console.log(user);
    if(!user){
      console.log("entrou no false", info);
      return response
                    .status(400)
                    .send([user, "Não foi possível logar", info]);
    }
    
    request.login(user, (err)=>{
        response.send("Logado!");
    });
  })(request, response, next);



};

const logout = (request, response) => {
  request.logout();
  console.log("Logout realizado");
  return response.send();
};

const getUserData = async (request, response) => {
  let user = await Administrador.findByPk(request.session.passport.user);
  console.log(user);
  response.send({ userid: user.id, username: user.user });
};

const create = (request, response) => {
  console.log("model: " + Administrador);
  Administrador.create(request.body).then((object)=>{
    console.log(object);
    console.log("Tudo conforme o planejado até aqui...");
    response.status(200).send(object.dataValues);
}).catch((error)=>{
    console.log(error);
    response.sendStatus(400).send(error);
});
}

const getAll = (request, response) => {
  Administrador.findAll(request.body)
  .then((object) => {
    console.log(object);
    response.status(200);
    response.send(object);
  })
  .catch((error) => response.status(400).send(error));
}

const remove = (request, response) => {
  Administrador.destroy({
    //Esse Where está parescendo ser o problema, nao consigo associar o parametro ao campo iD do usuario
    where: {id: request.params.id},
  })
    .then((object) => {
      console.log("Excluido");
      response.status(200);
      response.send("Excluido");
    })
    .catch((error) => {
      console.log(request)
      console.log(error);
      console.log("Erro catch deleteByPk");
      response.status(400).send(error);
    });
}

passport.use(
  new LocalStrategy({
      usernameField: "username",
      passwordField: "password"
  },
  async (username, password, done) =>  {
    try{
      console.log(username);
      console.log(password);
      let  user = await Administrador.findOne({
        //Esse Where está parescendo ser o problema, nao consigo associar o parametro ao campo iD do usuario
        where: {email: username, senha: password},
      })

        if(user)
          done(null, user);
        else
          done(null, false, {message: "Usuário e/ou Senha incorretos"});
    }
    catch(error){
      console.error(error);

    }
  })
);

//chamado no sentido do back-end para o front
passport.serializeUser((user,done) => {
  done(null, user.id);
});

//chamado do sentido do front-end para o back-end
passport.deserializeUser(async (id,done) => {
  try{
  let user =  await Administrador.findByPk(id);

  if (!user) {
      return done(new Error('user not found'));
    }
    done(null, user.id);
  } catch (e) {
    done(e);
  }
});

module.exports = {
  UserLogin,
  logout,
  getUserData,
  create,
  getAll,
  remove
}