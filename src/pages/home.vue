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
        <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" label="view basket" @click="basket=true">
          <q-badge color="grey-10" text-color="white" :label="returnLength" floating/>
        </q-btn>
        </div>

        <div class="q-pa-sm">
             <q-btn dense round icon="search" text-color="pink-2" color="white" @click="tempLogout"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container style="background: linear-gradient(to right, #ffffff 50%, #eeeeee 50%)">
        <q-dialog v-model="basket" persistent >
        <q-card style="min-width:500px;border-radius:20px;" class="q-pa-lg">
          <div class="row justify-between">
            <span class="text-h6 col">BASKET <span class="text-teal-6 text-subtitle2">({{returnLength}} ITEMS)</span></span>
            <q-btn color="grey-10" icon="close" flat round  v-close-popup />
          </div>
          
          <q-card-section class="row items-center">
            <q-scroll-area style="width: 100%; height: 400px;" :visible="false">
            <q-list bordered class="full-width" separator="">
              <q-item v-for="items in returnCart" :key="items['.key']">
                <q-item-section avatar>
                  <q-img
                    :src="items.foodPic"
                    :ratio="1"
                    spinner-color="primary"
                    spinner-size="82px"
                    style="width:5em;border-radius:5px;"
                    class="q-my-sm"
                  />
                </q-item-section>
                <q-item-section>
                <q-item-label>{{items.foodName}}</q-item-label>
                <q-item-label caption lines="1">Size: {{items.size}}</q-item-label>
                <q-item-label class="text-subtitle2" lines="1">₱ {{items.price}}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn color="grey-8" icon="delete" round size="md" flat class="absolute-top-right q-ma-xs" @click="removeOrder(items)" />
                  <q-item-label caption class="q-mt-lg">x {{items.qty}}</q-item-label>
                  <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ {{items.price * items.qty}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
          </q-card-section>
          <q-card-actions align="right" class="justify-between row">
            <div class="text-weight-bold text-h6" >SUBTOTAL : <span class="text-teal-6">{{returnSubTotal}}</span></div>
            <q-btn label="Checkout" color="pink-6" v-close-popup  class="text-weight-bold" outline="" @click="checkOutOrders"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="login">
      <q-card>
        <q-card-section class="row justify-between q-mx-md q-mt-md">
          <div class="text-h6">Login Account</div>
          <q-btn class="text-overline text-teal" flat>CREATE ACCOUNT</q-btn>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <q-input v-model="clientEmail" type="email" label="Enter Email Address" style="width:450px;" class="q-pa-sm q-px-md" outlined="" color="pink-3" dense/>
          <q-input v-model="clientPassword" type="password" label="Enter Password" style="width:450px;" class="q-pa-sm q-px-md" outlined="" color="pink-3" dense/>
          <div class="row q-px-md q-mt-md">
                                
          <q-btn color="grey"  label="LOGIN VIA GOOGLE" @click="loginGoogle" class="col-5"/>
          <div class="text-overline text-center col-2">OR</div>
          <q-btn color="teal" label="LOGIN account" class="col"/>

          </div>
          
        </q-card-section>

        <q-card-section class="q-pt-none q-mb-md text-center">
          
          
        </q-card-section>
      </q-card>
    </q-dialog>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      tab: 'air',
      search: '',
      show: true,
      displayName: '',
      basket: false,
      ordersKey: this.$q.localStorage.getItem('addCart'),
      TempCart: [],
      login: false,
      clientEmail: '',
      clientPassword: ''
     
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
  mounted(){
        this.$binding('TempCart', this.$firestoreApp.collection('TempCart'))
        .then(TempCart => {
        console.log(TempCart, 'TempCart')
        })
  },
  computed: {
    returnCart(){
      try {

        // console.log(hi,'hi')
        let key = this.$q.localStorage.getItem('addCart')
        console.log(key,'key')
        let value = this.$lodash.map(this.TempCart,a=>{
          if(a['.key'] == key){
            let g = {...a}
            g.ordersKey = a['.key']
            delete g['.key']
            return g
          }
        })
        var first = function(element) { return !!element }    
        var gotcha = value.find(first)
        console.log(gotcha,'gotcha')
        return gotcha.items
      } catch (error) {
        console.log(error,'error')
        return []
      }
    },
    returnLength(){
      try {
        return this.returnCart.length
      } catch (error) {
        return 0
      }
    },
    returnSubTotal(){
      try {
        return this.$lodash.sumBy(this.returnCart,a=>{return parseInt(a.price) * parseInt(a.qty)})
      } catch (error) {
        console.log(error,'er')
        return 0
      }
    }
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
            // console.log('progress', this.returnProgress)
            this.login = false

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
    removeOrder(item){
      this.$q.dialog({
        title: 'Remove '+item.foodName + ' ?',
        message: 'Do you want to remove this item from your basket?.',
        ok: 'Yes',
        cancel: 'Cancel',
        persistent: true,
        color:'pink-6'
      }).onOk(() => {
        let orders = this.returnCart
        let indexing = this.$lodash.findIndex(orders,a=>{
            return a.checkerName == item.checkerName
        })

        orders.splice(indexing,1)
        let add = {
          items: orders
        }
        this.$firestoreApp.collection('TempCart').doc(this.ordersKey).set(add)
        .then((ref) =>{
            console.log('cart updated')
            
        })  

      }).onCancel(()=>{
        this.basket = true
      })

    },
    checkOutOrders(){
      var user = this.$firebase.auth().currentUser
      if(user){
        console.log(user.uid,'meron pwede checkout na')
          this.$q.dialog({
            title: 'Checkout '+this.returnLength+' Items',
            message: 'Proceed to checkout and payment ?',
            ok: 'Yes',
            cancel: 'Cancel',
            persistent: true,
            color:'pink-6'
        }).onOk(() => {
          console.log('orders',this.returnCart)
        }).onCancel(()=>{
          this.basket = true
        })
      } else {
        this.login = true
      }
    }
  }
}
</script>
