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

  const update = (request, response) => {

/*     Usuario.findByPk(request.body.id)
    .then((object) => {
      if(object){
        Usuario.update({
          nome: request.body.nome,
          dataNascimento: request.body.dataNascimento,
          nacionalidade: request.body.nacionalidade,
          endereco: request.body.endereco,
          bairro: request.body.bairro,
          cidade: request.body.cidade,
          telefone: request.body.telefone,
          grupoId: request.body.groupId,
        }).then((object)=>{
          console.log(object);
          console.log("Tudo conforme o planejado até aqui...");
          response.status(200).send(object);
      }).catch((error) => {
          console.log(error);
        })   
      }
    }).catch((error)=>{
      console.log(error);
      response.sendStatus(400).send(error);
    }); */

    const paData = {
          nome: request.body.nome,
          dataNascimento: request.body.dataNascimento,
          nacionalidade: request.body.nacionalidade,
          endereco: request.body.endereco,
          bairro: request.body.bairro,
          cidade: request.body.cidade,
          telefone: request.body.telefone,
          grupoId: request.body.grupoId,
    };

    console.log(paData);

    Usuario.update(paData, {
      raw: true,
      where: { id: request.params.id },
    }).then((object)=>{
      console.log(object);
      console.log("Tudo conforme o planejado até aqui...");
      response.status(200).send(object);
    }).catch((error) => {
      console.log(error);
    })  
    /*  const usuarioEdit = {
      nome: request.body.nome,
      groupId: request.body.groupId,
    };
    Usuario.update(usuarioEdit, {
      raw: true,
      where: { id: request.body.id },
    }).then((object)=>{
        console.log(object);
        console.log("Tudo conforme o planejado até aqui...");
        response.status(200).send(object.dataValues);
    }).catch((error)=>{
        console.log(error);
        response.sendStatus(400).send(error);
    }); */
  };

  const getAll = (request, response) => {
    console.log(request.params);
    console.log(request.params.id);
    Usuario.findAll({
      //Esse Where está parescendo ser o problema, nao consigo associar o parametro ao campo iD do usuario
      where: {grupoId: request.params.grupoId},
    })
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
    deleteByPk,
    update
}