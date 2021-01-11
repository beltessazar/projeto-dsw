const {
    DataTypes, BLOB
  } = require('sequelize');
  
  module.exports = sequelize => {
    const attributes = {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "id",
        unique: "id"
      },
      usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "usuario"
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "email"
      },
      senha: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "senha"
        }
    }
    const options = {
      tableName: "administrador",
      comment: ""
    };
    const AdministradorModel = sequelize.define("administradorModel", attributes, options);
    return AdministradorModel;
  };