parasails.registerPage('administrar-indice', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    tituloContenido: "ÍNDICE",
    descripcionObjeto: '',
    navegarAtras: '',
    navegarSiguiente: '',

    breadcrumb: [{ id: '', texto: 'indice', enlace: '/indice-estudiante' },
    ],

    editarNombre: false,

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


    eliminarDocumento() {
      var _this = this;
      axios.get('/eliminar-curso', {
        params: {
          cursoId: this.curso.id,
        }
      })
        .then(function (response) {
          location.replace("/administrar-home");
        })
        .catch(function (error) {
          alert('Error: consulte a soporte técnico');
        });

    },
  },
  computed: {
    noEsInforBasica() {
      //si el nombre del curso es "Alfabetización informática" entonces no se mostrará el botón eliminar, no se debe por ninguna razón eliminar el curso, en caso de hacerlo, se debe reiniciar el servidor para que se vuelva a crear el curso por defecto, aunque las páginas  html del contenido permanecerán siempre intactas
      let respuesta = this.curso.nombre != 'Alfabetización informática';
      return respuesta;
    },
  }
});
