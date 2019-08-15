module.exports = {


  friendlyName: 'View progreso estudiante',


  description: 'Display "Progreso estudiante" page.',
  inputs: {
    cursoId: {
      type: 'string',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/progreso-estudiante'
    }

  },


  fn: async function (inputs) {

    var req = this.req;
    var res = this.res;
    var curso = null;
    var intentoEvaluacion = null;
    //verifacion de que el usuario existe

    if (req.session.userId) {
      usuario = await Estudiante.findOne({ id: req.session.userId });
      sails.log(usuario);

      if (!usuario) {
        res.status(401).send({ message: 'su sesión ha expirado' });
      }
    } else { //si el usuario es el usuario Visitante se remite su información
      usuario = {
        id: 1,
        nombre: 'Visitante',
        rol: 'Estudiante'

      }
    }

    // Se retorna el historico de intentosEvaluacion por el estudiante en ese curso

    curso = await Curso.find({ id: inputs.cursoId });
    if (usuario.nombre != "Visitante") { //solo si existe un usuario, caso contrario
      intentoEvaluacion = await intentoEvaluacion.find({ curso: inputs.cursoId, estudiante: usuario.id }).sort('createdAt DESC');;
    }




    return {
      usuario,
      curso,
      intentoEvaluacion,
    };

  }


};
