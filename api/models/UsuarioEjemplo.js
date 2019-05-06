/**
 * Administrador.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
 
module.exports = {
  tableName: 'UsuarioEjemplo',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    /* nombre: {
      type: 'string',
      required: true,
      columnName: 'nombre'
    },
    alias: {
      type: 'string',
      required: true,
      columnName: 'alias',
    },
    email: {
      type: 'string',
      columnName: 'email'
    },
    password: {
      type: 'string',
      required: true,
      columnName: 'password',
    },
    administrador: {
      type: 'boolean',
      columnName: 'administrador'
    },
    tutor: {
      type: 'boolean',
      columnName: 'tutor'
    },
    estudiante: {
      type: 'boolean',
      columnName: 'estudiante'
    }, */

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // estudiantes: {
    //   collection: 'Usuario',
    //   via: 'creador'
    // },
    // creador: {
    //   model: 'Usuario',
    //   required:false
    // }

  },

};

