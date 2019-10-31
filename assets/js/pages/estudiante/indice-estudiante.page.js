parasails.registerPage('indice-estudiante', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    tituloContenido: "Seleccione un módulo del curso o pulsa el icono de avanzar",
    descripcionObjeto: '',
    navegarAtras: '/',
    navegarSiguiente: '/contenido-alfaweb/?enlace=/m1-computadora',

    breadcrumb: [{ id: '', texto: 'indice', enlace: '/indice-estudiante' },
    ],
    usuario: { nombre: 'Visitante', rol: 'Estudiante', id: '1' },
    contenidos: null,
    isAlfaWeb: false,
    cursoEstudiante: false,
    progreso: {} //puntos, niveles y medalla actuales

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.usuario = SAILS_LOCALS.usuario;
    this.contenidos = SAILS_LOCALS.contenidos;
    this.curso = SAILS_LOCALS.curso;
    if (SAILS_LOCALS.cursoEstudiante) {
      this.cursoEstudiante = SAILS_LOCALS.cursoEstudiante;
    }




    this.progreso.puntos = SAILS_LOCALS.usuario.ultimoIntento.puntos;
    this.progreso.nivel = SAILS_LOCALS.usuario.ultimoIntento.nivel;
    this.progreso.medalla = SAILS_LOCALS.usuario.ultimoIntento.medalla;
    this.progreso.porcentajeAvance = (SAILS_LOCALS.usuario.submodulosAprobadosPorCurso.length / SAILS_LOCALS.usuario.numeroSubmodulosCurso) * 100;
    this.progreso.totalNiveles = SAILS_LOCALS.usuario.numeroSubmodulosCurso;

  },
  mounted: async function () {
    if (this.curso.nombre == 'Alfabetización informática') {
      //el primer elemento siempre sera el curso, por tanto se verifica si el curso es alfabetizacion informatica
      this.isAlfaWeb = true;
    }

    introJs().start();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
  },
  computed: {
    contenidoVacio() {
      let contenidoEsVacio = false;
      if (this.contenidos.length == 0) {
        contenidoEsVacio = true;
      }
    
      return contenidoEsVacio;
    },
    existeCursoEstudianteyLogueado() {
      let existe = false;
      if (this.cursoEstudiante && this.usuario.nombre != 'Visitante') {
        existe = true;
        
      }
      

      return existe;
    },
    noExisteCursoEstudianteyLogueado() {
      let existe = false;
      if (!this.cursoEstudiante && this.usuario.nombre != 'Visitante') {
        existe = true;
        ß

      }

      return existe;
    }

  }
});
