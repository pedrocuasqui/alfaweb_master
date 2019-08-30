module.exports = {


  friendlyName: 'View crear curso',


  description: 'Display "Crear curso" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/crear-curso'
    },
    redirect:{
      description:'Redirecciona a la página indicada',
      responseType:'redirect' // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
      //ejemplos: responseType:'ok'  responseType:'view'
    }

  },


  fn: async function (inputs, exits) {

    var res = this.res;
    var req = this.req;
    var usuario = null;

    if (!req.session.userId) { //no está logueado
      // res.status(401).send({ mensaje: 'Su sesion ha expirado' })
      return exits.redirect('/401-unauthorized');
    } else {
      usuario = await Profesor.findOne({ id: req.session.userId });// deberá encontrar un Profesor
      sails.log('USUARIO LOGUEADO');
      sails.log(usuario);

      if (!usuario) {
        // res.status(401).send({ mensaje: 'Necesita permisos de Administrador' })
        return exits.redirect('/401-unauthorized');
      }

      return exits.success({
        usuario
      });

    }

  }


};
