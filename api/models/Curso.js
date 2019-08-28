/**
 * Curso.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Curso',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    nombre: {
      type: 'string',
      required: true,
      columnName: 'nombre',
      unique: true
    },
    descripcion: {
      type: 'string',
      defaultsTo: 'Curso básico',
      columnName: 'descripcion'
    },
    publicado: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'publicado'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    modulos: { //Un Curso tiene varios modulos     curso-->modulos
      collection: 'ModuloLibro',
      via: 'curso',

    },

    //relacion muchos a muchos waterline
    //un curso puede tener varios estudiante matriculados y un estudiante puede estar matriculado en varios cursos 
    matriculados: { //un estudiante puede seguir varios cursos  estudiante -->curso
      collection: 'estudiante',
      via: 'cursos',
    },

    profesor: { //el curso pertenece a un profesor Profesor-->Curso
      model: 'Profesor',
      // required: true,
    }
  },

};

