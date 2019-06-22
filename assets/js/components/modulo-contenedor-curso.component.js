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
            required: true, //es necesario para poder cargar el menu lateral
            // description:'parametro de barra de navegacion lateral'
        },
        objetoSeleccionado: {
            type: Object,
            // required: true,//no necesario para señalar el modulo o submodulo seleccionado en el menu lateral porque el menu ya contiene su definicion por defecto
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
            // default: () => { return { nombre: 'Admin', rol: 'Administrador' } }
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
            silenciarGeneral: false, //el audio est'a activado

        };
    },
    mounted() {
        window.sonido = null;
        window.sonido = window.speechSynthesis;

    },
    template: //html
        `  
<div class="div-contenido container-fluid"  v-cloak>
    <div class="row" id="div-cabecera"  >
        <div class="col-sm-10" id="breadcrumbText" ref="printBreadcrumb">
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
            <modulo-side-var-menu :usuario="usuarioRecibido" :curso="curso" :objeto-seleccionado="objetoSeleccionado" :crear-submodulo="crearSubmodulo" ></modulo-side-var-menu>
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
                            
                                <div class="contenedor-slot-principal" ref="printContenidoCentral">
                                    <!--El javascript que reproduce el siguiente audio se encuentra en cada documento javascript de cada modulo y submodulo del curso informaticaBasica, tambien se puede invocar desde cuanlquier contenido dentro de este componente-->
                                    <audio id="audioMouseOver" src="/audio/mouseOverElementos/zapsplat_multimedia_game_designed_water_drip_onto_surface_004_26337.mp3"></audio>
                                    <slot></slot>
                                </div>
                            
                    </div>


                    <div class="row pie-contenido" >
                        <div class="col-sm-1" id="avatar">
                            <img src="/images/svg/buho_original_1.svg" alt="Avatar adulto mayor">
                            <a v-if="silenciar" @click="clickReproducir" title="Reproducir" class="audioTag"><i class="fas fa-volume-mute"></i></a>
                            <a v-else @click="clickSilenciar" title="Silenciar" class="audioTag"><i class="fas fa-volume-up"></i></a>
                        </div>
                      

                        <div class="col-sm-11" id="descripcion-objeto" ref="printContenidoDescripcion">
                            <h6 v-if="existeDescripcion  && tituloTemporal==''">{{objetoSeleccionado.descripcion}}</h6>
                        </div>
                    </div>

                </div>
                <!-- columna derecha -->
                <div class="col-sm-2 col-derecha" :style="{backgroundColor: objetoSeleccionado.color}">
                    <modulo-panel-derecho :usuario="usuarioRecibido" @evaluacion-individual="evaluacionIndividual"> 
                        <template v-slot:audio_general>
                        <!--el scope de modulo-contenedor-curso funciona en el contenido que se envia dentro de modulo-panel-derecho, desde aqui no se puede acceder al scope de modulo-panel-derecho-->
                            <a v-if="silenciarGeneral" @click="clickReproducirGeneral" title="Reproducir" ><i class="fas fa-volume-mute"></i></a>
                            <a v-else @click="clickSilenciarGeneral" title="Silenciar" ><i class="fas fa-volume-up"></i></a>
                            <a @click="clickImprimir" title="Imprimir contenido"><i class="fas fa-print"></i></a>
                            
                        </template>

                    </modulo-panel-derecho>
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
            window.sonido.cancel();
            window.silenciar = true;
        },
        clickReproducir() {
            this.silenciar = false;
            // var voices = window.speechSynthesis.getVoices();
            var msg = new SpeechSynthesisUtterance(this.objetoSeleccionado.descripcion);
            // msg.voice = voices[10]; // Note: some voices don't support altering params
            window.sonido.speak(msg);
        },
        clickReproducirGeneral() {
            this.silenciarGeneral = false;
            $('.audioTag').show();
            $('.audioTag').show();
            $("#audioMouseOver").attr("src", "/audio/mouseOverElementos/zapsplat_multimedia_game_designed_water_drip_onto_surface_004_26337.mp3");
            $("#audioModalAbrir").attr("src", "/audio/zapsplat_multimedia_game_sound_retro_blip_026_29558.mp3");
            $("#audioModalCerrar").attr("src", "/audio/zapsplat_multimedia_game_sound_retro_blip_015_29547.mp3");
        },
        clickSilenciarGeneral() {
            this.silenciarGeneral = true;
            $('.audioTag').hide();
            $('.audioTag').hide();
            $('audio').hide();
            $("audio").attr("src", "");
        },
        clickImprimir() {
            // window.print();
            //fuente de este codigo: https://www.youtube.com/watch?v=pePlEaUQEbc
            var contenidoBreadcrumb = this.$refs.printBreadcrumb;
            var contenidoCentral = this.$refs.printContenidoCentral;
            var contenidoDescripcion = this.$refs.printContenidoDescripcion;
            newWin = window.open(""); //abre una variable para escribir sobre ella
            // console.log(contenidoImprimir.outerHTML)
            newWin.document.write('<h1>Sistema "alfaweb" EPN-FIS</h1>');
            newWin.document.write('<h2>Contenido</h2>');
            newWin.document.write(contenidoBreadcrumb.outerHTML);
            newWin.document.write(contenidoCentral.outerHTML);
            newWin.document.write('<h2>Descripción</h2>');
            newWin.document.write(contenidoDescripcion.outerHTML);
            newWin.document.write('<h5>Sistema "alfaweb" http://www.epn.edu.ec autor: EPN-FIS-Pedro Cuasqui</h5>');
            newWin.print();
            newWin.close();
            newWin.document.write('<h6>http://www.epn.edu.ec </h6>');
        }


    },
    computed: {
        existeDescripcion() {
            var existe = false;
            if (this.objetoSeleccionado.descripcion)
                existe = true;

            return existe;
        },
        usuarioRecibido() {

            var usuarioR = this.usuario;
            if (!this.usuario) { //si el usuario es null o undefined
                console.log('USUARIO DENTRO DE CONTENEDOR-CURSO es null');
                usuarioR = { nombre: 'Visitante', rol: 'Estudiante' }
            }
            return usuarioR;
        }
    }
});
