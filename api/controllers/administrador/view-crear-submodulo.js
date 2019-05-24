module.exports = {


  friendlyName: 'View crear submodulo',


  description: 'Display "Crear submodulo" page.',

  inputs: {
    moduloId:{
      type: 'string',
      required: true
    }
  },
  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/crear-submodulo'
    }

  },


  fn: async function (inputs,exits) {

    var modulo = await ModuloLibro.findOne({id: inputs.moduloId})
    .intercept((err)=>{sails.log('ERROR MODULO NO ENCONTRADO',err)});
    var modulos = await ModuloLibro.find({curso:modulo.curso}).populate('submodulos');
    var curso= await Curso.findOne({id:modulo.curso})
    .intercept((err)=>{console.log('ERROR doble populate: '+err)});
    
    curso.modulos = modulos;
    sails.log('modulos');
    sails.log(JSON.stringify(modulos));
    sails.log('curso');
    sails.log(JSON.stringify(curso));
    return exits.success({curso, moduloSeleccionado:modulo});

  }


};
