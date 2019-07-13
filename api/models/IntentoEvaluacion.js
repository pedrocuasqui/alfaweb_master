/**
 * IntentosEvaluacion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //The string, number and boolean data types do not accept null as a value when creating or updating records. In order to allow a null value to be set, toggle the allowNull flag on the attribute
    // errores: {
    //   type: 'number',
    //   columnName: 'nErrores',
    //   required: true
    // },
    // nIntento, estaria determinado por el numero de objeto IntentoEvaluacion que pertenecen a un submodulo y a un estudiante
    puntos: {
      type: 'number',
      columnName: 'puntos',
      required: true,
    },
    nivel: {
      type: 'number',
      columnName: 'nivel',
      required: true,
    },
    medalla: {
      type: 'string',
      columnName: 'medalla',
      isIn: ['bebe', 'joven', 'adulto', 'graduado', 'profesor'],
      required: true,
    },
    tiempoMaximoPorPregunta:{
      type: 'number',
      columnName: 'tiempoMaximoPorPregunta',
      required: true,
    },
 
    evaluacion:{  //esta evaluacion debe contener los errores en cada pregunta
      type:'json',
      required:true,
      columnName: 'evaluacion'
    },
    // fecha,la fecha de creacion y fecha de actualizacion
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    estudiante: { //el intento pertenece al estudiante
      model: 'Estudiante',
      required: true,
    },
    submodulo: { //la evaluacion esta dentro del modelo Submodulo, por tanto se asocia directamente con el Submodulo
      model: 'SubmoduloLibro',
      required: true,
    }
  },

};

