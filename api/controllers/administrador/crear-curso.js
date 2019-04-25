module.exports = {


  friendlyName: 'Crear curso',


  description: 'Ingresa un nuevo documento de tipo curso en la base de datos',


  inputs: {
    nombreCurso:{
      type:'string',
      required:true,
    },
    descripcionCurso:{
      type:'string',
      required:false,
      defaultsTo:'Curso Básico',
    }
  },


  exits: {
    redirect:{
      description:'Redirecciona a otra página despues de crear el curso',
      responseType:'redirect' // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
      //ejemplos: responseType:'ok'  responseType:'view'
    }
  },


  fn: async function (inputs,exits) {

    await Curso.create({nombre:inputs.nombreCurso, descripcion:inputs.descripcionCurso})
    .intercept('E_UNIQUE', (err)=> { //buscar documentacion de intercept de sails 
      return 'nombre ya en uso';
    })
    // Some other kind of usage / validation error
    .intercept({name:'UsageError'}, (err)=> {
      return 'invalid';
    });
    
    return exits.redirect('/administrar-home');
     

  }


};
