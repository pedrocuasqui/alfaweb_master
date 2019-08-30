module.exports = {


  friendlyName: 'View crear submodulo',


  description: 'Display "Crear submodulo" page.',

  inputs: {
    moduloId: {
      type: 'string',
      required: true
    }
  },
  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/crear-submodulo'
    },
    redirect: {
      description: 'Redirecciona a la página indicada',
      responseType: 'redirect' // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
      //ejemplos: responseType:'ok'  responseType:'view'
    }


  },


  fn: async function (inputs, exits) {



    var req = this.req;
    var res = this.res;

    var usuario = null;
    //si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol


    if (req.session.userId) {
      usuario = await Profesor.findOne({ id: req.session.userId })
      if (!usuario) {
        return res.forbidden();
      }

    } else {
      return res.forbidden();
    }




    sails.log('CODIO DE MODULO' + inputs.moduloId);
    var modulo = await ModuloLibro.findOne({ id: inputs.moduloId })
      .intercept((err) => { sails.log('ERROR MODULO NO ENCONTRADO', err) });

    sails.log('MODULO' + JSON.stringify(modulo));
    var modulos = await ModuloLibro.find({ curso: modulo.curso }).populate('submodulos');
    var curso = await Curso.findOne({ id: modulo.curso })
      .intercept((err) => { console.log('ERROR doble populate: ' + err) });

    curso.modulos = modulos;


    return exits.success({ curso, moduloSeleccionado: modulo, usuario });

  }


};
