parasails.registerPage('homepage', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // nombreUsuario: 'Pedro',
    usuario: {
      nombre: 'Visitante',
      rol: 'Estudiante',
      id: '1'
    },
    breadcrumb: [{ nombre: '' }] //se envia un nombre vacio para evaluar si es o no un breadcrumb valido y  segun eso mostrar o no el bredadcrumb
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    if (SAILS_LOCALS.usuario) {
      this.usuario = SAILS_LOCALS.usuario;
    }

  },
  mounted: async function () {
    //…
    console.log('USUARIO ....');
    console.log(this.usuario);
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    redireccionar() {

    },
    abrirCurso(cursoId) {
      if (this.usuario) {
        if (this.usuario.administrador || this.usuario.tutor) {
          window.location.href = '/administrar-indice/?cursoId=' + cursoId;
        }
      }

      //else implicito
      window.location.href = '/indice-estudiante/?cursoId=' + cursoId;


    },
  },
  computed: {

  }
});
