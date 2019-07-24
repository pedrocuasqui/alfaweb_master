parasails.registerComponent('modulo-ev-individual', {
    props: {
        submodulo: {
            type: Object
        },
        curso: {
            type: Object
        },
        usuario: {
            type: Object
        }
    },
    data() {
        return {

            tipoEvaluacion: null,
            arregloRandom: [],
            //variables para usar en Emparejamiento del lado del Estudiante
            enunciadoSeleccionado: null,
            respuestaSeleccionada: null,
            preguntaSeleccionadaJuegoEmparejamiento: null,
            coloresPreguntasEmparejamiento: ['#F31885', '#F39318', '#B4F318', '#18F38F', '#18A7F3', '#9318F3', '#F318D8', '#823815', '#268215', '#158280', '#D52FE3', '#F31850', '#D218F3', '#1833F3', '#18E9F3', '#33F318', '#F3DF18'],

            totalTime: null,
            descripcionActividad: '',

            tiempoRespuestaInicio: null,// almacena el valor de totalTime  al momento de dar clic en un enunciado
            tiempoRespuestaFin: null,
            erroresRespuesta: 0,
            aciertos: [],
            preguntasCuestionarioRespuestas: [],

            puntos: null,
            nivel: null,
            medalla: null,

            apruebaEvaluacion: 0,


        };
    },
    beforeMount() {
        this.tipoEvaluacion = this.submodulo.evaluacion.tipo;
        this.tiempoMaximoPorPregunta = this.submodulo.evaluacion.tiempoMaximoPorPregunta;
        this.preguntasCuestionario = [...this.submodulo.evaluacion.preguntas];

        this.preguntasCuestionario.forEach(pregunta => {
            //agrego todas las preguntas al arrreglo para despues reemplazar cada pregunta por su pregunta , este se guardará en la collection IntentoEvaluacioncon respuestas
            let respuestaIntento = pregunta;
            respuestaIntento.errores = null;
            respuestaIntento.tiempoDeRespuesta = null;
            this.preguntasCuestionarioRespuestas.push(respuestaIntento);
        });

        this.puntos = this.usuario.puntos;
        this.nivel = this.usuario.nivel;
        this.medalla = this.usuario.medalla;

        this.numeroSubmodulosCurso = this.usuario.numeroSubmodulosCurso;
        this.numerointentosSubmodulosCurso = this.usuario.numerointentosSubmodulosCurso

        this.randomPreguntasEmparejamiento();

    },

    mounted() {

        this.totalTime = this.tiempoMaximoPorPregunta;
        // mostrar el modal con las instrucciones para la evaluacion
        if (this.tipoEvaluacion == 'Cuestionario') {
            this.descripcionActividad = '<p>Lee atentamente el enunciado y selecciona la respuesta correcta.</p><p>Tienes <strong>' + this.tiempoMaximoPorPregunta + ' segundos </strong> para responder la pregunta. <br> ¡Mientras más rápido respondas, más puntos ganas!</p>';
        } else if (this.tipoEvaluacion == "Emparejamiento") {
            this.descripcionActividad = '<p>Selecciona una opción de la columna de la izquierda. Luego selecciona la respuesta correcta de la columna derecha</p>' + '<p>Tienes <strong>' + this.tiempoMaximoPorPregunta + ' segundos  </strong> para responder la pregunta. <br> ¡Mientras más rápido respondas, más puntos ganas!</p>';
        } else {
            this.descripcionActividad = '<p>Mira atentamente la imágen y selecciona la respuesta correcta.</p><p>Tienes <strong>' + this.tiempoMaximoPorPregunta + ' segundos </strong> para escoger la respuesta correcta. <br> ¡Mientras más rápido respondas, más puntos ganas!</p>';
        }
        this.mostrarModalInicial();

    },
    template://html
        `  
    <div class="">
  

<!-- Modal -->
<div class="modal fade" id="modalInstrucciones" tabindex="-1" role="dialog" aria-labelledby="modalInstruccionesLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalInstruccionesLabel">Instrucciones</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="descripcion" v-html="descripcionActividad">
        </div>
        
      </div>
      <div class="modal-footer">
        <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Omitir evaluación</button>-->
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="empezarEvaluacion">Aceptar</button>
      </div>
    </div>
  </div>
</div>



























 

    <div>
    
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="totalTimeProgress" aria-valuemin="0.0" aria-valuemax="100" :style="{width: totalTimeProgress+'%'}">{{totalTime}}</div>
    </div>
    </div>

    <!--CUESTIONARIO-->
    <template v-if="tipoEvaluacion=='Cuestionario'">
        <div class="row">
            <div class="list-group">
                <div class="list-group-item list-group-item-action active"
                    v-for="(pregunta, indexPreg) in preguntasCuestionario">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{pregunta.enunciado}}</h5>
                        
                    </div>


                    <div v-for="(opcion,index) in opcionesRespuesta(pregunta)">
                        <input type="radio" :id="opcion.id" :value="opcion.texto">
                            <!--v-model="pregunta.respuesta">-->
                        <label :for="opcion.id">{{opcion.texto}}</label>
                    </div>

                    <small>Puedes editar la pregunta seleccionando la opción correcta.</small>
                </div>
            </div>
        </div>
    </template>






    <!-- EMPAREJAMIENTO -->
    <template v-if="tipoEvaluacion=='Emparejamiento'">
        <div class="container">
            <div class="row">
            <!--
                <div class="col-sm-8">
                    <div class="row" v-for="(pregunta,indexPreg) in preguntasCuestionario">


                        <div class="col-sm-4" :id="'Preg'+indexPreg" key="'Preg'+indexPreg">
                            {{pregunta.enunciado}}

                        </div>

                        <div class="col-sm-4" :id="'Resp'+indexPreg" key="'Resp'+indexPreg">
                            {{pregunta.respuesta}}

                        </div>
                        

                    </div>
                </div>
                -->
                <!-- usar el siguiente codigo para el estudiante-->
                <div class="col-sm-4">
                    
                    <div @click.stop="seleccionarEnunciadoEmpareja(pregunta,indexPreg)"
                        class="row"
                        :class="[enunciadoSeleccionado == indexPreg ? 'enunSelected': '' ]"
                        :id="'Preg'+indexPreg" key="indexPreg"
                        v-for="(pregunta,indexPreg) in preguntasCuestionario">
                        {{pregunta.enunciado}}
                    </div>
                </div>
                
                <div class="col-sm-4">
                    <div class="row"
                        @click.stop="seleccionarRespuestaEmpareja(pregunta1,indexResp)"
                        :id="'Resp'+indexResp" key="indexResp"
                        v-for="(pregunta1, indexResp) in arregloRandom">
                        
                        {{pregunta1.respuesta}}
                    </div>
                </div>
            
            </div>
        </div>
    </template>






    <!-- SELECCIONAR OBJETO INDICADO -->
    <template v-if="tipoEvaluacion=='Nombre_Objeto'">
        <div class="row">
         
            <div class="list-group">
                <div class="list-group-item list-group-item-action active"
                    v-for="(pregunta, indexPreg) in preguntasCuestionario">
                    <div class="d-flex w-100 justify-content-between">

                        <div class="imagen-portada-modulo">
                            <!--El enunciado puede ser cualquier objeto --->
                            <img :src="pregunta.enunciado" alt="Imágen de evaluacion">
                        </div>
                       
                    </div>


                    <div v-for="(opcion,index) in opcionesRespuesta(pregunta)">
                        <input type="radio" :id="opcion.id" :value="opcion.texto">
                            <!--v-model="pregunta.respuesta">-->
                        <label :for="opcion.id">{{opcion.texto}}</label>
                    </div>

                    <small>Puedes editar la pregunta seleccionando la opción
                        correcta.</small>
                </div>
            </div>

        </div>
    </template>



    </div>`,
    methods: {
        opcionesRespuesta(preguntaEnEdicion) { //Se construye una respuesta como objeto
            let opciones = [];
            let contador = 0;
            for (let opcion in preguntaEnEdicion.opciones) { //obtiene los nombres de atributos: opcion1, opcion 2 ...
                contador += 1;
                if (preguntaEnEdicion.opciones[opcion]) { //si la opcion tiene un valor dentro
                    opciones.push({ texto: preguntaEnEdicion.opciones[opcion], id: contador });
                }
            }
            return opciones;
        },
        /**
     * 
     * @param {Object} pregunta la pregunta seleccionada en la evaluacion de tipo emparejamiento
     * @param {string | int} indexPreg el indice al que corresponde dentro del arreglo this.preguntasCuestionario
     */
        seleccionarEnunciadoEmpareja(pregunta, indexPreg) {
            this.enunciadoSeleccionado = indexPreg; //aplica el estilo al enunciado seleccionado
            // pregunta.color=this.coloresPreguntasEmparejamiento[indexPreg];

            this.preguntaSeleccionadaJuegoEmparejamiento = pregunta; //mantiene esta pregunta para poder comparar con la respuesta que luego seleccione

            //
            this.tiempoRespuestaInicio = this.totalTime; //copia el tiempo en el que se encuentra actualmente para despues restar del tiempo final cuando responda correctamente

        },
        /**
         * 
         * @param {Object} pregunta Objeto pregunta de la respuesta seleccionada para poder comparar con el enunciado
         * @param {string | int} indexResp indice de la respuesta dentro del arreglo this.arregloRandom
         */
        seleccionarRespuestaEmpareja(pregunta, indexResp) {
            if (this.preguntaSeleccionadaJuegoEmparejamiento) {
                if (pregunta.respuesta == this.preguntaSeleccionadaJuegoEmparejamiento.respuesta) { //la respuesta es correcta
                    this.respuestaSeleccionada = indexResp;// esto aplica el estilo a la respuesta seleccionada correctamente
                    $("#Resp" + indexResp).css({ "background-color": this.coloresPreguntasEmparejamiento[indexResp], "border-radius": '10px' });
                    $("#Preg" + this.enunciadoSeleccionado).css({ "background-color": this.coloresPreguntasEmparejamiento[indexResp], "border-radius": '10px' });


                    this.tiempoRespuestaFin = this.totalTime;
                    let respuestaIntento = pregunta;
                    respuestaIntento.errores = this.erroresRespuesta;
                    respuestaIntento.tiempoDeRespuesta = this.tiempoRespuestaInicio - this.tiempoRespuestaFin;
                    this.preguntasCuestionarioRespuestas.splice(indexResp, 1, respuestaIntento);
                    this.aciertos.push(indexResp);

                    // reseteo valores para la siguiente pregunta
                    this.tiempoRespuestaInicio = null;
                    this.tiempoRespuestaFin = null;
                    this.erroresRespuesta = 0;
                    if (this.haFinalizadoEvaluacion()) {
                        alert('¡Bien hecho, terminaste antes de tiempo!');
                        this.calcularPuntuacionEmparejamiento(); //aun si es visitante se muestra el puntaje obtenido
                        //tambien se invoca a guardar dentro de esta funcion
                    }

                } else {// se cuentan las veces que se equivoca
                    this.erroresRespuesta += 1;
                }
            }

        },
        haFinalizadoEvaluacion() {
            let finalizar = false;
            if (this.tipoEvaluacion == "Emparejamiento") {
                if (this.aciertos.length == this.preguntasCuestionarioRespuestas.length) {
                    finalizar = true;
                };

            }

            return finalizar;
        },

        randomPreguntasEmparejamiento() {
            //

            this.arregloRandom = [];

            this.preguntasCuestionario.forEach((pregunta) => {

                let posicionAleatorio = Math.floor(Math.random() * 10); //numero aleatorio entre 0 y 10(cualquier valor entero)
                let modulo = posicionAleatorio % 2;
                if (modulo == 0) {
                    this.arregloRandom.unshift(pregunta);
                } else {
                    this.arregloRandom.push(pregunta);
                }
            })
            console.log(this.arregloRandom);

            // return arregloRandom;
        },
        actualizaCuentaRegresiva() {
            // document.getElementById('countdown').innerHTML = totalTime;
            if (this.totalTime == 0.0) {
                alert('Se agotó el tiempo');

                if (this.tipoEvaluacion == "Emparejamiento") {
                    this.calcularPuntuacionEmparejamiento(); //aun si es visitante se muestra el puntaje obtenido
                    //tambien se invoca a guardar dentro de esta funcion
                }



                let valorRepetir = true;// se muestra el botón para repetir la evaluacion
                this.$emit('finaliza-evaluacion', valorRepetir) // se emite el evento finaliza la evaluacion,el valor remitido activa el boton de repetir en el modulo-contenedor-curso
            } else if (this.haFinalizadoEvaluacion()) {
                // se detiene el contador
                //no es necesario hacer nada, en la linea 308 en el metodo seleccionarRespuestaEmpareja ya se  evalúa si finaliza la evaluacion y a continuacion calcula el puntaje para luego gurdar en la base de datos
            }
            else {
                this.totalTime -= 0.1000000000000;
                this.totalTime = this.totalTime.toFixed(1)
                setTimeout(this.actualizaCuentaRegresiva, 100);
            }
        },
        calcularPuntuacionEmparejamiento() {
            //1) valorar los PUNTOS que se sumanán por sus respuestas
            //cada pregunta tiene un minimo de 100
            if (this.totalTime <= 1.0) {
                this.puntos = 100;
            }
            else { //calculo el valor 
                this.puntos = this.totalTime * 100;
                this.puntos = this.puntos.toFixed(0);
            }
            //2) valorar si terminó el modulo para subir al siguiente NIVEL
            //contar el porcentaje de evaluaciones realizadas de todo el curso
            if (this.aciertos.length > this.preguntasCuestionarioRespuestas.length / 2) {
                this.apruebaEvaluacion = 1;
            }



            //cada 10% de avance se sube un nivel, es decir que siempre se llegara al nivel 10
            let porcentajeAvanceSubmodulos = ((this.numerointentosSubmodulosCurso + this.apruebaEvaluacion) / this.numeroSubmodulosCurso) * 100;
            porcentajeAvanceSubmodulos = porcentajeAvanceSubmodulos.toFixed(0); //se suma el valor de apruebaEvaluacion como entero, con eso se verifica si alcanca o no un nuevo porcentaje para poder subir de nivel
            if (porcentajeAvanceSubmodulos > this.nivel * 10) {
                this.nivel += 1; // se incrementa un nivel
                alert('has pasado a un nuevo nivel');
            }




            //3) valorar si ya pasó el porcentaje de niveles necesario para darle medallas
            // PENDIENTE

            if (this.nivel > 0 && this.nivel <= 2) {
                this.medalla = 'bebe';
            } else if (this.nivel > 2 && this.nivel <= 5) {
                this.medalla = 'estudiante';
            } else if (this.nivel > 5 && this.nivel <= 8) {
                this.medalla = 'estudiante destacado';
            } else if (this.nivel == 9) {
                this.medalla = 'egresado';
            } else {
                this.medalla = 'graduado';
            }






            //4) guardar en la base de datos

            if (this.usuario) {
                if (this.usuario.nombre != 'Visitante') {
                    this.guardarIntentoEvaluacion();
                    alert('Se ha guardado tu progreso (llamar al metodo guardar)');
                    //si el usuario es estudiante se guardan los resultados de la evaluacion
                }
            }

        },
        reiniciarValores() {
            this.apruebaEvaluacion = 0;
        },
        empezarEvaluacion() {
            setTimeout(this.actualizaCuentaRegresiva, 1000);
        },
        mostrarModalInicial() {
            this.totalTime = this.tiempoMaximoPorPregunta;
            $(function () {
                $('#modalInstrucciones').modal('show');
            });
        },
        intentarNuevamente() {
            // CODIGO PARA INTENTAR NUEVAMENTE

            //Antes de ejecutar este código ya se guardó  la evaluacion, seguir los siguientes pasos
            //1 reponer todos los valores nuevamente
            //2 mostrar Modal Inicial
            this.mostrarModalInicial();
        },
        /**
         * Guarda el intento de la evaluacion con su tiempo 
         */
        guardarIntentoEvaluacion() {
            // alert('se guardó su intento');
            //solo se guarda si el usuario es estudiante, es decir, el usuario debe estar logueado
            let evaluacionIntento = {
                tipo: this.tipoEvaluacion,
                aciertos: this.aciertos,
                preguntas: this.preguntasCuestionarioRespuestas,
            }


            var formData = new FormData()
            formData.append('estudianteId', this.usuario.id);
            formData.append('submoduloId', this.submodulo.id);
            formData.append('cursoId', this.curso.id);
            //los siguientes valores se retornan desde la accion view-administrar-contenido, para ello se consulta la coleccion IntentoEvaluacion, luego se reemplazan estos valores por los generados en la aplicacion
            formData.append('puntos', this.puntos); //number
            formData.append('nivel', this.nivel);// number
            formData.append('medalla', this.medalla);//string
            formData.append('tiempoMaximoPorPregunta', this.tiempoMaximoPorPregunta);//number
            formData.append('apruebaEvaluacion', this.apruebaEvaluacion); //number
            formData.append('evaluacion', evaluacionIntento); //json

            axios({
                url: "crear-intento-evaluacion",
                method: "post",
                data: formData
            }).then(
                response => {
                    alert('MODULO GUARDADO CON EXITO');
                }
            ).catch(
                err => {
                    alert('SE HA ENCONTRADO UN ERROR AL INTENTAR GUARDAR EL AVANCE');
                    console.log(err);
                });
        }


    },
    computed: {
        totalTimeProgress() {
            let porcentaje = (this.totalTime / this.tiempoMaximoPorPregunta) * 100;
            return porcentaje;
        }
    }

});