parasails.registerPage('crear-submodulo', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formData: {
      nombre: '',
      descripcion: '',
      tecnicaAprendizaje: '',
      files: []
    },
    seleccionMultimedia: false,
    seleccionCarrusel: false,
    seleccionMapa: false,
    seleccionTipoAprendizaje: false,
    selectedFiles: [],
    selectedFileTooltip: '',
    selectedFileDescripcion: '',
    nuevoArchivo: {
      urlLocal: null,
    },
    indice:null

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    //…

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝

  methods: {
    validarFormulario(e) {
      // solo se ejecutará cuando se pulse el botón submit

    },
    onSeleccionMultimedia() {
      this.seleccionMultimedia = true;
      this.seleccionTipoAprendizaje = true;
      this.seleccionCarrusel = false;
      this.seleccionMapa = false;
    },
    onSeleccionCarrusel() {
      this.seleccionCarrusel = true;
      this.seleccionTipoAprendizaje = true;
      this.seleccionMultimedia = false;
      this.seleccionMapa = false;
    },
    onSeleccionMapa() {
      this.seleccionMapa = true;
      this.seleccionTipoAprendizaje = true;
      this.seleccionCarrusel = false;
      this.seleccionMultimedia = false;
    },
    guardarArchivo() {
      this.nuevoArchivo.tooltip = this.selectedFileTooltip;
      this.nuevoArchivo.descripcion = this.selectedFileDescripcion;
      //agrego el archivo nuevo al arreglo de archivos del submodulo
      this.selectedFiles.push(this.nuevoArchivo);
      // this.selectedFiles[0].toltip='tooltip de la imagen';
      console.log(this.selectedFiles);

      this.nuevoArchivo = {
        urlLocal: null,
        tooltip: '',
        descripcion: ''
      }
      this.selectedFileTooltip = '';
      this.selectedFileDescripcion = '';
    },
    onFileSelected(event) {//guarda el archivo seleccionado por el explorador de windows en un arreglo de imágenes.
      if (this.seleccionMultimedia) {
        //Si se escoge "Video,  imagen o animación" se borrará el anterior contenido de selectedFiles ya que solo se permite guardar un solo archivo en esta técnica de aprendizaje
        this.selectedFiles = [];

      }

      // console.log(event.target.files[0]);

      //Añadir las propiedades del objeto seleccionado
      this.nuevoArchivo = event.target.files[0];
      this.nuevoArchivo.urlLocal = URL.createObjectURL(event.target.files[0]);//Visualizar en el navegador la imagen seleccionada

    },
    onBorrarImagen(index) {

      if (!index) {
        //si no se envía un índice, es porque se est'a llamando a la funci'on desde el modal
        this.nuevoArchivo = {};
      } else {
        this.selectedFiles.splice(index, 1);
      }


    },
    onCambiarTecnicaAprendizaje() {
      this.seleccionTipoAprendizaje = false;
      this.seleccionMultimedia = false;
      this.seleccionCarrusel = false;
      this.seleccionMapa = false;
      // al pasar de carrusel o mapa a multimedia, solo se conservará el primer elemento del arreglo
    },
    obtenerIndice(){
      this.indice=$('#carouselImagenes .active').index();
      console.log("indice"+this.indice);
    }
  },
  computed: {
    mapaCarrusel() {
      let valor = this.seleccionMapa || this.seleccionCarrusel;
      return valor;
    },
    ultimaUrlLocal() {
      if (this.selectedFiles.length > 0) {
        let ultimaPosicion = this.selectedFiles.length - 1;
        let file = this.selectedFiles[ultimaPosicion];
        return file.urlLocal;
      }

      return '';

    }
  },
});
