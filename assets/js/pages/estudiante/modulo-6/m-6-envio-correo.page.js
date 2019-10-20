parasails.registerPage('m-6-envio-correo', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    breadcrumb: [],

    usuario: Object,
    navegarSiguiente: '',
    navegarAtras: '',
    tituloEvaluacion: '',
    evIndividual: false,
    objetoSeleccionado: '',

    mouseX: 0,
    mouseY: 0,
    mostrarToolTip: false,
    textoToolTip: {
      type: String,
      default: "software"
    },
    mostrarIconoRepetir: false,//se establece en true cuando se termina la evaluación, se modifica desde el componente raiz
    progreso: {} //puntos, niveles y medalla actuales



    // elemento:{
    //   nombre:'', 
    //   detalle:'', 
    //   leerMas:'', 
    //   imgs:[

    //       {
    //         src:'',
    //         alt:''
    //         } ,

    //       ]
    // } 

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.usuario = SAILS_LOCALS.usuario;
    this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado;
    this.navegarSiguiente = '/contenido-alfaweb/?enlace=' + SAILS_LOCALS.siguiente.enlace;
    this.navegarAtras = '/contenido-alfaweb/?enlace=' + SAILS_LOCALS.anterior.enlace;
    this.breadcrumb.push(SAILS_LOCALS.curso);
    this.breadcrumb.push(SAILS_LOCALS.modulo);
    this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
    if(SAILS_LOCALS.mostrarEvaluacion){
      this.evaluacionIndividual('evaluacion');
    }
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    /**
  * LLamado desde modulo-contenedor-curso cuando se pulse el icono de repetir la evaluacion
  */
    intentarNuevamente() {

      this.$refs.componenteEvaluacion.intentarNuevamente();

    },
    clickMostrarPista() {
      if (this.evIndividual) {
        this.$refs.componenteEvaluacion.mostrarPista();
      }

    },
    
    finalizaEvaluacion(valor) {

      this.mostrarIconoRepetir = valor; //true o false
    },

    actualizaProgreso(progresoActual) {
      this.progreso = progresoActual;
      
    },


    
    evaluacionIndividual(contenido) { //funcion recibida del componente modulo-contenedor-curso
      if (contenido == 'contenido') {
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = false;
      } else {
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = true;
      }
    },



  },
  computed: {

  }
});
