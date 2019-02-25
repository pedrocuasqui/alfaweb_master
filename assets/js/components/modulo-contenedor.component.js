parasails.registerComponent('modulo-contenedor',{
    props:[
        'tituloContenido',
        'descripcionObjeto',
        'navegarAtras',
        'navegarSiguiente',
    ],
    template:`  <div class="div-contenido" v-cloak>
    <!-- Titulo del contenido -->
    <div class="row" id="tituloModulo">
      <div class="col">
        <h1>{{tituloContenido}}</h1>
        <h6>{{descripcionObjeto}}</h6>
      </div>
    </div>
    <!-- Contenido ludico en tres columnas -->
    <div class="row">
      <!-- columna izquierda -->
      <div class="col-sm-2">
        <!-- <div class="row">
            <div class="col-sm-7 indicaciones">
              <div v-show="actividadFinaliza" class="alert fade show" role="alert">
                Se acabó el tiempo <br> Has obtenido {{conteoAciertos}} aciertos de {{elementos.length}}
              </div>
              <h4 v-show="!actividadFinaliza">{{accion}} {{elementoTurno.toUpperCase()}} <br> Tienes {{tiempoSegundos}}
                segundos</h4>
            </div>
            <div class="col-sm-4">
              <img src="/images/myAvatar_adultoMayor.png" alt="Avatar adulto mayor">
            </div>
          </div> -->
      </div>
      <!-- Columna central -->
      <div class="col-sm-8">



        <!-- IMAGEN SVG -->
        <slot></slot>




      </div>
    </div>
    <!-- columna derecha -->
    <div class="col-sm-2">
      <!-- el siguiente div puede estar en un container que reciba como parámetro el id del contenido anterior y establezca los href de anterior y siguiente -->
      <div class="navegacion">
        <nav>
          <ul class="pagination ">
            <li class="page-item"><a class="page-link previous" :href="navegarAtras"> Atrás</a></li>
            <li class="page-item"><a class="page-link next" :href="navegarSiguiente">Siguiente</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>`,
    data: function(){
        return {};
    },
    methods:{

    }
});
