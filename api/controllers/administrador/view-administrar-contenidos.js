module.exports = {

  friendlyName: 'Administrar contenidos',


  description: 'Desplega la página "administrar contenidos"',


  inputs: {
    cursoId: {
      description: 'The ID of the course to look up.',
      // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
      // if the `cursoId` parameter is not a string.
      type: 'string',
      // By making the `cursoId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/administrador/administrar-contenidos'
    }

  },


  fn: async function (inputs, exits) {
    /*
        if (this.req.me) {
          throw {redirect:'/welcome'};
        }
    */
    // var contenidos = await ModuloLibro.find();

// llamada a un helper para cargar el contenido del libro
    var contenidos = await sails.helpers.cargaContenidoCurso(inputs.cursoId);
    return exits.success({
      contenidos
      // cuando el nombre de la propiedad es igual al nombre del objeto que contiene la información, es posible enviar solo un dato es decir que, pasar, contenido: contenidos es igual que pasar contenidos
    });

  }

};
