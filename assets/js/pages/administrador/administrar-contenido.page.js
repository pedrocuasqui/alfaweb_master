
parasails.registerPage('administrar-contenido', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formErrors: {},
    objetoSeleccionado: Object,
    editarNombre: false,
    editarDescripcion: false,
    // nombre:'',
    descripcionModulo: '',
    navegarAtras: {
      type: String,
      required: false,
      description: 'la ruta del modulo anterior',
    },
    navegarSiguiente: {
      type: String,
      required: false,
      description: 'la ruta del modulo siguiente',
    },
    // breadcrumb: {
    //     type: Array,
    //     required: false,
    // },
    breadcrumb: [],
    curso: {
      type: Object,
    },
    usuario: {
      type: Object,
      default: { nombre: 'Admin', rol: 'Administrador' }
    },
    mostrarSpinner: false,
    imagenTemporal: {},


    tituloEvaluacion: '',
    evIndividualBandera: false,
    // codigoTipoEvaluacion:'Cuestionario',
    // mostrarMenuTipoEvaluacion:true,
    // **********************************OPCIONES DE EVALUACION
    tipoEvaluacion: 'Cuestionario',
    preguntaEnEdicion: {
      enunciado: null,
      opciones: {
        opcion1: null,
        opcion2: null,
        opcion3: null,
        opcion4: null,
      },
      respuesta: null,
    },
    preguntasCuestionario: [],
    evaluacion: {
      tipo: '',
      preguntas: {}
    },
    formErrorsModal: {},
    modalEdicion: false,
    indicePreguntaEditar: null,
    arregloRandom: [],


    //variables para usar en Emparejamiento del lado del Estudiante
    enunciadoSeleccionado: null,
    respuestaSeleccionada: null,
    preguntaSeleccionadaJuegoEmparejamiento: null,
    coloresPreguntasEmparejamiento: ['#F31885', '#F39318', '#B4F318', '#18F38F', '#18A7F3', '#9318F3', '#F318D8', '#823815', '#268215', '#158280', '#D52FE3', '#F31850', '#D218F3', '#1833F3', '#18E9F3', '#33F318', '#F3DF18']





  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado;
    this.curso = SAILS_LOCALS.curso;
    this.breadcrumb.push(SAILS_LOCALS.curso);

    if (this.objetoSeleccionado.nombreSubmodulo && this.objetoSeleccionado.evaluacion) { //solo se agregan estas opciones si es un submodulo
      this.tipoEvaluacion = this.objetoSeleccionado.evaluacion.tipo;
      this.preguntasCuestionario = [...this.objetoSeleccionado.evaluacion.preguntas];
      this.modalEdicion = true;
    }

  },
  mounted: async function () {
    // $('.contenido-tiny').html(this.objetoSeleccionado.contenidoTiny);
    this.establecerContenidoTiny();
    console.log('OBJETO RECIBIDO:');
    console.log(this.objetoSeleccionado);



    $('#modalCrearPregunta' + this.tipoEvaluacion).on('hide.bs.modal', function (e) {
      this.preguntaEnEdicion = {
        enunciado: null,
        opciones: {
          opcion1: null,
          opcion2: null,
          opcion3: null,
          opcion4: null,
        },
        respuesta: null,
      }
    });
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    validarFormulario() {
      console.log('valida formulario ');
      console.log('contenido tiny' + window.contenidoTiny);
      // Limpiar el objeto de almacenamiento de errores
      this.formErrors = {};
      //Valida que exista un nombre de modulo
      if (!this.objetoSeleccionado.nombre) {
        this.formErrors.nombre = true;
      }
      if (!this.objetoSeleccionado.descripcion) {
        this.formErrors.descripcion = true;
      }

      // if (Object.keys(this.imagenPortada).length == 0) {
      //   this.formErrors.imagenPortada = true;
      //   this.formErrors.typeFile = false;
      // } else {
      //   // Expresion regular que evalua si la imagen tiene cualquier tipo

      //   var regExpImage = new RegExp('image\.(jpg)|image\.(png)|image\.(jpeg)');

      //   if (!regExpImage.exec(this.imagenPortada.type)) {
      //     this.formErrors.typeFile = true;
      //   }
      // }

      this.objetoSeleccionado.contenidoTiny = window.contenidoTiny;
      if (!this.objetoSeleccionado.contenidoTiny) {
        this.formErrors.contenidoTiny = true;
      }
      alert('contenido tiny: ' + this.objetoSeleccionado.contenidoTiny);

      // SI EXISTE ALGUN ERROR SE RETORNA FALSE Y LA PAGINA SE REFRESCA SIN QUE SEA PERCEPTIBLE
      if (Object.keys(this.formErrors).length > 0) {
        alert('error, existen errores');
        console.log(this.formErrors);
        return false;
      }
      //SI LOS VALORES INGRESADOS SON CORRECTOS SE carga la imagen, en then se carga el resto de campos

      if (this.objetoSeleccionado.nombreModulo) {//si el objeto editado es modulo,  se envia a actualiar-modulo en el servidor
        this.actualizarModulo();
        alert('actualizar modulo');
      } else if (this.objetoSeleccionado.nombreSubmodulo) {  //si el objeto editado es submodulo, se envia a actualizar-submodulo en el servidor
        alert('actualizar submodulo');
        this.actualizarSubmodulo();
      }


    },

    actualizarModulo() {
      var formData = new FormData();

      //valor quemado, establecer el verdadero valor de color 
      // this.objetoSeleccionado.color= '#529674';

      formData.append('nombreModulo', this.objetoSeleccionado.nombre);
      formData.append('descripcionModulo', this.objetoSeleccionado.descripcion);
      formData.append('contenidoTiny', window.contenidoTiny);
      formData.append('moduloId', this.objetoSeleccionado.id);
      formData.append('color', this.objetoSeleccionado.color);
      formData.append('rutaPortada', this.objetoSeleccionado.multimedia.imagen);
      // no se envia el id del curso 
      axios({
        method: 'post',
        url: '/actualizar-modulo',
        data: formData
      }
      ).then(
        (response) => {
          alert('Modificacion Exitosa');
          this.editarNombre = false;
          this.editarDescripcion = false;
        }
      ).catch((err) => {
        alert(err);
      });
    },
    actualizarSubmodulo() {
      var formData = new FormData();

      formData.append('nombreSubmodulo', this.objetoSeleccionado.nombre);
      formData.append('descripcionSubmodulo', this.objetoSeleccionado.descripcion);
      formData.append('contenidoTiny', window.contenidoTiny);
      formData.append('submoduloId', this.objetoSeleccionado.id);
      formData.append('color', this.objetoSeleccionado.color);
      // formData.append('rutaPortada',);
      // no se envia el id del curso 
      axios({
        method: 'post',
        url: '/actualizar-submodulo',
        data: formData
      }
      ).then(
        (response) => {
          alert('Modificacion Exitosa');
          this.editarNombre = false;
          this.editarDescripcion = false;
        }
      ).catch((err) => {
        alert(err);
      });
    },

    actualizarNombre() {
      //si todo sale bien ocultar la caja de texto
      this.editarNombre = false;
    },
    mostrarEditarNombre() {
      // establece la variable this.editarNombre en true para habilitar el input nombre
      this.editarNombre = true;
    },
    actualizarDescripcion() {
      this.editarDescripcion = false;
    },
    mostrarEditarDescripcion() {
      this.editarDescripcion = true;
    },
    eliminarDocumento() {
      var _this = this;
      axios.get('/eliminar-contenido', {
        params: {
          id: _this.objetoSeleccionado.id,
        }
      })
        .then(function (response) {
          console.log(response.data);
          alert('Objeto eliminado correctamente');
          if (response.data.nombreModulo) { //si el objeto eliminado es un modulo entonces se muestra la interfaz crear modulo
            window.location.replace('/view-crear-modulo/?cursoId=' + _this.curso.id);
          } else { // si el objeto eliminado es un submodulo entonces se redirge a la interfaz del modulo padre
            window.location.replace('/administrar-contenido/?objetoId=' + _this.objetoSeleccionado.modulo + '&tipoContenido=Modulo');
          }

        })
        .catch(function (error) {
          console.log('error al eliminar');
          console.log(error);
        });


    },
    establecerContenidoTiny() {
      window.contenidoTiny = null;// se establece el contenido
      window.contenidoTiny = this.objetoSeleccionado.contenidoTiny;

    },
    onFileSelected(event) {//guarda el archivo seleccionado por el explorador de windows en un arreglo de imágenes.

      //Añadir las propiedades del objeto seleccionado a la variable imagenPortada

      this.imagenTemporal = event.target.files[0];
      this.mostrarSpinner = true;

      this.guardarImagenPortada()

    },
    guardarImagenPortada() {
      var _this = this;
      const formData = new FormData();
      formData.append('multimedia', this.imagenTemporal, this.imagenTemporal.name);
      axios({
        method: 'post',
        url: '/cargar-imagen',
        data: formData
      })
        .then(
          (response) => {
            console.log(response.data);
            // _this.objetoSeleccionado.multimedia.imagen = response.data.location;
            setTimeout(() => {
              _this.objetoSeleccionado.multimedia.imagen = response.data.location;
              _this.mostrarSpinner = false;
            }, 7000);
          }
        )
        .catch(
          (err) => {
            console.log('Error encontrado:\n' + err);

          }
        );
    },
    evaluacionIndividual(contenido) { //funcion recibida del componente modulo-contenedor-curso
      if (contenido == 'contenido') {
        this.tituloEvaluacion = this.objetoSeleccionado.nombre;
        this.evIndividualBandera = false;
      } else {
        this.tituloEvaluacion = this.objetoSeleccionado.nombre;
        this.evIndividualBandera = true;
      }
    },
    mostrarTipoEvaluacion(codigo) {

      this.tipoEvaluacion = codigo;
      // this.codigoTipoEvaluacion = codigo;
    },
    clickMostrarModalCreaPregunta() {
      let nombreModal = this.tipoEvaluacion;
      $(function () {
        $('#modalCrearPregunta' + nombreModal).modal('show');
      });
    },
    insertarPreguntaCuestionario() {

      if (!this.preguntaEnEdicion.enunciado) {
        this.formErrorsModal.enunciado = true;
        alert('Ingrese un enunciado');
      }
      if (this.opcionesRespuesta(this.preguntaEnEdicion).length < 2) {
        this.formErrorsModal.opciones = true;
        alert('Registre al menos dos opciones');
      }
      if (!this.preguntaEnEdicion.respuesta) {
        this.formErrorsModal.respuesta = true;
        alert('Seleccione una respuesta');
      }

      if (Object.keys(this.formErrorsModal).length == 0) {
        this.preguntasCuestionario.push(this.preguntaEnEdicion)
        this.preguntaEnEdicion = {
          enunciado: null,
          opciones: {
            opcion1: null,
            opcion2: null,
            opcion3: null,
            opcion4: null,
          },
          respuesta: null,
        }
      };

      this.formErrorsModal = {};

    },
    actualizarPreguntaCuestionario() {
      if (!this.preguntaEnEdicion.enunciado) {
        this.formErrorsModal.enunciado = true;
        alert('Ingrese un enunciado');
      }
      if (this.opcionesRespuesta(this.preguntaEnEdicion).length < 2) {
        this.formErrorsModal.opciones = true;
        alert('Registre al menos dos opciones');
      }
      if (!this.preguntaEnEdicion.respuesta) {
        this.formErrorsModal.respuesta = true;
        alert('Seleccione una respuesta');
      }

      if (Object.keys(this.formErrorsModal).length == 0) {
        //actualiza el contenido del arreglo de preguntas, remueve el elemento de la  posicion del la pregunta que se edita (indicePreguntaEditar) y se coloca la nueva pregunta editada (preguntaEnEdicion).
        this.preguntasCuestionario.splice(this.indicePreguntaEditar, 1, this.preguntaEnEdicion);
        this.preguntaEnEdicion = {
          enunciado: null,
          opciones: {
            opcion1: null,
            opcion2: null,
            opcion3: null,
            opcion4: null,
          },
          respuesta: null,
        }

      };
      this.modalEdicion = false;
      this.indicePreguntaEditar = null;
      this.formErrorsModal = {};
    },
    mostrarEditarPreguntaCuestionario(preguntaSelected, indice) {
      this.indicePreguntaEditar = indice;
      this.preguntaEnEdicion = preguntaSelected;
      this.modalEdicion = true;
      $(function () {
        $('#modalCrearPreguntaCuestionario').modal('show');
      });
    },
    eliminarPreguntaCuestionario(preguntaSelected, indice) {

      this.preguntasCuestionario.splice(indice, 1);
    },
    opcionesRespuesta(preguntaEnEdicion) { //Se construye una respuesta como objeto
      let opciones = [];
      let contador = 0;
      for (let opcion in preguntaEnEdicion.opciones) { //obtiene los nombres de atributos: opcion1, opcion 2 ...
        contador += 1;
        if (preguntaEnEdicion.opciones[opcion]) { //si la opcion tiene un valor dentro
          opciones.push({ texto: preguntaEnEdicion.opciones[opcion], id: contador });
        }
      }
      return opciones;
    },
    validarEvaluacion() {


      this.formErrors = {};
      //vALIDA QUE TODAS LAS PREGUNTAS TENGA OPCIONES, ESTA VALIDACION FUNCIONA CUANDO SE CAMBIA EL TIPO DE EVALUACION DE "EMPAREJAMIENTO" A "CUESTIONARIO"
      if (this.tipoEvaluacion == "Cuestionario") {
        var indice = 0; //contador de posiciones
        var indicesConError = []; //guarda la posicion de la pregunta con error
        this.preguntasCuestionario.forEach(pregunta => {
          //recorrer todas las opciones de respuesta de la pregunta
          
          let opcionesEnNull = 0; //acumula las opciones en null de la pregunta actual
          pregunta.opciones.forEach(opcion => {

            if (!opcion) { //la opcion es null
              opcionesEnNull += 1; //acumula el conteo de opciones null en la pregunta
            }
          });
          if (opcionesEnNull != 0) {
            indicesConError.push(indice);
          }
          indice += 1; //la posicion incrementa en uno
        });
      }


      if (indicesConError.length >0) {
        this.formErrors.opciones = true;
        alert('Las preguntas: '+ JSON.stringify(indicesConError)+ 'no tienen opciones de respuesta');
      }



      if (Object.keys(this.formErrors).length == 0) {
        this.guardarEvaluacion();
      } else {
        alert('!Aún existen errores por corregir' + JSON.stringify(this.formErrors));
      }

      this.formErrors = {};

    },
    guardarEvaluacion() {
      this.evaluacion.tipo = this.tipoEvaluacion; //el tipo de evaluacion en la base será el tipo de evaluacion seleccionado

      if (this.tipoEvaluacion == "Cuestionario" || this.tipoEvaluacion == "Emparejamiento") {
        this.evaluacion.preguntas = this.preguntasCuestionario;
      }



      const formDataEv = new FormData();
      formDataEv.append('objetoId', this.objetoSeleccionado.id);
      formDataEv.append('evaluacion', JSON.stringify(this.evaluacion));
      axios({
        url: '/crear-evaluacion',
        method: 'post',
        data: formDataEv
      })
        .then((response) => {
          alert('Evaluación creada correctamente')

        })
        .catch((err) => {
          alert('Error no se puedo crear la evaluación:\n' + err)
        });
    },



    //emparejamiento
    mostrarEditarPreguntaEmparejar(pregunta, indexPreg) {
      this.indicePreguntaEditar = indexPreg;
      this.preguntaEnEdicion = pregunta;
      this.modalEdicion = true;
      $(function () {
        $('#modalCrearPreguntaEmparejamiento').modal('show');
      });
    },
    eliminarPreguntaEmparejar(pregunta, indice) {
      this.preguntasCuestionario.splice(indice, 1);
    },
    actualizarPreguntaEmparejamiento() {
      if (!this.preguntaEnEdicion.enunciado) {
        this.formErrorsModal.enunciado = true;
        alert('Ingrese un enunciado');
      }

      if (!this.preguntaEnEdicion.respuesta) {
        this.formErrorsModal.respuesta = true;
        alert('Seleccione una respuesta');
      }

      if (Object.keys(this.formErrorsModal).length == 0) {
        //actualiza el contenido del arreglo de preguntas, remueve el elemento de la  posicion del la pregunta que se edita (indicePreguntaEditar) y se coloca la nueva pregunta editada (preguntaEnEdicion).
        this.preguntasCuestionario.splice(this.indicePreguntaEditar, 1, this.preguntaEnEdicion);
        this.preguntaEnEdicion = {
          enunciado: null,
          opciones: {
            opcion1: null,
            opcion2: null,
            opcion3: null,
            opcion4: null,
          },
          respuesta: null,
        }

      };
      this.modalEdicion = false;
      this.indicePreguntaEditar = null;
      this.formErrorsModal = {};
    },
    insertarPreguntaEmparejamiento() {
      if (!this.preguntaEnEdicion.enunciado) {
        this.formErrorsModal.enunciado = true;
        alert('Ingrese un enunciado');
      }

      if (!this.preguntaEnEdicion.respuesta) {
        this.formErrorsModal.respuesta = true;
        alert('Ingrese una respuesta');
      }

      if (Object.keys(this.formErrorsModal).length == 0) {
        this.preguntasCuestionario.push(this.preguntaEnEdicion)
        this.preguntaEnEdicion = {
          enunciado: null,
          opciones: {
            opcion1: null,
            opcion2: null,
            opcion3: null,
            opcion4: null,
          },
          respuesta: null,
        }
        //quito colores si es que ya hay colores
        for (let i = 0; i <= this.preguntasCuestionario.length - 1; i++) {
          $("#Preg" + i).css("background-color", '');
          $("#Resp" + i).css("background-color", '');
        }

        this.randomPreguntasCuestionario(); //randomizo las opciones de respuesta
      };

      this.formErrorsModal = {};
    },
    randomPreguntasCuestionario() {
      //

      this.arregloRandom = [];

      this.preguntasCuestionario.forEach((pregunta) => {

        let posicionAleatorio = Math.floor(Math.random() * 10); //numero aleatorio entre 0 y 10(cualquier valor entero)
        let modulo = posicionAleatorio % 2;
        if (modulo == 0) {
          this.arregloRandom.unshift(pregunta);
        } else {
          this.arregloRandom.push(pregunta);
        }
      })
      console.log(this.arregloRandom);

      // return arregloRandom;
    },
    /**
     * 
     * @param {Object} pregunta la pregunta seleccionada en la evaluacion de tipo emparejamiento
     * @param {string | int} indexPreg el indice al que corresponde dentro del arreglo this.preguntasCuestionario
     */
    seleccionarEnunciadoEmpareja(pregunta, indexPreg) {
      this.enunciadoSeleccionado = indexPreg; //aplica el estilo al enunciado seleccionado
      // pregunta.color=this.coloresPreguntasEmparejamiento[indexPreg];

      this.preguntaSeleccionadaJuegoEmparejamiento = pregunta; //mantiene esta pregunta para poder comparar con la respuesta que luego seleccione
    },
    /**
     * 
     * @param {Object} pregunta Objeto pregunta de la respuesta seleccionada para poder comparar con el enunciado
     * @param {string | int} indexResp indice de la respuesta dentro del arreglo this.arregloRandom
     */
    seleccionarRespuestaEmpareja(pregunta, indexResp) {
      if (this.preguntaSeleccionadaJuegoEmparejamiento) {
        if (pregunta.respuesta == this.preguntaSeleccionadaJuegoEmparejamiento.respuesta) {
          this.respuestaSeleccionada = indexResp;// esto aplica el estilo a la respuesta seleccionada correctamente
          $("#Resp" + indexResp).css({ "background-color": this.coloresPreguntasEmparejamiento[indexResp], "border-radius": '10px' });
          $("#Preg" + this.enunciadoSeleccionado).css({ "background-color": this.coloresPreguntasEmparejamiento[indexResp], "border-radius": '10px' });
        }
      }

    },





  },
  computed: {
    computedErrorImagen() {
      let error = this.formErrors.imagenPortada || this.formErrors.typeFile;
      return error
    },


  }
});
