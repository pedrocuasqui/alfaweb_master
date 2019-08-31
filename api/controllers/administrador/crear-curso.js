module.exports = {


  friendlyName: 'Crear curso',


  description: 'Ingresa un nuevo documento de tipo curso en la base de datos',


  inputs: {
    nombreCurso: {
      type: 'string',
      required: true,
    },
    descripcionCurso: {
      type: 'string',
      required: false,
      defaultsTo: 'Curso Básico',
    }
  },


  exits: {
    redirect: {
      description: 'Redirecciona a otra página despues de crear el curso',
      responseType: 'redirect' // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
      //ejemplos: responseType:'ok'  responseType:'view'
    }
  },


  fn: async function (inputs, exits) {





    var req = this.req;
    var res = this.res;

    var usuario = null;
    //si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

    if (req.session.userId) {
      usuario = await Profesor.findOne({ id: req.session.userId })
      if (!usuario) {
        // res.status(401).send({ mensaje: 'Necesita permisos de Administrador' })
        return res.forbidden();
      }

    } else {
      // res.status(401).send({ mensaje: 'Necesita permisos de Administrador' })
      return res.forbidden();
    }

    //la propiedad PUBLICADO tiene el valor predeterminado de FALSE
    await Curso.create({ nombre: inputs.nombreCurso, descripcion: inputs.descripcionCurso, profesor: usuario.id })
      .intercept('E_UNIQUE', (err) => { //buscar documentacion de intercept de sails 
        return 'El nombre del curso ya está en uso';
      })
      // Some other kind of usage / validation error
      .intercept({ name: 'UsageError' }, (err) => {
        return 'invalid';
      });

    return exits.redirect('/administrar-home');


  }


};
