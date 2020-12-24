const express = require("express");
const model = require("./models");
const routes = require("./routes/usuario.route.js");
const usuario = require("./models/usuario");

const app = express();
const Usuario = model.usuarioModel;

app.use(express.json());
//configura rotas no servidor express
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}, routes);

//End point para criar um usuario
/*app.post("/usuario", (request, response) => {
    Usuario.create( request.body).then((object)=>{
        response.send(object);
    }).catch((error)=>{
        console.log(error);
        response.sendStatus(500);
    })
});

//End point para buscar usuario por ID
app.get("/usuario/:id", (request, response) => {
    const id = request.params.id;
    Usuario.findByPk(id).then((object)=>{
        response.send(object);
    }).catch((error)=>{
        console.log(error);
        response.sendStatus(500);
    })
});*/

app.listen(8888, (request, response)=>{
    console.log("Estamos no AR! ! !")
});