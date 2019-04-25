module.exports = {


  friendlyName: 'Actualizar curso',


  description: 'Actualiza el nombre del curso enviado por parámetro',


  inputs: {
    cursoId:{
      type:'string',
      required:true,
    },
    nombreCurso: {
      type: 'string',
      required: true,
    },
    descripcionCurso: {
      type: 'string',
      required: false,
    }
  },


  exits: {
    redirect: {
      description: 'Redirecciona a la página de administrar-curso, aquí se puede editar el curso y sus módulos',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs, exits) {

    // var cursoRecibido = JSON.parse(inputs.curso);
    
    try{
    await Curso
      .update({
        id: inputs.cursoId
      })
      .set({
        nombre: inputs.nombreCurso,
        descripcion: inputs.descripcionCurso
      });
    }catch(e){
      console.log('Error al intentar actualizar el curso:'+inputs.nombreCurso+'\n'+e)
    }

    return exits.redirect('/administrar-contenidos/?cursoId='+inputs.cursoId);

  }


};
