module.exports = {


  friendlyName: 'Login',


  description: 'Evalúa las credenciales ingresadas por el usuario y de existir el usuario en la base de datos, se retorna su nombre y se redirige la página',

  extendedDescription: 'En el cliente ya se valida que estos campos tengan valores, excepto para alias y correo que en este caso solo se acepta uno de los dos, no ambos a la vez',
  inputs: {

    alias: {
      type: 'string',
      allowNull: true,

    },
    email: {
      type: 'string',
      allowNull: true,
    },
    password: {
      type: 'string',
      required: true
    }

  },


  exits: {
    success: {
      statusCode: 200,
      message: 'logueado correctamente'
    },
    noAutorizado: {
      statusCode: 401, //401 Unauthorized:  Similar al error 403, pero se usa cuando se requiere una autentificación y ha fallado o todavía no se a facilitado. 
      description: 'No se ha encontrado el usuario requerido',
    },
    passwordIncorrecto: {
      statusCode: 409, //409 Conflict: Conflicto en el request, como cuando se actualizan al mismo tiempo dos recursos.
      description: 'no se ha encontrado el password',


    }
  },


  fn: async function (inputs, exits) {
    var res = this.res;
    var req = this.req;
    var objetoError = new Error();
    // sails.log(this.req.headers.authorization);

    // REVISAR USO DE btoa y atoa de javascript para codificar y decodificar el password
    var usuario;
    // si se envia el alias
    if (inputs.alias) {
      console.log('recpta alias');
      //buscar por alias, tanto en estudiante como en profesor
      usuario = await Estudiante.findOne({ alias: inputs.alias });
      if (!usuario) {
        usuario = await Profesor.findOne({ alias: inputs.alias });
      }

    }
    // si se envia un correo
    if (inputs.email) {
      console.log('recpta email');
      //buscar por correo tanto en estudiante como en profesor
      usuario = await Estudiante.findOne({ email: inputs.email });
      if (!usuario) {
        usuario = await Profesor.findOne({ email: inputs.email });
      }
    }

    // si no se encuentra el usuario se remite el mensaje noAutorizado con el código 401

    if (!usuario) {//si no se
      // console.log('no existe usuario'); 
      sails.log('no se encuentra el usuario');
      objetoError.code = 401;
      objetoError.message = 'No se encuentra el usuario recibido'
      return res.status(objetoError.code).send({ error: objetoError });
      // return exits.noAutorizado();
    }

    //si se encuentra el usuario se verifca que el password sea correcto
    var passwordCorrecto = await sails.helpers.compararPassword(usuario, inputs.password);

    if (!passwordCorrecto) {
      sails.log('existe el usuario pero el password es incorrecto');
      return exits.passwordIncorrecto();
    }

    //si se encuentra el usuario y el password coincide se remite el mensaje
    // sails.log('ESTAS LOGUEADO');

    req.session.userId = usuario.id;
    req.session.usuario = usuario;
    req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
    console.log('antes de remitir 200');
    return res.status(200).send({ usuario: usuario });

  }


};
