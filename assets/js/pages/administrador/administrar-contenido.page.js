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


  },
  mounted: async function () {
    // $('.contenido-tiny').html(this.objetoSeleccionado.contenidoTiny);
    this.establecerContenidoTiny();
    console.log('OBJETO RECIBIDO:');
    console.log(this.objetoSeleccionado);

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

  },
  computed: {
    computedErrorImagen() {
      let error = this.formErrors.imagenPortada || this.formErrors.typeFile;
      return error
    },
  }
});
