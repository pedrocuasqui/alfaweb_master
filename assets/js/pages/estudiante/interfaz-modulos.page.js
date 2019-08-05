parasails.registerPage('interfaz-modulos', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    breadcrumb: [],
    navegarSiguiente: '',
    navegarAtras: '',
    tituloEvaluacion: '',
    evIndividual: false,
    mostrarIconoRepetir: false,//se establece en true cuando se termina la evaluación
    progreso: {} //puntos, niveles y medalla actuales
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    if (SAILS_LOCALS.objetoSeleccionado) {
      if (SAILS_LOCALS.objetoSeleccionado.nombreSubmodulo) {
        this.breadcrumb.push(SAILS_LOCALS.curso);
        this.breadcrumb.push(SAILS_LOCALS.moduloPadre);
        this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);

      } else { //entonces el objeto es un MODULO
        this.breadcrumb.push(SAILS_LOCALS.curso);
        this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
      }
    }

    this.navegarSiguiente = SAILS_LOCALS.navegarSiguiente;
    this.navegarAtras = SAILS_LOCALS.navegarAtras;



    this.progreso.puntos = SAILS_LOCALS.usuario.ultimoIntento.puntos;
    this.progreso.nivel = SAILS_LOCALS.usuario.ultimoIntento.nivel;
    this.progreso.medalla = SAILS_LOCALS.usuario.ultimoIntento.medalla;
    this.progreso.porcentajeAvance = (SAILS_LOCALS.usuario.submodulosAprobadosPorCurso.length / SAILS_LOCALS.usuario.numeroSubmodulosCurso) * 100;
    this.progreso.totalNiveles = SAILS_LOCALS.usuario.numeroSubmodulosCurso;
  },
  mounted: async function () {
    //… definir el breadcrumb en este lugar o recibir desde la accion del servidor

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    evaluacionIndividual(contenido) { //funcion recibida del componente modulo-contenedor-curso

      if (contenido == 'contenido') {
        this.tituloEvaluacion = this.objetoSeleccionado.nombre;
        this.evIndividual = false;
      } else {
        this.tituloEvaluacion = this.objetoSeleccionado.nombre;
        this.evIndividual = true;
      }

    },
    finalizaEvaluacion(valor) {

      this.mostrarIconoRepetir = valor; //true o false
    },
    /**
     * LLamado desde modulo-contenedor-curso cuando se pulse el icono de repetir la evaluacion
     */
    intentarNuevamente() {

      this.$refs.componenteEvaluacion.intentarNuevamente();

    },
    actualizaProgreso(progresoActual) {
      this.progreso = progresoActual;
      console.log('PROGRESO ACTUAL');
      console.log(progresoActual);
    }
  }
});
