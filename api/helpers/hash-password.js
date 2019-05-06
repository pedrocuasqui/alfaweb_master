module.exports = {


  friendlyName: 'Hash password',


  description: 'recibe un password en texto plano y retorna un hash',


  inputs: {
    password:{
      type:'string',
      required:true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    var hashedPassword = bcrypt.hashSync(inputs.password, saltRounds);
  //   await bcrypt.hash(inputs.password, saltRounds).then(function(hash) {
  //     return hash;
  // });

    return hashedPassword;
  }


};

