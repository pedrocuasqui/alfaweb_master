parasails.registerPage('m-1-software', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    tituloContenido: "Sistema Informático - Software",
    descripcionObjeto: 'Conjunto de programas necesarios para llevar a cabo las tareas dentro del computador. Se compone de un Sistema Operativo y un conjunto de aplicaciones que manipulan o son manipulados por los componentes físicos del computador.',
    navegarAtras: '/m1-sistema-informatico-usb',
    navegarSiguiente: '/m1-conexion-componentes',

    breadcrumb: [{ id: '', texto: 'indice', enlace: '/indice-estudiante' },
    { id: '', texto: 'La computadora', enlace: '/m1-computadora' },
    { id: '', texto: 'Sistema informático', enlace: '/m1-sistema-informatico' },
    { id: '', texto: 'Software', enlace: '/m1-sistema-informatico-software' }],

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    // al cargar la página se cargan los codigos de los objetos 'g' hijos de lienzo-svg
    let objetosg = document.getElementById("lienzo-svg").getElementsByTagName("g")
    // se añade un estilo para cada objeto "g" que permita hacer el efecto de zoom con "transform: scale (1.5,1.5)"
    for (i = 0; i < objetosg.length; i++) {
      this.anadirEstiloObjeto(objetosg[i].getAttribute("id"));
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //con mouseEnter no reconoce muy bien al elemento
    mouseOver(event) {
      let objetoSeleccionado = event.target.parentNode.id;
      //selecciono al objeto sobre el cual se encuentra el mouse y le doy un estilo css
      this.anadirEstiloObjeto(objetoSeleccionado);
    },
    anadirEstiloObjeto(id) {
      // funcion para añadir un estilo css al objeto con "id" pasado por parametro, al pasar el mouse sobre él en la pagina
      $("#" + id).hover(
        //funcion que se lanza "onmouseenter" --> añade estilo
        function () {
          $(this).css({
            "transform": "scale(1.5,1.5)",
            "transition-duration": "500ms",
            "transform-box": "fill-box",
            "transform-origin": "center",
            "transition-timing-function": "ease-out",
            "fill":"chartreuse"
          })
        },
        //funcion que se ejecuta "onmouseleave" --> vuelve a su estado original
        function () {
          $(this).css({
            "transform": "scale(1,1)",
            "transition-duration": "500ms",
            "transform-box": "fill-box",
            "transform-origin": "center",
            "transition-timing-function": "ease-out",
            "fill":""
          })
        }
      );
    }
  }
});
