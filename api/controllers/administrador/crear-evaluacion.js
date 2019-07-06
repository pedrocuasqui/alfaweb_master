module.exports = {


  friendlyName: 'Crear evaluacion',


  description: 'actualiza el submodulo para aniadir una evaluacion',


  inputs: {
    objetoId: {
      type: 'string',
      required: true
    },
    evaluacion: {
      type: 'json',
      required: true
    }

  },


  exits: {
    success: {
      description: 'se guarda exitosamente la evaluacion'
    }
  },


  fn: async function (inputs) {
    var req = this.req;
    var res = this.res;
    // no evalua si esta o no logueado el usuario
    try {
      console.log(inputs.evaluacion);
      console.log(inputs.objetoId);
      var evaluacionSubmodulo = await SubmoduloLibro.update({ id: inputs.objetoId })
        .set(
          {
            evaluacion: JSON.parse(inputs.evaluacion)
          }
        ).fetch();
      console.log('SE REGISTRO LA EVALUACION');
      console.log(evaluacionSubmodulo);
    } catch (e) {
      return res.status(500).send({ error: new Error('no se puede guardar') });
    }

    return res.status(200).send({ evaluacionSubmodulo });

  }


};
