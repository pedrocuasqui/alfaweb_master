/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerPage("administrar-indice", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		tituloContenido: "ÍNDICE",
		descripcionObjeto: "",
		navegarAtras: "",
		navegarSiguiente: "",

		breadcrumb: [{ nombre: "Cursos", id: 1, enlace: "/inicio" }],
		//el enlace /inicio desde el administrador redirige a /administrar-home
		editarNombre: false
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
		this.breadcrumb.push(SAILS_LOCALS.curso);
	},
	mounted: async function() {
		//…
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		eliminarDocumento() {
			axios
				.get("/eliminar-curso", {
					params: {
						cursoId: this.curso.id
					}
				})
				.then(() => {
					swal({
						icon: "success",
						title: "Curso eliminado",
						showConfirmButton: true,
						timer: 2000
					}).then(() => {
						location.replace("/administrar-home");
					});
				})
				.catch(error => {
					swal({
						icon: "error",
						title: "No se ha podido eliminar el curso",
						text: error,
						showConfirmButton: true,
						timer: 2000
					});
				});
		}
	},
	computed: {
		noEsInforBasica() {
			//si el nombre del curso es "Alfabetización informática" entonces no se mostrará el botón eliminar, no se debe por ninguna razón eliminar el curso, en caso de hacerlo, se debe reiniciar el servidor para que se vuelva a crear el curso por defecto, aunque las páginas  html del contenido permanecerán siempre intactas
			let respuesta = this.curso.nombre != "Alfabetización informática";
			return respuesta;
		}
	}
});
