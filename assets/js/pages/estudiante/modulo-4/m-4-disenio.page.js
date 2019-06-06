parasails.registerPage('m-4-disenio', {
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
    //variables unicas en este modulo
    pestaniaActual: 'temas',// por defecto se muestra esta pestaña



/////////////////////////////
//TEMAS
    /// /images/word/revisar/0.png
    temas: {
      id: 'temas',
      titulo: 'Temas',
      detalle: 'Los temas permiten cambiar de forma automática varios colores de fondo, de texto, etc',
      leerMas: '',
      html: ''+
      '<p>La opción temas presenta varias opciones predefinidas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/temas/1.png" alt="temas"></div>'+   
      '<p>Se puede elegir entre diferentes tipos de formatos para el documento.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/temas/1_1.png" alt="colores"></div>'+
      '<p>Cada formato dará un aspecto particular a las partes que lo conforman.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/temas/1_2.png" alt="colores"></div>'
    },
    colores: {
      id: 'colores',
      titulo: 'Colores',
      detalle: 'Esta opción te permite cambiar rapidamente todos los colores que se usan en el documento eligiendo una paleta de colores diferentes',
      leerMas: '',
      html: '<p>La opción colores presenta varias opciones predefinidas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/temas/2.png" alt="colores"></div>'
   
    },
    fuentes: {
      id: 'fuentes',
      titulo: 'Fuentes',
      detalle: 'Cambia rápidamente el aspecto de todo el documento seleccionando un nuevo juego de fuentess ',
      leerMas: '',
      html: ''+
      '<p>La opción fuentes presenta varias opciones predefinidas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/temas/3.png" alt="fuentes"></div>'
    },
    efectos: {
      id: 'efectos',
      titulo: 'Efectos',
      detalle: 'Cambia rápidamente el aspecto general de todos los objetos del documento',
      leerMas: '',
      html: ''+
      '<p>La opción efectos presenta varias opciones predefinidas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/temas/4.png" alt="efectos"></div>'
    },
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    // configurar
    //     /images/word/p_disenio/configurar/4.png
    margenes: {
      id: 'margenes',
      titulo: 'Márgenes',
      detalle: 'Establece los tamaños de márgenes de todo el documento o la selección actual',
      leerMas: '',
      html: ''+
      '<p>La opción márgenes presenta varias opciones predefinidas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/1.png" alt="márgenes"></div>'
    },
    orientacion: {
      id: 'orientacion',
      titulo: 'Orientación',
      detalle: 'Proporciona a las páginas un diseño horizontal o vertical ',
      leerMas: '',
      html: ''+
      '<p>La opción márgenes presenta varias opciones predefinidas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/2.png" alt="orientacion"></div>'+
      '<h5>Cambiar la orientación de la página.</h5>'+
      '<p>En la opción Orientación, elegir entre una orientación vertical u horizontal.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/2_1.png" alt="orientacion"></div>'+
      '<p>La orientación cambió de Vertical a Horizontal.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/2_2.png" alt="orientacion"></div>'

    },
    tamanio: {
      id: 'tamanio',
      titulo: 'Tamaño',
      detalle: 'Permite elegir un tamño de papel para el documento',
      leerMas: '',
      html: ''+
      '<p>La opción márgenes presenta varias opciones predefinidas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/3.png" alt="tamanio"></div>'
    },
    columnas: {
      id: 'columnas',
      titulo: 'Columnas',
      detalle: 'Divide el texto en dos o mas columnas',
      leerMas: '',
      html: ''+
      '<p>La opción márgenes presenta varias opciones predefinidas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/4.png" alt="columnas"></div>'+
      '<h5>Cambio del documento a dos columnas</h5>'+
      '<p>En la opción Columnas, elegir el número de columnas en las cuales se quiere dividir el texto.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/4_1.png" alt="columnas"></div>'+
      '<p>El texto se dividirá en el número de columnas escogido, en este caso dos.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/4_2.png" alt="columnas"></div>'
    },
    saltos: {
      id: 'saltos',
      titulo: 'Saltos',
      detalle: 'Agrega un salto en la ubicación actual para retomar denuevo el texto en la siguiente página, sección o columna',
      leerMas: '',
      html: ''+
      '<p>La opción márgenes presenta varias opciones predefinidas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/5.png" alt="saltos"></div>'
    },
    numeros: {
      id: 'numeros',
      titulo: 'Números de línea',
      detalle: 'Permite hacer referencia a líneas específicas del documento de forma fácil y rápido usando números de líneas en el márgen ',
      leerMas: '',
      html: ''+
      '<p>La opción márgenes presenta varias opciones predefinidas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/6.png" alt="números"></div>'
    },
    guiones: {
      id: 'guiones',
      titulo: 'Guiones',
      detalle: 'Cuando una palabra se queda sin espacio word normalmente la pasa a la siguiente línea.',
      leerMas: '',
      html: ''+
      '<p>Cuando se activa el usao de guiones, Word divide la palabra automáticamente</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/configurar/7.png" alt="guiones"></div>'
    },



    /////////////////////////////////////////
    // fondo
    marca: {
      id: 'marca',
      titulo: 'Marca',
      detalle: 'Agrega texto fantasma, como "Confidencial" o Urgente detrás del contenido de la página',
      leerMas: '',
      html: ''+
      '<p>La marca de agua es una forma fantástica de mostrar que el documento requiere un tratamiento especial sin distraer del contenido </p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/1.png" alt="Marca de agua"></div>'+
      '<h5>Para agregar una marca de agua</h5>'+
      '<p>Dar clic sobre la opción marca de agua, y escoger Marcas de agua personalizadas.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/1_1.png" alt="marca de agua"></div>'+
      '<p>Aparecerá la siguiente pantalla, en la cual podemos elegir entre una Marca de agua de imagen o una Marca de agua de Texto.	</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/1_2.png" alt="opciones de marca de agua"></div>'+
      '<h5>Agregar una marca de agua de imágen</h5>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/1_3.png" alt="marca de agua de imágen"></div>'+
      '<p>Aparecerá la siguiente pantalla, en la cual se elegirá la imagen que se desee.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/1_4.png" alt="seleccionar la imágen"></div>'+
      '<p>Dar clic en Aceptar.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/1_5.png" alt="clic en aceptar"></div>'+
      '<p>La marca de agua ya ha sido insertada.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/1_6.png" alt="La marca de agua de imágen ha sido insertada"></div>'+

      '<h5>Agregar una marca de agua de texto</h5>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/1_7.png" alt="marca de agua de texto"></div>'+
      '<p>Al dar clic en Aceptar y la marca de agua se insertará.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/1_8.png" alt="La marca de agua de texto ha sido insertada"></div>'
      
      
    },
    color: {
      id: 'color',
      titulo: 'Color',
      detalle: 'Da un toque de color al documento cambiando el color de la página',
      leerMas: '',
      html: ''+
      '<p>Se presentan colores predefinidos en una paleta</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/2.png" alt="color"></div>'
    },
    bordes: {
      id: 'bordes',
      titulo: 'Bordes',
      detalle: 'Agrega o cambia el borde alrededor de la página',
      leerMas: '',
      html: ''+
      '<p>Un borde atrae la atención y agrega un toque elegante al documento</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/3.png" alt="color"></div>'+
      '<h5>Agregar bordes alrededor de la página</h5>'+
      '<p>Dar clic en Bordes de página.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/3_1.png" alt="Bordes de página"></div>'+
      '<p>Se abre la siguiente ventana para personalizar los bordes.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/3_2.png" alt="Opciones de borde de página"></div>'+
      '<p>Al dar clic en Aceptar ya se puede observar los bordes insertados.</p>'+
      '<div class="d-flex justify-content-center"><img src="/images/word/p_disenio/fondo/3_3.png" alt="Bordes de página aplicados"></div>'
    },
    /////////////////////////////////////////
    // parrafo

    izquierda: {
      id: 'izquierda',
      titulo: 'Sangría izquierda',
      detalle: '',
      leerMas: '',
      html: ''
    },
    derecha: {
      id: 'derecha',
      titulo: 'Sangría derecha',
      detalle: '',
      leerMas: '',
      html: ''
    },
    antes: {
      id: 'antes',
      titulo: 'Espaciado antes',
      detalle: '',
      leerMas: '',
      html: ''
    },
    despues: {
      id: 'despues',
      titulo: 'Espaciado después',
      detalle: '',
      leerMas: '',
      html: ''
    },

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
      if (idObjeto == 'temas') {
        $(function () {
          $('#modaltemas').modal('show');
        });

      } else if (idObjeto == 'colores') {
        $(function () {
          $('#modalcolores').modal('show');
        });

      } else if (idObjeto == 'fuentes') {
        $(function () {
          $('#modalfuentes').modal('show');
        });

      } else if (idObjeto == 'efectos') {
        $(function () {
          $('#modalefectos').modal('show');
        });

      }else if (idObjeto == 'margenes') {
        $(function () {
          $('#modalmargenes').modal('show');
        });

      }else if (idObjeto == 'orientacion') {
        $(function () {
          $('#modalorientacion').modal('show');
        });

      }else if (idObjeto == 'tamanio') {
        $(function () {
          $('#modaltamanio').modal('show');
        });

      }else if (idObjeto == 'columnas') {
        $(function () {
          $('#modalcolumnas').modal('show');
        });

      }else if (idObjeto == 'saltos') {
        $(function () {
          $('#modalsaltos').modal('show');
        });

      }else if (idObjeto == 'numeros') {
        $(function () {
          $('#modalnumeros').modal('show');
        });

      }else if (idObjeto == 'guiones') {
        $(function () {
          $('#modalguiones').modal('show');
        });

      }
      else if (idObjeto == 'marca') {
        $(function () {
          $('#modalmarca').modal('show');
        });

      }else if (idObjeto == 'color') {
        $(function () {
          $('#modalcolor').modal('show');
        });

      }
      else if (idObjeto == 'bordes') {
        $(function () {
          $('#modalbordes').modal('show');
        });

      }else if (idObjeto == 'sangria') {
        $(function () {
          $('#modalsangria').modal('show');
        });

      }
      else if (idObjeto == 'izquierda') {
        $(function () {
          $('#modalizquierda').modal('show');
        });

      } else if (idObjeto == 'derecha') {
        $(function () {
          $('#modalderecha').modal('show');
        });

      } else if (idObjeto == 'antes') {
        $(function () {
          $('#modalantes').modal('show');
        });

      } else if (idObjeto == 'despues') {
        $(function () {
          $('#modaldespues').modal('show');
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
    clickSelectorPestania(pestania) {
      this.pestaniaActual = pestania;
      console.log('pest actua:'+ pestania);
    }
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
