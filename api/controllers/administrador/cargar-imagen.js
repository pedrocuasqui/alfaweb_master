module.exports = {


  friendlyName: 'Cargar imagen',


  description: '',

  inputs: {

  },

  exits: {
    success: {
      description: 'exito al cargar imagen'
    }
  },


  fn: async function (inputs, exits) { //inputs y exits deben edstar declaradas aunque no se les ocupe,

    //copyfile.js
const fs = require('fs');


    var nuevoArchivo = {};
    sails.log('ingreso a action: cargar-imagen');
    this.req.file('multimedia').upload({ //por defecto sails usa SKIPPER para recibir archivos y texto, se puede cambiar si es necesario ir a congif/http.js
      // dirname: '../../assets/images/uploaded',
      dirname: '../../.tmp/public/images/uploaded',
      
      // don't allow the total upload size to exceed ~20MB
      maxBytes: 1024 * 1024 * 200, //20MB,
      // onProgress: status=>{

      //   console.log('ESTADO:'+status.written + '/' +status.stream.byteCount);
        
      //   return status;
      // }
    }, (err, uploadedFiles) => {
      sails.log('exito al recibir');
      //  `fd` (file descriptor)

      sails.log(uploadedFiles[0]);
      nuevoArchivo = uploadedFiles[0];
      // nuevoArchivo.location = uploadedFiles[0].fd;
      let imageBaseUrl = sails.config.custom.imageBaseUrl;
      let rutaOriginal = uploadedFiles[0].fd.toString();
      nuevoArchivo.location = imageBaseUrl + rutaOriginal.substring(rutaOriginal.length - (8 + 4 + 4 + 4 + 12 + 3 + 5), rutaOriginal.length)
      sails.log(nuevoArchivo);





      // destination will be created or overwritten by default.
      fs.copyFile(nuevoArchivo.fd, nuevoArchivo.fd.replace(".tmp\\public","assets"), (err) => {
        if (err) throw err;
      });


      if (err) {
        return this.res.statusCode = 500; //respuesta para axios ERROR DEL SERVIDOR
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length == 0) {
        return this.res.status = 400; //Respuesta para axios ERROR EN EL CLIENTE
      }
      return this.res.ok(nuevoArchivo);
    });

  }


};
