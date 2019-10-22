parasails.registerComponent("modulo-login", {
  props: {},
  data() {
    return {
      formData: {
        alias: null,
        email: null,
        password: null
      },
      // For tracking client-side validation errors in our form.
      // > Has property set to `true` for each invalid property in `formData`.
      formErrors: {
        /* … */
      },
      usuario: "alias",
      aliasIncorrecto: false,
      correoIncorrecto: false,
      passwordIncorrecto: false
    };
  }, 
  template: //html
 `<div>
  <form @submit.prevent="validarFormulario" >

      <!--SLOT  PARA BOTON DE REGISRATE-->
      <slot>
      </slot>
      <div class="seccion-inicia-sesion">
      <input type="radio" id="seleccionar_alias" value="alias" v-model="usuario">
      <label for="alias">Alias</label>
      
      <input type="radio" id="seleccionar_email" value="email" v-model="usuario">
      <label for="email">Email</label>

      <div v-if="usuario=='alias'" class="form-group">
        <label for="alias">* Alias de usuario</label>
        <input name="alias" class="form-control" id="alias" autofocus type="text"
          :class="[formErrors.alias || aliasIncorrecto ? 'is-invalid' : '']" v-model.trim="formData.alias" placeholder="Ej. pepito123">
          <div class="invalid-feedback" v-if="formErrors.alias">Ingrese un alias de usuario.</div>
          <div class="invalid-feedback" v-if="aliasIncorrecto">Usuario no registrado.</div>
      </div>
      <div v-else class="form-group">
        <label for="email">* Correo electrónico</label>
        <input name="email" class="form-control" id="email" type="email" :class="[formErrors.email || correoIncorrecto ? 'is-invalid' : '']"
          v-model.trim="formData.email" placeholder="pepito@example.com">
        <div class="invalid-feedback" v-if="formErrors.email">Ingrese un correo electrónico válido.</div>
        <div class="invalid-feedback" v-if="correoIncorrecto">Usuario no registrado.</div>
      </div>

      <div class="form-group">
        <label for="password">* Contraseña</label>
        <input name="password" class="form-control" id="password" type="password"
          :class="[formErrors.password || passwordIncorrecto ? 'is-invalid' : '']" v-model.trim="formData.password" placeholder="••••••••">
        <div class="invalid-feedback" v-if="formErrors.password">Ingrese una contraseña</div>
        <div class="invalid-feedback" v-if="passwordIncorrecto">Contraseña incorrecta</div>
      </div>

      <div class="form-group">
        <input type="submit" value="Iniciar Sesión" class="btn btn-primary">
      </div>
      <div class="form-group">
        <p>¿No está registrad@? </p>
        <a class="btn btn-primary" href="/inicio" role="button">Ingrese como visitante</a>
      </div>
     </div>
    </form>
  </div>
  `,
  methods: {
    validarFormulario(e) {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Valida que exista alias de usuario:
      if (this.usuario == "alias" && !argins.alias) {
        this.formErrors.alias = true;
      }
      // Valida que exista correo de usuario:
      if (this.usuario == "email" && !argins.email) {
        this.formErrors.email = true;
      }
      // Valida exista password:
      if (!argins.password) {
        this.formErrors.password = true;
      }

      /*INSERTAR LA VALIDACION DE CORREO ELECTRONICO VALIDO */
      //  si el objeto formErrors se encuentra vacío, entonces continuar, caso contrario no recargar la página
      if (Object.keys(this.formErrors).length == 0) {
        this.valor = "hola";
        // e.preventDefault();

        this.intentarEnvio();
      }
    },
    intentarEnvio() {
      //establezco los sigueintes valores en false para que se oculten los mensajes de error en la vista
      this.aliasIncorrecto = false;
      this.correoIncorrecto=false;
      this.passwordIncorrecto = false;
      // REVISAR USO DE btoa y atoa de javascript para codificar y decodificar el password
      axios
        .post("/login", {
          //por defecto esto se manda en el body del request http
          alias: this.formData.alias,
          email: this.formData.email,
          password: this.formData.password
        })
        .then(response => {
          if (
            response.data.usuario.administrador ||
            response.data.usuario.tutor
          ) {
            window.location.replace("/administrar-home");
          } else {
            window.location.replace("/inicio");
          }
        })
        .catch(err => {
          if (err.response.status == 401) {
            this.aliasIncorrecto = true;
            this.correoIncorrecto = true;
          } else if (err.response.status == 409) {
            this.passwordIncorrecto = true;
          }
        });
    }
  }
});
