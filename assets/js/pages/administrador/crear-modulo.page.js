
parasails.registerPage('crear-modulo', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    curso: Object,
    nombreModulo: '',
    descripcionModulo: '',
    formErrors: {},
    moduloSeleccionado:{
      type:Object
    },
    tituloTemporal:'Agregar Nuevo Módulo',
    tipoContenido:'Modulo'
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.curso = SAILS_LOCALS.curso;
//this.moduloSeleccionado= SAILS_LOCALS.moduloSeleccionado;// no se remite porque en la vista_crear_modulo no se ha seleccionado un modulo

  },
  mounted: async function () {
    //…

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    validarFormulario() {
      console.log('valida formulario ');
      console.log('contenido tiny' + window.contenidoTiny);
      // Limpiar el objeto de almacenamiento de errores
      this.formErrors = {};
      //Valida que exista un nombre de modulo
      if (!this.nombreModulo) {
        this.formErrors.nombreModulo = true;
      }
      if (!this.descripcionModulo) {
        this.formErrors.descripcionModulo = true;
      }
      // SI EXISTE ALGUN ERROR SE RETORNA FALSE Y LA PAGINA SE REFRESCA SIN QUE SEA PERCEPTIBLE
      if (Object.keys(this.formErrors).length > 0) {
        return false;
      }
      //SI LOS VALORES INGRESADOS SON CORRECTOS SE ENVIA AL SERVIDOR
      this.enviarModulo();


    },
    enviarModulo() {


      const formData = new FormData();//crea un objeto formData que contiene los campos enviados de un fomrulario, se crea en este caso porque no se usa las propiedades action="" ni method="" enctype="multipart/formdata" en el elemento <form> , enctype es implicitamente declarado con este objeto
      // formData.append('multimedia', this.selectedFile, this.selectedFile.name);
      //en primer lugar va el nombre del campo que acepta el servidor, segundo va el archivo y tecero va el nombre del archivo
      formData.append('nombreModulo', this.nombreModulo); //Se puede usar Set en lugar de append, para agregar valores, SET reemplaza el nombre del campo cuando ya existe en formData
      formData.append('descripcionModulo', this.descripcionModulo);
      formData.append('cursoId', this.curso.id);
      formData.append('contenidoTiny', window.contenidoTiny); //window.contenidoTiny se establece en el archivo layout.ejs, en el script de inicializacion de tinyMCE
      axios({
        method: 'post',
        url: '/crear-modulo',
        data: formData,
      })
        .then((response) => {
          console.log('corecto');
          console.log(response.data)
          //PASAR COMO PARÁMETRO AL COMPONENTE SIDE-VAR-MENU EL MODULO CREADO
          //pasar el objeto creado, 
          alert('Módulo creado correctamente');
          // window.replace('');
          // se guarda el modulo creado en el arreglo de modulos
          this.moduloSeleccionado=response.data;
          window.location.replace('/administrar-contenido/?objetoId='+moduloSeleccionado.id+'&tipoContenido='+this.tipoContenido);
          // this.curso.modulos.push(response.data); //AUN NO SE VALIDA 23-05-2019
          
        })
        .catch((err) => { //la respuesta de sails this.res

          if (err.response.status == 409) {
            alert('ya existe un modulo con el mismo nombre');
            console.log(err);
          } else if (err.response.status == 400) {
            alert('Existen errores en la información suministrada');
            console.log(err);
          } else {
            alert('Error en el servidor');
            console.log(err);
          }
        }
        );
    },

  },
  computed: {

  }
});
