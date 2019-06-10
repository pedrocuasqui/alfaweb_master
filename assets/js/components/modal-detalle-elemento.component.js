parasails.registerComponent('modal-detalle-elemento', {
  props: {
    infoElement: {
      type: Object,
      default: () => {
        return {
          id: 'ComponenteVacio',
          titulo: 'Componente Vacío',
          detalle: 'No se encontró detalle para este componente',
          leerMas: '',
          imgs: [{
            src: '',
            alt: 'No existe imagen '
          }],
          html: '',
        }
      },
    }
  },
  data() {
    return {
      imagen: true,
      html: false,
      animarBuho: true,
      // sonido: null, //objeto window.speechSynthesis
      // silenciar: true, //el lector de texto empieza en silencio,
      reproduciendo: false,
      msg:null,
    };
  },

  mounted() {
    if (this.infoElement.imgs) { // en caso de existir la propiedad imágenes
      if (this.infoElement.imgs[0].src == '')
        this.imagen = false;
    } else {
      this.imagen = false;
    }

    //si existe una propeidad html en el elemento pasado por parámetro, entonces se muestra la etiqueta que contrendrá el html
    if (this.infoElement.html) {
      this.html = true;

    }
    //se invoca al objeto speedchSynthesis de la ventana
    this.sonido = window.speechSynthesis;
    this.msg = new SpeechSynthesisUtterance(this.infoElement.detalle);


    var _this = this;
    // setTimeout(()=>{ _this.animarBuho=false}, 2000);
    $('#modal' + this.infoElement.id).on('show.bs.modal', function (e) {
      _this.clickLimitarTiempoAnimacion();

    })

    
  },

  template://html
    `
        <div class="modal fade" :id="'modal'+infoElement.id" tabindex="-1" role="dialog" aria-labelledby="modalComponente"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" :id="'exampleModalLongTitle'+infoElement.id">{{infoElement.titulo}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clickSilenciar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">



              <div class="d-print-inline-flex">
              <img @click="clickReproducirParar" @mouseover="onOverReproducirParar" :class="{avatarModalInicio : animarBuho }" id="avatarModal" src="/images/svg/buho_original_1.svg" alt="Avatar adulto mayor">
              {{infoElement.detalle}}
              </div>
              <a v-if="infoElement.leerMas!=''" :href="infoElement.leerMas" target="_blank">Leer más</a>
              <div class="d-flex justify-content-center"><img v-if="imagen" v-for="img in infoElement.imgs" :src="img.src" :title="img.alt"></div>
              <div v-if="html" id="htmlContent" v-html="infoElement.html"></div>


















              <div id="carouseEncendido" class="carousel slide" data-ride="carousel" data-interval="false">
              <ol class="carousel-indicators carousel-indicators-numbers">
                <li data-target="#carouseEncendido" data-slide-to="0" class="indicador active" @click="obtenerIndice">1</li>
                <li data-target="#carouseEncendido" data-slide-to="1" class="indicador" @click="obtenerIndice">2</li>
                <li data-target="#carouseEncendido" data-slide-to="2" class="indicador" @click="obtenerIndice">3</li>
                <li data-target="#carouseEncendido" data-slide-to="3" class="indicador" @click="obtenerIndice">4</li>
                <li data-target="#carouseEncendido" data-slide-to="4" class="indicador" @click="obtenerIndice">5</li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img class="d-block w-100" src="/images/image29_encender_cpu.png" alt="Encender el CPu">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="/images/encenderMonitor.jpg" alt="Encender el Monitor">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="/images/inicioSesionWindows.png" alt="Seleccionar un Usuario">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="/images/patanllaInicioWindows.jpg" alt="Pantalla inicial de Windows">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="/images/apagar-computadora.png" alt="Apagar la computadora">
                </div>
      
              </div>
              <a class="carousel-control-prev" href="#carouseEncendido" role="button" data-slide="prev"
                @click="obtenerIndice">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouseEncendido" role="button" data-slide="next"
                @click="obtenerIndice">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
  







            </div>
            <div class="modal-footer">
              <button type="button"  @click="clickSilenciar" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <!-- <button type="button" class="btn btn-primary">Aceptar</button> -->
            </div>
          </div>
        </div>
      </div>
  
  `,
  methods: {
    clickReestablecerModal() {
      this.animarBuho = true;
      this.clickReproducirParar();
    },
    clickLimitarTiempoAnimacion() {

      var _this = this;
      setTimeout(() => { _this.animarBuho = false }, 1000);
    },

    clickSilenciar() {
      this.sonido.cancel();
      // this.silenciar = true;
  },
    clickReproducirParar() {
      if (this.reproduciendo) {
        this.reproduciendo = false;
        this.sonido.cancel();
      }
      else if (this.reproduciendo == false) {
        this.reproduciendo = true;
        
        // msg.voice = voices[10]; // Note: some voices don't support altering params
        this.sonido.speak(this.msg);
      }


    },
    /**
     * Reproduce un el mensaje del string infoElement.detalle
     */
    onOverReproducirParar(){
      if (this.reproduciendo) {
        this.reproduciendo = false;
        this.sonido.cancel();
      }
      else if (this.reproduciendo == false) {
        this.reproduciendo = true;
        
        // msg.voice = voices[10]; // Note: some voices don't support altering params
        this.sonido.speak(this.msg);
      }
    },
    obtenerIndice(){
      var _this= this;
      // this.$refs.curso.clickSilenciar();
    //slide.bs.carousel	This event fires immediately when the slide instance method is invoked.
    //slid.bs.carousel	This event is fired when the carousel has completed its slide transition.
      $('#carouseEncendido').on('slid.bs.carousel', function () {
        let indice=$('.indicador.active').text(); //obtiene el indice del indicador actual
        let posicion= parseInt(indice)-1;

        // _this.objetoSeleccionado.descripcion=_this.indicaciones[posicion].descripcion;
        alert('cambia a posicion: '+ indice);
        })
   

    },
  }
});