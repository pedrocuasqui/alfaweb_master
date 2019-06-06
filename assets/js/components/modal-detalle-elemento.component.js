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
      html: false
    };
  },

  mounted() {
    if(this.infoElement.imgs){ // en caso de existir 
      if (this.infoElement.imgs[0].src == '')
      this.imagen = false;
    }else{
      this.imagen = false;
    }
  

    if (this.infoElement.html) {
      this.html = true;

    }
  },

  template://html
    `
        <div class="modal fade" :id="'modal'+infoElement.id" tabindex="-1" role="dialog" aria-labelledby="modalComponente"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" :id="'exampleModalLongTitle'+infoElement.id">{{infoElement.titulo}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            {{infoElement.detalle}}
              <a v-if="infoElement.leerMas!=''" :href="infoElement.leerMas" target="_blank">Leer más</a>
              <div class="d-flex justify-content-center"><img v-if="imagen" v-for="img in infoElement.imgs" :src="img.src" :title="img.alt"></div>
              <div v-if="html" id="htmlContent" v-html="infoElement.html"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <!-- <button type="button" class="btn btn-primary">Aceptar</button> -->
            </div>
          </div>
        </div>
      </div>
  
  `,
  methods: {

  }
});