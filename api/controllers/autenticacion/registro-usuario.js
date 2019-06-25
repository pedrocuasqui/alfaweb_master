module.exports = {


  friendlyName: 'Registro usuario',


  description: 'Registra los datos del usuario recibidos como parámetro en una base de datos',


  inputs: {
    nombre: {
      type: 'string',
      required: true,
    },
    alias: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
      required: true,
    },
    rol:{
      type: 'string',
      required: true
    }
  },


  exits: {
    redirect:{
      description:'Redirecciona a otra página despues de registrar al usuario',
      responseType:'redirect' // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
      //ejemplos: responseType:'ok'  responseType:'view'
    },
    aliasoEmailYaEnUso: {
      statusCode: 409,
      description: 'alias  o email ya en uso.',
    },
  },


  fn: async function (inputs,exits) {

    
    var passwordEncriptada = await sails.helpers.hashPassword(inputs.password);
    // All done.
    if (inputs.rol=='estudiante') {
      //registra al usuario en la tabla estudiante
      await Estudiante.create({
        nombre: inputs.nombre,
        alias: inputs.alias,
        email: inputs.email.toLowerCase(),
        password: passwordEncriptada,
        ultimoAcceso:Date.now(), //solo para crear
        avance:{} //inicia vacio

      })
      //1) buscar la forma de retornar cual es el campo repetido
      //2) en la funcion validarCampos() con axios consumir esta api y retornar el error encontrado, usar preventDefault para evitar que se recargue la página, en caso de que todo funcione correctamente, esta API registro-usuario.js debe retornar un codigo 200 para redirigir manualmente a otra página con   'window.location.replace("/administrar-home")'
      //3) si existen errores, vue verifica el tipo de error y muestra en la vista
        .intercept('E_UNIQUE', 'aliasoEmailYaEnUso')
        .intercept((err) => { sails.log('ERROR GENERAL\n' + err) });

        sails.log('ESTUDIANTE CREADO CORRECTAMENTE');
    } else if (inputs.rol== 'administrador' ) {
      //registra al usuario en la coleccion profesor
      await Profesor.create({
        nombre: inputs.nombre,
        alias: inputs.alias,
        email: inputs.email.toLowerCase(),
        password: passwordEncriptada,
        administrador: true,
        tutor: false,
      })
      .intercept('E_UNIQUE', 'aliasoEmailYaEnUso')
        .intercept((err) => { sails.log('ERROR GENERAL\n' + err) });
      
        sails.log('PROFESOR CREADO CORRECTAMENTE');
    } else if (inputs.rol=='tutor') {
      //registra al usuario en la coleccion profesor
      await Profesor.create({
        nombre: inputs.nombre,
        alias: inputs.alias,
        email: inputs.email.toLowerCase(),
        password: passwordEncriptada,
        administrador:false,
        tutor: true,
      })
      .intercept('E_UNIQUE', 'aliasoEmailYaEnUso')
        .intercept((err) => { sails.log('ERROR GENERAL\n' + err) });
      
        sails.log('PROFESOR CREADO CORRECTAMENTE');
    }

    return exits.redirect('/view-login');

  }


};
