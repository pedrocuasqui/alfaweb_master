/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {
	// By convention, this is a good place to set up fake data during development.
	//
	// For example:
	// ```
	// // Set up fake development data (or if we already have some, avast)

	//ELIMINAR LOS SUBMODULOS QUE NO PERTENECEN A NINGUN MODULO
	var submodulos = await SubmoduloLibro.find({});
	if (submodulos) {
		for (let contador = 0; contador < submodulos.length; contador++) {
			let modulo = await ModuloLibro.findOne({
				id: submodulos[contador].modulo
			});
			if (!modulo) {
				let SubmoduloEliminado = await SubmoduloLibro.destroyOne({
					id: submodulos[contador].id
				});
			}
		}
	}
	// else{
	//   //si no existe ningun submodulo quiere decir que se han borrado, entonces deben volverse a crear
	//   //se borra el curso alfabetizacion para que se vuelva a crear todo
	//   var cursoAlfaEliminado= await Curso.destroyOne({nombre:'Alfabetización informática'});
	// }

	var cursoCreado;
	//ELIMINAR MODULOS QUE NO PERTENENCEN A NINGUN CURSO
	var modulos = await ModuloLibro.find({});
	if (modulos) {
		for (let contador = 0; contador < modulos.length; contador++) {
			let curso = await Curso.findOne({ id: modulos[contador].curso });
			if (!curso) {
				let sulbmodulosEliminados = await SubmoduloLibro.destroy({
					modulo: modulos[contador].id
				}).fetch();

				sulbmodulosEliminados.forEach(element => {});

				let moduloEliminado = await ModuloLibro.destroyOne({
					id: modulos[contador].id
				});
			}
		}
	}
	// else{

	//   //si no existe ningun MODULO quiere decir que se han borrado, entonces deben volverse a crear
	//   //se borra el curso alfabetizacion para que se vuelva a crear todo
	//   // var cursoAlfaEliminado= await Curso.destroyOne({nombre:'Alfabetización informática'});
	// }

	//PARA QUE SE EJECUTE EL RESTO DE CODIGO, ELIMINAR EL CURSO DE NOMBRE: Alfabetización informática EN LA BASE DE DATOS
	var cursoAlfa = await Curso.findOne({ nombre: "Alfabetización informática" });
	if (!cursoAlfa) {
		cursoCreado = await Curso.create({
			nombre: "Alfabetización informática",
			descripcion: "Enseñanza de informática básica",
			publicado: true
			// profesor: profesorCreado.id
		}).fetch();

		var moduloCreado;

		moduloCreado = await ModuloLibro.create({
			nombreModulo: "Módulo 1- La computadora",
			descripcion:
				"La computadora es una máquina electrónica capaz de recibir un conjunto de órdenes y ejecutarlas realizando cálculos complejos, o agrupando y correlacionando otro tipo de información. Es también conocida como ordenador o computador.",
			enlace: "m1-computadora",
			multimedia: {
				imagen: "/images/informaticabasica/portadas_modulos/m1.png"
			},
			curso: cursoCreado.id,
			contenidoTiny: "<p>Pulse para editar</p>",
			color: "" // "#92E512"
		}).fetch();
		await SubmoduloLibro.createEach([
			{
				nombreSubmodulo: "Hardware",
				descripcion:
					"El Hardware se define principalmente como el conjunto de componentes y dispositivos físicos y tangibles que integran una computadora. ",
				enlace: "m1-hardware",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar </p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 1,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Cuestionario",
					preguntas: [
						{
							enunciado:
								'<p>&iquest;Qu&eacute; parte se considera el cerebro del computador? </p>\n<p><span style="font-size: 1rem;"><img src="https://aenom87820fvvps.belugacdn.link/857-home_default/cpu-solo-computador-core-i5-300ghz-7ma-generacion-8gb-1000gb-1tb-dvdrw.jpg" alt="" width="98" height="98" /></span></p>',
							opciones: {
								opcion1: "Impresora",
								opcion2: "Teclado",
								opcion3: "Monitor",
								opcion4: "CPU"
							},
							respuesta: "CPU",
							pista: null,
							pregNumero: 1
						},
						{
							enunciado:
								'<p style="text-align: center;">&iquest;Cual es la funci&oacute;n principal de monitor?</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://images-na.ssl-images-amazon.com/images/I/71mBU1vbrJL._SX466_.jpg" alt="" width="123" height="123" /></p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: "Almacena datos e información.",
								opcion2: "Ingresa  la información  a la computadora",
								opcion3: "Permitir al usuario interactuar con la computadora",
								opcion4: "Realiza una copia de documentos"
							},
							respuesta: "Permitir al usuario interactuar con la computadora",
							pista: null,
							pregNumero: 2
						},
						{
							enunciado:
								'<p>&nbsp;El dispositivo que permite ingresar informaci&oacute;n a una computadora o dispositivo por medio de <span style="color: #f1c40f;"><strong>caracteres</strong> </span>es:&nbsp;</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: "El mouse",
								opcion2: "El monitor",
								opcion3: "El teclado",
								opcion4: "La impresora"
							},
							respuesta: "El teclado",
							pista: "",
							pregNumero: 3
						},
						{
							enunciado:
								'<p>El hardware se define como</p>\n<p>&nbsp;<img style="font-size: 1rem;" src="https://www.ejemplode.com/images/uploads/informatica/hardware.jpg" width="187" height="187" /></p>',
							opciones: {
								opcion1:
									"Las aplicaciones instaladas en un computador o dispositivo móvil",
								opcion2:
									"Conjunto de aplicaciones y componentes físicos que integran una computadora",
								opcion3:
									"El conjunto de componentes y dispositivos físicos y tangibles que integran una computadora.",
								opcion4: "Ninguna de las anteriores"
							},
							respuesta:
								"El conjunto de componentes y dispositivos físicos y tangibles que integran una computadora.",
							pista: "Tiene que ver con la parte física",
							pregNumero: 4
						},
						{
							enunciado:
								'<p style="text-align: center;">El siguiente dispositivo se conoce como:</p>\n<p style="text-align: center;"><a title="Image from freeiconspng.com" href="https://www.freeiconspng.com/img/23281"><img src="https://www.freeiconspng.com/uploads/mouse-png-11.png" alt="High quality Mouse Cliparts For Free!" width="109" height="103" /></a></p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: "Teclado",
								opcion2: "Puntero",
								opcion3: "Mouse o ratón",
								opcion4: "Dispositivo de salida"
							},
							respuesta: "Mouse o ratón",
							pista: "Tiene el nombre de un animal",
							pregNumero: 5
						}
					],
					tiempoMaximoPorPregunta: 100,
					publicada: true
				}
			},
			{
				nombreSubmodulo: "El Teclado",
				descripcion:
					"El teclado es un instrumento externo que está representado por un conjunto de teclas, que se encargan de ingresar una información a una computadora o dispositivo por medio de caracteres (letras, números y símbolos).",
				enlace: "m1-hardware-teclado",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 2,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Emparejamiento",
					preguntas: [
						{
							enunciado:
								'<p style="text-align: center;">Las teclas de funci&oacute;n:<img style="font-size: 1rem; display: block; margin-left: auto; margin-right: auto;" src="https://i.pinimg.com/originals/30/62/87/306287397d539b235c1b1cb00b934fb0.jpg" alt="Resultado de imagen de tecla f1 gift" width="156" height="117" /></p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Sirven como atajos para acceder rápidamente a determinadas funciones en los distintos programas.",
							pista: "Tiene que ver con hacer más rápido",
							pregNumero: 1
						},
						{
							enunciado:
								'<p style="text-align: center;">&nbsp;En general, la tecla F1 :</p>\n<p><img style="font-size: 1rem; display: block; margin-left: auto; margin-right: auto;" src="https://d286ib5nnf9jej.cloudfront.net/wp-content/uploads/2017/05/teclas-funcion-teclado-f1-f2-f3-f4-mediatrends-2-750x500.jpg" alt="Resultado de imagen de tecla f1" width="166" height="111" /></p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Está asociada a la ayuda que ofrecen los distintos programas",
							pista: "Relacionado con ayuda",
							pregNumero: 2
						},
						{
							enunciado:
								'<p style="text-align: center;">La tecla F5:<img style="font-size: 1rem; display: block; margin-left: auto; margin-right: auto;" src="https://2.bp.blogspot.com/-WZjXbsKJGpw/WfS3RPaQmqI/AAAAAAAACbM/uTutxdX01rs5_T3zq7dPGkwLLsURRgvZgCLcBGAs/s1600/ass2.jpg" alt="Resultado de imagen de tecla f5" width="161" height="162" /></p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "Actualiza el contenido de la ventana seleccionada.",
							pista: "Relacionado con renovar",
							pregNumero: 3
						},
						{
							enunciado:
								'<p style="text-align: center;">La Tecla F11:&nbsp;</p>\n<p style="text-align: center;">&nbsp;<img style="font-size: 1rem;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQpS0dzKs8zntFh3Xqj9tpi9AFNUNJzZWoUIfA6OQ6N55yxz3F" alt="Resultado de imagen de tecla f11" width="217" height="87" /></p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Habilita el modo de pantalla completa en el navegador web",
							pista: null,
							pregNumero: 4
						},
						{
							enunciado:
								'<p style="text-align: center;">Las teclas alfanum&eacute;ricas:<img style="font-size: 1rem; display: block; margin-left: auto; margin-right: auto;" src="https://3.bp.blogspot.com/-6DU9NgC4SRo/VOeDR7Iz64I/AAAAAAAABh8/swVLJC7Ddsc/s1600/teclas%2Balfanumericas.png" alt="Resultado de imagen de teclas alfanum&eacute;ricas" width="342" height="138" /></p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Sirven para escribir porque incluyen las letras del alfabeto, números, signos de puntuación y símbolos que se encuentran en las máquinas de escribir tradicionales",
							pista: "Son las más usadas",
							pregNumero: 5
						},
						{
							enunciado:
								"<p>Ejemplos de teclas especiales son:&nbsp;</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Bloq Mayús, Barra espaciadora, Ctrl, Alt, la tecla del logotipo de Windows y Esc",
							pista: null,
							pregNumero: 6
						},
						{
							enunciado:
								'<p style="text-align: center;">Las teclas de posici&oacute;n:</p>\n<p style="text-align: center;"><img src="https://i.pinimg.com/originals/c4/7d/88/c47d88963c6fd217884893c33bdc661d.gif" alt="Resultado de imagen de Movimiento gracioso gif" width="90" height="123" /></p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Se utilizan para desplazarse por documentos o páginas web y editar texto. ",
							pista: null,
							pregNumero: 7
						},
						{
							enunciado:
								'<p style="text-align: center;">El teclado num&eacute;rico:</p>\n<p style="text-align: center;"><img src="https://cdn.shopify.com/s/files/1/0025/1215/8835/collections/Teclados_Numericos_1200x1200.png?v=1532360772" alt="Resultado de imagen de teclado num&eacute;rico background transparednt" width="127" height="127" /></p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "Sirve para escribir los números en forma más rápida.",
							pista: null,
							pregNumero: 8
						},
						{
							enunciado:
								'<p>Las teclas&nbsp;&nbsp;"impr pant", "bloq despl" y "pause"</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "Son otras teclas con funciones especiales",
							pista: null,
							pregNumero: 9
						},
						{
							enunciado:
								'<p style="text-align: center;">La tecla ESC (Escape):</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://www.alegsa.com.ar/Imagen/escape.jpg" alt="Resultado de imagen de tecla escape esc" width="150" height="132" /></p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Generalmente sirve para salir de la pantalla temporal que se muestra en pantalla",
							pista: null,
							pregNumero: 10
						}
					],
					tiempoMaximoPorPregunta: "200",
					publicada: true
				}
			},
			{
				nombreSubmodulo: "Mouse",
				descripcion:
					"El mouse es uno de los periféricos de entrada que forman parte de un computador, a través de él se puede interactuar directamente con la computadora mediante un puntero (indicador) que se muestra en la pantalla. ",
				enlace: "m1-hardware-mouse",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 3,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Cuestionario",
					preguntas: [
						{
							enunciado:
								"<p>El mouse es un elemento que permite controlar al ordenador usando una mano por medio de un puntero.</p>",
							opciones: {
								opcion1: "Falso",
								opcion2: "Verdadero",
								opcion3: null,
								opcion4: null
							},
							respuesta: "Verdadero",
							pista: null,
							pregNumero: 1
						},
						{
							enunciado:
								"<p>El mouse &Oacute;ptico, funciona con una luz en lugar de una esfera.</p>",
							opciones: {
								opcion1: "Falso",
								opcion2: "Verdadero",
								opcion3: null,
								opcion4: null
							},
							respuesta: "Verdadero",
							pista: null,
							pregNumero: 2
						},
						{
							enunciado:
								"<p>Dar click hace referencia a la acci&oacute;n de presionar un bot&oacute;n del mouse o rat&oacute;n, generalmente el izquierdo</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: "Falso",
								opcion2: "Verdadero",
								opcion3: null,
								opcion4: null
							},
							respuesta: "Verdadero",
							pista: null,
							pregNumero: 3
						},
						{
							enunciado:
								"<p>El clic derecho del rat&oacute;n o mouse es la acci&oacute;n de presionar (hacer clic) sobre el scroll del mouse</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: "False",
								opcion2: "Verdadero",
								opcion3: null,
								opcion4: null
							},
							respuesta: "False",
							pista: null,
							pregNumero: 4
						},
						{
							enunciado:
								'<p>Que clicks se dan en la siguiente imagen:</p>\n<p><img src="https://i.stack.imgur.com/dtS3o.gif" /></p>',
							opciones: {
								opcion1: "Click derecho, Scroll, Click izquierdo",
								opcion2: "Click derecho, Click izquierdo ",
								opcion3: "Scroll, Click derecho, Click izquierdo",
								opcion4: "Ninguna de las anteriores"
							},
							respuesta: "Click derecho, Click izquierdo",
							pista: null,
							pregNumero: 5
						},
						{
							enunciado: "<p>El Scroll sirve para:</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: "Generalmente sirve para abrir documentos.",
								opcion2: "Generalmente sirve para mostrar opciones.",
								opcion3:
									"Generalmente sirve para desplazar el contenido de la pantalla.",
								opcion4: "Generalmente sirve para borrar documentos"
							},
							respuesta:
								"Generalmente sirve para desplazar el contenido de la pantalla.",
							pista: null,
							pregNumero: 6
						}
					],
					tiempoMaximoPorPregunta: "180",
					publicada: true
				}
			},

			{
				nombreSubmodulo: "Software",
				descripcion:
					"Conjunto de programas necesarios para llevar a cabo las tareas dentro del computador. Se compone de un Sistema Operativo y un conjunto de aplicaciones que manipulan o son manipulados por los componentes físicos del computador, algunos ejemplos son: Windows, Microsoft Word, Google Chrome, Adobe, etc. ",
				enlace: "m1-software",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 4,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Emparejamiento",
					preguntas: [
						{
							enunciado:
								'<p style="text-align: center;">Software es:&nbsp;</p>\n<p style="text-align: center;"><img src="https://i.ytimg.com/vi/SPZiO0JrftY/maxresdefault.jpg" width="356" height="200" /></p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"El conjunto de programas necesarios para llevar a cabo las tareas dentro del computador.",
							pista: null,
							pregNumero: 1
						},
						{
							enunciado:
								'<p style="text-align: center;">Microsoft Windows es:</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.dlpng.com/static/png/40999_preview.png" width="245" height="230" /></p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Un sistema operativo, es decir, un conjunto de programas que posibilita la administración de los recursos de una computadora. ",
							pista: null,
							pregNumero: 2
						},
						{
							enunciado:
								'<p style="text-align: center;">ESET es:</p>\n<p style="text-align: center;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/ESET_logo.svg/1280px-ESET_logo.svg.png" width="228" height="90" /></p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "Una empresa pionera en protección antivirus",
							pista: null,
							pregNumero: 3
						},
						{
							enunciado:
								'<p style="text-align: center;">Linux es:&nbsp;</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/300px-NewTux.svg.png" width="172" height="207" /></p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "Un sistema operativo libre",
							pista: null,
							pregNumero: 4
						},
						{
							enunciado:
								"<p>Otros ejemplos de software son:</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Microsoft Word, Power Point, Google Chrome, Reproductor de Windows",
							pista: null,
							pregNumero: 5
						}
					],
					tiempoMaximoPorPregunta: "100",
					publicada: true
				}
			},
			{
				nombreSubmodulo: "Conexión de los componentes a la computadora",
				descripcion:
					"La forma en que el hardware opera es por medio de energía, el hardware externo se conecta a la computadora por medio de cables o inalámbricamente, en el ejemplo se explica como conectar los principales componentes a la computadora",
				enlace: "m1-conexion-componentes",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 5,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Cuestionario",
					preguntas: [
						{
							enunciado:
								"<p>En el video, que componenentes se conectan a la torre o CPU</p>",
							opciones: {
								opcion1: "Iphone, Impresora, cargador",
								opcion2: "Scanner, Impresora, Mouse",
								opcion3: "Impresora",
								opcion4: "Mouse, Teclado, Monitor"
							},
							respuesta: "Mouse, Teclado, Monitor",
							pista: null,
							pregNumero: 1
						},
						{
							enunciado:
								'<p style="text-align: center;">El cable VGA conecta<img style="font-size: 1rem; display: block; margin-left: auto; margin-right: auto;" src="https://revista.jovenclub.cu/wp-content/uploads/2018/07/Cable-VGA-Web-678x381.png" width="334" height="188" /></p>',
							opciones: {
								opcion1: "El mouse con la torre o CPU",
								opcion2: "El monitor con la torre o CPU",
								opcion3: "El teclado con la torre o CPU",
								opcion4: "La fuente de poder con la torre o CPU"
							},
							respuesta: "El monitor con la torre o CPU",
							pista: null,
							pregNumero: 2
						},
						{
							enunciado:
								'<p style="text-align: center;">El conector de la imagen se usa para conectar:</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://cdn.shopify.com/s/files/1/0025/1215/8835/collections/Cables_de_Poder_para_PC_580x.png" width="278" height="278" /></p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: "El Mouse y el Teclado",
								opcion2: "El teclado y la torre o CPU",
								opcion3: "El Monitor y la torre o CPU",
								opcion4: "El teclado"
							},
							respuesta: "El Monitor y la torre o CPU",
							pista: null,
							pregNumero: 3
						},
						{
							enunciado:
								"<p>Que precauci&oacute;n se debe tomar antes de encender el computador</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1:
									"Verificar que el computador tenga instalado un sistema operativo",
								opcion2: "Verificar que cada parte haya sido bien conectada",
								opcion3: "Verificar que el regulador esté encendido",
								opcion4:
									"Verificar que todos los puertos usb se encuentren ocupados"
							},
							respuesta: "Verificar que cada parte haya sido bien conectada",
							pista: null,
							pregNumero: 4
						}
					],
					tiempoMaximoPorPregunta: "400",
					publicada: true
				}
			},
			{
				nombreSubmodulo: "Encender y apagar la computadora",
				descripcion:
					"En este módulo aprenderás a encender y apagar la computadora ",
				enlace: "m1-encender-computadora",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 6,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Emparejamiento",
					preguntas: [
						{
							enunciado:
								"<p>Primer paso para encender el computador</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Encender el CPU, para ello diríjase al botón de encendido del equipo, por lo general es un círculo con una línea en el centro",
							pista: null,
							pregNumero: 1
						},
						{
							enunciado:
								"<p>Segundo paso para encender el computador</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Encender el monitor, para ello diríjase hacia la parte inferior derecha de la pantalla que es donde generalmente se encuentra el botón de encendido",
							pista: null,
							pregNumero: 2
						},
						{
							enunciado:
								"<p>Tercer paso para encender el computador</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: " Seleccionar un usuario",
							pista: null,
							pregNumero: 3
						},
						{
							enunciado:
								"<p>&iquest;Qu&eacute; hace al computador al encender?</p>",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Carga los programas y muestra accesos directos en el escritorio",
							pista: null,
							pregNumero: 4
						}
					],
					tiempoMaximoPorPregunta: "240",
					publicada: true
				}
			}
		]);

		moduloCreado = await ModuloLibro.create({
			nombreModulo: "Módulo 2- Navegación en el escritorio",
			descripcion:
				"En este módulo aprenderás a reconocer las partes del escritorio de la computadora y de forma básica aprender a usar sus aplicaciones.",
			enlace: "m2-navegacion-escritorio",
			multimedia: {
				imagen: "/images/informaticabasica/portadas_modulos/m2.png"
			},
			curso: cursoCreado.id,
			contenidoTiny: "<p>Pulse para editar</p>",
			color: "" //  "#467895"
		}).fetch();

		await SubmoduloLibro.createEach([
			{
				nombreSubmodulo: "Aplicaciones informáticas",
				descripcion:
					"Una aplicación informática es un software que les posibilita a los usuarios interesados en la tecnología realizar diferentes tipos de trabajos a través de este. Como por ejemplo podemos mencionar los diferentes procesadores de textos, las hojas de cálculos entre otros. ",
				enlace: "m2-aplicaciones",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 1,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Emparejamiento",
					preguntas: [
						{
							enunciado: "<p>Los &iacute;conos son:</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Aquellas imágenes que representan a las aplicaciones, y son visibles aún cuando no se encuentre activa la aplicación.",
							pista: null,
							pregNumero: 1
						},
						{
							enunciado:
								"<p>Una aplicaci&oacute;n inform&aacute;tica es:</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Un software que les posibilita a los usuarios interesados en la tecnología realizar diferentes tipos de trabajos ",
							pista: null,
							pregNumero: 2
						},
						{
							enunciado:
								"<p>Una opci&oacute;n para abrir una aplicaci&oacute;n es:</p>",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "Dar doble click en el ícono del escritorio",
							pista: null,
							pregNumero: 3
						},
						{
							enunciado:
								'<p style="text-align: center;">El siguiente es un &iacute;cono de Word, &iquest;En que otro lugar se puede encontrar este &iacute;cono?</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Microsoft_Word_2013_logo.svg/2000px-Microsoft_Word_2013_logo.svg.png" alt="" width="167" height="164" /></p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Dando click en el botón inicio y buscando en la lista de aplicaciones",
							pista: null,
							pregNumero: 4
						}
					],
					tiempoMaximoPorPregunta: "200",
					publicada: true
				}
			},
			{
				nombreSubmodulo: "Gestión de archivos",
				descripcion:
					"Un archivo o fichero informático es un conjunto de bits almacenados en un dispositivo. Un archivo es identificado por un nombre y la descripción de la carpeta o directorio que lo contiene. A los archivos informáticos se les llama así porque son los equivalentes digitales de los archivos escritos en expedientes, tarjetas, libretas, papel o microfichas del entorno de oficina tradicional.",
				enlace: "m2-gestion-archivos",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 2,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Emparejamiento",
					preguntas: [
						{
							enunciado:
								'<p>Paso 1 para <span style="background-color: #2dc26b;">crear</span> un archivo</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Ubicarse en el lugar en el que se va a crear el archivo",
							pista: null,
							pregNumero: 1
						},
						{
							enunciado:
								'<p>Paso 2 para <span style="background-color: #2dc26b;">crear</span> un archivo</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "Con el mouse dar clic derecho en un espacio vacío",
							pista: null,
							pregNumero: 2
						},
						{
							enunciado:
								'<p>Paso 3 para <span style="background-color: #2dc26b;">crear</span> un archivo</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "En la lista de opciones seleccionar la opción nuevo",
							pista: null,
							pregNumero: 3
						},
						{
							enunciado:
								'<p>Paso 4 para <span style="background-color: #2dc26b;">crear</span> un archivo</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"En la siguiente lista de opciones seleccionar el archivo que se desea crear",
							pista: null,
							pregNumero: 4
						},
						{
							enunciado:
								'<p>Paso 5 para <span style="background-color: #2dc26b;">crear</span> un archivo</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"Se crea el icono del archivo creado, darle un nombre al archivo",
							pista: null,
							pregNumero: 5
						},
						{
							enunciado:
								'<p>Paso 1 para <span style="background-color: #b96ad9;">renombrar</span> un archivo</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "Seleccionar el archivo que desea renombrar",
							pista: null,
							pregNumero: 6
						},
						{
							enunciado:
								'<p>Paso 2 para <span style="background-color: #b96ad9;">renombrar </span>un archivo</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: " Dar clic derecho sobre el objeto seleccionado",
							pista: null,
							pregNumero: 7
						},
						{
							enunciado:
								'<p>Paso 3 para <span style="background-color: #b96ad9;">renombrar</span> un archivo</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta:
								"En la lista de opciones seleccionar la opción renombrar",
							pista: null,
							pregNumero: 8
						},
						{
							enunciado:
								'<p>Paso 4 para <span style="background-color: #b96ad9;">renombrar</span> un archivo</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "Escribir el nombre deseado y dar ENTER",
							pista: null,
							pregNumero: 9
						}
					],
					tiempoMaximoPorPregunta: "360",
					publicada: true
				}
			},
			{
				nombreSubmodulo: "La papelera de reciclaje",
				descripcion:
					"La Papelera de reciclaje es el lugar donde se almacena la información que fue eliminada. Permite la recuperación de información que fue eliminada por equivocación.",
				enlace: "m2-papelera",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 3,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Cuestionario",
					preguntas: [
						{
							enunciado:
								"<p>La papelera de reciclaje se encuentra vac&iacute;a cuando no se ha borrado ning&uacute;n archivo:</p>",
							opciones: {
								opcion1: "Falso",
								opcion2: "Verdadero",
								opcion3: null,
								opcion4: null
							},
							respuesta: "Verdadero",
							pista: null,
							pregNumero: 1
						},
						{
							enunciado:
								"<p>Si el usuario elimina un nuevo archivo y la papelera est&aacute; por llenarse, reacciona eliminando suficientes archivos para que la carpeta no se llene en exceso.</p>",
							opciones: {
								opcion1: "Verdadero",
								opcion2: "Falso",
								opcion3: null,
								opcion4: null
							},
							respuesta: "Verdadero",
							pista: null,
							pregNumero: 2
						},
						{
							enunciado:
								'<p style="text-align: center;">La imagen a continuaci&oacute;n representa una papelera llena</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://genesismurillorivas.files.wordpress.com/2015/12/papeleras-reciclaje-049.png" /></p>',
							opciones: {
								opcion1: "Falso",
								opcion2: "Verdadero",
								opcion3: null,
								opcion4: null
							},
							respuesta: "Falso",
							pista: null,
							pregNumero: 3
						},
						{
							enunciado:
								"<p>La papelera permite la recuperaci&oacute;n de informaci&oacute;n que ha sido borrada</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: "Falso",
								opcion2: "Verdadero",
								opcion3: null,
								opcion4: null
							},
							respuesta: "Verdadero",
							pista: null,
							pregNumero: 4
						}
					],
					tiempoMaximoPorPregunta: "200",
					publicada: true
				}
			}
		]);

		moduloCreado = await ModuloLibro.create({
			nombreModulo: "Módulo 3- Documento Word",
			descripcion:
				"Microsof Office Word 2016 es un procesador de textos, un software para la creación, edición, modificación y procesamiento de  documentos de texto con formato: tipo y tamaño de la tipografía, colores, tipos de párrafos, efectos artísticos, adición de gráficos, etc.",
			enlace: "m3-documento-word",
			multimedia: {
				imagen: "/images/informaticabasica/portadas_modulos/m3.png"
			},
			curso: cursoCreado.id,
			contenidoTiny: "<p>Pulse para editar</p>",
			color: "" //  "#456892"
		}).fetch();
		await SubmoduloLibro.createEach([
			{
				nombreSubmodulo: "Pantalla principal de word",
				descripcion:
					"La pantalla principal del editor de texto Microsoft word presenta varias opciones para editar el contenido del documento",
				enlace: "m3-pantalla-word",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 1,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Cuestionario",
					preguntas: [
						{
							enunciado:
								'<p style="text-align: center;">La secci&oacute;n mostrada a continuaci&oacute;n, recibe el nombre de:</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://support.content.office.net/es-es/media/f48f1f75-3fd1-4c56-9b09-a8ec291d21c6.png" /></p>',
							opciones: {
								opcion1: "Barra de estado",
								opcion2: "Barra de desplazamiento",
								opcion3: "Cinta de opciones",
								opcion4: "Área de trabajo"
							},
							respuesta: "Cinta de opciones",
							pista: null,
							pregNumero: 1
						},
						{
							enunciado: "<p>La cinta de opciones</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: "Es un conjunto de herramietas de dibujo",
								opcion2:
									"Es un conjunto de herramientas que te permite acceder rápidamente a los comandos que necesitas para crear o editar un documento",
								opcion3: "Es un conjunto de herramientas de diseño gráfico",
								opcion4: "No pertenece a Microsoft Word"
							},
							respuesta:
								"Es un conjunto de herramientas que te permite acceder rápidamente a los comandos que necesitas para crear o editar un documento",
							pista: null,
							pregNumero: 2
						},
						{
							enunciado: "<p>El &aacute;rea de trabajo</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: "Es una opción de la barra de herrramientas",
								opcion2: "Es un lienzo para dibujar con paint",
								opcion3:
									"Es un conjunto de herramientas para editar el documento",
								opcion4:
									"Está situada en la parte central, muestra el documento que estamos editando"
							},
							respuesta:
								"Está situada en la parte central, muestra el documento que estamos editando",
							pista: null,
							pregNumero: 3
						},
						{
							enunciado:
								'<p style="text-align: center;">La barra de desplazamiento:</p>\n<p>&nbsp;</p>',
							opciones: {
								opcion1:
									"Es un conjunto de barras de herramientas que te permite acceder rápidamente a los comandos que necesitas para crear o editar un documento",
								opcion2: "Permite deslizar la hoja hacia arriba o abajo",
								opcion3:
									"Esta ubicada en la parte inferior del área de trabajo",
								opcion4: "No existe en este Software"
							},
							respuesta: "Permite deslizar la hoja hacia arriba o abajo",
							pista: null,
							pregNumero: 4
						}
					],
					tiempoMaximoPorPregunta: "240",
					publicada: true
				}
			},
			{
				nombreSubmodulo: "Área de trabajo",
				descripcion:
					"El área de trabajo se encuentra situada en la parte central de la pantalla de word, muestra el documento que estamos editando en una hoja digital en blanco .",
				enlace: "m3-area-trabajo",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 2,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: {
					tipo: "Cuestionario",
					preguntas: [
						{
							enunciado:
								"<p>El &aacute;rea de trabajo se encuentra situada en la parte central de la pantalla de word</p>",
							opciones: {
								opcion1: "Verdadero",
								opcion2: "Falso",
								opcion3: null,
								opcion4: null
							},
							respuesta: "Verdadero",
							pista: null,
							pregNumero: 1
						},
						{
							enunciado:
								"<p>El &aacute;rea de trabajo presenta una hoja en blanco en la que podemos ingresar el contenido por medio del teclado.</p>\n<p>&nbsp;</p>",
							opciones: {
								opcion1: "Falso",
								opcion2: "Verdadero",
								opcion3: null,
								opcion4: null
							},
							respuesta: "Verdadero",
							pista: null,
							pregNumero: 2
						}
					],
					tiempoMaximoPorPregunta: "120",
					publicada: true
				}
			},
			{
				nombreSubmodulo: "Barra de título",
				descripcion:
					"Situada en el extremo superior. En ella aparecerá el título de nuestro trabajo que, en un principio, será denominado “Documento 1”, pero que al guardar podemos renombrar asignándole el título que consideremos oportuno",
				enlace: "m3-barra-titulo",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 3,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Barra de herramientas de acceso rápido",
				descripcion:
					"Nos da acceso a determinadas acciones que forman parte de los diferentes elementos de menú, pero que se encuentran disponibles de forma directa a partir de esta barra, por ser las más usuales.",
				enlace: "m3-barra-acceso-rapido",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 4,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Barra o cinta de opciones",
				descripcion:
					"Esta barra de herramientas es la más importante, ya que contiene todas las acciones para trabajar sobre nuestro documento. Se compone de una serie de pestañas con sus correspondientes comandos, situados en la parte inferior.",
				enlace: "m3-barra-opciones",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 5,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Otras Opciones",
				descripcion:
					"Otras opciones de la ventana principal de word son: la barra de desplazamiento en la parte lateral derecha, la barra de estado en la parte inferior, y un botón par iniciar sesión con una cuenta de Mcrosoft.",
				enlace: "m3-otras-opciones",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 6,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			}
			// {
			//   nombreSubmodulo: 'Barra de estado',
			//   descripcion: ' Situada en la parte inferior, es la que nos informa sobre el estado de nuestro documento: cuántas palabras hemos escrito, en qué página estamos. Además, nos da acceso a la revisión ortográfica y gramatical, a diferentes vistas del documento o al zoom ',
			//   enlace:'/m3-barra-estado',
			//   multimedia: {},
			//   contenidoTiny: '<p>Pulse para editar</p>',
			//   modulo: moduloCreado.id,
			//   ordenNavegacion:7
			// },

			// {
			//   nombreSubmodulo: 'Barra de desplazamiento',
			//   descripcion: 'La barra de desplazamiento está situada en la parte lateral derecha, nos permite movernos por todo el documento  y por sus distintas páginas hacia abajo, según las vayamos incorporando. ',
			//   enlace:'/m3-barra-desplazamiento',
			//   multimedia: {},
			//   contenidoTiny: '<p>Pulse para editar</p>',
			//   modulo: moduloCreado.id,
			//   ordenNavegacion:8
			// }
		]);

		moduloCreado = await ModuloLibro.create({
			nombreModulo: "Módulo 4-Edición de documentos Word",
			descripcion:
				"En este módulo aprenderás como editar un documento de word con ejemplos",
			enlace: "m4-edicion-word",
			multimedia: {
				imagen: "/images/informaticabasica/portadas_modulos/m4.png"
			},
			curso: cursoCreado.id,
			contenidoTiny: "<p>Pulse para editar</p>",
			color: "" //"#223458"
		}).fetch();
		await SubmoduloLibro.createEach([
			{
				nombreSubmodulo: "El portapapeles",
				descripcion:
					"La opción portapapeles muestra opciones para copiar y pegar ya sea, texto, imágenes o un formato existente",
				enlace: "m4-portapapeles",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 1,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Ortografía y gramática",
				descripcion:
					"Las opciones Ortografía y gramática permite principalmente corregir los errores ortográficos generados al redactar un documento. ",
				enlace: "m4-ortografia",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 2,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Guardar e imprimir un documento",
				descripcion: "Como guardar e imprimir un documento de word. ",
				enlace: "m4-guardar",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 3,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Diseño de página",
				descripcion:
					"Permite modificar principalmente la forma de visualización del documento y su contenido, por ejemplo, crear una hoja de forma horizontal, crear dos columnas de texto, etx. ",
				enlace: "m4-disenio",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 4,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			}

			// {
			//   nombreSubmodulo: '',
			//   descripcion: '',
			//   enlace:'',
			//   multimedia: {},
			//   contenidoTiny: '<p>Pulse para editar</p>',
			//   modulo: moduloCreado.id,
			//   ordenNavegacion:1
			// }
		]);

		//El modulo 5 puede estar dentro del modulo 4
		// moduloCreado = await ModuloLibro.create({
		//   nombreModulo: 'Módulo 5- Inserción de imágenes y tablas',
		//   descripcion: 'descripcion Modulo 5',
		//   enlace:"m5-insercion-imagenes',
		//   multimedia: {},
		//   curso: cursoCreado.id,
		//   contenidoTiny: '<p>Pulse para editar</p>',
		// }).fetch();
		// await SubmoduloLibro.createEach([
		//   {
		//     nombreSubmodulo: '',
		//     descripcion: '',
		//     enlace:'',
		//     multimedia: {},
		//     contenidoTiny: '<p>Pulse para editar</p>',
		//     modulo: moduloCreado.id,
		//   }
		//   ]);
		moduloCreado = await ModuloLibro.create({
			nombreModulo: "Módulo 5 - Navegar en Internet",
			descripcion:
				"Llamamos navegar por la red, a la acción de visitar o pedir páginas del tipo web en nuestro ordenador. Al navegar, el usuario pasa de una página web a otra, lo que supone una especie de recorrido. El software que permite este proceso se conoce como navegador.",
			enlace: "m5-navegar-internet",
			multimedia: {
				imagen: "/images/informaticabasica/portadas_modulos/m5.png"
			},
			curso: cursoCreado.id,
			contenidoTiny: "<p>Pulse para editar</p>",
			color: "" // "#92E512"
		}).fetch();
		await SubmoduloLibro.createEach([
			{
				nombreSubmodulo: "Dirección web",
				descripcion:
					"La dirección web es una línea de texto que permite ubicar una página o un sitio web en internet, por medio de un navegador",
				enlace: "m5-direccion-web",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 1,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Nombres de dominio",
				descripcion:
					'Un nombre de dominio es la "dirección en la red" que posee una página o sitio web determinada. Ejemplo, www.clomputech.com.',
				enlace: "m5-nombres-dominio",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 2,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Navegador web",
				descripcion:
					"Un navegador web es la herramienta de software que nos permite acceder a información de internet, los más conocidos son: Google Chrome, Mozilla firefox y Microsoft Edge ",
				enlace: "m5-navegador-web",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 3,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Motores de navegación",
				descripcion:
					'Un MOTOR DE BÚSQUEDA, también conocido como "buscador", es un sistema informático que busca archivos almacenados en servidores web',
				enlace: "m5-motores-navegacion",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 4,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			}
		]);
		moduloCreado = await ModuloLibro.create({
			nombreModulo: "Módulo 6 - Correo Electrónico y Skype",
			descripcion:
				"En este módulo aprenderás a usar medios de comunicación en línea principalmente lo referente a correo electrónico y videollamadas",
			enlace: "m6-medios-comunicacion",
			multimedia: {
				imagen: "/images/informaticabasica/portadas_modulos/m6.png"
			},
			curso: cursoCreado.id,
			contenidoTiny: "<p>Pulse para editar</p>",
			color: "" // "#321654"
		}).fetch();
		await SubmoduloLibro.createEach([
			{
				nombreSubmodulo: "Creación de una cuenta de correo electónico",
				descripcion:
					"Correo electrónico es un servicio electrónico mediante el cual se puede enviar y recibir mensaje de manera instantánea mediante Internet.",
				enlace: "m6-creacion-cuenta",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 1,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Envío de correo electrónico",
				descripcion:
					"El envío de correo electrónico se refiere a la acción de redactar el texto a enviar y establecer los parámetros de un destinatario",
				enlace: "m6-envio-correo",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 2,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Creación de una cuenta SKYPE",
				descripcion:
					"Skype es un servicio que permite realizar intercambio de texto, voz y video, con la finalidad de comunicar a dos o más usuarios por medio de Internet.",
				enlace: "m6-cuenta-skype",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 3,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Realizar videollamadas",
				descripcion:
					"Una videollamada es una forma de comunicación por internet que permite ver, oir y hablar al receptor en tiempo real",
				enlace: "m6-realizar-videollamada",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 4,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			}
		]);
		moduloCreado = await ModuloLibro.create({
			nombreModulo: "Módulo 7 - Páginas de Internet",
			descripcion:
				"Una Página Web es conocida como un documento de tipo electrónico, contiene información digital, la cual puede venir dada por datos visuales y/o sonoros, o una mezcla de ambos, a través de textos, imágenes, gráficos, audio o vídeos y otros tantos elementos dinámicos o estáticos.",
			enlace: "m7-paginas-internet",
			multimedia: {
				imagen: "/images/informaticabasica/portadas_modulos/m7.png"
			},
			curso: cursoCreado.id,
			contenidoTiny: "<p>Pulse para editar</p>",
			color: "" // "#589741"
		}).fetch();
		await SubmoduloLibro.createEach([
			{
				nombreSubmodulo: "Como usar Facebook",
				descripcion:
					"Facebook es lo que se denomina RED SOCIAL y permite compartir información con otras personas; generalmente, amigos o familiares. Se comparte mensajes de texto, enlaces, álbumes de fotos, vídeos, etc. También es posible comentar e interactuar con las publicaciones de tus amigos",
				enlace: "m7-facebook",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 1,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Como usar Youtube",
				descripcion:
					"Youtube Es un sitio web que permite compartir videos, estos pueden ser: películas, videoclips musicales, documentales o transmisiones en directo.",
				enlace: "m7-youtube",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 2,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			}
		]);
		moduloCreado = await ModuloLibro.create({
			nombreModulo: "Módulo 8. Dispositivos Móviles",
			descripcion:
				"Un dispositivo móvil es una computadora de bolsillo con memoria limitada y que permite la conexión a internet de forma inalámbrica. Se caracterizan por que pueden ser fáciles de transportar y permiten ejecutar varias aplicaciones.",
			enlace: "m8-dispositivos-moviles",
			multimedia: {
				imagen: "/images/informaticabasica/portadas_modulos/m8.png"
			},
			curso: cursoCreado.id,
			contenidoTiny: "<p>Pulse para editar</p>",
			color: "" // "#865412"
		}).fetch();
		await SubmoduloLibro.createEach([
			{
				nombreSubmodulo: "Configuraciones básicas",
				descripcion:
					"Los dispositivos móviles de paquete vienes con configuraciones básicas predeterminadas para su funcionamiento pero se permite al usuario personalizar ciertas caracteristicas del mismo para su mejor uso, estas características pueden ser: fondo de pantalla, cuenta de correo electrónico personal, etc.",
				enlace: "m8-configuracion-basica",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 1,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Otras configuraciones",
				descripcion:
					"El dispositivo móvil permite personalizar varias opciones .",
				enlace: "m8-otras-configuraciones",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 2,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			},
			{
				nombreSubmodulo: "Instalación de una aplicación móvil",
				descripcion:
					"Una app es una aplicación informática diseñada para ser ejecutada en teléfonos inteligentes, tabletas y otros dispositivos móviles. En internet existen varias aplicaciones de software que permiten al dispositivo móvil ejecutar nuevas tareas",
				enlace: "m8-instalar-app",
				multimedia: {},
				contenidoTiny: "<p>Pulse para editar</p>",
				modulo: moduloCreado.id,
				ordenNavegacion: 3,
				color: moduloCreado.color, //el color del padre se hereda a los hijos,
				evaluacion: null
			}
		]);

		sails.log("creacion de curso y modulos correcta!");
	}

	var cursos = await Curso.find({});
	var curso = cursos[0];
	var estudiante = null;
	var credenciales = null;
	var avance = null;
	if ((await Estudiante.count()) == 0 && Object.keys(curso).length > 0) {
		estudiante = await Estudiante.create({
			nombre: "Elsa Coro",
			alias: "els",
			email: "elsa.cando@gmail.com",
			password: "$2b$10$fbmbMm8Pigdur8cA.VFvf.BT3yzl2sm9Cmu2ZV02aTgcCkKaet0Ie",
			confirmado: true
		}).fetch();

		credenciales = { cursoId: curso.id, usuarioId: estudiante.id };
		//el avance se coloca en null en lugar de {} porque es mas facil gestionar desde el lado cliente
		await sails.helpers.registrarAvanceEstudiante(credenciales, avance); //la fecha de acceso es creada dentro

		estudiante = await Estudiante.create({
			nombre: "Pedro Estudiante",
			alias: "Pedroc",
			email: "p@gmail.com",
			password: "$2b$10$fbmbMm8Pigdur8cA.VFvf.BT3yzl2sm9Cmu2ZV02aTgcCkKaet0Ie",
			confirmado: true
		}).fetch();

		credenciales = { cursoId: curso.id, usuarioId: estudiante.id };
		//el avance se coloca en null en lugar de {} porque es mas facil gestionar desde el lado cliente
		await sails.helpers.registrarAvanceEstudiante(credenciales, avance); //la fecha de acceso es creada dentro
		//
		//
		//NUEVO PROFESOR 0
		//
		//
		var profesorCreado = await Profesor.create({
			nombre: "oscar",
			alias: "oscar",
			email: "pcuasqui@asomif-ecu.com",
			password: "$2b$10$dnUGZGpto1RdygwQ2bWDdeLRceCbCuU8Q2vz4RmZD8eXOyg.qrVqe",
			administrador: true,
			tutor: false,
			confirmado: true,
			superAdmin: true
		}).fetch();

		//CURSO BIG DATA --profesor 0
		var cursoBigData = await Curso.create({
			nombre: "Curso de Big Data para ejecutivos ",
			descripcion:
				"Este curso revisa herramientas y conceptoss más usados en Big Data",
			publicado: true,
			profesor: profesorCreado.id
		}).fetch();

		//
		//
		//NUEVO PROFESOR 1
		//
		//
		var profesorCreado = await Profesor.create({
			nombre: "Mayra C",
			alias: "m",
			email: "m@m.com",
			password: "$2b$10$dnUGZGpto1RdygwQ2bWDdeLRceCbCuU8Q2vz4RmZD8eXOyg.qrVqe",
			administrador: true,
			tutor: false,
			confirmado: true
		}).fetch();

		//CURSO PROGRAMACION BASICA  - profesor 1
		var cursoProgra = await Curso.create({
			nombre: "Programación básica",
			descripcion: "conceptos básicos sobre programacion",
			publicado: true,
			profesor: profesorCreado.id
		}).fetch();
		//
		//
		//NUEVO PROFESOR 2
		//
		//
		var profesorCreado = await Profesor.create({
			nombre: "Emilio Vera",
			alias: "j",
			email: "pedro.cuasqui@gmail.com",
			password: "$2b$10$dnUGZGpto1RdygwQ2bWDdeLRceCbCuU8Q2vz4RmZD8eXOyg.qrVqe",
			administrador: true,
			tutor: false,
			confirmado: true,
			superAdmin: true
		}).fetch();

		//CURSO BASE DE DATOS  -- profesor 2
		var cursoBdd = await Curso.create({
			nombre: "Base de datos",
			descripcion: "conceptos básicos de bases de datos",
			publicado: true,
			profesor: profesorCreado.id
		}).fetch();

		var mod1Bdd = await ModuloLibro.create({
			nombreModulo: "Introduccion",
			descripcion:
				"Una base de datos es un conjunto de datos pertenecientes a un mismo contexto y almacenados sistemáticamente para su posterior uso",
			multimedia: {
				imagen:
					"https://res.cloudinary.com/techsnips/image/fetch/w_2000,f_auto,q_auto,c_fit/https://adamtheautomator.com/content/images/size/w2000/2019/08/connect-azure-sql-database.jpg"
			},
			curso: cursoBdd.id,
			contenidoTiny:
				'<p style="margin: 0.5em 0px; line-height: inherit;  font-family: sans-serif; font-size: 14px; text-align: start;">Una&nbsp;<strong>base de datos</strong>&nbsp;es un conjunto de datos pertenecientes a un mismo contexto y almacenados sistem&aacute;ticamente para su posterior uso. En este sentido; una biblioteca puede considerarse una base de datos compuesta en su mayor&iacute;a por documentos y textos impresos en papel e indexados para su consulta. Actualmente, y debido al desarrollo tecnol&oacute;gico de campos como la&nbsp;<a style="color: #0b0080; background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;" title="Inform&aacute;tica" href="https://es.wikipedia.org/wiki/Inform%C3%A1tica">inform&aacute;tica</a>&nbsp;y la&nbsp;<a style="color: #0b0080; background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;" title="Electr&oacute;nica" href="https://es.wikipedia.org/wiki/Electr%C3%B3nica">electr&oacute;nica</a>, la mayor&iacute;a de las bases de datos est&aacute;n en formato digital, siendo este un componente electr&oacute;nico, por tanto se ha desarrollado y se ofrece un amplio rango de soluciones al problema del&nbsp;<a class="mw-redirect" style="color: #0b0080; background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;" title="Almacenamiento de datos" href="https://es.wikipedia.org/wiki/Almacenamiento_de_datos">almacenamiento de datos</a>.</p><p style="margin: 0.5em 0px; line-height: inherit;  font-family: sans-serif; font-size: 14px; text-align: start;">Hay&nbsp;<a style="color: #0b0080; background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;" title="Programa inform&aacute;tico" href="https://es.wikipedia.org/wiki/Programa_inform%C3%A1tico">programas</a>&nbsp;denominados&nbsp;<a style="color: #0b0080; background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;" title="Sistema de gesti&oacute;n de bases de datos" href="https://es.wikipedia.org/wiki/Sistema_de_gesti%C3%B3n_de_bases_de_datos">sistemas gestores de bases de datos</a>, abreviado SGBD (del ingl&eacute;s&nbsp;<em>Database Management System</em>&nbsp;o DBMS), que permiten almacenar y posteriormente acceder a los datos de forma r&aacute;pida y estructurada. Las propiedades de estos DBMS, as&iacute; como su utilizaci&oacute;n y administraci&oacute;n, se estudian dentro del &aacute;mbito de la inform&aacute;tica.</p><p style="margin: 0.5em 0px; line-height: inherit;  font-family: sans-serif; font-size: 14px; text-align: start;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Componentes_de_un_base_de_datos.jpg" alt="" width="300" height="450" /></p>',
			color: "", // "#7dec3c",
			enlace: ""
		}).fetch();

		var modulo2Bdd = await ModuloLibro.create({
			nombreModulo: "Conceptos",
			descripcion:
				"En esta sección aprenderás conceptos principales sobre bases de datos que te permitirán comprender de mejor manera el curso",
			multimedia: {
				imagen: "https://doc.4d.com/4Dv15/picture/105514/pict105514.es.png"
			},
			curso: cursoBdd.id,
			contenidoTiny:
				'<p><img src="https://doc.4d.com/4Dv15/picture/105514/pict105514.es.png" alt="" width="727" height="392" />&nbsp;</p>',
			color: "", // "#b642e1",

			enlace: ""
		}).fetch();

		var submoduloModulo2Bdd = await SubmoduloLibro.create({
			nombreSubmodulo: "Generalidades",
			descripcion:
				"Para poder almacenar una base de datos es necesario contar con un gestor de base de datos que es un software especializado en manejo de datos",
			multimedia: Object,
			modulo: modulo2Bdd.id,
			contenidoTiny:
				'<p style="text-align: justify;">A fin de evitar que id&eacute;ntios datos se encuentren repetidos en m&uacute;ltiples archivos, parece necesario que los comunes se almacenen en un archivo &uacute;nico y que este archivo sea accesible por todos los programas que los manipulen.</p><p style="text-align: left;"><strong>Definici&oacute;n</strong></p><p style="text-align: justify;">Una base de datos es una colecci&oacute;n de datos interrelacionados, almacenados en un conjunto sin redundancias (repeticiones) perjudiciales o in<span style="font-family: helvetica, arial, sans-serif;">necesarias. Su finalidad es la de servir a una o m&aacute;s aplicaciones de la mejor manera posible. Los datos se almacenan de modo que resulten independientes de los programas que los utilizan, y se emplean m&eacute;todos concretos y determinados para incluir nuev</span>os datos y para modificar o extraer los ya almacenados.</p><p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://jordilopez94.files.wordpress.com/2014/09/sistemas-gestores-base-datos.jpg" alt="" width="108" height="86" /></p><p style="text-align: left;"><strong>Gestores de bases de datos relacionales</strong></p><p style="text-align: left;"><strong>SQL Server:&nbsp;&nbsp;</strong><span style=" font-family: helvetica, arial, sans-serif; font-size: 12pt;">Microsoft SQL Server es un sistema de gesti&oacute;n de base de datos relacional, desarrollado por la empresa Microsoft. El lenguaje de desarrollo utilizado es Transact-SQL</span></p><p style="text-align: left;"><span style=" font-family: helvetica, arial, sans-serif; font-size: 12pt;"><img style="display: block; margin-left: auto; margin-right: auto;" src="http://www.ingdiaz.org/wp-content/uploads/2018/01/j00-150x150.png" alt="" width="87" height="87" /></span></p><p style="text-align: left;"><span style=" font-family: helvetica, arial, sans-serif; font-size: 12pt;">MySQL:&nbsp;</span><strong style=" font-family: sans-serif; font-size: 14px;">MySQL</strong><span style=" font-family: sans-serif; font-size: 14px;">&nbsp;es un&nbsp;</span>sistema de gesti&oacute;n de bases de datos<span style=" font-family: sans-serif; font-size: 14px;">&nbsp;</span><a style="color: #0b0080; font-family: sans-serif; font-size: 14px;" title="Modelo relacional" href="https://es.wikipedia.org/wiki/Modelo_relacional">relacional</a><span style=" font-family: sans-serif; font-size: 14px;">&nbsp;desarrollado bajo licencia dual:&nbsp;</span><a class="mw-redirect" style="color: #0b0080;  font-family: sans-serif; font-size: 14px;" title="Licencia P&uacute;blica General" href="https://es.wikipedia.org/wiki/Licencia_P%C3%BAblica_General">Licencia p&uacute;blica general</a><span style=" font-family: sans-serif; font-size: 14px;">/</span><a style="color: #0b0080;  font-family: sans-serif; font-size: 14px;" title="" href="https://es.wikipedia.org/wiki/Software_propietario">Licencia comercial</a><span style=" font-family: sans-serif; font-size: 14px;">&nbsp;por&nbsp;</span><a style="color: #0b0080;  font-family: sans-serif; font-size: 14px;" title="Oracle Corporation" href="https://es.wikipedia.org/wiki/Oracle_Corporation">Oracle Corporation</a><span style=" font-family: sans-serif; font-size: 14px;">&nbsp;y est&aacute; considerada como la base datos de&nbsp;</span><a class="mw-redirect" style="color: #0b0080;  font-family: sans-serif; font-size: 14px;" title="Open source" href="https://es.wikipedia.org/wiki/Open_source">c&oacute;digo abierto</a><span style=" font-family: sans-serif; font-size: 14px;">&nbsp;m&aacute;s popular del mundo,</span><sup id="cite_ref-1" class="reference separada" style="line-height: 1em; unicode-bidi: isolate; white-space: nowrap; margin-right: 0.6ch;  font-family: sans-serif;"></sup><span style=" font-family: sans-serif; font-size: 14px;">&nbsp;y una de las m&aacute;s populares en general junto a&nbsp;</span><a style="color: #0b0080;  font-family: sans-serif; font-size: 14px;" title="Oracle Database" href="https://es.wikipedia.org/wiki/Oracle_Database">Oracle</a><span style=" font-family: sans-serif; font-size: 14px;">&nbsp;y&nbsp;</span><a style="color: #0b0080;  font-family: sans-serif; font-size: 14px;" title="Microsoft SQL Server" href="https://es.wikipedia.org/wiki/Microsoft_SQL_Server">Microsoft SQL Server</a><span style=" font-family: sans-serif; font-size: 14px;">, sobre todo para entornos de&nbsp;</span><a style="color: #0b0080;  font-family: sans-serif; font-size: 14px;" title="Desarrollo web" href="https://es.wikipedia.org/wiki/Desarrollo_web">desarrollo web</a><span style=" font-family: sans-serif; font-size: 14px;">.</span></p><p style="text-align: left;"><span style=" font-family: sans-serif; font-size: 14px;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://www.frikipandi.com/wp-content/uploads/2015/03/MySQL.jpg" alt="" width="207" height="130" /></span></p><p style="text-align: left;">&nbsp;</p>',
			color: "", //  "#b642e1",
			enlace: "",
			ordenNavegacion: 0,
			evaluacion: {
				tipo: "Cuestionario",
				publicada: true,
				tiempoMaximoPorPregunta: 20,
				preguntas: [
					{
						enunciado: `<div><p>La siguiente imagen corresponde al gestor de nombre...</p> <p><img	src="https://www.frikipandi.com/wp-content/uploads/2015/03/MySQL.jpg"	alt="Imagen de la pregunta"
							></img> </p></div>`,
						opciones: {
							opcion1: "Gestor MySQL",
							opcion2: "Gestor Oracle",
							opcion3: "Gestor MongoDB",
							opcion4: null
						},
						respuesta: "Gestor MySQL",
						pista: "Su DML es muy similar a SQL Server"
					},

					{
						enunciado: `<div><p>La siguiente imagen corresponde al gestor de nombre...</p> <p><img	src="http://www.ingdiaz.org/wp-content/uploads/2018/01/j00-150x150.png"		alt="Imágen de la pregunta"
							></img> </p> </div>`,
						opciones: {
							opcion1: "Gestor de datos SQL server",
							opcion2: "Gestor de datos Mongo",
							opcion3: "Gestor de datos MariaDb",
							opcion4: null
						},
						respuesta: "Gestor de datos SQL server",
						pista: "Es un SGBD propietario"
					}
				]
			}
		}).fetch();

		var intentoEvaluacion = await IntentoEvaluacion.createEach([
			{
				puntos: 1500,
				nivel: 1,
				medalla: "novato",
				tiempoMaximoPorPregunta: 15, //en segundos
				apruebaEvaluacion: 1,
				evaluacion: {
					tipo: "Emparejamiento",
					aciertos: [0, 1, 2], //los indices de las preguntas acertadas, la longitud nos dar'a el numero de aciertos totales
					preguntas: [
						{
							errores: 2, //
							tiempoDeRespuesta: 10, //
							enunciado: "2+2 es?",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "4",
							respuestaEstudiante: "4"
						},
						{
							errores: 1,
							tiempoDeRespuesta: 15,
							enunciado: "5+5 ?",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "10",
							respuestaEstudiante: "10"
						},

						{
							errores: 4,
							tiempoDeRespuesta: 15,
							enunciado: "0-5 ?",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "-5",
							respuestaEstudiante: "-5"
						},

						{
							errores: null,
							tiempoDeRespuesta: null, //nunca respondi'o
							enunciado: "8+4 ?",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "11",
							respuestaEstudiante: null
						}
					],
					puntosObtenidos: 450
				},
				estudiante: estudiante.id,
				submodulo: submoduloModulo2Bdd.id,
				curso: cursoBdd.id
			},
			{
				puntos: 1950,
				nivel: 1,
				medalla: "novato",
				tiempoMaximoPorPregunta: 15, //en segundos
				apruebaEvaluacion: 1,
				evaluacion: {
					tipo: "Emparejamiento",
					aciertos: [0, 2], //los indices de las preguntas acertadas, la longitud nos dar'a el numero de aciertos totales
					preguntas: [
						{
							errores: 2, //
							tiempoDeRespuesta: 10, //
							enunciado: "2+2 es?",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "4",
							respuestaEstudiante: "4"
						},
						{
							errores: null,
							tiempoDeRespuesta: null,
							enunciado: "5+5 ?",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "10",
							respuestaEstudiante: null
						},

						{
							errores: 4,
							tiempoDeRespuesta: 8,
							enunciado: "0-5 ?",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "-5",
							respuestaEstudiante: "-5"
						},

						{
							errores: null,
							tiempoDeRespuesta: null, //nunca respondi'o
							enunciado: "8+4 ?",
							opciones: {
								opcion1: null,
								opcion2: null,
								opcion3: null,
								opcion4: null
							},
							respuesta: "11",
							respuestaEstudiante: null
						}
					],
					puntosObtenidos: 780
				},
				estudiante: estudiante.id,
				submodulo: submoduloModulo2Bdd.id,
				curso: cursoBdd.id
			}
		]);

		/***SEGUNDO SUBMODULO DEL MODULO "CONCEPTOS" */

		var submodulo2Modulo2Bdd = await SubmoduloLibro.create({
			nombreSubmodulo: "Modelo entidad relación",
			descripcion:
				"Un modelo de entidad relación es una herramienta para el modelo de datos, la cual permite representar entidades de una Base de Datos",
			multimedia: Object,
			modulo: modulo2Bdd.id,
			contenidoTiny:
				'<p>Un modelo de entidad relación es una herramienta para el modelo de datos, la cual permite representar entidades de una Base de Datos </p><p>     Se elabora el diagrama (o diagramas) entidad-relación.Se completa el modelo con listas de atributos y una descripción de otras restricciones que no se pueden reflejar en el diagrama.El modelado de datos no acaba con el uso de esta técnica. Son necesarias otras técnicas para lograr un modelo directamente implementable en una base de datos. Brevemente:</p><p>Permite mostrar resultados entre otras entidades pertenecientes a las existentes de manera que se encuentre la normatividad de archivos que se almacenarán.</p><p><img src="https://commons.wikimedia.org/wiki/File:Ejemplo_Diagrama_E-R_extendido.PNG" alt="" width="303" height="241" /></p>',
			color: "", //"#b642e1",
			enlace: "",
			ordenNavegacion: 0,
			evaluacion: {
				tipo: "Emparejamiento",
				publicada: true,
				tiempoMaximoPorPregunta: 1000,
				preguntas: [
					{
						enunciado:
							'<p><span style="color: #ecf0f1;">Un modelo de entidad relaci&oacute;n es:</span></p>',
						opciones: {
							opcion1: null,
							opcion2: null,
							opcion3: null,
							opcion4: null
						},
						respuesta: "una herramienta para el modelo de datos",
						pista: "Modelado de datos"
					},
					{
						enunciado: '<p><span style="color: #ecf0f1;">Entidad</span></p>',
						opciones: {
							opcion1: null,
							opcion2: null,
							opcion3: null,
							opcion4: null
						},
						respuesta: "Representa una 'cosa', 'objeto' o 'concepto'",
						pista: "Representa una cosa, objeto o concepto"
					},
					{
						enunciado: '<p><span style="color: #ecf0f1;">Atributos</span></p>',
						opciones: {
							opcion1: null,
							opcion2: null,
							opcion3: null,
							opcion4: null
						},
						respuesta:
							" Son las características que definen o identifican a una entidad",
						pista: "Características que definen ..."
					}
				]
			}
		}).fetch();

		var intentoEvaluacion = await IntentoEvaluacion.createEach([
			{
				puntos: 2750,
				nivel: 1,
				medalla: "estudiante",
				tiempoMaximoPorPregunta: 20,
				apruebaEvaluacion: 1,
				evaluacion: {
					tipo: "Cuestionario",
					aciertos: [0, 1],
					preguntas: [
						{
							enunciado: `<div><img src="https://www.frikipandi.com/wp-content/uploads/2015/03/MySQL.jpg" alt="Imágen de la pregunta"
							></img> </div>`,
							opciones: {
								opcion1: "Gestor MySQL",
								opcion2: "Gestor Oracle",
								opcion3: "Gestor MongoDB",
								opcion4: null
							},
							respuesta: "Gestor MySQL",
							pista: "Gestor MySql",
							errores: null,
							tiempoDeRespuesta: 4.699999999999999,
							respuestaEstudiante: "Gestor MySQL"
						},
						{
							enunciado: `<div><img src="http://www.ingdiaz.org/wp-content/uploads/2018/01/j00-150x150.png" alt="Imágen de la pregunta"
							></img> </div>`,
							opciones: {
								opcion1: "Gestor de datos SQL server",
								opcion2: "Gestor de datos Mongo",
								opcion3: "Gestor de datos MariaDb",
								opcion4: null
							},
							respuesta: "Gestor de datos SQL server",
							pista: "Gestor Sql Server",
							errores: null,
							tiempoDeRespuesta: 2.3000000000000007,
							respuestaEstudiante: "Gestor de datos SQL server"
						}
					],
					puntosObtenidos: 800
				},
				estudiante: estudiante.id,
				submodulo: submodulo2Modulo2Bdd.id,
				curso: cursoBdd.id
			},
			{
				puntos: 4080,
				nivel: 2,
				medalla: "estudiante",
				tiempoMaximoPorPregunta: 20,
				apruebaEvaluacion: 0,
				evaluacion: {
					tipo: "Cuestionario",
					aciertos: [1],
					preguntas: [
						{
							enunciado: `<div><img src="https://www.frikipandi.com/wp-content/uploads/2015/03/MySQL.jpg" alt="Imágen de la pregunta"
							></img> </div>`,
							opciones: {
								opcion1: "Gestor MySQL",
								opcion2: "Gestor Oracle",
								opcion3: "Gestor MongoDB",
								opcion4: null
							},
							respuesta: "Gestor MySQL",
							pista: "Gestor MySql",
							errores: 1,
							tiempoDeRespuesta: -2.3999999999999986,
							respuestaEstudiante: "Gestor Oracle"
						},
						{
							enunciado: `<div><img src="http://www.ingdiaz.org/wp-content/uploads/2018/01/j00-150x150.png" alt="Imágen de la pregunta"
							></img> </div>`,
							opciones: {
								opcion1: "Gestor de datos SQL server",
								opcion2: "Gestor de datos Mongo",
								opcion3: "Gestor de datos MariaDb",
								opcion4: null
							},
							respuesta: "Gestor de datos SQL server",
							pista: "Gestor Sql Server",
							errores: 1,
							tiempoDeRespuesta: 4.399999999999999,
							respuestaEstudiante: "Gestor de datos SQL server"
						}
					],
					puntosObtenidos: 355
				},
				estudiante: estudiante.id,
				submodulo: submodulo2Modulo2Bdd.id,
				curso: cursoBdd.id
			}
		]);

		/***TERCER SUBMODULO DEL MODULO "CONCEPTOS" */

		var submodulo3Modulo2Bdd = await SubmoduloLibro.create({
			nombreSubmodulo: "Tablas",
			descripcion:
				"Una tabla es una herramienta de organización de información que se utiliza en bases de datos en la informática.",
			multimedia: Object,
			modulo: modulo2Bdd.id,
			contenidoTiny:
				'<p style="margin: 0.5em 0px; line-height: inherit;  font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-style: initial; text-decoration-color: initial;"><strong>Tabla</strong>&nbsp;en las&nbsp;<a class="mw-redirect" style="text-decoration: none; color: #0b0080; background: none;" title="Bases de datos" href="https://es.wikipedia.org/wiki/Bases_de_datos">bases de datos</a>, se refiere al tipo de&nbsp;<a style="text-decoration: none; color: #0b0080; background: none;" title="Modelo de datos" href="https://es.wikipedia.org/wiki/Modelo_de_datos">modelado de datos</a>&nbsp;donde se guardan los datos recogidos por un programa. Su estructura general se asemeja a la vista general de un programa de&nbsp;<a style="text-decoration: none; color: #0b0080; background: none;" title="Hoja de c&aacute;lculo" href="https://es.wikipedia.org/wiki/Hoja_de_c%C3%A1lculo">hoja de c&aacute;lculo</a>.</p><p style="margin: 0.5em 0px; line-height: inherit;  font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-style: initial; text-decoration-color: initial;">Las tablas se componen de dos estructuras:</p><ul style="margin: 0.3em 0px 0px 1.6em; padding: 0px;  font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-style: initial; text-decoration-color: initial;"><li style="margin-bottom: 0.1em;"><strong><a class="mw-redirect" style="text-decoration: none; color: #0b0080; background: none;" title="Campo (base de datos)" href="https://es.wikipedia.org/wiki/Campo_(base_de_datos)">Campo</a></strong>: <p>Corresponde al nombre de la columna. Debe ser &uacute;nico y adem&aacute;s de tener un tipo de dato asociado.</p></li><li style="margin-bottom: 0.1em;"><strong><a style="text-decoration: none; color: #0b0080; background: none;" title="Registro (base de datos)" href="https://es.wikipedia.org/wiki/Registro_(base_de_datos)">Registro</a></strong>: <p>Corresponde a cada fila que compone la tabla. All&iacute; se componen los datos y los registros. Eventualmente pueden ser nulos en su almacenamiento.</p></li></ul><p style="margin: 0.5em 0px; line-height: inherit;  font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-style: initial; text-decoration-color: initial;">En la definici&oacute;n de cada campo, debe existir un nombre &uacute;nico, con su tipo de dato correspondiente. Esto es &uacute;til a la hora de manejar varios campos en la tabla, ya que cada nombre de campo debe ser distinto entre s&iacute;.</p><p style="margin: 0.5em 0px; line-height: inherit;  font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-style: initial; text-decoration-color: initial;">A los campos se les puede asignar, adem&aacute;s, propiedades especiales que afectan a los registros insertados. El campo puede ser definido como&nbsp;<em>&iacute;ndice</em>&nbsp;o&nbsp;<em>autoincrementable</em>, lo cual permite que los datos de ese campo cambien solos o sean el principal indicar a la hora de ordenar los datos contenidos.</p><p style="margin: 0.5em 0px; line-height: inherit;  font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-style: initial; text-decoration-color: initial;">Cada tabla creada debe tener un nombre &uacute;nico en la cada base de datos, haci&eacute;ndola accesible mediante su nombre o su seud&oacute;nimo (alias) (dependiendo del tipo de base de datos elegida).</p><p style="margin: 0.5em 0px; line-height: inherit;  font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-style: initial; text-decoration-color: initial;">&nbsp;</p><p style="margin: 0.5em 0px; line-height: inherit;  font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-style: initial; text-decoration-color: initial;"><img src="../images/uploaded/ded\67917863-af7d-4bd7-a3a0-7b68d27d8803" alt="tabla" width="346" height="145" /></p>',
			color: "", // "#b642e1",
			enlace: "",
			ordenNavegacion: 0,
			evaluacion: {
				tipo: "Cuestionario",
				publicada: true,
				tiempoMaximoPorPregunta: "100",
				preguntas: [
					{
						enunciado:
							'<p><span style="color: #ecf0f1;">Un campo corresponde al nombre de:</span></p>',
						opciones: {
							opcion1: null,
							opcion2: "Una fila",
							opcion3: "Una tabla",
							opcion4: "Una columna"
						},
						respuesta: "Una columna",
						pista: "Columna"
					},
					{
						enunciado:
							'<p><span style="color: #ecf0f1;">Una tabla es...</span></p>',
						opciones: {
							opcion1: "Una herramienta para eliminar información",
							opcion2: "Una herramienta para almacenar la información",
							opcion3: "Una estructura de datos",
							opcion4: null
						},
						respuesta: "Una herramienta para almacenar la información",
						pista: "Herramientas para almacenar ..."
					}
				]
			}
		}).fetch();

		var intentoEvaluacion = await IntentoEvaluacion.createEach([
			{
				puntos: 4435,
				nivel: 2,
				medalla: "estudiante",
				tiempoMaximoPorPregunta: 40,
				apruebaEvaluacion: 0,
				evaluacion: {
					tipo: "Cuestionario",
					aciertos: [1],
					preguntas: [
						{
							enunciado: "Un campo corresponde al nombre de:",
							opciones: {
								opcion1: null,
								opcion2: "Una fila",
								opcion3: "Una tabla",
								opcion4: "Una columna"
							},
							respuesta: "Una columna",
							pista: "Columna",
							errores: 1,
							tiempoDeRespuesta: 3.1000000000000014,
							respuestaEstudiante: "Una tabla"
						},
						{
							enunciado: "Una tabla es...",
							opciones: {
								opcion1: "Una herramienta para eliminar información",
								opcion2: "Una herramienta para almacenar la información",
								opcion3: "Una estructura de datos",
								opcion4: null
							},
							respuesta: "Una herramienta para almacenar la información",
							pista: "Herramientas para almacenar ...",
							errores: null,
							tiempoDeRespuesta: 0.6000000000000014,
							respuestaEstudiante:
								"Una herramienta para almacenar la información"
						}
					],
					puntosObtenidos: 3630
				},
				estudiante: estudiante.id,
				submodulo: submodulo3Modulo2Bdd.id,
				curso: cursoBdd.id
			},
			{
				puntos: 8065,
				nivel: 3,
				medalla: "estudiante",
				tiempoMaximoPorPregunta: 40,
				apruebaEvaluacion: 0,
				evaluacion: {
					tipo: "Cuestionario",
					aciertos: [0],
					preguntas: [
						{
							enunciado: "Un campo corresponde al nombre de:",
							opciones: {
								opcion1: null,
								opcion2: "Una fila",
								opcion3: "Una tabla",
								opcion4: "Una columna"
							},
							respuesta: "Una columna",
							pista: "Columna",
							errores: null,
							tiempoDeRespuesta: 0.10000000000000142,
							respuestaEstudiante: "Una columna"
						},
						{
							enunciado: "Una tabla es...",
							opciones: {
								opcion1: "Una herramienta para eliminar información",
								opcion2: "Una herramienta para almacenar la información",
								opcion3: "Una estructura de datos",
								opcion4: null
							},
							respuesta: "Una herramienta para almacenar la información",
							pista: "Herramientas para almacenar ...",
							errores: null,
							tiempoDeRespuesta: 1.7999999999999972,
							respuestaEstudiante: "Una herramienta para eliminar información"
						}
					],
					puntosObtenidos: 7000
				},
				estudiante: estudiante.id,
				submodulo: submodulo3Modulo2Bdd.id,
				curso: cursoBdd.id
			}
		]);

		var d = new Date();

		var cursoEstudiante = await CursoEstudiantes.create({
			curso_matriculados: cursoBdd.id,
			estudiante_cursos: estudiante.id,
			ultimoAcceso: d.getTime(),
			avance: {
				tipoContenido: "Submodulo",
				objetoId: submodulo3Modulo2Bdd.id
			},
			createdAt: d.getTime(),
			updatedAt: d.getTime()
		});
		sails.log("creacion de estudiante correcta!");
	}

	// ```
	// Don't forget to trigger `done()` when this bootstrap function's logic is finished.
	// (otherwise your server will never lift, since it's waiting on the bootstrap)

	// intento numero uno por importar un componente de vue : fallido
	// sails.vuesidebarmenu = require('vue-sidebar-menu');
	return done();
};
