parasails.registerPage('crear-modulo', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    // contenidos:[],
    curso:Object,
    formData: {

    },
    selectedFile: null
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.curso=SAILS_LOCALS.curso;
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    validarFormulario() {
      const formData = new FormData();
      formData.append('multimedia', this.selectedFile, this.selectedFile.name);
      formData.append('nombreModulo',this.formData.nombreModulo); //Se puede usar Set en lugar de append, para agregar valores, SET reemplaza el nombre del campo cuando ya existe en formData
      axios({
        method: 'post',
        url: '/crear-modulo',
        data: formData,
      })
        .then((response) => 
        { 
          console.log(response)
          //PASAR COMO PARÁMETRO AL COMPONENTE SIDE-VAR-MENU EL MODULO CREADO
          //pasar el objeto creado, 
          this.curso.modulos.push({nombreModulo:this.formData.nombreModulo});
        }) 
        .catch((err) => {console.log(err) });

    },
    onFileSelected(event) { //obtener el event 
      //captura del elemento seleccionado que se almacena en event.target.files en la primera posicion
      this.selectedFile = event.target.files[0];
    }
  }
});
