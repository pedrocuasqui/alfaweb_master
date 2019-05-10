module.exports = {


  friendlyName: 'View layout contenidos',


  description: 'Display "Layout contenidos" page.',
  inputs: {
    moduloId:{
      type:'string',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/interfaz-modulos'
    }

  },


  fn: async function (inputs, exits) {

    var modulo= await ModuloLibro.findOne({id:inputs.moduloId}).intercept((err)=>{sails.log(err)});
    //retornar el objeto multimedia(imagen, video, animacion, o conjunto de imagenes )
    var curso= await Curso.findOne({id:modulo.curso}).populate('modulos').intercept((err)=>{sails.log(err)});
    return exits.success({modulo, curso});

  }


};
