/**
 * Estudiante.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Estudiante',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    nombre: { type: 'string', columnName: 'nombre',required:true  },
    alias: { type: 'string', columnName: 'alias', required: true, unique: true },
    email: { type: 'string', columnName: 'email', unique:false },
    password: { type: 'string', columnName: 'password', required: true , unique:false},
    // ultimoAcceso: { type: 'string', columnName: 'ultimoAcceso', required: true }, //fecha de ultimo acceso
    // avance:{type:'json', columnName: 'avance', required:false},
    // fechaNacimiento: { type: 'string', columnName: 'fechaNacimiento' },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    cursos: { //un estudiante puede estar matriculado en varios cursos
      collection: 'Curso',
      via: 'matriculados',

    },
    intentosEvaluacion: { //Un estudiante tiene varios intentos de evaluacion     Estudiante-->IntentosEvaluacion
      collection: 'IntentoEvaluacion',
      via: 'estudiante',

    },
  },

};

