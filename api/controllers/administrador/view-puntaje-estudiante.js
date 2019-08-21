module.exports = {


  friendlyName: 'View puntaje estudiante',


  description: 'Muestra la interfaz "Puntaje estudiante" del estudiante seleccionado.',
  inputs: {
    estudianteId: {
      type: "string",
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/puntaje-estudiante'
    }

  },


  fn: async function (inputs) {

    var cursoEstudiante = null;
    var intentosEvaluacion = null;
    //buscar toda la información del alumno

    // 1) En que cursos está inscrito, de aqui se usan los cursos para mostrar un combo con las opciones disponibles
    cursoEstudiante = await cursoEstudiante.find({ estudiante_cursos: inputs.estudianteId });
    // 2) Los intentosEvaluación que ha tenido
    intentosEvaluacion = await IntentoEvaluacion.find({ estudiante: inputs.estudianteId }).populate('submodulo');
    // 3) Los estudiantes inscritos en el mismo curso para ver la comparación actual

    return { cursoEstudiante, intentosEvaluacion };

  }


};
