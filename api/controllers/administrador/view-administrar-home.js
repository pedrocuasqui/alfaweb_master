module.exports = {


  friendlyName: 'View administrar home',


  description: 'Display "Administrar home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/administrar-home'
    },
    redirect: {
      description: 'Redirecciona a la página indicada',
      responseType: 'redirect' // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
      //ejemplos: responseType:'ok'  responseType:'view'
    }

  },


  fn: async function (input, exits) {
    var res = this.res;
    var req = this.req;
    var usuario = null;

    if (!req.session.userId) { //no está logueado
      // res.status(401).send({ mensaje: 'Su sesion ha expirado' })
      return exits.redirect('/401-unauthorized');
    } else {
      usuario = await Profesor.findOne({ id: req.session.userId });// deberá encontrar un Profesor
      sails.log('USUARIO LOGUEADO');
      sails.log(usuario);

      if (!usuario) {
        // res.status(401).send({ mensaje: 'Necesita permisos de Administrador' })
        return exits.redirect('/401-unauthorized');
      }
      if (usuario.administrador) {//busqueda del curso alfaweb para todos los administradores
        var cursoInforBasica = await Curso.findOne({ nombre: 'Alfabetización informática' });
      }

      var cursos = await Curso.find({ profesor: usuario.id }); //devuelve un arreglo con los cursos encotrados que pertenecen al profesor
      var estudiantes = await Estudiante.find({}).populate('cursos').sort('updatedAt DESC');//buscar los estudiantes que pertenecen a un curso 
      // aniade el curso de informatica basica al arreglo de cursos
      cursos.unshift(cursoInforBasica);

      return exits.success({
        cursos,
        estudiantes,
        usuario
      });

    }



  }



};


