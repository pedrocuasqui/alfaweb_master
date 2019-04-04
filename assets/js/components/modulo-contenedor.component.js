parasails.registerComponent('modulo-contenedor', {
    props: {
        tituloContenido: String,

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
        contenidos: {
            type: Object,
            required: false,
        },
    },
    template: `  
<div class="div-contenido container-fluid" v-cloak>
    <div class="row" id="div-cabecera"  >
        <div class="col-sm-10">
            <modulo-barra-nav :breadcrumb="breadcrumb"></modulo-barra-nav> 
        </div>
        <div class="col-sm-2">
            <img src="images/svg/iconoPolhibou.svg" alt="Logo Polhibou"  />
        </div>
    </div>

    <!-- Primera fila -Titulo del contenido -->
    <div class="row" id="div-body">
        <!-- columna izquierda -->
        <div class="col-sm-2 col-izquierda">
            <modulo-side-var-menu></modulo-side-var-menu>
        </div>
        <div class="col-sm-10" id="columna-contenido-lateral">
            <div class="row fila-principal">
                <!-- Columna central -->
                <div class="col-sm-10 col-central">
                    <div class="row">
                        <div class="navegacion-siguiente">
                            <a :href="navegarSiguiente"><i class="fas fa-arrow-alt-circle-right fas-3x"></i> </a>
                        </div>
                        <div class="navegacion-atras">
                            <a :href="navegarAtras"> <i class="fas fa-arrow-alt-circle-left fas-lg"></i> </a>
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
                            <img src="/images/svg/buho_original_1.svg" alt="Avatar adulto mayor">
                        </div>

                        <div class="col-sm-11" id="descripcion-objeto">
                            <h6>{{descripcionObjeto}}</h6>
                        </div>
                    </div>

                </div>
                <!-- columna derecha -->
                <div class="col-sm-2 col-derecha">
                    <modulo-panel-derecho></modulo-panel-derecho>
                </div>
            </div> <!-- fin fila de contenido central y barra lateral derecha -->
        </div> <!--fin columna contenido central y barra lateral derecha-->
        
        
    </div>
</div>

    `,

    data: function () {
        return {};
    },
    methods: {

    }
});
