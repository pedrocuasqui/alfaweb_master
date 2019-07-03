parasails.registerComponent('modulo-panel-derecho', {
    props: {
        usuario: {
            type: Object,
            default: () => { return { nombre: 'Visitante', rol: 'Estudiante', id: '1' } },
        },
        cursoEstudiante: {
            type: Object,
            required: false,
            default: () => { return null; }
        },
        nivelActual: {
            type: String,
            default: "9",
        },
        totalNiveles: {
            type: String,
            default: '9',
        },
        puntajeActual: {
            type: String,
            default: "50"
        },
        medallaActual: {
            type: String,
            default: "70"
        },
        usuariosConectados: {
            type: Array,

            default: function () { //comentar este bloque default cuando se pasen los datos como parámetro a este componente
                return [
                    {
                        nombre: 'Pedro',
                        apellido: 'Cuasqui',
                        Nivel: '4',
                    },
                    {
                        nombre: 'Estevan',
                        apellido: 'Pérez',
                        Nivel: '5',
                    }
                ]
            }
        },




        adminCreandoModuloSubmodulo: {
            type: Boolean,
            required: false,
            default: () => { return false; }
        }

    },
    data() {
        return {
            redirigeaContenido: false,
        }

    },
    mounted() {
        console.log('ENTRA A PANEL DERECHO');
        console.log(this.cursoEstudiante);
    },
    template: //html 
        `  
    <div class="container-fluid barra-lateral">
        <div class="row usuario">
                <div class="col">
                    {{usuario.nombre}}

                    <slot name="audio_general"></slot>
                    <div v-if="existeAvance" >
                        <a v-if="cursoEstudiante.avance.enlace" :href="'/contenido-alfaweb/?enlace='+cursoEstudiante.avance.enlace" >ultimo tema revisado:{{cursoEstudiante.nombre}}</a>
                        <a v-else :href="'/interfaz-modulos/?objetoId='+cursoEstudiante.avance.objetoId+'&tipoContenido='+cursoEstudiante.avance.tipoContenido">ultimo tema revisado:{{cursoEstudiante.nombre}}</a>
                    </div>
                </div>
                
        </div>
        
        <slot ></slot>
        <div class="row progreso">
                <div class="col">
                    <div class="nivel">
                        <div class="progress icono">    
                            <div class="progress-bar" role="progressbar" :style="{width:porcentajeAvanceNiveles+'%'}" :aria-valuenow="nivelActual" aria-valuemin="0" aria-valuemax="100">
                            </div>
                            <div class="contenedor-icono fa-stack">
                                <i class="fas fa-battery-empty fa-stack-2x"></i>    
                                <span class="fa-stack-1x">&nbsp{{nivelActual}}/{{totalNiveles}}</span>
                            </div>
                        </div>
                        <div class="progress">    
                            <div class="progress-bar" role="progressbar" :style="{width:porcentajeAvanceNiveles+'%'}" :aria-valuenow="nivelActual" aria-valuemin="0" aria-valuemax="100">Nivel</div>
                        </div>
                    </div>
                    
                    <div class="puntaje">
                        <div class="progress icono">    
                            <div class="progress-bar" role="progressbar" :style="{width:puntajeActual+'%'}" :aria-valuenow="puntajeActual" aria-valuemin="0" aria-valuemax="100">
                            </div>
                            <div class="contenedor-icono fa-stack">
                                <i class="fas fa-certificate fa-stack-2x" > </i>
                                <span class="fa-stack-1x">{{puntajeActual}}</span>
                            </div>
                        </div>
                        <div class="progress ">
                            <div class="progress-bar" role="progressbar" :style="{width:puntajeActual+'%'}" :aria-valuenow="puntajeActual" aria-valuemin="0" aria-valuemax="100">Puntos</div>
                        </div>
                    </div>
                   
                    <div class="medallas">
                        <div class="progress icono">    
                            <div class="progress-bar" role="progressbar" :style="{width:medallaActual+'%'}" :aria-valuenow="medallaActual" aria-valuemin="0" aria-valuemax="100">
                            </div>
                            <div class="contenedor-icono">
                                <img v-if="medallaActual<=30.0" src="/images/svg/buho_bebe.svg" alt="polhibou_bebe">
                                <img v-else-if="medallaActual>=30.1 && medallaActual<=50.0" src="/images/svg/buho_original_1.svg" alt="polhibou_estudiante">
                                <img v-else-if="medallaActual>=50.1 && medallaActual<=90" src="/images/svg/buho_sabio.svg" alt="polhibou_sabio">
                                <img v-else src="/images/svg/buho_graduado.svg" alt="polhibou_graduado">
                            </div>
                        </div>
                        <div class="progress ">
                            <div class="progress-bar" role="progressbar" :style="{width:medallaActual+'%'}" :aria-valuenow="medallaActual" aria-valuemin="0" aria-valuemax="100">Medalla</div>
                        </div>
                    </div>
                </div>
        </div>
        <div class="row enlaces">
            <div class="col">
                <div class="reto">
                    <i class="fas fa-dice"></i>
                    <span> Reto</span>
                </div>

                <div class="evaluacion">
                    <i class="fas fa-clipboard-check"></i>
                    <a @click="evaluacionIndividual()" class="estiloLink"><span> Evaluación</span></a>
                </div>

                <div class="tabla-puntuacion">
                    <i class="fas fa-chart-bar"></i>
                    <span> Puntuación</span>
                </div>
            </div>            
        </div>
        <div class="row usuarios-conectados">
            <div class="col">
                <div>Últimos usuarios conectados</div>
                <ul>
                    <li v-for="usuario in usuariosConectados">{{usuario.nombre}}</li>
                 </ul>
            </div>
        </div>
        <div class="row soporte">
            <div class="col">
            <div>soporte</div>
                <i class="fas fa-question-circle fa-2x" title="pedro.cuasqui@epn.edu.ec">    </i>   
            </div>
        </div>
    </div>`,
    methods: {
        evaluacionIndividual(contenido) {
            // alert('evaluacion indiidual');
            if (this.adminCreandoModuloSubmodulo) {
                alert('Es necesario crear primero el objeto (módulo o submódulo) actual');
            } else {
                if (this.redirigeaContenido) {
                    contenido = 'contenido';
                    this.$emit('evaluacion-individual', contenido);
                    this.redirigeaContenido = false;
                } else {
                    this.$emit('evaluacion-individual', contenido);
                    this.redirigeaContenido = true;
                }

            }

        },
        reto() { //pendiente desarrollar el reto
            if (this.adminCreandoModuloSubmodulo) {
                alert('Es necesario crear primero el objeto (módulo o submódulo) actual');
            } else {
                this.$emit('reto', contenido);
            }
        }


    },
    computed: {
        porcentajeAvanceNiveles() {
            return (this.nivelActual / this.totalNiveles) * 100;
        },
        existeAvance() {
            let avance = false;

            console.log('modulo panel derecho, funcion existeAvance');
            if (this.cursoEstudiante) {
                console.log('existe cursoEstudiante');
                if (this.cursoEstudiante.avance) {
                    avance = true;
                }
            }

            return avance;
        }

    }

});