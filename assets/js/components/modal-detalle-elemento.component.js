parasails.registerComponent('modal-detalle-elemento', {
    props: {
        infoElement: {
            type: Object,
            default: () => {return {
                nombre:'Componente vacío', 
                detalle:'No se encontró detalle para este componente', 
                leerMas:'', 
                imgs:[{
                    src:'',
                    alt:'No existe imagen '
                }]} 
            },
        }
    },
    data() {
        return {};
    },
    mounted(){

    },

    template://html
        `
        <div class="modal fade" :id="'modal'+infoElement.nombre" tabindex="-1" role="dialog" aria-labelledby="modalComponente"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" :id="'exampleModalLongTitle'+infoElement.nombre">{{infoElement.nombre}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            {{infoElement.detalle}}
              <a :href="infoElement.leerMas" target="_blank">Leer más</a>
              <img v-for="img in infoElement.imgs" :src="img.src" :title="img.alt">
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