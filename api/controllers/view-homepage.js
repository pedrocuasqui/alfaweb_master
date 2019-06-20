module.exports = {


  friendlyName: 'View homepage',


  description: 'Display "homepage" page.',
  inputs: {
    usuarioId: {
      type: 'string',
      required: false
    }
  },


  exits: {

    success: {
      viewTemplatePath: 'pages/homepage'
    }

  },


  fn: async function (inputs, exits) {

    var req = this.req;
    // this.req.session.userId="123456789";
    // Evaluar el tipo de usuario que está realizando la petición
    // if (this.req.session.userId) {
    //   this.req.session.nombreUsuario = "pedro";//Buscar en la base de datos el nombre del usuario según el id 
    //   nombreUsuario = this.req.session.nombreUsuario;
    //   return exits.success({ nombreUsuario });
    // } else
    //   return exits.success({ nombreUsuario: null });


    var usuario;
    //si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol
    if (req.me) {
      usuario = await Profesor.findOne({ id: req.session.userId })
      if (!usuario) {
        usuario = await Estudiante.findOne({ id: req.session.userId })
      }

    }
    else { // si el usuario no se encuentra registrado, se visualizará la página con datos de visitante, no se guardará su avance pero puede usar la aplicación
      usuario = {
        id: 1,
        nombre: 'Visitante',
        rol: 'Estudiante'

      }
      var cursos = await Curso.find();
      usuario.cursos = cursos;
      req.session.userId = usuario.id;
      req.session.usuario = usuario;

    }


    exits.success({ usuario });

  }


};
