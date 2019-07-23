module.exports = {


  friendlyName: 'Crear intento evaluacion',


  description: '',


  inputs: {
    estudianteId: { //el intento pertenece al estudiante
      type: 'string',
      required: true,
    },
    submoduloId: { //la evaluacion esta dentro del modelo Submodulo, por tanto se asocia directamente con el Submodulo
      type: 'string',
      required: true,
    },
    cursoId:{
      type: 'string',
      required: true,
    },

    puntos: {
      type: 'number',
      required: true,
    },
    nivel: {
      type: 'number',
      required: true,
    },
    medalla: {
      type: 'string',
      isIn: ['bebe', 'estudiante', 'graduado', 'profesor'],
      required: true,
    },
    tiempoMaximoPorPregunta:{
      type: 'number',
      required: true,
    },
 
    evaluacion:{  //esta evaluacion debe contener los errores en cada pregunta
      type:'json',
      columnName: 'evaluacion'
    },
    


  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
