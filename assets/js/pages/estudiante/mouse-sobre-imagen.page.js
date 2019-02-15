parasails.registerPage('mouse-sobre-imagen', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    mouseX: 800,
    mouseY: 600,
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
      var svg = document.getElementById("lienzo-svg");
      let bound = svg.getBoundingClientRect();
      this.mouseX = event.clientX - bound.left;
      this.mouseY = event.clientY - bound.top;

      // las siguientes dos formas tambien son valederas para asignar un estilo a la etiqueta
      /* var toolTip= document.getElementById("toolMonitor") ; 
            toolTip.setAttribute("transform", "translate("
                  + this.mouseX  + "," 
                  + this.mouseY + ")");  */
      /* document.getElementById("toolMonitor").style.transform= "translate("+ this.mouseX+"px,"+this.mouseY+"px)"; */
    }
  },
  computed: {
    styleToolTip() {
      // funciona solo con comillas dobles
      return { transform: "translate(" + this.mouseX + "px," + this.mouseY + "px)" };
    }
  }
});
