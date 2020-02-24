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
        <div><q-tab v-show="show" @click="loginGoogle"><b>login</b></q-tab></div>
        <div class="row items-center">
          <q-btn-dropdown dense style="color:#e4acbf" v-show="!show"  :label="displayName" flat>
            <q-list>
              <q-item clickable v-close-popup @click="$router.push('/profile')">
                <q-item-section>
                  <q-item-label>My Account</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="tempLogout">
                <q-item-section>
                  <q-item-label>Log Out</q-item-label>
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
             <q-btn dense round icon="search" text-color="pink-2" color="white" @click="tempLogout"/>
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
      show: true,
      displayName: ''
     
    }
  },
    created() {
          let self = this
          this.$firebase.auth().onAuthStateChanged(function(user) {
              
              if (user) {
                let gg = {...user}
                console.log('createdUser',user)
                console.log('createdUser',user.uid)
                console.log('user',gg.displayName)
                self.show = false
                self.displayName = gg.displayName
                
              } else {
                self.show = true
              }
          })
  },
  methods:{
    tempLogout(){
            this.$q.dialog({
                title: `Are you sure you want to logout?`,
                type: 'negative',
                color: 'pink-3',
                class: 'text-grey-8',
                icon: 'warning',
                ok: 'Ok',
                cancel: 'Cancel',
                persistent: true
                
            }).onOk(()=>{
              this.$firebase.auth().signOut()
              .then(()=>{
                console.log('no user')
                this.show = false
                this.displayName = ''
              })
              // this.$router.push('/')
              // remove this comment if you are done with the testing
            })
    },
        loginGoogle(){
        var provider = new this.$firebase.auth.GoogleAuthProvider();
        this.$firebase.auth().signInWithPopup(provider)
        .then((result)=>{
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log('token',token)
          console.log('user',user)

          var uid = user.uid

          //save user details in database with token / set to update always when login in
          let newUser = {
            gAccessToken: token,
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            refreshToken: user.refreshToken
          }

          this.$firestoreApp.collection('Customers').doc(uid).set(newUser)
          .then(()=>{
            console.log('saved user')
            //save progress for future reference
            console.log('progress', this.returnProgress)

          })

          console.log('newUser',newUser)

        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log('error',errorCode)
        console.log('error',errorMessage)
        this.$q.dialog({
            title: errorCode,
            message: errorMessage,
            color: 'pink-6',
            textColor: 'grey',
            icon: 'negative',
            ok: 'Ok'
        })
        // ...
        });
                  
    },
  }
}
</script>
