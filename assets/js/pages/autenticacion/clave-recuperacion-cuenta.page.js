/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerPage("clave-recuperacion-cuenta", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		formData: null,
		formErrors: {
			/* … */
		},
		mostrarCamposContrasenia: true
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
	},
	mounted: async function() {
		this.usuarioRecuperacion = SAILS_LOCALS.usuarioRecuperacion;
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		validarFormulario(e) {
			// Clear out any pre-existing error messages.
			this.formErrors = {};

			var argins = this.formData;

			// Valida exista password:
			if (!argins.password) {
				this.formErrors.password = true;
			}

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
			formData.append("password", this.formData.password);
			formData.append("usuarioRecuperacion", this.usuarioRecuperacion);

			axios({
				url: "/verificar-clave-recuperacion-cuenta",
				method: "post",
				data: formData
			})
				.then(response => {
					this.mostrarCamposContrasenia = true;
				})
				.catch(err => {
					if (err.response.status == 409) {
						swal({
							icon: "error",
							title: "El usuario no existe",
							text: `${err}`,
							showConfirmButton: true
						});
					} else {
						swal({
							icon: "error",
							title: "No se ha solicitado la recuperación de contraseña",
							text: `${err}`,
							showConfirmButton: true
						});
					}

					// return false;
				});
		}
	}
});
