<template>
  <q-layout view="hhh lpR fff">

    <q-header class="transparent text-white row items-center justify-start" style="height:63px">
      <q-toolbar>
        <div class="q-px-sm q-pt-sm q-pl-xl">
        <img style="height:100%;width:180px" src="statics/pics/carmen-logo.png" @click="$router.push('/')">
        </div>

        <div style="color:#E4ACBF">
        <q-tabs  
        indicator-color="transparent"
        active-color="pink-3" 
        v-model="tab">
        <div class="row q-pa-sm">
        <div><q-route-tab to="/" name="air"><b>PARTY TRAYS</b></q-route-tab></div>
        <div><q-route-tab to="/catering"><b>CATERING SERVICES</b></q-route-tab></div>
        <div style="padding-left:380px;"><q-route-tab to="" ><b>sign up</b></q-route-tab></div>
        <!-- STATIC SHOW HIDE LOGIN -->
        <div><q-tab v-show="show" @click="show=!show"><b>login</b></q-tab></div>
        <div class="row items-center">
          <q-btn-dropdown dense style="background-color:#e4acbf" v-show="!show" text-color="white" label="Codeavor">
            <q-list>
              <q-item clickable v-close-popup @click="$router.push('/profile')">
                <q-item-section>
                  <q-item-label>My Account</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="show=!show, $router.push('/')">
                <q-item-section>
                  <q-item-label>Log OUt</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
          <!-- END OF STATIC -->
          </div>
        </div>
        </q-tabs>
        </div>

        <div>
        <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" label="view basket" />
        </div>

        <div class="q-pa-sm">
             <q-btn dense round icon="search" text-color="pink-2" color="white"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container style="background: linear-gradient(to right, #ffffff 50%, #eeeeee 50%)">
      <router-view />
    </q-page-container>

    <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      tab: 'air',
      search: '',
      show: true
     
    }
  }
}
</script>
