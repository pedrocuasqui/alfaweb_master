
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
    moduloCreado: {
      type: Object
    },
    tituloTemporal: 'Agregar Nuevo Módulo',
    tipoContenido: 'Modulo',
    breadcrumb: [],








    seleccionMultimedia: true,
    imagenPortada: {},
    imagenTemporal:{},
    rutaTemporal:''
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.curso = SAILS_LOCALS.curso;
    this.breadcrumb.push(SAILS_LOCALS.curso);
    //this.moduloCreado= SAILS_LOCALS.moduloCreado;// no se remite porque en la vista_crear_modulo no se ha seleccionado un modulo

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
      console.log('IMAGENPORTADA EN EN VALIDACION');
console.log(this.imagenPortada);
      if (Object.keys(this.imagenPortada).length == 0) {
        this.formErrors.imagenPortada = true;
        this.formErrors.typeFile = false;
      } else {
        // Expresion regular que evalua si la imagen tiene cualquier tipo

        var regExpImage = new RegExp('image\.(jpg)|image\.(png)|image\.(jpeg)');

        if (!regExpImage.exec(this.imagenPortada.type)) {
          this.formErrors.typeFile = true;
        }
      }

      if (!window.contenidoTiny) {
        this.formErrors.contenidoTiny = true;
      }


      // SI EXISTE ALGUN ERROR SE RETORNA FALSE Y LA PAGINA SE REFRESCA SIN QUE SEA PERCEPTIBLE
      if (Object.keys(this.formErrors).length > 0) {
        return false;
      }
      //SI LOS VALORES INGRESADOS SON CORRECTOS SE carga la imagen, en then se carga el resto de campos
    this.enviarModulo();


    },
    onFileSelected(event) {//guarda el archivo seleccionado por el explorador de windows en un arreglo de imágenes.

      //Añadir las propiedades del objeto seleccionado a la variable imagenPortada

      this.imagenTemporal = event.target.files[0];


      this.imagenTemporal.rutaLocal = URL.createObjectURL(this.imagenTemporal);//Visualizar en el navegador la imagen seleccionada
      
      
      // setTimeout(function () { URL.revokeObjectURL(url); }, 3000);
      // URL.revokeObjectURL(url); //Cada vez que se llama a createObjectURL(), un nuevo objeto URL es creado, incluso si ya creaste uno para el mismo objeto. Cada uno de estos objetos puede ser liberado usando URL.revokeObjectURL() cuándo ya no lo necesitas. Los navegadores liberan estos objetos cuando el documento es cerrado

      this.formErrors.imagenPortada=false;
      this.formErrors.typeFile=false;


      this.guardarImagenPortada()

    },
    guardarImagenPortada() {
      var _this=this;
      const formData = new FormData();
      formData.append('multimedia', this.imagenTemporal, this.imagenTemporal.name);
      axios({
        method: 'post',
        url: '/cargar-imagen',
        data: formData
      })
        .then(
          (response) => {
            console.log('RESPONSE');
            console.log(response.data);
            this.asignaObjetoRespuesta(response);            
            
          }
        )
        .catch(
          (err) => {
            console.log('Error encontrado:\n' + err);
            
          }
        );
    },
   asignaObjetoRespuesta(response){
     console.log('LLEGO A METODO DE ADIGNACION DE RESPUESTA');
    this.imagenPortada=response.data;
    console.log(this.imagenPortada);
    var i= response.data.location;
    
    setTimeout(() => {
      console.log('asigna ruta');
      this.rutaTemporal="http://localhost:1337/images/uploaded/91463fc6-397e-42c9-aaf1-ddd1f1d196c7.jpg";
      
    }, 3000);
    
    // this.rutaTemporal='https://www.imagen.com.mx/assets/img/imagen_share.png';
    // this.rutaTemporal='http://localhost:1337/images/uploaded/91463fc6-397e-42c9-aaf1-ddd1f1d196c7.jpg';
    
    // console.log('objeto devuelti por el servidor ');
    // console.log(response.data);
    //Libera el objeto imagen para que se pueda reusar en el textarea de tinymce
    // URL.revokeObjectURL(this.imagenTemporal);    
   },
    enviarModulo() {
      console.log('thi.imagenPortada');
      console.log(this.imagenPortada);

      const formData = new FormData();//crea un objeto formData que contiene los campos enviados de un fomrulario, se crea en este caso porque no se usa las propiedades action="" ni method="" enctype="multipart/formdata" en el elemento <form> , enctype es impliscitamente declarado con este objeto
      // this.imagenPortada.urlLocal=null;
      //en primer lugar va el nombre del campo que acepta el servidor, segundo va el archivo y tecero va el nombre del archivo
      formData.append('nombreModulo', this.nombreModulo); //Se puede usar Set en lugar de append, para agregar valores, SET reemplaza el nombre del campo cuando ya existe en formData
      formData.append('descripcionModulo', this.descripcionModulo);
      formData.append('cursoId', this.curso.id);
      formData.append('contenidoTiny', window.contenidoTiny); //window.contenidoTiny se establece en el archivo layout.ejs, en el script de inicializacion de tinyMCE
      formData.append('rutaPortada', this.imagenPortada.rutaLocal);


      //   const config = {
      //     headers: { 'content-type': 'multipart/form-data' }
      // }
      console.log('se intenta enviar al servidor');
      axios({
        method: 'post',
        url: '/crear-modulo',
        data: formData,
        // config
      })
        .then((response) => {
          console.log('corecto');
          console.log(response.data)
          //PASAR COMO PARÁMETRO AL COMPONENTE SIDE-VAR-MENU EL MODULO CREADO
          //pasar el objeto creado, 
          alert('Módulo creado correctamente');
          console.log('Módulo creado correctamente');
          // window.replace('');
          // se guarda el modulo creado en el arreglo de modulos
          this.moduloCreado = response.data;
          // console.log(this.moduloCreado);

          window.location.replace('/administrar-contenido/?objetoId=' + this.moduloCreado.id + '&tipoContenido=' + this.tipoContenido);
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
  
   
    /**
     * 
     */
    onBorrarImagen() {
      this.imagenPortada = {};
    },

  },
  computed: {
    computedErrorImagen(){
      let error =    this.formErrors.imagenPortada ||  this.formErrors.typeFile;
      return error
    },

  
  },
});
