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
      curso= await sails.helpers.solicitarCursoCompleto(inputs.objetoId).intercept((err)=>{ sails.log('ERROR EN HELPERS: '+err)});
      objetoSeleccionado.nombre=objetoSeleccionado.nombreModulo;
    } else if (inputs.tipoContenido == 'Submodulo') {
      // console.log('Objeto id submodulos'+inputs.objetoId);
      objetoSeleccionado = await SubmoduloLibro.findOne({ id: inputs.objetoId });
      curso= await sails.helpers.solicitarCursoCompleto(inputs.objetoId).intercept((err)=>{ sails.log('ERROR EN HELPERS: '+err)});
      // console.log('CURSOO:'+ JSON.stringify(curso));
      objetoSeleccionado.nombre= objetoSeleccionado.nombreSubmodulo;
    } else {
      return res.status(500).send({problema: 'no encontro el tipo de contenido'})
    }

    if(!objetoSeleccionado){ //si no se ha encontrado un modulo o submodulo con el id entregado se devuelve un mensaje de error
      var err = new Error();
      err.name='objetoNoEncontrado';
      err.message='El objeto no se encuentra en la base de datos';
      return res.status(500).send({error: err});
    }

sails.log('ERROR curso: '+ JSON.stringify(curso) );
sails.log('ERROR:  objetoSeleccionado'+ JSON.stringify(objetoSeleccionado));

    return exits.success({ curso, objetoSeleccionado });

  }


};
