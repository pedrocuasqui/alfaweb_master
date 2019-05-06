module.exports = {


  friendlyName: 'View administrar home',


  description: 'Display "Administrar home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/administrar-home'
    }

  },


  fn: async function (input, exits) {

    // if (this.req.session.userId) {

    // if(this.req.session.)
    var cursos = await Curso.find(); //devuelve un arreglo con los cursos encotrados
    // sails.log('id'+ cursos[0].id);
    var estudiantes = await Estudiante.find().populate('curso');//buscar los estudiantes que pertenecen a un curso 
    // console.log(JSON.stringify(estudiantes));


    return exits.success({
      cursos,
      estudiantes
    });
    // } else
    //   return exits.success({ nombreUsuario:null });

  }



};


