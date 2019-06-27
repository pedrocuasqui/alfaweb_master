module.exports = {


  friendlyName: 'View crear curso',


  description: 'Display "Crear curso" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/crear-curso'
    }

  },


  fn: async function (inputs, exits) {

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

      return exits.success({
        usuario
      });

    }

  }


};
