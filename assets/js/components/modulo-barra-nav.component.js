parasails.registerComponent('modulo-barra-nav',{
    props:[
      'breadcrumb',
    ],
    data(){
        return {};
    },
    template:`  
    <div id="div-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" v-for="item in breadcrumb"><a :href="item.enlace">{{item.texto}}</a></li>
        </ol>
      </nav>
    </div>`,
    methods:{

    }

});