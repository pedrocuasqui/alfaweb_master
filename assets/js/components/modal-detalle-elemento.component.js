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
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clickReestablecerModal">
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
            </div>
            <div class="modal-footer">
              <button type="button"  @click="clickReestablecerModal" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
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
    }
  }
});