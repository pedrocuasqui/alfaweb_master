// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
// ESTE COMPONENTE SE USA SOLO PARA LA EDICION DE UN OBJETO,(MODULO, SUBMODULO )

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

        },
        // tituloTemporal: { //SOLO SE USA PARA LA CREACION DE UN MODULO O SUBMODULO
        //     type: String,
        //     required: false,
        //     default: () => { return '' }
        // },
        usuario: {
            type: Object,
            default: () => { return { nombre: 'Admin', rol: 'Administrador' } }
        },
    },
    data: function () {
        return {
            campoNombre: null,
            nombre: null,
            editarNombre:false,
        };
    },
    mounted() {

        this.campoNombre = Object.keys(this.objetoSeleccionado)[0];
        this.nombre = this.objetoSeleccionado[this.campoNombre];// EL campo objetoSeleccionado.nombreModulo o nombreSubmodulo, según lo envíado
    },
    template: //html
        `  
<div class="div-contenido container-fluid" v-cloak>
     <!--CABECERA DE LA VENTANA--> 
    <div class="row" id="div-cabecera"  >
        <div class="col-sm-10">
            <modulo-barra-nav :breadcrumb="breadcrumb"></modulo-barra-nav> 
        </div>
        <div class="col-sm-2">
            <img src="/images/svg/iconoPolhibou.svg" alt="Logo Polhibou"  />
        </div>
    </div>

    <!--CUERPO DE LA VENTANA-->
    <div class="row" id="div-body">
        <!-- columna barra de navegacion-->
        <div class="col-sm-2 col-izquierda">
            <modulo-side-var-menu :curso="curso" :objeto-seleccionado="objetoSeleccionado"></modulo-side-var-menu>
        </div>
        <!-- columna central y lateral derecha del cuerpo -->
        <div class="col-sm-10" id="columna-contenido-lateral">
            <div class="row fila-principal">
                <!-- Columna central del cuerpo-->
                <div class="col-sm-10 col-central">
                    <!--botones de navegacion y Titulo-->
                    <div class="row">
                        <!--siguiente-->
                        <div class="navegacion-siguiente">
                            <a :href="navegarSiguiente"><i class="fas fa-arrow-alt-circle-right fas-3x"></i> </a>
                        </div>
                        <!--atras-->
                        <div class="navegacion-atras">
                            <a :href="navegarAtras"> <i class="fas fa-arrow-alt-circle-left fas-lg"></i> </a>
                        </div>
                        <!--titulo-->
                        <div class="col" id="titulo-modulo">                          
                                <div v-else class="form-group">
                                <!-- <label for="nombreModulo">* Título del módulo</label> -->
                                    <div class="row">
                                        <div class="col">
                                            <input v-if="editarNombre"  
                                            type="text" 
                                            id="nombreModulo" 
                                            name="nombreModulo" 
                                            v-model="nombreModulo"
                                            placeholder="Ej: Modulo 1: la computadora"
                                            :class="[formErrors.nombreModulo ? 'is-invalid' : '']" 
                                            autofocus>
                                            <h2 v-else>{{ nombre}}</h2>
                                            <a v-if="editarNombre" @click="actualizarContenido" title="Guardar Nombre"><i class="fas fa-save"></i></a>
                                            <a v-else @click="mostrarEditarNombre" ><i class="fas fa-edit"></i></a>
                                            <a data-toggle="modal" data-target="#modalConfirmaEliminar"  data-placement="top" title="Eliminar Módulo"><i class="fas fa-trash-alt"></i></a>
                                        </div> <!--col-->
                                    </div><!--row-->
                                    
                                    <div class="invalid-feedback" v-if="formErrors.nombreModulo">Ingrese un nombre para el módulo.</div>
                                </div>
                        </div>
                    </div>
                    <!--contenido principal-->
                    <div class="row">
                            
                                <div class="contenedor-slot-principal">
                                    <slot></slot>
                                </div>
                            
                    </div>

                    <!--Contenido pie de página-->
                    <div class="row pie-contenido">
                        <div class="col-sm-1" id="avatar">
                            <img src="/images/svg/buho_original_1.svg" alt="Avatar adulto mayor">
                        </div>

                        <div class="col-sm-11" id="descripcion-objeto">
                            <h6 v-if="objetoSeleccionado.descripcion">{{objetoSeleccionado.descripcion}}</h6>
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
        actualizarContenido(){
            //llamar a axios y pasarle como parámetro los valores a editar, 
            this.editarNombre=true;
        }

    },
    computed: {
        permisoDeAdministrador() { //esto parece obvio pero es necesario para los permisos de las politicas
            let usuarioTienePermiso = this.usuario.rol == 'Administrador';
            return usuarioTienePermiso;
        }
    }
});
