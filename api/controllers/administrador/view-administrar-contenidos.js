module.exports = {

  friendlyName: 'Administrar contenidos',


  description: 'Desplega la página "administrar contenidos"',


  inputs: {

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

   
    var curso= await Curso.find({nombre:'Alfabetizacion informática'}).populate('modulos');
    console.log('Curso\n'+ JSON.stringify(curso) );
    console.log('Curso:'+curso[0].nombre+'- modulos:\n'+ JSON.stringify(curso[0].modulos));

    let moduloLibro= curso[0].modulos;


    return exits.success({
      contenidos: moduloLibro,
      // cuando el nombre de la propiedad es igual al nombre del objeto que contiene la información, es posible enviar solo un dato es decir que, pasar, contenido: contenidos es igual que pasar contenidos
    });

  }

};
