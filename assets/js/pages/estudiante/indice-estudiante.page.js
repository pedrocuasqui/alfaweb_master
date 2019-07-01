parasails.registerPage('indice-estudiante', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    tituloContenido: "ÍNDICE",
    descripcionObjeto: '',
    navegarAtras: '/',
    navegarSiguiente: '/m1-computadora',

    breadcrumb: [{ id: '', texto: 'indice', enlace: '/indice-estudiante' },
    ],
    usuario: { nombre: 'Visitante', rol: 'Estudiante', id: '1' },
    contenidos: null,
    isAlfaWeb: false,
    cursoEstudiante:false,

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
    if(SAILS_LOCALS.cursoEstudiante){
      this.cursoEstudiante=SAILS_LOCALS.cursoEstudiante;
    }
    console.log('CURSO ESTUDIANTE');
    console.log(SAILS_LOCALS.cursoEstudiante);
    


  },
  mounted: async function () {
    if (this.curso.nombre == 'Alfabetizacion informática') {
      //el primer elemento siempre sera el curso, por tanto se verifica si el curso es alfabetizacion informatica
      this.isAlfaWeb = true;
    }

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
      console.log(this.contenidos.length);
      return contenidoEsVacio;
    },
    existeCursoEstudianteyLogueado(){
      let existe=false;
      if(this.cursoEstudiante && this.usuario){
        existe=true;
      }

      return existe;
    },
    noExisteCursoEstudianteyLogueado(){
      let existe=false;
      if(!this.cursoEstudiante && this.usuario){
        existe=true;
      }

      return existe;
    }

  }
});
