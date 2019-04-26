parasails.registerPage('administrar-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    breadcrumb: [{ id: '', texto: 'indice', enlace: '#' },  ],
    // cursos:Object, //esta variable será sobreescrita con el contenido de Windows.SAILS_LOCALS.cursos //vue no reconoce la variable cuando no está declarada
    cursoEliminar:{
      nombre:'',
      id:''
    },
    cursos: Object,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    // console.log(window.SAILS_LOCALS);
    this.cursos=SAILS_LOCALS.cursos;
  },
  mounted: async function() {
    console.log(this.cursos);
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    seleccionaCursoEliminar(curso){
      this.cursoEliminar=curso;
    },
    eliminarDocumento(){
      var _this=this;
      axios.get('/eliminar-curso', {
        params: {
          cursoId: this.cursoEliminar.id,
        }
      })
      .then(function (response) {
        console.log("respuesta de eliminacion\n"+response);          
        _this.consultarCursos();
      })
      .catch(function (error) {
        console.log(error);
      });

    },

    consultarCursos(){
      var _this=this;
      axios.get('/consulta-cursos') //llamada a la ruta curso por defecto
      .then(function (response) {
        console.log('archivos encontrados');
        _this.cursos=response.data;
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
});
