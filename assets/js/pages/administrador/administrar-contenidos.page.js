parasails.registerPage('administrar-contenidos', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      valorPrueba: 'valores de prueba',
      nombreModulo:'',
      contenidoNuevo:{
        nombreModulo:'',
        descripcion:'modulo nuevo'
      },
      contenidosFront:[],
    },
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
      // Vincula cualquier dato inicial desde el servidor en las páginas ejs exposeLocalsToBrowser()
      _.extend(this, SAILS_LOCALS);
      // contenidosFront.push(this.contenidos);
    },
    mounted: async function(){

    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
      /* agregarModulo: function(){
        this.contenidoNuevo.nombreModulo=this.nombreModulo;
          this.contenidosFront.push(this.contenidoNuevo);
          this.contenidoNuevo={
            nombreModulo:'',
            descripcion:'modulo nuevo'
          };
      }, */
      clickSeleccionarModulo: function( nombreContenido){
        console.log('se ha seleccionado el elemento: '+ nombreContenido);
      }
      
    }
  });
  