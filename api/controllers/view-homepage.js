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
    var res = this.res;
    // this.req.session.userId="123456789";
    // Evaluar el tipo de usuario que está realizando la petición
    // if (this.req.session.userId) {
    //   this.req.session.nombreUsuario = "pedro";//Buscar en la base de datos el nombre del usuario según el id 
    //   nombreUsuario = this.req.session.nombreUsuario;
    //   return exits.success({ nombreUsuario });
    // } else
    //   return exits.success({ nombreUsuario: null });


    var usuario=null;
    //si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

    if (req.session.userId) {
      if (req.session.userId != 1) {// si el usuario no es visitante entonces se busca la información del usuario en la base de datos

        usuario = await Profesor.findOne({ id: req.session.userId })
        if (!usuario) {
          usuario = await Estudiante.findOne({ id: req.session.userId })
        }

        if (!usuario) {
          // res.status(200).send({ message: 'EL USUARIO NO SE ENCUENTRA EN LA BASE DE DATOS' });
          //respuesta pendiente de modificacion
        }
      } else { //si el usuario es el usuario Visitante se remite su información, se crea porque no existe este usuario en la base de datos
        usuario = {
          id: 1,
          nombre: 'Visitante',
          rol: 'Estudiante'

        }
        // var cursos = await Curso.find();
        // usuario.cursos = cursos;
      }


    } //SI NO EXISTE EL USUARIO SE REMITE NULL, DEL LADO DEL CLIENTE SE USA EL NOMBRE DE USUARIO VISITANTE, NADA MAS

    var cursosPublicados = await Curso.find({where:{publicado:true}});


    exits.success({ usuario ,cursosPublicados});

  }


};
