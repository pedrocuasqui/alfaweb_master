parasails.registerPage('m1-computadora', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    mouseX: 800,
    mouseY: 600,
    mostrarToolTip:false,
    nombreObjeto:{
      type: String,
      default:"computador"
    },
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
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
    mouseMovePc(event) {
      // clientX/Y gives the coordinates relative to the viewport in CSS pixels.
      console.log("x: " + event.clientX + " y: " + event.clientY)
      // getBoundingClientRect() no aplica para objetos jquery
      var svg = document.getElementById("lienzo-svg");
      let bound = svg.getBoundingClientRect();
      this.mouseX = event.clientX - bound.left - 100;
      this.mouseY = event.clientY - bound.top - 50;

      this.mostrarToolTip=true;
      let objetoSeleccionado= event.target.parentNode.id;
      this.nombreObjeto=objetoSeleccionado.toString().toUpperCase();

    },
    mouseOutPc(evet){
      this.mostrarToolTip=false;
    },
  },
  computed: {
    styleToolTip() {
      // funciona solo con comillas dobles
      return { transform: "translate(" + this.mouseX + "px," + this.mouseY + "px)" };
    }
  }
});
