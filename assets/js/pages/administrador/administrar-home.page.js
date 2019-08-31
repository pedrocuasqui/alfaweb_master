parasails.registerPage('administrar-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    breadcrumb: [{ id: '', texto: 'indice', enlace: '#' },],
    // cursos:Object, //esta variable será sobreescrita con el contenido de Windows.SAILS_LOCALS.cursos //vue no reconoce la variable cuando no está declarada
    cursoEliminar: {
      nombre: '',
      id: ''
    },

    editarCurso: false,
    formErrors: {},
    cursos: Object,
    estudiantes: null,
    usuario: null,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.cursos = SAILS_LOCALS.cursos;
    this.estudiantes = SAILS_LOCALS.estudiantes;
    this.usuario = SAILS_LOCALS.usuario;
  },
  mounted: async function () {

    // this.asignarEventoClick();



  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    asignarEventoClick() {

      var _this = this;
      this.cursos.forEach(element => {
        document.getElementById(element.id).addEventListener("click", abrir = function () { _this.abrirCurso(element.id); }, false);
      })


      // elementosBtn.forEach(elemento =>{
      //   elemento.addEventListener("click", this.abrirCurso);
      // });

    },
    seleccionaCursoEliminar(curso) {

      this.cursoEliminar = curso;
      $(function () {
        $('#modalConfirmaEliminar').modal('show');
      });
    },
    eliminarDocumento() {
      var _this = this;
      axios.get('/eliminar-curso', {
        params: {
          cursoId: this.cursoEliminar.id,
        }
      })
        .then(function (response) {

          _this.consultarCursos();
        })
        .catch(function (error) {
          alert('Error: consultar a soporte técnico');
        });

    },

    consultarCursos() {
      var _this = this;
      axios.get('/consulta-cursos') //llamada a la ruta curso por defecto
        .then(function (response) {
          _this.cursos = response.data;
        })
        .catch(function (error) {
          alert('Error: consultar a soporte técnico');
        });
    },
    abrirCurso(cursoId) {
      window.location.href = '/administrar-indice/?cursoId=' + cursoId;

    },
    mostrarEditarCurso(cursoId) {
      // event.cancelBubble = true;
      // if(event.stopPropagation) event.stopPropagation();



    },
    validarCampos(curso) {
      this.formErrors = {};

      if (curso.nombre == '') {
        this.formErrors.nombre = true;
      }
      if (curso.descripcion == '') {
        this.formErrors.descripcion = true;
      }

      if (Object.keys(this.formErrors).length > 0) {
        return false;
      } else {
        this.guardarCurso(curso);
      }


    },
    guardarCurso(curso) {
      var _this = this;
      this.editarCurso = false;

      // PROCESO PARA GUARDAR EL CURSO
      var formData = new FormData();
      formData.append('cursoId', curso.id);
      formData.append('nombreCurso', curso.nombre);
      formData.append('descripcionCurso', curso.descripcion);
      axios({
        method: 'post',
        url: '/actualizar-curso',
        data: formData
      })
        .then(
          (response) => {
            alert('Curso guardado correctamente');
          }
        )
        .catch(
          (err) => {
            alert('Error: consulte a soporte técnico');
          }
        );

      // finalmente habilitar el evento click nuevamente
      document.getElementById(curso.id).addEventListener("click", abrir = function () { _this.abrirCurso(curso.id) }, false);
    },
    fechaUltimoAccesoEstudiante(estudiante) {
      let fechaUltimoAcceso = '01-01-1970';
      fechaUltimoAcceso = new Date(estudiante.updatedAt);
      // let fecha= fechaUltimoAcceso.toString();
      let fecha = fechaUltimoAcceso.getDate() + "/" + fechaUltimoAcceso.getMonth() + "/" + fechaUltimoAcceso.getFullYear();

      // return fecha.substring(1, 12);
      return fecha
    }


  },
  computed: {

  }
});
