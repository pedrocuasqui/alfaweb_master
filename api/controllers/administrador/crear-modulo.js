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
    cursoId: {
      type: 'string',
      required: true,

    },
    contenidoTiny: {
      type: "string",
      required: false
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

    
    var res = this.res;
    var archivoMultimediaIndependiente = {};
    var objetoError = {};
    
    var nuevoModulo = {
      nombreModulo: inputs.nombreModulo,
      descripcion: inputs.descripcionModulo,
      multimedia: archivoMultimediaIndependiente,
      curso: inputs.cursoId,
      contenidoTiny: inputs.contenidoTiny
    }

    var moduloCreado = await sails.helpers.crearModulo(nuevoModulo)
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

    if (Object.keys(objetoError).length > 0) {// si existe un error responde con el codigo de error correspondiente y el mensaje de erro
      console.log('error encontrado');
      return res.status(objetoError.statusCode).send({ error: objetoError.error });

    } else {
      return res.ok(moduloCreado);
    }
    // return this.res.ok;
  }
};
