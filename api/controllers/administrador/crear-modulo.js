module.exports = {


  friendlyName: 'Crear modulo',


  description: '',


  inputs: {
    nombreModulo:{
      type:'string',
      required: false
    }
  },


  exits: {
    success:{
      statusCode:200
    }
  },


  fn: async function (inputs) {

    var path = require('path');
var appDir = path.dirname(require.main.filename);

sails.log(__dirname);
    sails.log(inputs.nombreModulo);
    this.req.file('multimedia').upload({
      dirname:appDir+'/assets/images/img-cargadas',
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 1024*1024*10 //10MB
    },function whenDone(err, uploadedFiles) {
      sails.log('exito al recibir');
      //  `fd` (file descriptor)
      sails.log(uploadedFiles[0].fd);
      if (err) {
        return res.serverError(err);
      }
  
      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }

  });

  return  ;
  }
};
