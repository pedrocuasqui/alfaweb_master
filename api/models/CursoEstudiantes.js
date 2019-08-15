/**
 * Curso.js
 *
 * @description :: Tabla de rompimiento ('MATRICULA') entre Curso y Estudiante, un curso puede tener varios estudiantes matriculados y un estudiante puede estar matriculado en varios cursos.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'curso_matriculados__estudiante_cursos',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    curso_matriculados: {
      type: 'string',
      columnName: 'curso_matriculados',
      description:'El ID del curso en que se encuentra matriculado el estudiante',
      unique: false
    },
    estudiante_cursos: {
      type: 'string',
      columnName: 'estudiante_cursos',
      description: 'El ID del estudiante matriculado en dicho curso',
      unique: false
    },
    ultimoAcceso: {
      type: 'string',
      columnName: 'ultimoAcceso',
      required: true
    }, //fecha de ultimo acceso
    avance: {
      type: 'json',
      columnName: 'avance',
      required: false
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

