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
            // description:'parametro de barra de navegacion lateral'
        },
        objetoSeleccionado: {
            type: Object,
            default: () => { return { id: '1', nombreModulo: 'crearModulo', rol: 'Administrador' } },
            // description:'parametro de barra de navegacion, tambien se usa la descripcion cuando el objeto seleccionado es un modulo o submodulo'
        },
        tituloTemporal: {
            type: String,
            required: false,
            default: () => { return '' },
            // description:'Se debe enviar cuando se crea un modulo o submodulo para reemplzar al titlo del modulo o submodulo'
        },
        usuario: {
            type: Object,
            default: () => { return { nombre: 'Admin', rol: 'Administrador' } }
        },
        crearSubmodulo: false, //variable usada solo cuando se crea un nuevo submodulo para darle estilos de seleccionado
        mostrarIconoRepetir: false,
        // silenciar:true



    },
    data: function () {
        return {
            campoNombre: null,
            nombre: null,
            evIndividual: false,
            silenciar: true,
            sonido: null,
        };
    },
    mounted() {

        this.sonido = window.speechSynthesis;
    },
    template: //html
        `  
<div class="div-contenido container-fluid"  v-cloak>
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
            <modulo-side-var-menu :usuario="usuario" :curso="curso" :objeto-seleccionado="objetoSeleccionado" :crear-submodulo="crearSubmodulo"></modulo-side-var-menu>
        </div>
        <div class="col-sm-10" id="columna-contenido-lateral">
            <div class="row fila-principal">
                <!-- Columna central -->
                <div class="col-sm-10 col-central">
                    <div class="row">
                        
                        <!--"navegacion-atras"-->
                        <div class="col-auto">
                            <a v-if="!evIndividual" key="link" :href="'/contenido-alfaweb/?enlace='+navegarAtras" @click="clickSilenciar" title="Tema anterior"> <i class="fas fa-arrow-alt-circle-left fa-3x"></i> </a>
                            <a v-else  key="ev" title="Ver Contenido" @click.stop="evaluacionIndividual('contenido')"> <i class="fas fa-arrow-alt-circle-left fa-3x"></i> </a>
                        </div>
                       
                       
                        <div class="col" id="titulo-modulo">
                        <h2 v-if="tituloTemporal!=''">{{ tituloTemporal}}</h2>
                        <h2 v-else-if="objetoSeleccionado.nombreModulo">{{ objetoSeleccionado.nombreModulo}}</h2>
                        <h2 v-else-if="objetoSeleccionado.nombreSubmodulo">{{ objetoSeleccionado.nombreSubmodulo}}</h2>
                        </div>

                        <!--REPETIR LA EVALUACION-->
                        <div v-if="mostrarIconoRepetir" class="col-auto">
                            <a  @click="intentarNuevamente" title="Repetir reto"><i class="fas fa-redo-alt fa-3x"></i> </a>
                        </div>

                                             
                                              
                         <div  class="col-auto">
                            <!--navegacion-siguiente-->
                            <a v-if="evIndividual" key="siguiente"  :href="'/contenido-alfaweb/?enlace='+navegarSiguiente" title="Siguiente tema" @click="clickSilenciar" ><i class="fas fa-arrow-alt-circle-right fa-3x"></i> </a>
                            <!--navegacion-evaluacion-->
                            <a v-else key="evaluacion" title="Evaluación" @click.stop="evaluacionIndividual"><i class="fas fa-arrow-alt-circle-right fa-3x"></i> </a> <!--por defecto se muestra este boton-->                  
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
                            <a v-if="silenciar" @click="clickReproducir" title="Reproducir"><i class="fas fa-volume-mute"></i></a>
                            <a v-else @click="clickSilenciar" title="Silenciar"><i class="fas fa-volume-up"></i></a>
                        </div>
                      


                        <div class="col-sm-11" id="descripcion-objeto">
                            <h6 v-if="existeDescripcion  && tituloTemporal==''">{{objetoSeleccionado.descripcion}}</h6>
                        </div>
                    </div>

                </div>
                <!-- columna derecha -->
                <div class="col-sm-2 col-derecha">
                    <modulo-panel-derecho :usuario="usuario" @evaluacion-individual="evaluacionIndividual"></modulo-panel-derecho>
                </div>
            </div> <!-- fin fila de contenido central y barra lateral derecha -->
        </div> <!--fin columna contenido central y barra lateral derecha-->
        
        
    </div>
</div>

    `,


    methods: {
        intentarNuevamente() {
            this.$emit('intentar-nuevamente');
        },
        evaluacionIndividual(contenido) {
            this.objetoSeleccionado.descripcion = '';
            if (contenido == 'contenido') {
                //si se envia algo como par'ametro, entonces se retorna
                this.evIndividual = false;
                console.log('muestra el contenido, boton izquierdo apunta a mostrar contenido, boton derecho muestra al siguiente submodulo');
            } else {
                //si no se pasa nada como parametro se muestra la evaluacion
                this.evIndividual = true;
                console.log('muestra evaluacion, boton izquierdo apunta a mostrar contenido, boton derecho muestra al siguiente submodulo');
            }
            this.$emit('evaluacion-individual', contenido);
            this.clickSilenciar();

        },

        clickSilenciar() {
            this.sonido.cancel();
            this.silenciar = true;
        },
        clickReproducir() {
            this.silenciar = false;
            // var voices = window.speechSynthesis.getVoices();
            var msg = new SpeechSynthesisUtterance(this.objetoSeleccionado.descripcion);
            // msg.voice = voices[10]; // Note: some voices don't support altering params
            this.sonido.speak(msg);
        },


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
