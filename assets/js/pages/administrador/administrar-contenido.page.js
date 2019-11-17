/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerPage("administrar-contenido", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		myArray: ["elem1", "elem2"],
		formErrors: {},
		objetoSeleccionado: Object,
		editarNombre: false,
		editarDescripcion: false,
		// nombre:'',
		descripcionModulo: "",
		navegarAtras: {
			type: String,
			required: false,
			description: "la ruta del modulo anterior",
		},
		navegarSiguiente: {
			type: String,
			required: false,
			description: "la ruta del modulo siguiente",
		},
		// breadcrumb: {
		//     type: Array,
		//     required: false,
		// },
		breadcrumb: [],
		curso: {
			type: Object,
		},
		usuario: {
			type: Object,
			default: { nombre: "Admin", rol: "Administrador" },
		},
		mostrarSpinner: false,
		imagenTemporal: {},

		tituloEvaluacion: "",
		evIndividualBandera: false,
		// codigoTipoEvaluacion:'Cuestionario',
		// mostrarMenuTipoEvaluacion:true,
		// **********************************OPCIONES DE EVALUACION
		tipoEvaluacion: "Cuestionario",
		preguntaEnEdicion: {
			enunciado: null, //El enunciado puede ser cualquier objeto, ya sea string, imagen , un objeto javascript, lo que sea
			opciones: {
				opcion1: null,
				opcion2: null,
				opcion3: null,
				opcion4: null,
			},
			respuesta: null,
			pista: null,
		},
		preguntasCuestionario: [],
		evaluacion: {
			tipo: "",
			preguntas: {},
		},
		formErrorsModal: {},
		modalEdicion: false,
		indicePreguntaEditar: null,
		arregloRandom: [],
		tiempoMaximoPorPregunta: 20, //Valor en segundos por defecto

		//variables para usar en Emparejamiento del lado del Estudiante
		enunciadoSeleccionado: null,
		respuestaSeleccionada: null,
		preguntaSeleccionadaJuegoEmparejamiento: null,
		coloresPreguntasEmparejamiento: [
			"#F31885",
			"#F39318",
			"#B4F318",
			"#18F38F",
			"#18A7F3",
			"#9318F3",
			"#F318D8",
			"#823815",
			"#268215",
			"#158280",
			"#D52FE3",
			"#F31850",
			"#D218F3",
			"#1833F3",
			"#18E9F3",
			"#33F318",
			"#F3DF18",
		],
		uploadPercentage: 0,
		rutaImagenAnterior: null,
	},
	watch: {
		preguntaEnEdicion: function() {
			this.agregaFuncionalidadDraggable();
			console.log("se recrea el objeo dragabble");
		},
		evIndividualBandera: function(valorNuevo, ValorAntiguo) {
			if (valorNuevo && this.preguntasCuestionario.length > 0) {
				//esta verificacion se lo hace para cuando existe ya una evaluacion en el submodulo
				//si el nuevo valor es true significa que se muestra la evaluacion
				this.agregaFuncionalidadDraggable();
			}
		},
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
		this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado;
		this.curso = SAILS_LOCALS.curso;
		this.breadcrumb.push(SAILS_LOCALS.curso);

		if (
			this.objetoSeleccionado.nombreSubmodulo &&
			this.objetoSeleccionado.evaluacion
		) {
			//solo se agregan estas opciones si es un submodulo
			this.tipoEvaluacion = this.objetoSeleccionado.evaluacion.tipo;
			this.tiempoMaximoPorPregunta = this.objetoSeleccionado.evaluacion.tiempoMaximoPorPregunta;
			this.preguntasCuestionario = [
				...this.objetoSeleccionado.evaluacion.preguntas,
			];
			// this.modalEdicion = true;
		}
	},
	mounted: async function() {
		this.establecerContenidoTiny();

		$("#modalCrearPregunta" + this.tipoEvaluacion).on("hide.bs.modal", function(
			e,
		) {
			this.preguntaEnEdicion = {
				enunciado: null,
				opciones: {
					opcion1: null,
					opcion2: null,
					opcion3: null,
					opcion4: null,
				},
				respuesta: null,
				pista: null,
			};
		});
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		validarFormulario() {
			// Limpiar el objeto de almacenamiento de errores
			this.formErrors = {};
			//Valida que exista un nombre de modulo
			if (!this.objetoSeleccionado.nombre) {
				this.formErrors.nombre = true;
			}
			if (!this.objetoSeleccionado.descripcion) {
				this.formErrors.descripcion = true;
			}

			// if (Object.keys(this.imagenPortada).length == 0) {
			//   this.formErrors.imagenPortada = true;
			//   this.formErrors.typeFile = false;
			// } else {
			//   // Expresion regular que evalua si la imagen tiene cualquier tipo

			//   var regExpImage = new RegExp('image\.(jpg)|image\.(png)|image\.(jpeg)');

			//   if (!regExpImage.exec(this.imagenPortada.type)) {
			//     this.formErrors.typeFile = true;
			//   }
			// }

			this.objetoSeleccionado.contenidoTiny = window.contenidoTiny;
			if (!this.objetoSeleccionado.contenidoTiny) {
				this.formErrors.contenidoTiny = true;
			}

			// SI EXISTE ALGUN ERROR SE RETORNA FALSE Y LA PAGINA SE REFRESCA SIN QUE SEA PERCEPTIBLE
			if (Object.keys(this.formErrors).length > 0) {
				alert("Corrija los errores antes de continuar");
				return false;
			}
			//SI LOS VALORES INGRESADOS SON CORRECTOS SE carga la imagen, en then se carga el resto de campos

			if (this.objetoSeleccionado.nombreModulo) {
				//si el objeto editado es modulo,  se envia a actualiar-modulo en el servidor
				this.actualizarModulo();
			} else if (this.objetoSeleccionado.nombreSubmodulo) {
				//si el objeto editado es submodulo, se envia a actualizar-submodulo en el servidor

				this.actualizarSubmodulo();
			}
		},

		actualizarModulo() {
			var formData = new FormData();

			//valor quemado, establecer el verdadero valor de color
			// this.objetoSeleccionado.color= '#529674';

			formData.append("nombreModulo", this.objetoSeleccionado.nombre);
			formData.append("descripcionModulo", this.objetoSeleccionado.descripcion);
			formData.append("contenidoTiny", window.contenidoTiny);
			formData.append("moduloId", this.objetoSeleccionado.id);
			formData.append("color", this.objetoSeleccionado.color);
			formData.append("rutaPortada", this.objetoSeleccionado.multimedia.imagen);
			// no se envia el id del curso
			axios({
				method: "post",
				url: "/actualizar-modulo",
				data: formData,
			})
				.then(response => {
					alert("Modificación Exitosa");
					this.editarNombre = false;
					this.editarDescripcion = false;
				})
				.catch(err => {
					alert("Error: no se ha podido actualizar el módulo" + err);
				});
		},
		actualizarSubmodulo() {
			var formData = new FormData();

			formData.append("nombreSubmodulo", this.objetoSeleccionado.nombre);
			formData.append(
				"descripcionSubmodulo",
				this.objetoSeleccionado.descripcion,
			);
			formData.append("contenidoTiny", window.contenidoTiny);
			formData.append("submoduloId", this.objetoSeleccionado.id);
			formData.append("color", this.objetoSeleccionado.color);
			formData.append("evaluacion", this.objetoSeleccionado.evaluacion);
			// no se envia el id del curso
			axios({
				method: "post",
				url: "/actualizar-submodulo",
				data: formData,
			})
				.then(response => {
					alert("Modificacion Exitosa");
					this.editarNombre = false;
					this.editarDescripcion = false;
				})
				.catch(err => {
					alert("Error: no se ha podido actualizar el tema" + err);
				});
		},

		actualizarNombre() {
			//si todo sale bien ocultar la caja de texto
			this.editarNombre = false;
		},
		mostrarEditarNombre() {
			// establece la variable this.editarNombre en true para habilitar el input nombre
			this.editarNombre = true;
		},
		actualizarDescripcion() {
			this.editarDescripcion = false;
		},
		mostrarEditarDescripcion() {
			this.editarDescripcion = true;
		},
		eliminarDocumento() {
			var _this = this;
			axios
				.get("/eliminar-contenido", {
					params: {
						id: _this.objetoSeleccionado.id,
					},
				})
				.then(response => {
					alert("Objeto eliminado correctamente");
					if (response.data.nombreModulo) {
						//si el objeto eliminado es un modulo entonces se muestra la interfaz crear modulo
						window.location.replace(
							"/view-crear-modulo/?cursoId=" + _this.curso.id,
						);
					} else {
						// si el objeto eliminado es un submodulo entonces se redirge a la interfaz del modulo padre
						window.location.replace(
							"/administrar-contenido/?objetoId=" +
								_this.objetoSeleccionado.modulo +
								"&tipoContenido=Modulo",
						);
					}
				})
				.catch(error => {
					alert(
						"Error, no se ha podido eliminar el objeto solicitado: " + error,
					);
				});
		},
		establecerContenidoTiny() {
			window.contenidoTiny = null; // se establece el contenido
			window.contenidoTiny = this.objetoSeleccionado.contenidoTiny;
		},
		/**
		 * Funcion que se llama cada vez que el usuario escribe contenido dentro del elemnto TinyMice
		 */
		actualizaContTiny() {
			//para verificar que exista contenido Tiny
			this.preguntaEnEdicion.enunciado = window.contenidoTiny2;
		},
		onFileSelected(event) {
			//guarda el archivo seleccionado por el explorador de windows en un arreglo de imágenes.

			//Añadir las propiedades del objeto seleccionado a la variable imagenPortada

			this.imagenTemporal = event.target.files[0];
			this.mostrarSpinner = true;

			this.guardarImagenPortada();
		},

		guardarImagenPortada() {
			const formData = new FormData();

			if (this.rutaImagenAnterior) {
				//si existe una rutaImagenAnterior se aniade la formulario para eliminar la ruta indicada
				formData.append("rutaImagenActual", this.rutaImagenAnterior);
			}

			formData.append(
				"multimedia",
				this.imagenTemporal,
				this.imagenTemporal.name,
			);
			axios({
				method: "post",
				url: "/cargar-imagen",
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: progressEvent => {
					this.uploadPercentage = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total,
					);
				},
			})
				.then(response => {
					if (this.evIndividualBandera) {
						//si esta activa la vista de evaluacion entonces la carga de imagen es para una evaluacion
						this.preguntaEnEdicion.enunciado = response.data.location; //SE VA
					} else {
						//la carga de imagen es para administrar el modulo
						this.objetoSeleccionado.multimedia.imagen = response.data.location;
						this.imagenTemporal = {}; // se usa como bandera para la evaluacion de esta forma los botones de
					}

					this.uploadPercentage = false;
				})
				.catch(err => {
					alert("No se puede cargar su imágen en este momento.\n Error:" + err);
				});
		},
		evaluacionIndividual(contenido) {
			//funcion recibida del componente modulo-contenedor-curso
			if (contenido == "contenido") {
				this.tituloEvaluacion = this.objetoSeleccionado.nombre;
				this.evIndividualBandera = false;
			} else {
				this.tituloEvaluacion = this.objetoSeleccionado.nombre;
				this.evIndividualBandera = true;
			}
		},
		mostrarTipoEvaluacion(codigo) {
			this.tipoEvaluacion = codigo;
			// this.codigoTipoEvaluacion = codigo;
		},
		clickMostrarModalCreaPregunta() {
			let nombreModal = this.tipoEvaluacion;
			$(() => {
				$("#modalCrearPregunta" + nombreModal).modal("show");

				$("#modalCrearPregunta" + nombreModal).on("shown.bs.modal", () => {
					$(document).off("focusin.modal");
				});
				// fuente: https://stackoverflow.com/questions/36279941/using-tinymce-in-a-modal-dialog
			});
		},
		insertarPreguntaCuestionario() {
			var errores = "";
			this.preguntaEnEdicion.enunciado = window.contenidoTiny2; //Esta linea es necesaria para que la imagen cargada tambien se incluya en la variable preguntaEnEdicion.enunciado, la otra opción (No probada) es que inlcuya en el elemento tiny un evento que detecte la imagen cargada y complemente al onkeyup del mytextarea2
			if (!this.preguntaEnEdicion.enunciado) {
				//se queda
				this.formErrorsModal.enunciado = true;
				errores += "\n .Ingrese un enunciado";
			}
			if (this.opcionesRespuesta(this.preguntaEnEdicion).length < 2) {
				this.formErrorsModal.opciones = true;
				errores += "\n .alert('Registre al menos dos opciones";
			}
			if (!this.preguntaEnEdicion.respuesta) {
				this.formErrorsModal.respuesta = true;
				errores += "\n .Seleccione una respuesta";
			}
			alert(errores);
			errores = "";
			if (Object.keys(this.formErrorsModal).length == 0) {
				this.preguntasCuestionario.push(this.preguntaEnEdicion);
				this.preguntaEnEdicion = {
					enunciado: null,
					opciones: {
						opcion1: null,
						opcion2: null,
						opcion3: null,
						opcion4: null,
					},
					respuesta: null,
					pista: null,
				};

				//Se establece el contenido del objeto itnymce para una nueva pregunta
				$("#mytextarea2").html("<p></p>");
			}

			this.formErrorsModal = {};
		},
		actualizarPreguntaCuestionario() {
			var errores = "";
			this.preguntaEnEdicion.enunciado = window.contenidoTiny2;
			if (!this.preguntaEnEdicion.enunciado) {
				//SE QUEDA
				this.formErrorsModal.enunciado = true;
				errores += "\n .Ingrese un enunciado";
			}
			if (this.opcionesRespuesta(this.preguntaEnEdicion).length < 2) {
				this.formErrorsModal.opciones = true;
				errores += "\n .alert('Registre al menos dos opciones";
			}

			if (!this.preguntaEnEdicion.respuesta) {
				this.formErrorsModal.respuesta = true;
				errores += "\n .Seleccione una respuesta";
			}

			alert(errores);
			errores = "";
			if (Object.keys(this.formErrorsModal).length == 0) {
				//actualiza el contenido del arreglo de preguntas, remueve el elemento de la  posicion del la pregunta que se edita (indicePreguntaEditar) y se coloca la nueva pregunta editada (preguntaEnEdicion).
				this.preguntasCuestionario.splice(
					this.indicePreguntaEditar,
					1,
					this.preguntaEnEdicion,
				);
				this.preguntaEnEdicion = {
					enunciado: null,
					opciones: {
						opcion1: null,
						opcion2: null,
						opcion3: null,
						opcion4: null,
					},
					respuesta: null,
				};
			}
			this.modalEdicion = false;
			this.indicePreguntaEditar = null;
			this.formErrorsModal = {};
		},
		mostrarEditarPreguntaEvaluacion(preguntaSelected, indice) {
			this.indicePreguntaEditar = indice;
			this.preguntaEnEdicion = preguntaSelected;
			this.modalEdicion = true;
			if (this.tipoEvaluacion == "Cuestionario") {
				$(() => {
					$("#modalCrearPreguntaCuestionario").modal("show");

					$("#modalCrearPreguntaCuestionario").on("shown.bs.modal", () => {
						$(document).off("focusin.modal");
					});
				});
				window.contenidoTiny2 = this.preguntaEnEdicion.enunciado;
			} else if (this.tipoEvaluacion == "Emparejamiento") {
				$(() => {
					$("#modalCrearPreguntaEmparejamiento").modal("show");
					$("#modalCrearPreguntaEmparejamiento").on("shown.bs.modal", () => {
						$(document).off("focusin.modal");
					});
				});
			}
		},

		eliminarPreguntaCuestionario(preguntaSelected, indice) {
			this.preguntasCuestionario.splice(indice, 1);
		},
		opcionesRespuesta(preguntaEnEdicion) {
			//Se construye una respuesta como objeto
			let opciones = [];
			let contador = 0;
			for (let opcion in preguntaEnEdicion.opciones) {
				//obtiene los nombres de atributos: opcion1, opcion 2 ...
				contador += 1;
				if (
					preguntaEnEdicion.opciones[opcion] &&
					preguntaEnEdicion.opciones[opcion].trim() != ""
				) {
					//si la opcion tiene un valor dentro
					opciones.push({
						texto: preguntaEnEdicion.opciones[opcion].trim(),
						id: contador,
					});
				}
			}
			return opciones;
		},
		validarEvaluacion() {
			this.formErrors = {};
			//vALIDA QUE TODAS LAS PREGUNTAS TENGA OPCIONES, ESTA VALIDACION FUNCIONA CUANDO SE CAMBIA EL TIPO DE EVALUACION DE "EMPAREJAMIENTO" A "CUESTIONARIO"
			if (this.tipoEvaluacion == "Cuestionario") {
				var indice = 0; //contador de posiciones
				var indicesConError = []; //guarda la posicion de la pregunta con error
				this.preguntasCuestionario.forEach(pregunta => {
					//recorrer todas las opciones de respuesta de la pregunta

					let opcionesEnNull = 0; //acumula las opciones en null de la pregunta actual
					Object.values(pregunta.opciones).forEach(opcion => {
						if (!opcion) {
							//la opcion es null
							opcionesEnNull += 1; //acumula el conteo de opciones null en la pregunta
						}
					});
					if (opcionesEnNull >= 3) {
						indicesConError.push(indice);
					}
					indice += 1; //la posicion incrementa en uno
				});

				if (indicesConError.length > 0) {
					this.formErrors.opciones = true;
					alert(
						"Las preguntas: " +
							JSON.stringify(indicesConError) +
							"no tienen opciones de respuesta",
					);
				}
			}
			// si el administrador borró el campo y olvidó escribir un valor para tiempo máximo, este se asigna por defecto
			if (this.tiempoMaximoPorPregunta == "" || !this.tiempoMaximoPorPregunta) {
				this.tiempoMaximoPorPregunta = 20;
			}

			if (Object.keys(this.formErrors).length == 0) {
				this.guardarEvaluacion();
			}

			this.formErrors = {};
		},
		guardarEvaluacion() {
			this.evaluacion.tipo = this.tipoEvaluacion; //el tipo de evaluacion en la base será el tipo de evaluacion seleccionado
			this.evaluacion.tiempoMaximoPorPregunta = this.tiempoMaximoPorPregunta;
			this.evaluacion.preguntas = this.preguntasCuestionario; //incluyen la pista

			const formDataEv = new FormData();
			formDataEv.append("objetoId", this.objetoSeleccionado.id);
			formDataEv.append("evaluacion", JSON.stringify(this.evaluacion));
			axios({
				url: "/crear-evaluacion",
				method: "post",
				data: formDataEv,
			})
				.then(response => {
					alert("Evaluación creada correctamente");
				})
				.catch(err => {
					alert("Error no se puedo crear la evaluación:\n" + err);
				});
		},

		//emparejamiento

		eliminarPreguntaEmparejar(pregunta, indice) {
			this.preguntasCuestionario.splice(indice, 1);
		},
		actualizarPreguntaEmparejamiento() {
			if (!this.preguntaEnEdicion.enunciado) {
				//SE QUEDA
				this.formErrorsModal.enunciado = true;
				alert("Ingrese un enunciado");
			}

			if (!this.preguntaEnEdicion.respuesta) {
				this.formErrorsModal.respuesta = true;
				alert("Seleccione una respuesta");
			}

			if (Object.keys(this.formErrorsModal).length == 0) {
				//actualiza el contenido del arreglo de preguntas, remueve el elemento de la  posicion del la pregunta que se edita (indicePreguntaEditar) y se coloca la nueva pregunta editada (preguntaEnEdicion).
				this.preguntasCuestionario.splice(
					this.indicePreguntaEditar,
					1,
					this.preguntaEnEdicion,
				);
				this.preguntaEnEdicion = {
					enunciado: null,
					opciones: {
						opcion1: null,
						opcion2: null,
						opcion3: null,
						opcion4: null,
					},
					respuesta: null,
					pista: null,
				};
			}
			this.modalEdicion = false;
			this.indicePreguntaEditar = null;
			this.formErrorsModal = {};
		},
		insertarPreguntaEmparejamiento() {
			var errores = "";

			if (!this.preguntaEnEdicion.enunciado) {
				// SE QUEDA
				//SE QUEDA
				this.formErrorsModal.enunciado = true;
				errores += "\n .Ingrese un enunciado";
			}

			if (!this.preguntaEnEdicion.respuesta) {
				this.formErrorsModal.respuesta = true;
				errores += "\n .Ingrese una respuesta";
			}
			alert(errores);
			errores = "";
			if (Object.keys(this.formErrorsModal).length == 0) {
				this.preguntasCuestionario.push(this.preguntaEnEdicion);
				this.preguntaEnEdicion = {
					enunciado: null,
					opciones: {
						opcion1: null,
						opcion2: null,
						opcion3: null,
						opcion4: null,
					},
					respuesta: null,
					pista: null,
				};
				//quito colores si es que ya hay colores
				for (let i = 0; i <= this.preguntasCuestionario.length - 1; i++) {
					$("#Preg" + i).css("background-color", "");
					$("#Resp" + i).css("background-color", "");
				}

				this.randomPreguntasEmparejamiento(); //randomizo las opciones de respuesta con la misma funcion del cuestionario
			}

			this.formErrorsModal = {};
		},
		randomPreguntasEmparejamiento() {
			//

			this.arregloRandom = [];

			this.preguntasCuestionario.forEach(pregunta => {
				let posicionAleatorio = Math.floor(Math.random() * 10); //numero aleatorio entre 0 y 10(cualquier valor entero)
				let modulo = posicionAleatorio % 2;
				if (modulo == 0) {
					this.arregloRandom.unshift(pregunta);
				} else {
					this.arregloRandom.push(pregunta);
				}
			});

			// return arregloRandom;
		},
		/**
		 *
		 * @param {Object} pregunta la pregunta seleccionada en la evaluacion de tipo emparejamiento
		 * @param {string | int} indexPreg el indice al que corresponde dentro del arreglo this.preguntasCuestionario
		 */
		seleccionarEnunciadoEmpareja(pregunta, indexPreg) {
			this.enunciadoSeleccionado = indexPreg; //aplica el estilo al enunciado seleccionado
			// pregunta.color=this.coloresPreguntasEmparejamiento[indexPreg];

			this.preguntaSeleccionadaJuegoEmparejamiento = pregunta; //mantiene esta pregunta para poder comparar con la respuesta que luego seleccione
		},
		/**
		 *
		 * @param {Object} pregunta Objeto pregunta de la respuesta seleccionada para poder comparar con el enunciado
		 * @param {string | int} indexResp indice de la respuesta dentro del arreglo this.arregloRandom
		 */
		seleccionarRespuestaEmpareja(pregunta, indexResp) {
			if (this.preguntaSeleccionadaJuegoEmparejamiento) {
				if (
					pregunta.respuesta ==
					this.preguntaSeleccionadaJuegoEmparejamiento.respuesta
				) {
					this.respuestaSeleccionada = indexResp; // esto aplica el estilo a la respuesta seleccionada correctamente
					$("#Resp" + indexResp).css({
						"background-color": this.coloresPreguntasEmparejamiento[indexResp],
						"border-radius": "10px",
					});
					$("#Preg" + this.enunciadoSeleccionado).css({
						"background-color": this.coloresPreguntasEmparejamiento[indexResp],
						"border-radius": "10px",
					});
				}
			}
		},
		/**
		 * Al dar click en el boton de seleccionar im'agen, se guarda la ruta de la imagen anterior,
		 * la variable this.rutaImagenAnterior se envia a la accion sails encargada de crear una imagen, evalua si la variable this.rutaImagenAnterior tienen un valor entonces procede a eliminar la imagen y a cargar la nueva
		 */
		onClickCambiarImagen() {
			if (this.evIndividualBandera) {
				this.rutaImagenAnterior = this.preguntaEnEdicion.enunciado; // SE VA, PORQUE YA NO SE CARGAN LAS IMAGENES CON LA FUNCION ARRIBA
			} else {
				this.rutaImagenAnterior = this.objetoSeleccionado.multimedia.imagen;
			}
		},
		onClickCancelar() {
			// this.imagensTiny = window.imagenesTemporalesTiny;
			window.location.replace(
				"/administrar-contenido/?objetoId=" +
					_this.objetoSeleccionado.modulo +
					"&tipoContenido=Modulo",
			);
		},
		swapPreguntas(indexA, indexB) {
			var temp = this.preguntasCuestionario[indexA];

			this.preguntasCuestionario[indexA] = this.preguntasCuestionario[indexB];
			this.preguntasCuestionario[indexB] = temp;
		},
		agregaFuncionalidadDraggable() {
			var _this = this;
			$(function() {
				// do this after dom is ready
				var preguntaCreada = document.getElementById("preguntaEvaluacion");
				new Sortable(preguntaCreada, {
					animation: 150,
					ghostClass: "blue-background-class",
					onEnd: evt => {
						// let itemEl = evt.item; // dragged HTMLElement
						_this.swapPreguntas(evt.newIndex, evt.oldIndex);
					},
				});
			});
		},
	},
	computed: {
		computedErrorImagen() {
			let error = this.formErrors.imagenPortada || this.formErrors.typeFile;
			return error;
		},
		noEsInforBasica() {
			//si el nombre del curso es "Alfabetización informática" entonces no se mostrará el botón eliminar, no se debe por ninguna razón eliminar el curso, en caso de hacerlo, se debe reiniciar el servidor para que se vuelva a crear el curso por defecto, aunque las páginas  html del contenido permanecerán siempre intactas
			let respuesta = this.curso.nombre != "Alfabetización informática";
			return respuesta;
		},
		existeImagenTemporal() {
			let existe = true;
			if (
				Object.keys(this.imagenTemporal).length == 0 ||
				!this.imagenTemporal
			) {
				existe = false;
			}

			return existe;
		},
	},
});
