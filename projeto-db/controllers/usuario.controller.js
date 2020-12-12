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
        console.log(Usuario.id);
        response.status(200);
        response.send(object);
      })
      .catch((error) => response.status(400).send(error));
  };

  const findByPk = (request, response) => {
    Usuario.findByPk(request.params)
      .then((object) => {
        console.log(object);
        response.status(200);
        response.send(object);
      })
      .catch((error) => response.status(400).send(error));
  };

  const deleteByPk = (request, response) => {
     Usuario.destroy({
      where: {}
    })
      .then((object) => {
        console.log(object);
        response.status(200);
        response.send(object);
      })
      .catch((error) => response.status(400).send(error)); 
      console.log("Erro catch deleteByPk");
      console.log(error);
  };
module.exports = {
    create,
    getAll,
    findByPk,
    deleteByPk
}