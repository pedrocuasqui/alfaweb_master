module.exports = {


  friendlyName: 'Eliminar contenido',


  description: 'Elimina el contenido seleccionado segun el id especificado',


  inputs: {
    // Aqui se coloca lo que se acepta desde el frontend cuando se hace una REQUEST
    id: {
      type: 'string',
      required: true,
    },


  },


  exits: {
  },


  fn: async function (inputs) {

    await ModuloLibro.destroy({id: inputs.id});
    return exits.success();

  }


};
