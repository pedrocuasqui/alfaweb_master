parasails.registerComponent('modulo-panel-derecho', {
    props: {
        usuario: {
            type: Object,
            default: ()=>{return {nombre:'Pepe Pérez', rol:'Estudiante'}},
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
        }

    },
    data() {
        return {

        }

    },
    template: //html 
    `  
    <div class="container-fluid barra-lateral">
        <div class="row usuario">
                <div class="col">
                {{usuario.nombre}}
                </div>
        </div>
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
                    <span> Evaluación</span>
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


    },
    computed: {
        porcentajeAvanceNiveles() {
            return (this.nivelActual / this.totalNiveles) * 100;
        },

    }

});