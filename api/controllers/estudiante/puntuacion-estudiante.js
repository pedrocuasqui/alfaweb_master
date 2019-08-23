module.exports = {


  friendlyName: 'View puntuacion estudiante',


  description: 'Retorna un arreglo con todos los intentos del curso, es decir todos los intentos por cada submodulo para construir el grafico de puntuacion en el tiempo',
  inputs: {
    cursoId: {
      type: 'string',
      required: true
    },
    estudianteId: {
      type: "string",
      required: false,
      description: "esta propiedad se remite solo desde la vista del administrador cuando busca la información de un usuario"
    }
  },

  exits: {

    success: {

    }

  },


  fn: async function (inputs) {

    var req = this.req;
    var res = this.res;
    var curso = null;
    var intentosEvaluacion = null;
    var estudianteId = null;
    //verifacion de que el usuario existe



    if (req.session.userId) {
      usuario = await Estudiante.findOne({ id: req.session.userId });
      sails.log(usuario);

      if (!usuario) {
        usuario = await Profesor.findOne({ id: req.session.userId });
      }
      if (!usuario) {
        res.status(401).send({ message: 'su sesión ha expirado o no se encuentra el usuario' });
      }
    } else { //si el usuario es el usuario Visitante se remite su información
      usuario = {
        id: 1,
        nombre: 'Visitante',
        rol: 'Estudiante'

      }
    }

    // si se recibe la propiedad inputs.estudianteId significa que la consulta es desde un usuario administrador
    if (inputs.estudianteId) {
      estudianteId = inputs.estudianteId;
    } else {
      estudianteId = inputs.usuario.id;
    }
    // Se retorna el historico de intentosEvaluacion por el estudiante en ese curso

    curso = await Curso.find({ id: inputs.cursoId });
    if (usuario.nombre != "Visitante") { //solo si existe un usuario, caso contrario
      intentosEvaluacion = await IntentoEvaluacion.find({ curso: inputs.cursoId, estudiante: estudianteId }).populate('submodulo').sort('createdAt ASC');
    }

    // retornar la puntuacion actual de todos los usuarios para construir la tabla de puntuacion
    // Se busca a todos los estudiantes y se poblan sus intentosEvaluacion ordenados por descendentemente por fecha de creacion
    // Despues de esto se deben ordenar todos los estudiantes en funcion del puntaje de la evaluacion mas reciente, WATERLINE NO PERMITE SUBQUERYS EN POPULATE por tanto se debe usar un algoritmo de ordenamiento de arreglos, el algoritmo se usa en el lado del cliente
    var estudiantesConSusIntentos = await Estudiante.find()
      .populate('intentosEvaluacion',
        {
          where: { curso: inputs.cursoId },
          sort: 'createdAt desc'
        });
    // 

    return res.status(200).send({
      usuario,
      curso,
      intentosEvaluacion,
      estudiantesConSusIntentos
    });

  }


};
