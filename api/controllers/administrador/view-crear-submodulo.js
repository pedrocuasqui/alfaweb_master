module.exports = {


  friendlyName: 'View crear submodulo',


  description: 'Display "Crear submodulo" page.',

  inputs: {
    cursoId: {
      type: 'string',
      required: true,
    }
  },
  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/crear-submodulo'
    }

  },


  fn: async function (inputs,exits) {

    var curso= await Curso.findOne({id:inputs.cursoId}).populate('modulos').intercept((err)=>{console.log(err)});
    return exits.success({curso});

  }


};
