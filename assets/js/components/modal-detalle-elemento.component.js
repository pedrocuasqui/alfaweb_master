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
          carousel: [
            {
              posicion: '1', //siempre empezar en uno para poder identificar a los elementos
              detalle: '',
              imagen: '',
              alt: '',

            }
          ]
        }
      },
    }
  },
  data() {
    return {
      leerMas: false,
      imagen: true,
      html: false,
      ecarousel: false,
      animarBuho: true,
      // sonido: null, //objeto window.speechSynthesis
      // silenciar: true, //el lector de texto empieza en silencio,
      reproduciendo: false,
      msg: null,
    };
  },

  mounted() {
    if (this.infoElement.leerMas) {
      if (this.infoElement.leerMas != '') {
        this.leerMas = true;
      }

    }

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
    //si existe la propiedad carousel en el objeto recbido entonces se despliega el carousel bootstrap
    if (this.infoElement.carousel) {
      this.ecarousel = true;
      this.infoElement.detalle = this.infoElement.carousel[0].detalle;
    }


    //se invoca al objeto speedchSynthesis de la ventana
    this.sonido = window.speechSynthesis;

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
            
          
            <!--HEADER --> 
            <div class="modal-header">
              <h5 class="modal-title" :id="'exampleModalLongTitle'+infoElement.id">{{infoElement.titulo}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clickSilenciar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>


            <!--BODY -->
            <div class="modal-body">
              <div class="d-print-inline-flex text-justify" >
                <img @click="onReproducirParar" @mouseover="onReproducirParar" :class="{avatarModalInicio : animarBuho }" id="avatarModal" src="/images/svg/buho_original_1.svg" alt="Avatar adulto mayor">
                {{infoElement.detalle}}
              </div>
              <a v-if="leerMas" :href="infoElement.leerMas" target="_blank">Leer más</a>
              
              <!--IMAGENES-->
              <div class="d-flex justify-content-center"><img v-if="imagen" v-for="img in infoElement.imgs" :src="img.src" :title="img.alt"></div>

              <!-- HTML-->
              <div v-if="html" :id="'htmlContent'+infoElement.id" v-html="infoElement.html"></div>

              <!--CAROUSEL-->
              <div v-if="ecarousel" :id="idCarousel" class="carousel slide modalDetalle" data-ride="carousel" data-interval="false">
              <ol class="carousel-indicators carousel-indicators-numbers">

                <li v-for="(elemento,index) in infoElement.carousel"  :key="index" :data-target="'#'+idCarousel" :data-slide-to="index" class="indicador" :class="{active: elemento.posicion==1}" @click="obtenerIndice">{{elemento.posicion}}</li>

              </ol>
              <div class="carousel-inner">

                <div v-for="(elemento, index) in infoElement.carousel" class="carousel-item" :class="{active: elemento.posicion==1}" >
                  <img class="d-block w-100" :src="elemento.imagen" :alt="elemento.alt">
                </div> 
      
              </div>
              <a class="carousel-control-prev" :href="'#'+idCarousel" role="button" data-slide="prev"
                @click="obtenerIndice">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" :href="'#'+idCarousel" role="button" data-slide="next"
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
      this.onReproducirParar();
    },
    clickLimitarTiempoAnimacion() {

      var _this = this;
      setTimeout(() => { _this.animarBuho = false }, 1000);
    },

    clickSilenciar() {
      this.sonido.cancel();
      this.reproduciendo = false;

    },
    /**
 * Reproduce un el mensaje del string infoElement.detalle
 */
    onReproducirParar() {

      var textoHtml = $('#htmlContent' + this.infoElement.id).contents().filter('h1, h2,h3, h4, h5, h6, p').text();

      var textoLectura = this.infoElement.detalle + " " + textoHtml;
      if (this.reproduciendo) {
        this.clickSilenciar();
      }
      else if (this.reproduciendo == false) {
        this.reproduciendo = true;
        this.msg = new SpeechSynthesisUtterance(textoLectura);
        // msg.voice = voices[10]; // Note: some voices don't support altering params
        this.sonido.speak(this.msg);
      }


    },
    obtenerIndice() {
      var _this = this;
      this.clickSilenciar()
      console.log(this.infoElement);
      // this.$refs.curso.clickSilenciar();
      //slide.bs.carousel	This event fires immediately when the slide instance method is invoked.
      //slid.bs.carousel	This event is fired when the carousel has completed its slide transition.




      $('#carousel' + _this.infoElement.id).on('slid.bs.carousel', function () {
        //se hace la selaccion con el nombre del carousel porque cuando hay mas de un carousel, puesto que habrian  mas de un objeto .indicador.active
        let indice = $('#carousel' + _this.infoElement.id + ' .indicador.active').text(); //obtiene el indice del indicador actual 

        let posicion = parseInt(indice) - 1;

        _this.infoElement.detalle = _this.infoElement.carousel[posicion].detalle;
        console.log('cambia a posicion: ' + indice);
      })

      console.log('sfhalskjdhfalkjsdh');

    },
  },
  computed: {
    idCarousel() {
      let carouselId = 'carousel' + this.infoElement.id;
      return carouselId;
    }
  }
});