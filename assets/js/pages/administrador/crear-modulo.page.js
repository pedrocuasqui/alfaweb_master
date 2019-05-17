parasails.registerPage('crear-modulo', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    // contenidos:[],
    curso: Object,
    nombreModulo: '',
    formErrors: {},
    selectedFile: null,
    url: null

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    // this.curso=SAILS_LOCALS.curso;

  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    validarFormulario() {
      // Limpiar el objeto de almacenamiento de errores
      this.formErrors = {};
      //Valida que exista un nombre de modulo
      if (!this.nombreModulo) {
        this.formErrors.nombreModulo = true;
      }

      if (!this.selectedFile) {
        this.formErrors.selectedFile = true;
        this.formErrors.typeFile=false;
      }else{
      // Expresion regular que evalua si la imagen tiene cualquier tipo

      var regExpImage = new RegExp('image\.\w*');
      var regExpVideo = new RegExp('video\.\w*');
      
      if ( !regExpImage.exec(this.selectedFile.type) && !regExpVideo.exec(this.selectedFile.type) ){
        console.log(regExpImage);
        console.log(regExpImage.test(this.selectedFile.type)+ "valor"+ this.selectedFile.type)
        console.log(regExpVideo.test(this.selectedFile.type)+ "valor"+ this.selectedFile.type);
        this.formErrors.typeFile=true;
      }
      }


      // SI EXISTE ALGUN ERROR SE RETORNA FALSE Y LA PAGINA SE REFRESCA SIN QUE SEA PERCEPTIBLE
      if (Object.keys(this.formErrors).length > 0) {
        return false;
      }
      //SI LOS VALORES INGRESADOS SON CORRECTOS SE ENVIA AL SERVIDOR
      this.enviarModulo();


    },
    enviarModulo(){


      const formData = new FormData();//crea un objeto formData que contiene los campos enviados de un fomrulario, se crea en este caso porque no se usa las propiedades action="" ni method="" enctype="multipart/formdata" en el elemento <form> , enctype es implicitamente declarado con este objeto
      formData.append('multimedia', this.selectedFile, this.selectedFile.name);
      formData.append('nombreModulo', this.nombreModulo); //Se puede usar Set en lugar de append, para agregar valores, SET reemplaza el nombre del campo cuando ya existe en formData
      axios({
        method: 'post',
        url: '/crear-modulo',
        data: formData,
      })
        .then((response) => {
          console.log(response)
          //PASAR COMO PARÁMETRO AL COMPONENTE SIDE-VAR-MENU EL MODULO CREADO
          //pasar el objeto creado, 
          this.curso.modulos.push({ nombreModulo: this.nombreModulo });
        })
        .catch((err) => { console.log(err) });
    },
    onFileSelected(event) { //obtener el event 
      //captura del elemento seleccionado que se almacena en event.target.files en la primera posicion
      this.selectedFile = event.target.files[0];
      if(this.selectedFile){
        this.url = URL.createObjectURL(this.selectedFile);
      }
      
      console.log(this.selectedFile);
      this.formErrors.selectedFile = false;
      this.formErrors.typeFile=false;


    },
    onBorrarImagen() {
      this.selectedFile = null;
      this.url = null;
    }
  },
  computed:{
    errorselectedFile(){
      let error= this.formErrors.selectedFile || this.formErrors.typeFile;
      // console.log(error+ " " +this.formErrors.selectedFile+ " "+this.formErrors.typeFile);
      return error;
    }
  }
});
