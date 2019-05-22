module.exports = {


  friendlyName: 'Crear modulo',


  description: '',


  inputs: {
    nombreModulo: {
      type: 'string',
      required: false,
      defaults:'kasjd;flka'
    },
    descripcionModulo: {
      type: 'string',
      required: true,
      defaults:'kasjd;flka'
    },
    cursoId: {
      type: 'string',
      required: true,
      defaults:'5ce41c123a98c713b4e60c82'
    }
  },


  exits: {

    redirect:{
      description:'Redirecciona a otra página despues de crear el curso',
      responseType:'redirect' // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
      //ejemplos: responseType:'ok'  responseType:'view'
    }
    //solo se envian los codigos
    // badRequest:{
    //   description:'Error en el cliente'
    // },
    // serverError:{
    //   description:'Error en el servidor'
    // }

  },


  fn: async function (inputs) {

    var path = require('path'); // 
    var appDir = path.dirname(require.main.filename);// retorna el path del proyecto
    console.log(appDir);
    // sails.log(__dirname); // imprime la ruta completa del archivo actual "crear-modulo"
    // sails.log(inputs.nombreModulo+"hola");
    var nuevoArchivo = {};
    //CARGA IMAGEN
    this.req.file('multimedia').upload({ //por defecto sails usa SKEEPER para recibir archivos y texto, se puede cambiar si es necesario ir a congif/http.js
      dirname: '../../assets/images/img-cargadas',
      // don't allow the total upload size to exceed ~20MB
      maxBytes: 1024 * 1024 * 20 //10MB
    }, (err, uploadedFiles) => {
      sails.log('exito al recibir');
      //  `fd` (file descriptor)
      nuevoArchivo = uploadedFiles[0];
      // sails.log(uploadedFiles[0]);
      if (err) {
        return this.res.statusCode = 500; //respuesta para axios ERROR DEL SERVIDOR
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length == 0) {
        return this.res.status = 400; //Respuesta para axios ERROR EN EL CLIENTE
      }
      // console.log('se debe imprime primero');
      crearmodulo();
    });
  

  // si no existe ningun error guarda en la base de datos
    var res = this.res;
    async function crearmodulo(){
      // console.log('se debe imprime segundo');
      var moduloCreado = await ModuloLibro.create({
        nombreModulo: inputs.nombreModulo,
        descripcion: inputs.descripcionModulo,
        multimedia: nuevoArchivo,
        curso: inputs.cursoId,
      })
        .fetch()
        .intercept('E_UNIQUE', (err) => {
          res.statusCode = 409;
          return res;

        })
        // Some other kind of usage / validation error
        .intercept({ name: 'UsageError' }, (err) => {
          res.statusCode = 400;
          return res;
        })
        .intercept((err) => { return res.statusCode = 500 });
      // If something completely unexpected happened, the error will be thrown as-is.

      console.log('modulo creado' + JSON.stringify(moduloCreado));
      
      return res.ok(moduloCreado);
    }

    // return this.res.ok;
  }
};
