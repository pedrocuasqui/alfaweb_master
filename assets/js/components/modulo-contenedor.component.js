parasails.registerComponent('modulo-contenedor',{
    props:{
        tituloContenido :String,
        
        descripcionObjeto: [String],
        navegarAtras: {
          type: String,
          required: false,
        },
        navegarSiguiente: {
          type: String,
          required: false,
        },
        breadcrumb: {
          type: Array,
          required: false,
        },
        contenidos : {
          type: Object,
          required: false,
        },
      },
    template:`  
    <div class="div-contenido container-fluid" v-cloak>
      <div class="row primera-fila"  >
        <div class="col-sm-12">
            <modulo-barra-nav :breadcrumb="breadcrumb"></modulo-barra-nav> 
        </div>
        
      </div>

    <!-- Primera fila -Titulo del contenido -->
    <div class="row" id="div-body">
        <!-- columna izquierda -->
        <div class="col-sm-2 col-izquierda">
            <modulo-side-var-menu></modulo-side-var-menu>
        </div>

        <!-- Columna central -->
        <div class="col-sm-9 col-central">
            <div class="row">
    
            <div class="navegacion-siguiente">
                <a :href="navegarSiguiente"><i class="fas fa-arrow-alt-circle-right fas-3x"></i> </a>
            </div>
            <div class="navegacion-atras">
                <a :href="navegarAtras"> <i class="fas fa-arrow-alt-circle-left fas-3x"></i> </a>
            </div>
                <div class="col" id="titulo-modulo">
                    <h2>"{{tituloContenido}}"</h2>

                </div>

            </div>
            <div class="row">
                <!-- IMAGEN SVG -->
                <slot></slot>
            </div>


            <div class="row">
                <div class="col-sm-1" id="avatar">
                    <img src="/images/myAvatar_adultoMayor.png" alt="Avatar adulto mayor">
                </div>

                <div class="col-sm-11" id="descripcion-objeto">
                    <h6>{{descripcionObjeto}}</h6>
                </div>
            </div>

        </div>
        <!-- columna derecha -->
        <div class="col-sm-1 col-derecha">

        </div>

        <!--fin row-->

    </div>
</div>

    `,

    data: function(){
        return {};
    },
    methods:{

    }
});
