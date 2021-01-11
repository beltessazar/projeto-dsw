<template>
    <div>
        <!-- <img src="../imagens/logo.png" alt="Logo do site"> -->
        <h1>ONG</h1>
        <h2>Sistema de Cadastro</h2>
      <div class="menu">
        <b-button v-b-modal.form class="botao">Cadastro</b-button>

        <b-dropdown right text="Planilhas" class="botao">
          <b-dropdown-item v-b-modal.planilhasC >Crianças</b-dropdown-item>
            <b-modal id="planilhasC" size="xl" title="Planilha Crianças" hide-footer>
              <div>
                <Planilhas :groupId=3></Planilhas>
              </div>
            </b-modal>
          <b-dropdown-item  v-b-modal.planilhasV>Voluntários</b-dropdown-item> 
          <b-modal id="planilhasV" size="xl" title="Planilha Voluntários" hide-footer>
              <div>
                <Planilhas :groupId=2></Planilhas>
              </div>
            </b-modal>
          <b-dropdown-item v-b-modal.planilhasE>Estagiários</b-dropdown-item>
          <b-modal id="planilhasE" size="xl" title="Planilha Estagiários" hide-footer>
              <div>
                <Planilhas :groupId=1></Planilhas>
              </div>
          </b-modal>
        </b-dropdown>

       <!--  <b-dropdown right text="Grupos" class="botao">
          <b-dropdown-item v-b-modal.criancas>Crianças</b-dropdown-item>
          <b-modal id="criancas" title="Criancas">
            <div>
              <Criancas></Criancas>
            </div>
        </b-modal>
        <b-dropdown-item v-b-modal.estagiarios>Estagiarios</b-dropdown-item>
          <b-modal id="estagiarios" title="Estagiarios">
            <div>
              <Estagiarios></Estagiarios>
            </div>
        </b-modal>
        <b-dropdown-item v-b-modal.voluntarios>Voluntarios</b-dropdown-item>
          <b-modal id="voluntarios" title="Voluntarios">
            <div>
              <Voluntarios></Voluntarios>
            </div>
        </b-modal>

        </b-dropdown> -->

        <b-dropdown right text="Administradores" class="botao">
          <b-dropdown-item v-b-modal.formAdmin >Cadastrar</b-dropdown-item>
            <b-modal id="formAdmin" size="xl" title="Cadastrar Administrador" hide-footer>
              <div>
                <FormularioAdministrador></FormularioAdministrador>
              </div>
            </b-modal>
          <b-dropdown-item  v-b-modal.ListaAdmin>Administradores</b-dropdown-item> 
          <b-modal id="ListaAdmin" size="xl" title="Lista de Administradores" hide-footer>
              <div>
                <Administradores></Administradores>
              </div>
            </b-modal>
        </b-dropdown>
      </div>

      <!-- Modals diversos -->
      <b-modal id="form" title="Cadastro Vinde Meninos" hide-footer>
        <Formulario/>
      </b-modal>

      
      <!--<b-modal id="formLogin" title="Cadastro de administradores" hide-footer>
        <FormularioAdministrador/>
      </b-modal> -->

    </div>  
</template>

<script>
import Formulario from  "@/components/Formulario.vue"
/* import Criancas from "@/views/Criancas.vue"
import Voluntarios from "@/views/Voluntarios.vue"
import Estagiarios from "@/views/Estagiarios.vue" */
import Planilhas from "@/views/Planilhas.vue"
import Administradores from "@/views/Administradores.vue"
import FormularioAdministrador from '@/components/FormularioAdministrador.vue'


export default {
  name: 'Menu',
  components: {Formulario, Planilhas, Administradores, FormularioAdministrador},
}

</script>

<style>
b-button{
  display: flex;
  justify-content: space-around;  
}
b-modal{
  width: 100%;
}
.menu{
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-right: 30px;
}
.botao{
    width: 160px;
    margin-left: 30px;
}
</style>