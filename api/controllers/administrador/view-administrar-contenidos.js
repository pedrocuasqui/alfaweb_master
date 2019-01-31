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
    
    //para este tipo de consultas con select, es necesario configurar este modelo a schema: true
    var contenidos = await ModuloLibro.find();

    /* 
    var db = sails.getDatastore().manager;
    // Find all users who own albums with the word "blue" in the title.
    // ("albums" would be defined in `api/models/User.js` as an attribute of type "json".)
     db.collection('ModuloLibro').find({"nombreModulo": 'Introducción'}).toArray(console.log); */

    //  var contenidos =[ {nombreModulo:'Introduccion al curso', descripcion:'descripcion de la intro'}, 
    //         {nombreModulo:'antes de empezar', descripcion:'descripcion antes de empezar'},
    //         {nombreModulo:'Módulo 1- La computadora', descripcion:'descripcion modulo'}]

    return exits.success({
      contenidos: contenidos
    });

  }

};
