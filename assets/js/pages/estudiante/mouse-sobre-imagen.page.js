parasails.registerPage('mouse-sobre-imagen', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    mouseX:800,
    mouseY:600,
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
    mouseOverMonitor(event) {
      // clientX/Y gives the coordinates relative to the viewport in CSS pixels.
      console.log("x: " + event.clientX + " y: " + event.clientY)
      
      var svg = document.getElementById("lienzo-svg");
      let bound = svg.getBoundingClientRect();
      this.mouseX = event.clientX - bound.left;
      this.mouseY = event.clientY - bound.top;
      // $("#lienzo-svg").css({'transform' : 'translate(' +  this.mouseX +', ' + this.mouseY + ')'});
      // console.log("x relativo: "+ x+ " y relativo: " + y)
       var toolTip= document.getElementById("toolMonitor") ; 
      toolTip.setAttribute("transform", "translate("
            + this.mouseX  + "," 
            + this.mouseY + ")"); 
      console.log("x relativo: " + this.mouseX + " y relativo: " + this.mouseY);
    },
    mouseOverCpu() {
      // alert('Seleccion Cpu');
    },
    mouseOverTeclado() {
      // alert('Seleccion Teclado');
    },
    mouseOverMouse() {
      // alert('Seleccion Mouse');
    }
  },
  computed: {
    styleToolTip() {
      let estilo={transform: 'translate('+ this.mouseX+','+this.mouseY+')'};
      console.log(estilo);
      return estilo
    }
  }
});
