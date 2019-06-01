
parasails.registerPage('m-3-pantalla-word', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    breadcrumb: [],

    usuario: Object,
    navegarSiguiente: '',
    navegarAtras: '',
    tituloEvaluacion: '',
    evIndividual: false,
    objetoSeleccionado: '',

    mouseX: 0,
    mouseY: 0,
    mostrarToolTip: false,
    textoToolTip: {
      type: String,
      default: "software"
    },

    area_trabajo: {
      id: 'AreaTrabajo',
      titulo: 'Área de trabajo',
      detalle: 'El área de trabajo, está situada en la parte central, muestra el documento que estamos editando',
      leerMas: 'https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf',
      imgs: [
        {
          src: 'https://montesmanzanero203.files.wordpress.com/2011/08/imagen12.png',
          alt: 'Area de trabajo de Microsoft Word'
        },
      ]
    },
     
    barra_titulo: {
      id: 'BarraTitulo',
      titulo: 'Barra de título',
      detalle: ' Situada en el extremo superior. En ella aparecerá el título de nuestro trabajo que, en un principio, será enominado “Documento 1”, pero que al guardar podemos renombrar asignándole el título que consideremos oportuno. Como es habitual, guardaremos el documento pulsando en el icono Guardar de la barra de acceso rápido o en Archivo > Guardar de la Barra de opciones, lo que nos permitirá alojar el archivo en el lugar que deseemos de nuestro equipo.',
      leerMas: 'https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf',
      imgs: [
        {
          src: 'http://informatica1-2-3-4.blogspot.es/cache/media/files/01/576/448/2018/03/1519912539_07-barra-de-titulo-word.png',
          alt: 'Barra de título'
        },
      ]
    },
     
    barra_acceso_rapido: {
      id: 'BarraAcceso',
      titulo: 'Barra de acceso rápido',
      detalle: 'Nos da acceso a determinadas acciones que forman parte de los diferentes elementos de menú, pero que se encuentran disponibles de forma directa a partir de esta barra, por ser las más usuales: guardar el documento, deshacer, rehacer… Podemos configurar a nuestro gusto esta barra de acceso rápido incorporando algunas acciones  más',
      leerMas: '',
      imgs: [
        {
          src: 'https://support.content.office.net/es-es/media/a93355d7-6b01-45a7-909a-5c53dcae7aee.jpg',
          alt: 'Barra de herramientas de acceso rápido'
        },
      ]
    },
     
    barra_opciones: {
      id: 'BarraOpciones',
      titulo: 'Cinta de opciones',
      detalle: 'La cinta de opciones de Word es un conjunto de barras de herramientas que te permite acceder rápidamente a los comandos que necesitas para crear o editar un documento. En la cinta de opciones los comandos están agrupados en pestañas y grupos de acuerdo a la función que realizan.',
      leerMas: 'https://es.ccm.net/faq/8985-la-cinta-de-opciones-de-word',
      imgs: [
        {
          src: 'https://support.content.office.net/es-es/media/ca77bbe6-9425-4816-a40e-d922acfcd7b4.png',
          alt: 'Barra de opciones'
        },
      ]
    },
     
    inicio_sesion: {
      id: 'InicioSesion',
      titulo: 'Inicio de sesión',
      detalle: 'El inicio de sesión de word permite almacenar los archivos en la nube, para ello es necesario comprar una suscripción de word o comprar un serial de activación',
      leerMas: 'https://support.office.com/es-es/article/inicie-sesi%C3%B3n-en-office-b9582171-fd1f-4284-9846-bdd72bb28426',
      imgs: [
        {
          src: 'https://support.content.office.net/es-es/media/4ca8f9f8-f015-4101-ba58-182ef2285a46.png',
          alt: 'Inicio de sesión'
        },
      ]
    },
     
    barra_estado: {
      id: 'BarraEstado',
      titulo: 'Barra de estado',
      detalle: 'La Barra de estado es el elemento de la interfaz gráfica de un programa de software que presenta información sobre el estado del programa. En Word, la Barra de estado viene activada por defecto y se encuentra en la parte inferior del programa.',
      leerMas: 'https://wordexperto.com/tag/barra-de-estado/',
      imgs: [
        {
          src: 'https://images.slideplayer.es/38/10831190/slides/slide_14.jpg',
          alt: 'Barra de estado'
        },
      ]
    },
     
    barra_desplazamiento: {
      id: 'BarraDesplazamiento',
      titulo: 'Barra de desplazamiento',
      detalle: 'La barra de desplazamiento (o scrollbar en inglés) es un objeto de la interfaz gráfica de usuario mediante el cual una página de internet, una imagen, un texto, etc, pueden ser deslizados hacia abajo o arriba.',
      leerMas: 'https://es.wikipedia.org/wiki/Scrollbar',
      imgs: [
        {
          src: 'https://www.ecured.cu/images/7/72/Barra_desplazamiento.png',
          alt: 'Barra de desplazamiento'
        },
      ]
    },
     
    // elemento: {
    //   id: '',
    //   titulo: '',
    //   detalle: '',
    //   leerMas: '',
    //   imgs: [
    //     {
    //       src: ':',
    //       alt: ''
    //     },
    //   ]
    // },
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.usuario = SAILS_LOCALS.usuario;
    this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado,
      this.navegarSiguiente = SAILS_LOCALS.siguiente.enlace;
    this.navegarAtras = SAILS_LOCALS.anterior.enlace;
    this.breadcrumb.push(SAILS_LOCALS.curso);
    this.breadcrumb.push(SAILS_LOCALS.modulo);
    this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    evaluacionIndividual(contenido) { //funcion recibida del componente modulo-contenedor-curso
      if (contenido == 'contenido') {
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = false;
      } else {
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = true;
      }
    },

    infoObjeto(idObjeto) {
      if (idObjeto == 'area_trabajo') {
        $(function () {
          $('#modalAreaTrabajo').modal('show');
        });

      } else if (idObjeto == 'barra_titulo') {

        $(function () {
          $('#modalBarraTitulo').modal('show');
        });
      }
      else if (idObjeto == 'acceso_rapido') {

        $(function () {
          $('#modalBarraAcceso').modal('show');
        });
      }
      else if (idObjeto == 'cinta_opciones') {

        $(function () {
          $('#modalBarraOpciones').modal('show');
        });
      }
      else if (idObjeto == 'inicio_sesion') {

        $(function () {
          $('#modalInicioSesion').modal('show');
        });
      }
      else if (idObjeto == 'barra_estado') {

        $(function () {
          $('#modalBarraEstado').modal('show');
        });
      }
      else if (idObjeto == 'barra_desplazamiento') {

        $(function () {
          $('#modalBarraDesplazamiento').modal('show');
        });
      }

    },
    mouseMovePc(event) {
      // clientX/Y obtiene las coordenadas del elemento con respecto al elemento padre, en este caso las coordenadas con respecto a <div id="m1-computadora"

      this.mouseX = event.clientX;
      this.mouseY = event.clientY;


      // El text del tooltip se basa en valor de la propiedad ""id"" de cada elemento ""
      let elementoSeleccionado = event.target.parentNode.id;
      this.textoToolTip = elementoSeleccionado.toString().toUpperCase();

      //una vez que los valores para x y y del texto del tooltip han sido establecidos, se muestra en la pantalla
      this.mostrarToolTip = true;
    },
    mouseOutPc(evet) {
      this.mostrarToolTip = false;
    },
  },
  computed: {
    styleToolTip() {
      // translate define cuanto se moverá el objeto a partir de su posicion original
      // funciona solo con comillas dobles
      //{ transform: "translate(" + this.mouseX + "px," + this.mouseY + "px)" };
      let estilo = {
        top: this.mouseY + 'px',
        left: this.mouseX + 'px'
      }
      return estilo;
    }
  }
});
