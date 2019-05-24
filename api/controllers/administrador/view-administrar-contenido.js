module.exports = {


  friendlyName: 'View administrar contenido',


  description: 'Display "Administrar contenido" page.',

  inputs: {
    objetoId:{
      type:'string',
      required: true,
    },
    tipoContenido:{
      type:'string',
      required:true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/administrar-contenido'
    }

  },


  fn: async function (inputs) {
    var res= this.res;
    var objetoSeleccionado=Object;
    var curso=Object;
    if(inputs.tipoContenido=='Modulo'){
      objetoSeleccionado = await ModuloLibro.findOne({id: inputs.objetoId});
      curso= await Curso.findOne({id: objetoSeleccionado.curso})
    }else if(inputs.tipoContenido=='Submodulo'){
      objetoSeleccionado = await SubmoduloLibro.findOne({id: inputs.objetoId});
      let modulo= await ModuloLibro.findOne({id: objetoSeleccionado.curso});
      curso= await Curso.findOne({id: modulo.curso});
    }else{
      return res.status(500).send()
    }
    
    
    
    return exits.success({curso,objetoSeleccionado});

  }


};
