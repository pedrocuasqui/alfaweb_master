module.exports = {


  friendlyName: 'View administrar home',


  description: 'Display "Administrar home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/administrar-home'
    }

  },


  fn: async function (input, exits) {
    var res = this.res;
    var req = this.req;
    var usuario = null;

    if (!req.session.userId) { //no está logueado
      res.status(401).send({ mensaje: 'no tiene permisos para ingresar a esta página ' })
    } else {
      usuario = await Profesor.findOne({ id: req.session.userId });// deberá encontrar un Profesor

      var cursos = await Curso.find(); //devuelve un arreglo con los cursos encotrados

      var estudiantes = await Estudiante.find({}).populate('cursos').sort('ultimoAcceso DESC');//buscar los estudiantes que pertenecen a un curso 


      return exits.success({
        cursos,
        estudiantes
      });

    }



  }



};


