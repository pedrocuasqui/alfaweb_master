module.exports = {


  friendlyName: 'View crear modulo',


  description: 'Display "Crear modulo" page.',


  inputs: {
    cursoId: {
      type: 'string',
      required: true
    }
  },
  exits: {

    success: {
      //statusCode:200, // por defecto
      viewTemplatePath: 'pages/administrador/crear-modulo'
    },
    badRequest: {//metodo de sails, retorna statusCode=400, no es necesario declarar a menos que se quiera dar una descripcion diferente. AUTOMATICAMENTE busca una vista 400.ejs  para mostrar
      //statusCode:400, // por defecto
      //responseType:'' // no se donde buscar, tampoco es necesario, esto se puede validar en el cliente 
      description: 'Error en el cliente'
    },
    serverError: { //metodo de sails, retorna statusCode=500, no es necesario declarar a menos que se quiera dar una descripcion diferente. AUTOMATICAMENTE busca una vista 500.ejs  para mostrar
      //statusCode:500, // por defecto
      //responseType:'' // no se donde buscar, tampoco es necesario, esto se puede validar en el cliente 
      description: 'Error del servidor'
    }

  },


  fn: async function (inputs, exits) {


    var curso = await Curso.findOne({ id: inputs.cursoId }).populate('modulos')
      .intercept(
        (err) => {
          if (err && err.code === 'E_UNIQUE') {
            return this.res.statusCode=409;
          } else if (err && err.name === 'UsageError') {
            
            return this.res.badRequest(); //statusCode 400
          } else if (err) {
            
            return this.res.serverError(); //statusCode 500
          }
        }
      );
    if (!curso) { //no existe el objeto como tal
      return this.res.serverError('NO SE HA ENCONTRADO EL CURSO SOLICITADO');
    }

    return exits.success({ curso: curso });

  }


};
