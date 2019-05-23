
parasails.registerPage('crear-modulo', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    // contenidos:[],
    curso: Object,
    nombreModulo: '',
    descripcionModulo: '',
    formErrors: {},
    selectedFile: null,
    url: null,

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.curso = SAILS_LOCALS.curso;


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
      if (!this.selectedFile) {
        this.formErrors.selectedFile = true;
        this.formErrors.typeFile = false;
      } else {
        // Expresion regular que evalua si la imagen tiene cualquier tipo

        var regExpImage = new RegExp('image\.\w*');
        var regExpVideo = new RegExp('video\.\w*');

        if (!regExpImage.exec(this.selectedFile.type) && !regExpVideo.exec(this.selectedFile.type)) {
          this.formErrors.typeFile = true;
        }
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
      formData.append('multimedia', this.selectedFile, this.selectedFile.name);
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
          // this.curso.modulos.push({ nombreModulo: this.nombreModulo, descripcion:this.descripcionModulo});
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
    onFileSelected(event) { //obtener el event 
      //captura del elemento seleccionado que se almacena en event.target.files en la primera posicion
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.url = URL.createObjectURL(this.selectedFile);
      }

      console.log(this.selectedFile);
      this.formErrors.selectedFile = false;
      this.formErrors.typeFile = false;


    },
    onBorrarImagen() {
      this.selectedFile = null;
      this.url = null;
    }
  },
  computed: {
    errorselectedFile() {
      let error = this.formErrors.selectedFile || this.formErrors.typeFile;
      // console.log(error+ " " +this.formErrors.selectedFile+ " "+this.formErrors.typeFile);
      return error;
    }
  }
});
