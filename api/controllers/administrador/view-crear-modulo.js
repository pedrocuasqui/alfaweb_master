module.exports = {


  friendlyName: 'View crear modulo',


  description: 'Display "Crear modulo" page.',


  inputs: {
    cursoId: {
      type: 'string',
      required: true
    }
  },
  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/crear-modulo'
    },
    badRequest: {
      description: 'error al consultar en la base de datos'
    },
    serverError:{
      statusCode: 500,
      description:'no se encuentra el recurso'
    }

  },


  fn: async function (inputs, exits) {


    var curso = await Curso.find({id:inputs.cursoId}).intercept(err=>{
      return exits.serverError({ err })
    });

    var contenidos = await sails.helpers.cargaContenidoCurso(inputs.cursoId)
      .intercept(err => { return exits.badRequest({ err }) });

    return exits.success({ curso:curso[0],contenidos  });

  }


};