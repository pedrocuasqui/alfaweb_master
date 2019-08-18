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
            description: 'El curso que está solicitando revisando el estudiante, se usa en la interfaz indice de estudiante para poder redireccionar al último tema revisado y se usa para buscar la puntuacion (intentoEvaluacion) actual del estudiante '
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
            intentosEvaluacion: null,
            estudiantesConSusIntentos: [],
            estudiantesConSusIntentosQuickSort: null,
        }

    },
    mounted() {
        console.log('ENTRA A PANEL DERECHO');
        console.log(this.cursoEstudiante);
        console.log(this.usuario);



    },
    template: //html 
        ` 
<div>


  <!-- Modals -->
    <!-- Ver puntuacion Historica del estudiante -->
    <div class="modal fade " id="modalPuntuacionEstudiante" tabindex="-1" role="dialog" aria-labelledby="etiquetaModalPuntuacion"
        aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="etiquetaModalPuntuacion">Puntuación histórica</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">    
                    <div class = "container">
                        <div class="row">
                            <div class="col-sm-4">
                            <!--COLUMNA DE TABLA DE PUNTUACION ACTUAL, posicion en funcion del puntaje-->
                            <table class="table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Posición</th>
                                        <th scope="col">Estudiante</th>
                                        <th scope="col">Puntos</th>
                                        <th scope="col">Experiencia</th>
                                        <th scope="col">Nivel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(estudiante, index) in estudiantesConSusIntentosQuickSort">
                                        
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{estudiante.nombre}}</td>
                                            <td>{{estudiante.intentosEvaluacion[0].puntos}}</td>
                                            <td>{{estudiante.intentosEvaluacion[0].medalla}}</td>
                                            <td>{{estudiante.intentosEvaluacion[0].nivel}}</td>
                                        
                                    </tr>
                                </tbody>
                          </table>







                            </div>
                            <div class="col-sm-8">
                            <!--COLUMNA DE GRÁFICO DE AVANCE-->
                            <canvas id="graficoPuntuacionHistorica" width="1200" height="600"></canvas>

                            </div>
                        </div>
                        <div class= "row">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
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
                <!--<div class="reto">
                    <i class="fas fa-dice"></i>
                    <span> Reto</span>
                </div>-->

                <div class="evaluacion">
                    <i class="fas fa-clipboard-check"></i>
                    <a @click="evaluacionIndividual()" class="estiloLink"><span> Evaluación</span></a>
                </div>

                <div class="tabla-puntuacion">
                    <i class="fas fa-chart-bar"></i>
                    <a @click="clickPuntuacion()" class="estiloLink"><span> Puntuación</span></a>
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
    </div>    
</div>`,
    methods: {
        clickPuntuacion() {

            if (this.cursoEstudiante) {//Siempre debe existir un curso, no es posible acceder hasta esta ventana sin pasar por la seleccion de un curso
                axios(
                    {
                        url: '/puntuacion-estudiante',
                        method: 'get',
                        params: { cursoId: this.cursoEstudiante.id }

                    }
                ).then(response => {
                    console.log(response.data);
                    // Los intentos del usuario logueado, ordenados ascendentemente por fecha de creacion
                    this.intentosEvaluacion = response.data.intentosEvaluacion;
                    // funcion para seleccinar solo los estudiantes que tienen evaluaciones es decir que la propiedad intentosEvaluacion tenga una longitud mayor a cero
                    this.estudiantesConSusIntentos = response.data.estudiantesConSusIntentos;
                    this.seleccionarEstudiantesConIntentos();
                    this.estudiantesConSusIntentosQuickSort = this.ordenamientoQuickSort(this.estudiantesConSusIntentos);
                    this.definirGraficoPuntuacion();
                    this.mostrarModalPuntuacion();

                }).catch(err => {
                    alert('Error: ' + err + '/n Contacte con el administrador del sistema')
                });

            }
        },
        seleccionarEstudiantesConIntentos() {
            //se recorre el arreglo recibido del servidor con los estudiantes y sus evaluaciones
            this.estudiantesConSusIntentos.forEach(estudiante => {
                // si el estudiante no tiene evaluaciones, se añaden valores por defecto a una evaluacion ficticia para que se lo tome en cuenta
                if (estudiante.intentosEvaluacion.length == 0) {
                    estudiante.intentosEvaluacion.push({ //intento por defecto se usa para los usuario no logueados o usuarios logueados por primera vez que aún no tienen interaccion con el aplicativo
                        puntos: 0,
                        nivel: 0,//modulo 1
                        medalla: 'bebe', //medalla mas basica
                        tiempoMaximoPorPregunta: 30, //en segundos por defecto
                        evaluacion: null,
                    });
                }



            });

        },
        mostrarModalPuntuacion() {
            console.log('MOSTRAR MODAL PUNTUACION');
            console.log(this.estudiantesConSusIntentosQuickSort);
            $(function () {
                $('#modalPuntuacionEstudiante').modal('show');
            });
        },
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
        /* se omite el reto, se considera redundante puesto que las evaluaciones son por tema
        reto() { //pendiente desarrollar el reto
            if (this.adminCreandoModuloSubmodulo) {
                alert('Es necesario crear primero el objeto (módulo o submódulo) actual');
            } else {
                this.$emit('reto', contenido);
            }
        },
        */
        definirGraficoPuntuacion() {

            console.log('DEFINIR GRAFICO DE PUNTUACION');
            var labels = [];
            var datasetLabel = "Curso: " + this.cursoEstudiante.nombre;
            var datasetData = [];
            let contadorEvaluaciones = 0;
            let limiteEvaluaciones = 30;
            this.intentosEvaluacion.forEach(element => {
                // con un contador limitar el número de evaluaciones que se muestran, para no sobrecargar el gráfico, solo se muestran 30 evaluaciones
                contadorEvaluaciones += 1;
                if (contadorEvaluaciones <= limiteEvaluaciones) {
                    // convierto la fecha de tipo Datetime a date
                    let fechaUltimoAcceso = new Date(element.createdAt);
                    let fecha = fechaUltimoAcceso.getDate() + "/" + fechaUltimoAcceso.getMonth() + "/" + fechaUltimoAcceso.getFullYear();
                    // Agrego al arreglo de etiquetas, la fecha concatenada con el nombre del submodulo al uqe pertenece la evaluacion
                    labels.push(fecha + " " + element.submodulo.nombreSubmodulo);
                    datasetData.push(element.evaluacion.puntosObtenidos);
                }

            });
            // QUE DATA SE TOMARÁ PARA EL GRAFICO
            //OPCIONES"
            // 0) graficar el puntaje obtenido, en cada evaluacion por fecha(probado)
            // pros: facilidad de programacion, solo se lee la colecion INTENTOEVALUACION y se ordena ascendentemente
            // cons: si son muchas evaluaciones el eje x será demasiado grande, 
            // cons: si el usuario solo ha realizado varias veces la misma evaluacion, el grafico mostraría informacion no tabulada, para esto serviría la opción 2
            // 1) graficar  el puntaje de la ultima evaluacion de cada submodulo 
            // pros: facilidad de retorno de datos
            // cons: el eje X crecería en funcion del numero de submodulo del curso, generalmente serán varios
            // 2) graficar el historico de puntajes obtenidos por submodulo seleccionado
            // pros: se vería el grafico con las puntuaciones por cada fecha desde la mas antigua a la mas reciente, 
            // cons: si el estudiante tiene pocas evaluaciones, o peor aun solo tiene una (lo mas común), la grafica no servirá de nada
            // 3) puntos obtenidos en un rango de tiempo
            // pros: se sumarian los puntos de un intervalo de tiempo, por ejemplo de cada dia, el grafico mostraria la cantidad de puntos alcanzados en cada dia desde el inicio del curso, hasta hoy y ademas se vería la frecuencia de



            var ctx = document.getElementById('graficoPuntuacionHistorica').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    labels: labels,
                    datasets: [{
                        label: datasetLabel,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: datasetData
                    }]
                },

                // Configuration options go here
                options: {}
            });




        },



        ordenamientoQuickSort(origArray) {
            console.log('INGRESO A QUICK SORT ');
            if (origArray.length <= 1) {
                console.log('RETORNA: ');
                console.log(origArray);
                return origArray;

            } else {
                console.log('NO DEBE INGRESAR A CONTINUACION DE "RETORNA": ');
                var left = [];
                var right = [];
                var newArray = [];
                var estudiantePivot = origArray.pop();
                var pivot = estudiantePivot.intentosEvaluacion[0].puntos;
                var length = origArray.length;

                for (var i = 0; i < length; i++) {
                    if (origArray[i].intentosEvaluacion[0].puntos >= pivot) {
                        left.push(origArray[i]);
                    } else {
                        right.push(origArray[i]);
                    }
                }

                return newArray.concat(this.ordenamientoQuickSort(left), estudiantePivot, this.ordenamientoQuickSort(right));
            }


            // var myArray = [3, 0, 2, 5, -1, 4, 1 ];

            // console.log("Original array: " + myArray);
            // var sortedArray = quick_Sort(myArray);
            // console.log("Sorted array: " + sortedArray);

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