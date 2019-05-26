module.exports = {


  friendlyName: 'View administrar contenido',


  description: 'Display "Administrar contenido" page.',

  inputs: {
    objetoId: {
      type: 'string',
      required: true,
    },
    tipoContenido: {
      type: 'string',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/administrar-contenido'
    }

  },


  fn: async function (inputs,exits) {
    var res = this.res;
    var objetoSeleccionado;
    var curso = Object;
    if (inputs.tipoContenido == 'Modulo') {
      objetoSeleccionado = await ModuloLibro.findOne({ id: inputs.objetoId });
      curso = await Curso.findOne({ id: objetoSeleccionado.curso })
      objetoSeleccionado.nombre=objetoSeleccionado.nombreModulo;
    } else if (inputs.tipoContenido == 'Submodulo') {
      console.log('Objeto id submodulos'+inputs.objetoId);
      objetoSeleccionado = await SubmoduloLibro.findOne({ id: inputs.objetoId });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.curso });
      curso = await Curso.findOne({ id: modulo.curso });

      objetoSeleccionado.nombre= objetoSeleccionado.nombreSubmodulo;
    } else {
      return res.status(500).send({problema: 'no encontro el tipo de contenido'})
    }

    if(!objetoSeleccionado){
      var err = new Error();
      err.name='objetoNoEncontrado';
      err.message='El objeto no se encuentra en la base de datos';
      return res.status(500).send({error: err});
    }



    return exits.success({ curso, objetoSeleccionado });

  }


};
