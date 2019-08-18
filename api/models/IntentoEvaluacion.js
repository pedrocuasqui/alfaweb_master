/**
 * IntentosEvaluacion.js
 *
 * @description :: Esta coleccion funge como tabla de rompimiento entre el submodulo y el estudiante,  relacion: una evaluacion del submodulo puede ser realizada por varios estudiantes y un estudiante puede evaluar varios submodulos
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'IntentoEvaluacion',
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
      isIn: ['bebe', 'estudiante', 'estudiante destacado', 'egresado', 'graduado'],
      required: true,
    },
    tiempoMaximoPorPregunta: {
      type: 'number',
      columnName: 'tiempoMaximoPorPregunta',
      required: true,
    },
    apruebaEvaluacion: {
      type: 'number',
      columnName: 'apruebaEvaluacion',
      required: true,
      description: 'Guarda 1 si la evaluacion tiene mas de la mitad de respuestas acertadas, caso contrario guarda cero, es decir que reprueba la evaluacion '
    },
    evaluacion: {  //esta evaluacion debe contener los errores en cada pregunta
      type: 'json',
      required: true,
      columnName: 'evaluacion'
    },
    curso: { //se usa esta propiedad para poder retornar los puntos y medallas en cada curso, sin tener que buscar por submodulo
      type: 'string',
      required: true,
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

    // 
    estudiante: { //el intento pertenece al estudiante, relacion: un estudiante tiene varios intentos
      model: 'Estudiante',
      required: true,
    },
    submodulo: { //la evaluacion esta dentro del modelo Submodulo, por tanto se asocia directamente con el Submodulo, relacion un submodulo tiene varios intentos
      model: 'SubmoduloLibro',
      required: true,
    }
  },

};

