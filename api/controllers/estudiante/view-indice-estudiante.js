module.exports = {


  friendlyName: 'View indice estudiante',


  description: 'Display "Indice estudiante" page.',

  inputs: {
    // usuarioId: { //el usuario ya no es necesario porque se usa el valor de req.session.userId
    //   type: 'string',
    //   required: true
    // }, 
    cursoId: {
      type: 'string',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/indice-estudiante'
    },
    serverError: {
      statusCode: 400,
      description: 'El usuario ha sido eliminado de la base de datos'
    }

  },


  fn: async function (inputs, exits) {

    var req = this.req;
    var res = this.res;
    //solo para pruebas se usa la Colecion estudiante 
    var usuario = null;
    var cursoEstudiante = null;
    var navegarAtras = '/';
    var navegarSiguiente = '';

    //Evaluación si existe usuario logueado 
    if (req.session.userId) { //CUANDO EXPIRA LA SESION YA NO INGRESA AQUI

      usuario = await Estudiante.findOne({ id: req.session.userId });
      if (!usuario) {

        // res.status(401).send({ 'Error': 'SU SESIÓN HA EXPIRADO' });
        res.status(401).send({ 'error': 'NO SE ENCUENTRA EL USUARIO' });

      }



      cursoEstudiante = await CursoEstudiantes.findOne({ curso_matriculados: inputs.cursoId, estudiante_cursos: usuario.id });
      if (cursoEstudiante) {
        console.log('existe curso Estudiante');
        console.log(cursoEstudiante);
        if (cursoEstudiante.avance) {
          var ultimoTema = null; //para almacenar el nombre del ultimo tema
          if (cursoEstudiante.avance.enlace) { //es alfaweb, entonces busco por enlace

            ultimoTema = await ModuloLibro.findOne({ enlace: cursoEstudiante.avance.enlace });
            if (!ultimoTema) {
              ultimoTema = await SubmoduloLibro.findOne({ enlace: cursoEstudiante.avance.enlace });
            }

          } else {// es otro curso , entonces busco por id

            ultimoTema = await ModuloLibro.findOne({ id: cursoEstudiante.avance.objetoId });
            if (!ultimoTema) {
              ultimoTema = await SubmoduloLibro.findOne({ id: cursoEstudiante.avance.objetoId });
            }

          }
          if (ultimoTema.nombreModulo) {
            cursoEstudiante.nombre = ultimoTema.nombreModulo;
          } else {
            cursoEstudiante.nombre = ultimoTema.nombreSubmodulo;
          }


        }


      }


    }

    /* var moduloLibro = await ModuloLibro.find(); //esta es una instancia de consulta --> es un intento aún no cumplido de obtener registros de la base de datos
        //el resultado solo se observa cuando se usa la palabra await antes de la instancia y se asigna a una variable
        console.log('metodo1:\n'+moduloLibro); //devuelve el arreglo completo --> [object Object]
        console.log('metodo2:\n'+moduloLibro[0]);// devuelve el objeto JSON de la posision 0 --> [object Object]
        console.log('metodo3:\n'+JSON.stringify(moduloLibro)); //usar JSON.stringify para ver el resultado en consola en formato JSON, JSON.parse muestra un error
     */
    var curso = await Curso.findOne({ id: inputs.cursoId }).populate('modulos');
    // console.log('Curso\n'+ JSON.stringify(curso) );
    // console.log('Curso:'+curso[0].nombre+'- modulos:\n'+ JSON.stringify(curso[0].modulos));
    console.log('MODULOS');
    console.log(curso.modulos);
    console.log(curso.modulos.lenght);
    var contenidos = curso.modulos;
    if (curso.modulos.length != 0) {
      navegarSiguiente = '/interfaz-modulos/?objetoId=' + curso.modulos[0].id + '&tipoContenido=Modulo'
    } else {
      navegarSiguiente = '/indice-estudiante/?cursoId=' + curso.id;
    }

    return exits.success({
      contenidos,
      usuario,
      curso,
      cursoEstudiante,
      navegarAtras,
      navegarSiguiente
      // cuando el nombre de la propiedad es igual al nombre del objeto que contiene la información, es posible enviar solo un dato es decir que, pasar, contenidos: contenidos es igual que pasar contenidos
    });


  }


};
