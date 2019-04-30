parasails.registerPage('registro-usuario', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formData: {},
    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  
  },
  mounted: async function () {
    
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    validarFormulario(e) {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Valida que exista un nombre de usuario:
      if (!argins.nombre) {
        this.formErrors.nombre = true;
      }
       // Valida que exista alias de usuario:
       if (!argins.alias) {
        this.formErrors.alias = true;
      }
      // Valida exista password:
      if (!argins.password) {
        this.formErrors.password = true;
      }
      
      if (argins.email) {
        if(!this.validEmail(argins.email)){
          this.formErrors.email = true
        }
        
      }
      // Valida que exista un rol:
      if(!argins.rol) {
        this.formErrors.rol = true;
      }

      /*INSERTAR LA VALIDACION DE CORREO ELECTRONICO VALIDO */
      //  si el objeto que almacena errores se encuentra vacío, entonces continuar, caso contrario no recargar la página
      if (Object.keys(this.formErrors).length == 0) {
        // return true;
        console.log('sin errores');
        e.preventDefault();
      }
      else { //si se encuentran errores no se recarga la página
        e.preventDefault();
      }

    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
});
