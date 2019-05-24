module.exports = {


  friendlyName: 'Crear submodulo',


  description: '',


  inputs: {
    nuevoSubmodulo:{
      type:'json',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    
    var submoduloCreado= await SubmoduloLibro.create(inputs.nuevoSubmodulo)
      .intercept('E_UNIQUE', (err) => {
        return err

      })
      .intercept({ name: 'UsageError' }, (err) => {// Some other kind of usage / validation error
        return err;
      })
      .intercept((err) => {
        return err;
      })
      .fetch();
  
  return submoduloCreado;
  
  
  
  }
};

