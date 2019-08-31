module.exports = {


  friendlyName: 'Actualizar modulo',


  description: '',


  inputs: {
    nombreModulo: {
      type: 'string',
      required: true,

    },
    descripcionModulo: {
      type: 'string',
      required: true,

    },
    rutaPortada: {
      type: 'string',
      required: false,
    },

    contenidoTiny: {
      type: "string",
      required: false
    },
    moduloId: {
      type: 'string',
      required: true,
    },
    color:{
      type:'string',
      required:false,
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    var res = this.res;
    // var cursoRecibido = JSON.parse(inputs.curso);

    try {
      await ModuloLibro
        .update({
          id: inputs.moduloId
        })
        .set({
          nombreModulo: inputs.nombreModulo,
          descripcion: inputs.descripcionModulo,
          multimedia:{imagen:inputs.rutaPortada},
          contenidoTiny: inputs.contenidoTiny,
          color:inputs.color,

        });
    } catch (e) {
      sails.log('Error al intentar actualizar el modulo:' + inputs.nombreModulo + '\n' + e)
      if (e.CODE == 'E_UNIQUE') {
        return res.status(409).send({ error: e });
      }
      if (e.name == 'UsageError') {
        return res.status(400).send({ error: e });
      } else {
        return res.status(500).send({ err: e });
      }

    }
    return ;// no remitir ningun codigo porque da error

  }


};
