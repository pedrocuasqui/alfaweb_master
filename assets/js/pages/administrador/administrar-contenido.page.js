parasails.registerPage('administrar-contenido', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formErrors:{},
    objetoSeleccionado:Object,
    editarNombre:false,
    editarDescripcion:false,
    nombreModulo:'',
    descripcionModulo:'',
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
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.objetoSeleccionado=SAILS_LOCALS.objetoSeleccionado;
    this.curso= SAILS_LOCALS.curso;
    this.breadcrumb.push(SAILS_LOCALS.curso);
  },
  mounted: async function() {
// $('.contenido-tiny').html(this.objetoSeleccionado.contenidoTiny);
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    validarFormulario(){

    },
    actualizarContenido(){
      // enviar la solicitud post a la ruta /actualizar-contenido pasandole como parámetro todo el objeto

      //si todo sale bien ocultar la caja de texto
      this.editarNombre= true;
    },
    mostrarEditarNombre(){
      // establece la variable this.editarNombre en true para habilitar el input nombre
      this.editarNombre= true;
    }
  }
});
