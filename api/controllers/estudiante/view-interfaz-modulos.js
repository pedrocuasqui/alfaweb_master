module.exports = {


  friendlyName: 'View layout contenidos',


  description: 'Despliega el contenido del modulo seleccionado para los estudiantes',
  inputs: {
    objetoId: {
      type: 'string',
      required: true,
    },
    tipoContenido: {
      type: 'string',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/interfaz-modulos'
    }

  },


  fn: async function (inputs, exits) {
    var res = this.res;
    var req = this.req;
    var objetoSeleccionado;
    var curso = Object;
    var usuario = null;
    var usuario = { nombre: 'Visitante', rol: 'Estudiante', id: '1' };

    var navegarAtras = '';
    var navegarSiguiente = '';
    var moduloPadre = null;
    var ultimoIntentoEvaluacion = null;

    var intentoEvaluacion = { //intento por defecto se usa para los usuario no logueados o usuarios logueados por primera vez que aún no tienen interaccion con el aplicativo
      puntos: 0,
      nivel: 1,//modulo 1
      medalla: 'bebe', //medalla mas basica
      tiempoMaximoPorPregunta: 30, //en segundos por defecto
      evaluacion: null,
    };


    console.log('INGRESO A VIEW-INTERFAZ-MODULO');




    if (inputs.tipoContenido == 'Modulo') {
      objetoSeleccionado = await ModuloLibro.findOne({ id: inputs.objetoId });
      curso = await sails.helpers.solicitarCursoCompleto(inputs.objetoId).intercept((err) => { sails.log('ERROR EN HELPERS: ' + err) });
      //la propiedad nombre sirve para identificar indistintamente si es modulo o submodulo
      objetoSeleccionado.nombre = objetoSeleccionado.nombreModulo;

    } else if (inputs.tipoContenido == 'Submodulo') {
      // console.log('Objeto id submodulos'+inputs.objetoId);
      objetoSeleccionado = await SubmoduloLibro.findOne({ id: inputs.objetoId });
      curso = await sails.helpers.solicitarCursoCompleto(inputs.objetoId).intercept((err) => { sails.log('ERROR EN HELPERS: ' + err) });
      moduloPadre = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      // console.log('CURSOO:'+ JSON.stringify(curso));
      //la propiedad nombre sirve para identificar indistintamente si es modulo o submodulo
      objetoSeleccionado.nombre = objetoSeleccionado.nombreSubmodulo;
      objetoSeleccionado.color = moduloPadre.color;







    } else {
      return res.status(500).send({ problema: 'no se encontró el tipo de contenido' })
    }

    if (!objetoSeleccionado) { //si no se ha encontrado un modulo o submodulo con el id entregado se devuelve un mensaje de error
      var err = new Error();
      err.name = 'objetoNoEncontrado';
      err.message = 'El objeto no se encuentra en la base de datos';
      return res.status(500).send({ error: err });
    }

    //PREPARACION LINKS DE NAVEGACION ADELANTE Y ATRAS
    var arreglo = [];
    if (curso.modulos.length != 0) {
      //agrego modulos y submodulos en un mismo arreglo
      curso.modulos.forEach(modulo => {
        arreglo.push({ objetoId: modulo.id, tipoContenido: 'Modulo' })
        modulo.submodulos.forEach(submodulo => {
          arreglo.push({ objetoId: submodulo.id, tipoContenido: 'Submodulo' });
        });
      });

      //selecciono los elementos antes y despues del elemento que contiene al objeto seleccionado
      for (let i = 0; i <= arreglo.length - 1; i++) {
        if (arreglo[i].objetoId == objetoSeleccionado.id) {
          //si el objeto es el primero 
          if (i == 0) { // el anterior retorna al indice
            navegarAtras = '/indice-estudiante/?cursoId=' + curso.id;
            navegarSiguiente = '/interfaz-modulos/?objetoId=' + arreglo[i + 1].objetoId + '&tipoContenido=' + arreglo[i + 1].tipoContenido
          } else if (i == arreglo.length - 1) {
            navegarAtras = '/interfaz-modulos/?objetoId=' + arreglo[i - 1].objetoId + '&tipoContenido=' + arreglo[i - 1].tipoContenido
            navegarSiguiente = '/';
          }
          else {
            navegarAtras = '/interfaz-modulos/?objetoId=' + arreglo[i - 1].objetoId + '&tipoContenido=' + arreglo[i - 1].tipoContenido
            navegarSiguiente = '/interfaz-modulos/?objetoId=' + arreglo[i + 1].objetoId + '&tipoContenido=' + arreglo[i + 1].tipoContenido

          }

        }
      }
    }




    // usuario = await Estudiante.findOne({ alias: 'Pedroc' });
    if (req.session.userId) {
      usuario = await Estudiante.findOne({ id: req.session.userId });

      if (!usuario) {
        // exits.ok({ error: `no se encuentra el usuario con id ${req.session.userId}` });
        res.status(401).send({ message: 'su sesión ha expirado' });

      } else {

        let credenciales = { cursoId: curso.id, usuarioId: usuario.id }
        let avance = { tipoContenido: inputs.tipoContenido, objetoId: inputs.objetoId }
        // se guarda el avance
        await sails.helpers.registrarAvanceEstudiante(credenciales, avance);//la fecha de acceso es creada dentro 
        //se retorna el ultimo intento de evaluacion

      






      }
    } else { //si el usuario es el usuario Visitante se remite su información
      usuario = {
        id: 1,
        nombre: 'Visitante',
        rol: 'Estudiante'

      }
      // var cursos = await Curso.find();
      // usuario.cursos = cursos;
    }







    //siempre se aniade un intento evaluacion al usuario
    usuario.ultimoIntento = intentoEvaluacion;
    if (inputs.tipoContenido == 'Submodulo') {
      if (usuario.nombre != "Visitante") { //si existe un usuario logueado tipo estudiante
        //se buscan los documentos que contengan al id de usuario logueado y el submodulo seleccionado
        let intentoEv = null;
        intentoEv = await IntentoEvaluacion.find({ estudiante: usuario.id, submodulo: objetoSeleccionado.id }).sort('createdAt DESC');
        if (intentoEv) {//existe un intento evaluacion entonces se reemplaza el valor de usuario.ultimoIntento
          usuario.ultimoIntento = intentoEv[0]; //escogemos el elemento mas reciente
        } //caso contrario se mantiene el valor por defecto
        console.log('RETORNO DE INTENTO EVALUACION :');
        console.log(usuario.ultimoIntento);

      }
    }
 



    return exits.success({ curso, objetoSeleccionado, moduloPadre, usuario, navegarAtras, navegarSiguiente, ultimoIntentoEvaluacion });
    //el objeto moduloPadre solo contiene valores cuando el objeto seleccionado es SUBMODULO


  }


};
