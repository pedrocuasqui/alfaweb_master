/*jshint esversion:8 */
parasails.registerPage("actualizar-usuario", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		formData: null,
		formErrors: {
			/* … */
		},
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
		this.formData = SAILS_LOCALS.usuario;
	},
	mounted: async function() {
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
				if (!this.validEmail(argins.email)) {
					this.formErrors.email = true;
				}
			}
			// else {
			//   this.formData.email = null;
			// }
			// Valida que exista un rol:

			/*INSERTAR LA VALIDACION DE CORREO ELECTRONICO VALIDO */
			//  si el objeto que almacena errores se encuentra vacío, entonces continuar, caso contrario no recargar la página
			if (Object.keys(this.formErrors).length == 0) {
				this.actualizarUsuario();
			} else {
				//si se encuentran errores no se recarga la página
				return false;
				// e.preventDefault();
			}
		},
		actualizarUsuario() {
			// var _this=this;
			var formData = new FormData();
			formData.append("usuarioId", this.formData.id);
			formData.append("nombre", this.formData.nombre);
			formData.append("alias", this.formData.alias);
			formData.append("email", this.formData.email);
			formData.append("password", this.formData.password);

			axios({
				url: "/actualizar-usuario",
				method: "post",
				data: formData,
			})
				.then(response => {
					alert("Vuelve a ingresar con tu nueva contraseña");
					window.location.replace("/view-login");
				})
				.catch(err => {
					if (err.response.status == 409) {
						alert("Error: El usuario ya se encuentra creado");
					} else {
						alert("Error: No se puede actualizar en este momento");
					}

					// return false;
				});
		},
		validEmail: function(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
	},
});
