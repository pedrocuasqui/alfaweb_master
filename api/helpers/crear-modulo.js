module.exports = {


  friendlyName: 'Crear modulo',


  description: '',


  inputs: {
    nuevoModulo: {
      type: 'json',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    // console.log('se debe imprime segundo');
    var moduloCreado = await ModuloLibro.create(inputs.nuevoModulo)
      .intercept('E_UNIQUE', (err) => {
        return err;
      })
      // Some other kind of usage / validation error
      .intercept({ name: 'UsageError' }, (err) => {
        return err;
      })
      .intercept((err) => { return err; })
      .fetch();
    // If something completely unexpected happened, the error will be thrown as-is.

    console.log('modulo creado' + JSON.stringify(moduloCreado));

    return moduloCreado;
  }



};

