module.exports = {


  friendlyName: 'View administrar indice',


  description: 'Display "Administrar indice" page.',
  inputs: {
    cursoId: {
      type: 'string',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/administrar-indice'
    }

  },


  fn: async function (inputs,exits) {





    var res = this.res;
    var req = this.req;
    var usuario = null;

    if (!req.session.userId) { //no está logueado
      res.status(401).send({ mensaje: 'Su sesion ha expirado' })
    } else {
      usuario = await Profesor.findOne({ id: req.session.userId });// deberá encontrar un Profesor
      sails.log('USUARIO LOGUEADO');
      sails.log(usuario);

      if (!usuario) {
        res.status(401).send({ mensaje: 'Necesita permisos de Administrador' })
      }

      var curso = await Curso.findOne({ id: inputs.cursoId }).populate('modulos');
      if (!curso) { //no existe el objeto como tal
        return this.res.serverError('NO SE HA ENCONTRADO EL CURSO SOLICITADO');
      }

      return exits.success({
        curso,

        usuario
      });

    }

  }

};
