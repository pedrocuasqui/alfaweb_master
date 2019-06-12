module.exports = {


  friendlyName: 'Crear modulo',


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
      required: true,
    },
    cursoId: {
      type: 'string',
      required: true,

    },
    contenidoTiny: {
      type: "string",
      required: false
    },
    color:{
      type:'string',
      required:false,
    }
  },


  exits: {

    redirect: {
      description: 'Redirecciona a otra página despues de crear el curso',
      responseType: 'redirect' // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
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

    var req = this.req;
    var res = this.res;



    var objetoError = {};
    var moduloCreado = {};
    var nuevoModulo = {};

    // console.log('ingresa a la accion');
    // console.log(req.allParams());
    // console.log(req.file('multimedia'));


    // console.log(req.allParams());
    // if (req.param('multimedia')) { // si exise el parametro 'multimedia' invoca a la funcion cargaImagen
    // if (true) { 
    //   console.log('existe el parametro multimedia');
    //   respuestaCargaImagen = cargaImagen();
    // }

    // imagenPortada= await sails.helpers.cargarImagen(req).catch((err)=>{if(err.name=='E_UNIQUE') console.log('error de unicidad')});

    console.log('pasa if validar carga imagen');




    // moduloCreado=nuevoModulo;



    // if (imagenPortada) { // si no hubo problema en procesar la imagen entonces se crea el modulo



    nuevoModulo = {
      nombreModulo: inputs.nombreModulo,
      descripcion: inputs.descripcionModulo,
      multimedia: { imagen: inputs.rutaPortada },
      curso: inputs.cursoId,
      contenidoTiny: inputs.contenidoTiny,
      submodulos: [],
      color:inputs.color,
    }


    //crea el modulo
    moduloCreado = await sails.helpers.crearModulo(nuevoModulo)
      .catch(
        (err) => {
          if (err.code == 'E_UNIQUE') {
            objetoError.statusCode = 409;
            objetoError.error = err;
          } else if (err.name = 'UsageError') {
            objetoError.statusCode = 400;
            objetoError.error = err;
          } else {
            objetoError.statusCode = 500;
            objetoError.error = err;
          }
        }
      );

    // } else {
    //   objetoError.statusCode = 500;
    //   objetoError.error = 'no se ha cargado ninguna imagen de portada';
    // }






    ////////////////////////////////////////////////////////
    //////////////////FUNCION CARGA IMAGEN//////////////////
    // ////////////////////////////////////////////////////////
    // function cargaImagen() {
    //   // recibe y carga la imagen al servidor
    //   console.log('funcion cargar imagen');
    //   req.file('multimedia').upload({ //por defecto sails usa SKEEPER para recibir archivos y texto, se puede cambiar si es necesario ir a congif/http.js
    //     dirname: '../../assets/images/uploaded',
    //     // don't allow the total upload size to exceed ~20MB
    //     maxBytes: 1024 * 1024 * 20 //10MB
    //   }, (err, uploadedFiles) => {
    //     sails.log('exito al recibir imagen');
    //     //  `fd` (file descriptor)

    //     imagenPortada = uploadedFiles[0];
    //     // nuevoArchivo.location = uploadedFiles[0].fd;
    //     let imageBaseUrl = sails.config.custom.imageBaseUrl;
    //     let rutaOriginal = uploadedFiles[0].fd.toString();
    //     // console.log(rutaOriginal);
    //     imagenPortada.location = imageBaseUrl + rutaOriginal.substring(rutaOriginal.length - (8 + 4 + 4 + 4 + 12 + 3 + 5), rutaOriginal.length)
    //     sails.log('RUTA IMAGEN PROTADA CARGADA: ' + imagenPortada.location);
    //     // sails.log(imagenPortada);
    //     if (err) {
    //       // return this.res.statusCode = 500; //respuesta para axios ERROR DEL SERVIDOR
    //       objetoError.statusCode = 500;
    //       objetoError.error = err;
    //       return false; //Respuesta para axios ERROR EN EL SERVIDOR
    //     }
    //     // If no files were uploaded, respond with an error.
    //     if (uploadedFiles.length == 0) {
    //       // return this.res.status = 400; //Respuesta para axios ERROR EN EL CLIENTE
    //       objetoError.statusCode = 400;
    //       objetoError.error = err;
    //       return false; //Respuesta para axios ERROR EN EL SERVIDOR
    //     }

    //     console.log('se imprime antes de cargar el nuevoModulo');
    //     return true;
    //   });

    // }














    if (Object.keys(objetoError).length > 0) {// si existe un error responde con el codigo de error correspondiente y el mensaje de erro
      console.log('error encontrado');
      return res.status(objetoError.statusCode).send({ error: objetoError.error });

    }



    return res.ok(moduloCreado);

    // return this.res.ok;
  }
};
