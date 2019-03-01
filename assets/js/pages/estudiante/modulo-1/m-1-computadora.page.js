parasails.registerPage('m-1-computadora', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    mouseX: 0,
    mouseY: 0,
    mostrarToolTip: false,
    textoToolTip: {
      type: String,
      default: "computador"
    },
    tituloContenido: 'Módulo 1 - La computadora',
    descripcionObjeto: '',
    navegarAtras: '/',
    navegarSiguiente: '/m1-computadora-ev',
    descripcionActividad: "BIENVENIDO!!! \n Pasa el mouse sobre las imágenes para que puedas ver el nombre de los objetos.",

    breadcrumb: [{ id: '', texto: 'indice', enlace: '/indice-estudiante' },
    { id: '', texto: 'Módulo 1 - La computadora', enlace: '/m1-computadora' }],

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝

  created() {
    // aqui se puede ejecutar código apenas la instancia vue ha sido creada, la propiedad "el" aun no estará disponible
    // mostramos el modal
    this.mostrarModal();
  },
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
    mostrarModal() {
      // para verficar que el DOM está listo se puede usar: $(fn)
      // fuente: https://es.stackoverflow.com/questions/51946/cu%C3%A1l-es-la-diferencia-entre-window-onload-y-document-ready
      $(function () {
        $('#modalInicial').modal('show');
      });
    },
    mouseMovePc(event) {
      // clientX/Y obtiene las coordenadas del elemento con respecto al elemento padre, en este caso las coordenadas con respecto a <div id="m1-computadora"

      this.mouseX = event.clientX;
      this.mouseY = event.clientY;


      // El text del tooltip se basa en valor de la propiedad ""id"" de cada elemento ""
      let objetoSeleccionado = event.target.parentNode.id;
      this.textoToolTip = objetoSeleccionado.toString().toUpperCase();

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
