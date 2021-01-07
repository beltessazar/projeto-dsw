const express = require("express");
const cookieSession = require("cookie-session");
const passaport = require("passport");
const cors = require("cors");
const passport = require("passport");
const { request, response } = require("express");
const LocalStrategy = require("passport-local").Strategy;
//O que vamos precisar
//servidor de aplicação express
const app = express();
app.use(express.json());
//gerenciador de seçao com cookies = cookie-session
app.use(
    cookieSession({
        name: "S3cret",
        keys: ["vueauthrandomkey"],
        maxAge: 60 * 1000,//1minuto
    })
)
//gerenciador de Login - passaporte
//essa lista simula o banco de dados
//fonte de dados para os usuarios - lista de usuarios 

//gerenciador de cors - cors

//chamado no sentido do back-end para o front
passaport.serializeUser((user,done) => {
    done(null, user.id);
});

//chamado do sentido do front-end para o back-end
passport.deserializeUser((id,done) => {
    let user = users.find((user) => {
        return user.id === id;
      });

    done(null, user.id);
});

app.use(cors({credentials: true, origin: "http://localhost:8080"}));

const users = [
    {
    id: 1,
    user: "Usuario 1",
    email: "user@email.com",
    pwd: "123"
    },
    {
    id: 2,
    user: "Usuario 2",
    email: "user@email.com",
    pwd: "456"
    }
]
passport.use(
    new LocalStrategy({
        usernameField: "user",
        passwordField: "pwd"
    },
    (username, password, done) =>  {
        //pode ser de um banco de dados ou arquivo, lista , etc
        let user = users.find((user) => {
            return user.email == username && user.pwd === password;
        });

        if(user)
            done(null, user);
        else
            done(null, false, {message: "Usuário e/ou Senha incorretos"})
    })
);

app.use(passport.initialize());
app.use(passport.session());

//estratégia de login (Local) - passaporte local

app.post("/api/login", (request, response, next) => {
    passport.authenticate("local", (err, user, info)=>{
        if(err) 
            return next(err);

        if(!user)
            return response
                        .status(400)
                        .send([user, "Não foi possível logar", info]);

        request.login(user, (err)=>{
            response.send("Logado!");
        });
    })(request, response, next);
});

const authMiddleware = (request, response, next) => {
    if (!request.isAuthenticated()) {
        console.log("Não está logado");
      response
        .status(401)
        .send("Você não está autorizado à acessar este recurso!");
    } else {
      next();
    }
  };

app.get("/api/user", authMiddleware, (request, response) => {
    //console.log(request.session);
    let user = users.find((user) => {
      return user.id === request.session.passport.user;
    });
  
    console.log([user, request.session]);
    response.send({ userid: user.id, username: user.user });
  });

app.listen("3030", (request, response) => {
    console.log("Servidor na porta 3030 está em funcionamento");
});