<template>
<q-layout View: lHh Lpr fFf>
<q-page-container>
    <q-page style="background-image: url('statics/pics/foo.jpeg');background-position: center; background-repeat: no-repeat; background-size: cover; position: relative;">

      <div class="fixed-center mobile-only" v-show="splashscreen">
          <div class="q-pa-sm" >
              <img class="col" style="width:350px;height:100%" src="statics/pics/logo.png">
          </div>

          <div class="row justify-center">
          <q-spinner-hourglass
            color="white"
            size="5em"
          />
          <q-tooltip :offset="[0, 8]">QSpinnerBall</q-tooltip>
          </div>
        </div>


    <div v-show="!splashscreen">
    <q-card class="my-card fixed-center shadow-0" style=" top:50%; left:50%; transform: translate(-50%, -50%); height:350px; width:320px; box-sizing: border-box; background:rgba(255,255,255,0.7) ; border-radius:25px;">
        <div>
          <q-icon name="person" class="bg-white text-pink-4 q-pa-md" style="font-size:100px;overflow:hidden; position:absolute; top:calc(-100px/2); left:calc(50% - 50px); border-radius:50%; "></q-icon>
          <!-- <q-img src="statics/bg/3.png"  :ratio="1" basic spinner-color="white"></q-img> -->
        </div>
        <div class="text-pink-5" style="margin:0; padding:55px 0 0;text-align:center;font-size:30px;font-family: 'Simonetta', serif;"><b>LOGIN HERE</b></div>
      <q-card-section>
        <q-input color="pink-4" outlined style="width:290px; margin-bottom: 20px; border: none; border-bottom: 1px solid #fff; background: white; outline:none; height:50px; color:#fff; font-size: 16px;" v-model="email" type="text" prefix="Username:">
        <template v-slot:append>
          <q-avatar>
            <q-icon name="person" />
          </q-avatar>
        </template>
      </q-input>
      <q-input color="pink-4" outlined style="width:290px; margin-bottom: 1 0px; border: none; border-bottom: 1px solid #fff; background: white; outline:none; height:50px; color:#fff; font-size: 16px;" class="q-mt-md" prefix="Password:" v-model="password" :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-avatar>
            <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
          </q-avatar>
        </template>
      </q-input>
      </q-card-section>
      <q-card-actions>
        <div class="row q-px-md items-center">                     
          <q-btn color="grey" class="col" label="LOGIN VIA GOOGLE" @click="loginGoogle"/>
          <div class="text-overline text-center col">OR</div>
          <q-btn color="teal" label="LOGIN account" class="col"/>
          </div>
      </q-card-actions>
    </q-card>
<!-- 
    <q-dialog v-model="registerDialog">
    <register></register>   
    </q-dialog> -->
    </div>

</q-page>
</q-page-container>    
</q-layout>    
</template>

<script>
// import Register from '../pages/signup.vue'

export default {
    // components: {
    //   Register
    // },
    data () {
        return {
            splashscreen: true,
            isPwd: true,
            email: '',
            password: '',
        }
    },
    mounted() {
            
    },
    
    created(){
          setTimeout(() => {
          this.splashscreen=false;
          // console.log('sdf')
          }, 7000)

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
    computed: {

    },
    methods: {
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
    }
    }

}
</script>