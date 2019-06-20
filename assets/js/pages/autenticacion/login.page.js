parasails.registerPage('login', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formData: {
      alias: null,
      email: null,
      password: null
    },
    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },
    usuario: 'alias',
    aliasIncorrecto: false,
    passwordIncorrecto: false
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
    validarFormulario(e) {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Valida que exista alias de usuario:
      if (this.usuario == 'alias' && !argins.alias) {
        this.formErrors.alias = true;
      }
      // Valida que exista correo de usuario:
      if (this.usuario == 'email' && !argins.email) {
        this.formErrors.email = true;
      }
      // Valida exista password:
      if (!argins.password) {
        this.formErrors.password = true;
      }



      /*INSERTAR LA VALIDACION DE CORREO ELECTRONICO VALIDO */
      //  si el objeto formErrors se encuentra vacío, entonces continuar, caso contrario no recargar la página
      if (Object.keys(this.formErrors).length == 0) {
        console.log('sin errores de validacion');
        this.valor = 'hola';
        // e.preventDefault();

        this.intentarEnvio();

      }


    },
    intentarEnvio() {
      console.log(JSON.stringify(this.formData));
      //establezco los sigueintes valores en false para que se oculten los mensajes de error en la vista
      this.aliasIncorrecto = false;
      this.passwordIncorrecto = false;
      // REVISAR USO DE btoa y atoa de javascript para codificar y decodificar el password
      axios.post('/login', { //por defecto esto se manda en el body del request http
        alias: this.formData.alias,
        email: this.formData.email,
        password: this.formData.password
      })
        .then(
          (response) => {
            // if (response.data.statusCode == 200){ console.log('LOGIN EXITOSO');}
            // console.log('LOGIN EXITOSO');

            // Simulate an HTTP redirect:
            console.log('LOGUEADO CON EXITOS');
            console.log(response);
            window.location.replace("/");
          }
        )
        .catch(
          err => {
            console.log(err.response);
            if (err.response.status == 401) {
              this.aliasIncorrecto = true;
              console.log('EL USUARIO NO SE ENCUENTRA REGISTRADO');
            }
            else if (err.response.status == 409) {
              this.passwordIncorrecto = true;
              console.log('LA CONTRASEÑA ES INCORRECTA');
            };
          }
        );
    }
  },

});
