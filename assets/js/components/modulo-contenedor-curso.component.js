parasails.registerComponent('modulo-contenedor-curso', {
    props: {
        // tituloContenido: String,

        // descripcionObjeto: [String],
        navegarAtras: {
            type: String,
            required: false,
            description: 'la ruta del modulo anterior',
        },
        navegarSiguiente: {
            type: String,
            required: false,
            description: 'la ruta del modulo siguiente',
        },
        breadcrumb: {
            type: Array,
            required: false,
        },
        curso: {
            type: Object,
        },
        objetoSeleccionado: {
            type: Object,
            default: () => { return { id: '1', nombreModulo: 'crearModulo', rol: 'Administrador' } }

        },
        tituloTemporal: {
            type: String,
            required: false,
            default: () => { return '' }
        },
        usuario: {
            type: Object,
            default: () => { return { nombre: 'Admin', rol: 'Administrador' } }
        },
        crearSubmodulo:false,
    },
    data: function () {
        return {
            campoNombre: null,
            nombre: null,
        };
    },
    mounted() {

        // this.campoNombre = Object.keys(this.objetoSeleccionado)[0];
        // this.nombre = this.objetoSeleccionado[this.campoNombre];
    },
    template: //html
        `  
<div class="div-contenido container-fluid" v-cloak>
    <div class="row" id="div-cabecera"  >
        <div class="col-sm-10">
            <modulo-barra-nav :breadcrumb="breadcrumb"></modulo-barra-nav> 
        </div>
        <div class="col-sm-2">
            <img src="/images/svg/iconoPolhibou.svg" alt="Logo Polhibou"  />
        </div>
    </div>

    <!-- Primera fila -Titulo del contenido -->
    <div class="row" id="div-body">
        <!-- columna izquierda -->
        <div class="col-sm-2 col-izquierda">
            <modulo-side-var-menu :curso="curso" :objeto-seleccionado="objetoSeleccionado" :crear-submodulo="crearSubmodulo"></modulo-side-var-menu>
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
                            
                        <h2 v-if="tituloTemporal!=''">{{ tituloTemporal}}</h2>
                        <h2 v-else>{{ nombre}}</h2>

                        </div>
                    </div>

                    <div class="row">
                            
                                <div class="contenedor-slot-principal">
                                    <slot></slot>
                                </div>
                            
                    </div>


                    <div class="row pie-contenido">
                        <div class="col-sm-1" id="avatar">
                            <img src="/images/svg/buho_original_1.svg" alt="Avatar adulto mayor">
                        </div>

                        <div class="col-sm-11" id="descripcion-objeto">
                            <h6 v-if="existeDescripcion  && tituloTemporal==''">{{objetoSeleccionado.descripcion}}</h6>
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


    methods: {

    },
    computed: {
        existeDescripcion() {
            var existe = false;
            if (this.objetoSeleccionado.descripcion)
                existe = true;

            return existe;
        }
    }
});
