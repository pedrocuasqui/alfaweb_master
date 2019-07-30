parasails.registerComponent('modulo-panel-derecho', {
    props: {
        usuario: {
            type: Object,
            default: () => { return { nombre: 'Visitante', rol: 'Estudiante', id: '1' } },
        },
        cursoEstudiante: {
            type: Object,
            required: false,
            default: () => { return null; },
            description: 'solo se usa en la interfaz indice de estudiante para poder redireccionar al último tema revisado'
        },
        puntajeActual: {
            type: Number,
            default: 0
        },
        nivelActual: {
            type: Number,
            default: 0,
        },
        totalNiveles: {
            type: Number,
            default: 0,
        },
        medallaActual: {
            type: String,
            default: "bebe"
        },
        porcentajeAvance: {
            type: Number,
            default: 0
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

                    <slot ></slot>
                    
                    <div v-if="existeAvance" >
                        <a v-if="cursoEstudiante.avance.enlace" :href="'/contenido-alfaweb/?enlace='+cursoEstudiante.avance.enlace" >ultimo tema revisado:{{cursoEstudiante.nombre}}</a>
                        <a v-else :href="'/interfaz-modulos/?objetoId='+cursoEstudiante.avance.objetoId+'&tipoContenido='+cursoEstudiante.avance.tipoContenido">ultimo tema revisado:{{cursoEstudiante.nombre}}</a>
                    </div>
                </div>
                
        </div>
        
       
        <div class="row progreso">
            <div class="col">
                        
                <div class="puntaje">
                        <div class="row">
                            <div>Puntos:</div>
                            <!--<div class="progress icono">    
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
                            -->
                            <div class="progress icono" >
                                <div class="contenedor-icono ">
                                    <i class="fas fa-certificate fa-stack-2x" > </i>
                                    <span class="fa-stack-1x">{{puntajeActual}}</span>
                                </div>

                                
                            </div>
                        </div>
                </div>  
                        


                <div class="nivel">
                    <div class="row indicador">
                            <div>Nivel:</div>
                            <div class="progress icono" >    
                               <!-- <div class="progress-bar" role="progressbar" :style="{width:porcentajeAvanceNiveles+'%'}" :aria-valuenow="porcentajeAvanceNiveles" aria-valuemin="0" aria-valuemax="100">
                                </div> -->
                                <div class="contenedor-icono">
                                    <i class="fas fa-battery-empty fa-stack-2x"></i>    
                                    <span class="fa-stack-1x">&nbsp{{nivelActual}}/{{totalNiveles}}</span>
                                </div>
                            </div>
                    </div>
                    <div class="progress "  style="height: 3px;">    
                            <div class="progress-bar" role="progressbar" :style="{width:porcentajeAvanceNiveles+'%'}" :aria-valuenow="porcentajeAvanceNiveles" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>

                <div class="medallas">
                    <div class="row indicador" >
                        <div>Progreso:</div>
                        <div class="progress icono">    
                            <!--<div class="progress-bar" role="progressbar" :style="{width:porcentajeAvance+'%'}" :aria-valuenow="porcentajeAvance" aria-valuemin="0" aria-valuemax="100">
                            </div> -->
                            <div class="contenedor-icono">
                                <img v-if="medallaActual=='bebe'" src="/images/svg/buho_bebe.svg" :alt="medallaActual">
                                <img v-else-if="medallaActual=='estudiante'" src="/images/svg/buho_original_1.svg" :alt="medallaActual">
                                <img v-else-if="medallaActual=='estudiante destacado'" src="/images/svg/buho_original_1.svg" :alt="medallaActual">
                                <img v-else-if="medallaActual=='egresado'" src="/images/svg/buho_sabio.svg" :alt="medallaActual">
                                <img v-else src="/images/svg/buho_graduado.svg" :alt="medallaActual">
                            </div>
                        </div>
                    </div>
                    <div class="progress "  style="height: 3px;">
                        <div class="progress-bar" role="progressbar" :style="{width:porcentajeAvance+'%'}" :aria-valuenow="porcentajeAvance" aria-valuemin="0" aria-valuemax="100"></div>
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
            let porcentaje = 0
            if (this.nivelActual && this.totalNiveles) {
                if (this.totalNiveles != 0) {
                    porcentaje = (this.nivelActual / this.totalNiveles) * 100;
                }

            }
            return porcentaje;
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