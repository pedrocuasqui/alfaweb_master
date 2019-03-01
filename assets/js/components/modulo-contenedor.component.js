parasails.registerComponent('modulo-contenedor',{
    props:[
        'tituloContenido',
        'descripcionObjeto',
        'navegarAtras',
        'navegarSiguiente',
    ],
    template:`  <div class="div-contenido container-fluid" v-cloak>
    <!-- Primera fila -Titulo del contenido -->
    <div class="row" >
      <div class="col" id="titulo-modulo">
        <h2>{{tituloContenido}}</h2>

      </div>
    </div>
    <!-- Segunda fila- Contenido ludico en tres columnas -->
    <div class="row">
      <!-- columna izquierda -->
      <div class="col-sm-2 col-izquierda">
 
      </div>
      
      <!-- Columna central -->
      <div class="col-sm-9 col-central">
        <!-- IMAGEN SVG -->  
        <slot></slot>
      </div>
 
    <!-- columna derecha -->
      <div class="col-sm-1 col-derecha">
        <!-- el siguiente div puede estar en un container que reciba como parámetro el id del contenido anterior y establezca los href de anterior y siguiente -->
        <div class="navegacion">
        <a :href="navegarAtras"> <i class="fas fa-arrow-alt-circle-left fas-3x"></i> </a>         
        <a :href="navegarSiguiente"><i class="fas fa-arrow-alt-circle-right fas-3x"></i> </a>  
        </div>
      </div>
    </div> <!--fin row-->
    
    <div class="row" >
      <div class="col-sm-1 avatar">
        <img src="/images/myAvatar_adultoMayor.png" alt="Avatar adulto mayor">
      </div>
      
      <div class="col-sm-11 descripcion-objeto">
        <h6>{{descripcionObjeto}}</h6>
      </div>
    </div>
  </div>`,

    data: function(){
        return {};
    },
    methods:{

    }
});
