const model = require("../models");

const Usuario = model.usuarioModel;

  const create = (request, response) => {
      Usuario.create(request.body).then((object)=>{
          console.log(object);
          console.log("Tudo conforme o planejado até aqui...");
          response.status(200).send(object.dataValues);
      }).catch((error)=>{
          console.log(error);
          response.sendStatus(400).send(error);
      });
  };

  const getAll = (request, response) => {
    Usuario.findAll(request.body)
      .then((object) => {
        console.log(object);
        response.status(200);
        response.send(object);
      })
      .catch((error) => response.status(400).send(error));
  };

  const findByPk = (request, response) => {
    //Usuario.id = request.params;
    Usuario.findByPk(request.params)
      .then((object) => {
        console.log(object);
        response.status(200);
        response.send(object);

      })
      .catch((error) => response.status(400).send(error));
  };

  const deleteByPk = (request, response) => {

    //Usuario.id = request.params;
    console.log(request);
    Usuario.destroy({
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
      
  };

 
module.exports = {
    create,
    getAll,
    findByPk,
    deleteByPk

}