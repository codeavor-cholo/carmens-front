<template>
  <q-layout view="hhh lpR fFf">

        <div class="fixed-center mobile-only" v-show="splashscreen">
          <div class="q-pa-sm" >
              <img class="col" style="width:350px;height:100%" src="statics/pics/carmen-logo.png">
          </div>

          <div class="row justify-center">
          <q-spinner-hourglass
            color="pink-4"
            size="5em"
          />
          <q-tooltip :offset="[0, 8]">QSpinnerBall</q-tooltip>
          </div>
        </div>

<!-- START OF DESKTOP HEADER    -->
    <div class="desktop-only">
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
          <div style="padding-left:380px;" ><q-route-tab to="" v-if="show" ><b>sign up</b></q-route-tab></div>
          <!-- STATIC SHOW HIDE LOGIN -->
          <div><q-tab v-show="show" @click="login = true"><b>login</b></q-tab></div>
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

          <div class="q-pr-sm">
              <q-btn v-show="!show" dense flat style="font-size: 1.3em;" round icon="notifications" text-color="pink-2" color="white" @click="$router.push('/notification')">
                <q-badge color="red" text-color="white" :label="returnLengthForToday.length" floating/>
              </q-btn>
          </div>
          <div>
          <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" label="view basket" @click="basket=true">
            <q-badge color="grey-10" text-color="white" :label="returnLength" floating/>
          </q-btn>
          </div>

        </q-toolbar>
      </q-header>
    </div>
<!-- END OF DESKTOP HEADER -->

<!-- START OF MOBILE HEADER    -->
    <div class="mobile-only" v-show="!splashscreen">
      <q-header class="transparent text-white" style="height:63px">
        <q-toolbar>

          
          <div class="q-pt-md q-pl-md">
          <img style="height:100%;width:180px" src="statics/pics/carmen-logo.png" @click="$router.push('/')">
          </div>

          <!-- STATIC SHOW HIDE LOGIN -->
          <!-- <q-tab v-show="show" @click="login = true"><b>login</b></q-tab>
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
            </div> -->

          <!-- <div>
            <q-btn flat text-color="pink-3" icon="shopping_cart" @click="basket=true">
              <q-badge color="grey-10" text-color="white" :label="returnLength" floating/>
            </q-btn>
          </div> -->
        </q-toolbar>

        <div style="color:#E4ACBF">
          <q-tabs  
          indicator-color="transparent"
          active-color="pink-3" 
          v-model="tab">
          
          <q-route-tab to="/partytray" name="air"><b>PARTY TRAYS</b></q-route-tab>
          <q-route-tab to="/cateringpage"><b>CATERING SERVICES</b></q-route-tab>
          <!-- <div style="padding-left:380px;"><q-route-tab to="" ><b>sign up</b></q-route-tab></div> -->
          
          </q-tabs>
          </div>

      </q-header>
    </div>
<!-- END OF MOBILE HEADER -->

<!-- START OF QPAGE CONTAINER DESKTOP -->
    <div class="desktop-only">
    <q-page-container style="background: linear-gradient(to right, #ffffff 50%, #eeeeee 50%)">
        <q-dialog v-model="basket" >
        <div>
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
                  <q-item-label caption lines="1">Size: {{items.size}}({{items.min}} - {{items.max}})</q-item-label>
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
              <q-btn :label="'Checkout '+returnLength+ ' items'" color="pink-6" v-close-popup  class="text-weight-bold" outline="" @click="checkOutOrders"/>
            </q-card-actions>
          </q-card>
        </div>
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
                                
          <q-btn color="grey"  label="LOGIN VIA GOOGLE" @click="basketChecker" class="col-5"/>
          <div class="text-overline text-center col-2">OR</div>
          <q-btn color="teal" label="LOGIN account" class="col"/>

          </div>
          
        </q-card-section>

        <q-card-section class="q-pt-none q-mb-md text-center">
          
          
        </q-card-section>
      </q-card>
    </q-dialog>


    <!-- <q-dialog v-model="checkout" persistent>
      <q-card style="min-width: 650px;border-radius:20px;" class="q-pa-md">
        <div class="row justify-center q-gutter-md">
        <q-card class="my-card" style="width:350px">
          <q-card-section class="bg-grey-3"> 
            <div class="row q-gutter-sm items-center">
              <q-icon name="place" class="text-black" color="pink" style="font-size: 1.5rem;" />
              <div>Delivery Address</div>
            </div>

            <div class="q-pt-sm q-pl-lg">Name of Customer &nbsp;&nbsp;&nbsp; number</div>
            <div class="q-pl-lg">Delivery Address</div>
          </q-card-section>
          
          <q-card-section>
            <div class="q-pt-sm">
             <q-list bordered separator>
                <q-item>
                  <q-item-section>
                    <div class="row q-gutter-md">
                      <img src="statics/pics/foo.jpeg" style="height:50px;width:50px">
                      <div class="column">
                        <q-item-label>FOODNAME</q-item-label>
                        <q-item-label caption lines="1">size</q-item-label>
                        <q-item-label class="text-subtitle2" lines="1">₱ price</q-item-label>
                      </div>
                    </div>
                  </q-item-section>
                  <q-item-section side>
                  <q-item-label caption class="q-mt-lg">x 1</q-item-label>
                  <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ price</q-item-label>
                </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="my-card" style="width:250px;border: 5px solid;border-color: pink;">
          <q-card-section>
            <q-input
              v-model="message"
              filled
              type="textarea"
              class="bg-white"
              label="Leave your message."
            />
            <div class="row justify-around">
              <div class="q-pt-md">Total payment:</div>
              <div class="q-pt-md" style="font-size:18px"><b>Total</b></div>
            </div>
            <div class="q-pt-md q-pb-sm text-center">Payment Method</div>
            <div class="row justify-around">
              <q-btn color="pink-5" label="Cash" />
              <q-btn color="pink-5" label="Card" />
            </div>  
          </q-card-section>
        </q-card>
        </div>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> -->

      <router-view />
    </q-page-container>
    </div>
<!-- END OF QPAGE CONTAINER DESKTOP -->

<!-- START OF QPAGE MOBILE -->
<div class="mobile-only" v-show="!splashscreen">
<q-page-container style="background: linear-gradient(to right, #ffffff 50%, #eeeeee 50%)">
        <q-dialog v-model="basketmob" >
        <div>
          <q-card style="border-radius:20px;width:80vw;" class="q-pa-sm">
            <div class="row justify-between items-center">
              <span class="text-h6 col">BASKET <span class="text-teal-6 text-subtitle2">({{returnLength}} ITEMS)</span></span>
              <q-btn color="grey-10" icon="close" flat round  v-close-popup />
            </div>
            
            <q-card-section class="row items-center">
              <q-scroll-area style="width: 100%; height: 400px;" :visible="false">
              <q-list bordered separator="">
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
            <q-card-actions align="center" class="column q-gutter-sm">
              <div class="text-weight-bold text-h6" >SUBTOTAL : <span class="text-teal-6">{{returnSubTotal}}</span></div>
              <q-btn :label="'Checkout '+returnLength+ ' items'" color="pink-6" v-close-popup  class="text-weight-bold" outline="" @click="checkOutOrdersMob"/>
            </q-card-actions>
          </q-card>
        </div>
      </q-dialog>

      <q-dialog v-model="loginmob">
      <q-card>
        <q-card-section>
          <div style="font-size:25px" class="q-pa-sm text-weight-bold">Login Account</div>
          <q-btn class="text-overline text-teal" flat>CREATE ACCOUNT</q-btn>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <div class="q-pb-md">
            <q-input v-model="clientEmail" type="email" label="Enter Email Address" outlined="" color="pink-3" dense/>
          </div>
          <q-input v-model="clientPassword" type="password" label="Enter Password" outlined="" color="pink-3" dense/>
          <div class="row q-px-md items-center q-mt-md">                     
          <q-btn color="grey"  label="LOGIN VIA GOOGLE" @click="basketChecker" class="col-5"/>
          <div class="text-overline text-center col-2">OR</div>
          <q-btn color="teal" label="LOGIN account" class="col"/>

          </div>
          
        </q-card-section>

        <q-card-section class="q-pt-none q-mb-md text-center">
          
          
        </q-card-section>
      </q-card>
    </q-dialog>


    <!-- <q-dialog v-model="checkout" persistent>
      <q-card style="min-width: 650px;border-radius:20px;" class="q-pa-md">
        <div class="row justify-center q-gutter-md">
        <q-card class="my-card" style="width:350px">
          <q-card-section class="bg-grey-3"> 
            <div class="row q-gutter-sm items-center">
              <q-icon name="place" class="text-black" color="pink" style="font-size: 1.5rem;" />
              <div>Delivery Address</div>
            </div>

            <div class="q-pt-sm q-pl-lg">Name of Customer &nbsp;&nbsp;&nbsp; number</div>
            <div class="q-pl-lg">Delivery Address</div>
          </q-card-section>
          
          <q-card-section>
            <div class="q-pt-sm">
             <q-list bordered separator>
                <q-item>
                  <q-item-section>
                    <div class="row q-gutter-md">
                      <img src="statics/pics/foo.jpeg" style="height:50px;width:50px">
                      <div class="column">
                        <q-item-label>FOODNAME</q-item-label>
                        <q-item-label caption lines="1">size</q-item-label>
                        <q-item-label class="text-subtitle2" lines="1">₱ price</q-item-label>
                      </div>
                    </div>
                  </q-item-section>
                  <q-item-section side>
                  <q-item-label caption class="q-mt-lg">x 1</q-item-label>
                  <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ price</q-item-label>
                </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="my-card" style="width:250px;border: 5px solid;border-color: pink;">
          <q-card-section>
            <q-input
              v-model="message"
              filled
              type="textarea"
              class="bg-white"
              label="Leave your message."
            />
            <div class="row justify-around">
              <div class="q-pt-md">Total payment:</div>
              <div class="q-pt-md" style="font-size:18px"><b>Total</b></div>
            </div>
            <div class="q-pt-md q-pb-sm text-center">Payment Method</div>
            <div class="row justify-around">
              <q-btn color="pink-5" label="Cash" />
              <q-btn color="pink-5" label="Card" />
            </div>  
          </q-card-section>
        </q-card>
        </div>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> -->

      <router-view />
    </q-page-container>
    </div>
<!-- END OF QPAGE MOBILE -->

<!-- MOBILE FOOTER -->
  <div class="mobile-only" v-show="!splashscreen">
      <q-footer class="bg-grey-4 text-white">
        <q-toolbar class="row justify-center">
            <div style="color:#E4ACBF">  
              <q-tabs
              v-model="footertab"
              active-color="pink-4"
              indicator-color="transparent"
              >
              <q-tab v-show="show" icon="person" @click="loginmob = true"><b>Log In</b></q-tab>
              <div>
                <q-tab dense style="color:#e4acbf" icon="person" v-show="!show" flat label="Account" @click="$router.push('/profilemob')" />
              </div>
              <q-tab name="alarms" icon="notifications" @click="$router.push('/notification')" :disable="show">
              <q-badge color="red" text-color="white" :label="returnLengthForToday.length" floating/>
                <b>Notifications</b>
              </q-tab>
              <q-tab name="movies" icon="shopping_cart" @click="basketmob=true">
                <q-badge color="grey-10" text-color="white" :label="returnLength" floating/>  
                <b>Basket</b>
              </q-tab>
              </q-tabs>
            </div>
        </q-toolbar>
      </q-footer>
  </div>
<!-- END OF MOBILE FOOTER -->
  </q-layout>
</template>

<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      tab: 'air',
      footertab: 'mails',
      search: '',
      message:'',
      splashscreen: true,
      show: true,
      displayName: '',
      basket: false,
      basketmob: false,
      ordersKey: this.$q.localStorage.getItem('addCart'),
      CartItems: [],
      login: false,
      loginmob: false,
      clientEmail: '',
      clientPassword: '',
      ClientNotifications: [],
      Reservation: [],
      partyTrayOrders: [],
      AdminNotifications: []
    }
  },
    created() {
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
                //if apk $q.platform.is.cordova
                //if mobile screen $q.screen.lt.sm
                if(self.$q.platform.is.cordova){
                  self.$router.push('/login')
                } else {
                  self.$router.push('/')
                  self.show = true
                }

                
              }
          })
  },
  mounted(){
        this.$binding('CartItems', this.$firestoreApp.collection('CartItems'))
        this.$binding('ClientNotifications', this.$firestoreApp.collection('ClientNotifications'))
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation'))
        this.$binding('partyTrayOrders', this.$firestoreApp.collection('partyTrayOrders'))
        this.$binding('AdminNotifications', this.$firestoreApp.collection('AdminNotifications'))
  },
  computed: {
    returnCart(){
      try {
        // console.log(hi,'hi')

        let key 
        var user = this.$firebase.auth().currentUser
        if(user){
          key = user.uid
        } else {
          key = this.ordersKey
        }

        console.log(key,'key')
        let value = this.$lodash.map(this.CartItems,a=>{
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
        return this.$lodash.sumBy(this.returnCart,a=>{return parseInt(a.qty)})
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
    },
    returnWithUserUID(){
        try {
            let user = this.$firebase.auth().currentUser
            console.log(user,'user')
            let reserve = this.Reservation.filter(a=>{
                a.typeOf = 'reserve'
                return a.clientUID == user.uid
            })
            console.log(reserve,'reserve')
            let orders = this.partyTrayOrders.filter(a=>{
                a.typeOf = 'order'
                return a.accountUID == user.uid
            })
            let concat = reserve.concat(orders)

            let keys = this.$lodash.map(concat,a=>{
                return {
                    key: a['.key'],
                    data: a,
                    typeOf: a.typeOf
                }
            })
            
            console.log('keys',keys)
            console.log(this.ClientNotifications,'ClientNotifications')

            let myNotifs = this.ClientNotifications.filter(b=>{

                let data = this.getDataOfReservations(keys,b.reservationKey)
                let notif
                if(data == null){
                  notif = null
                } else {
                  notif = data.data
                  notif.dateTime = b.dateTime
                  notif.notifStatus = b.status
                }
                  return notif !== null
            })

            let join = myNotifs.concat(this.getPaymentNotifs)
            console.log(this.$lodash.orderBy(join,'dateTime','desc'),'order')

            return this.$lodash.orderBy(join,'dateTime','desc')
        } catch (error) {
            console.log(error,'returnWithUserUID')
            return []
        }
    },
    getPaymentNotifs(){
        try {
            let user = this.$firebase.auth().currentUser

            let filter = this.AdminNotifications.filter(a=>{
                a.typeOf = 'payment'
                return a.userID == user.uid && a.message == "Payment Recieved!"
            })

            return filter
        } catch (error) {
            return []
        }
    },
    returnLengthForToday(){
        try {
            return this.returnWithUserUID.filter(a=>{
                return date.formatDate(a.dateTime,'MM-DD-YYYY') == date.formatDate(new Date(),'MM-DD-YYYY')
            })
        } catch (error) {
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
                this.$router.push('/')
                location.reload()
              })
              // 
              // remove this comment if you are done with the testing
            })
    },
    loginGoogle(){

                let key = this.$q.localStorage.getItem('addCart')
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

                  let index = this.$lodash.findIndex(this.CartItems,a=>{
                    return a['.key'] == uid
                  })
                  console.log(index,'indexcheck')
                  if(index == -1){
                    if(this.returnCart.length != 0){

                      let addCart = {
                        items: this.returnCart
                      }
                      this.$firestoreApp.collection('CartItems').doc(uid).set(addCart)
                      .then(()=>{
                        this.$firestoreApp.collection("CartItems").doc(key).delete().
                          then(()=> {
                              console.log("Document successfully deleted!")
                              this.$q.localStorage.clear()
                              this.$firestoreApp.collection('Customers').doc(uid).set(newUser)
                              .then(()=>{
                                console.log('saved user')
                                //save progress for future reference
                                // console.log('progress', this.returnProgress)
                                this.login = false

                              })

                              console.log('newUser',newUser)
                              // location.reload()
                          }).catch((error)=> {
                              console.error("Error removing document: ", error)
                          })
                      })
                    }
                  } else {
                    let vm = this
                    
                    if(this.returnCart.length != 0){
                      
                      // console.log(key,'key')

                      let value = vm.CartItems.filter(a=>{
                        return a['.key'] == uid
                      })
                      // console.log(value,'value')
                      var first = function(element) { return !!element }    
                      var itemsFirst = value.find(first)
                      let items = itemsFirst.items
                      console.log(items,'items')
                      let local = vm.returnCart
                      console.log(local)
                      for(var x = 0; x < local.length; x++){
                        //check local if available in items
                        let indexing = vm.$lodash.findIndex(items,a=>{
                          return a.checkerName == local[x].checkerName
                        })
                        console.log(indexing,'indexing')
                        if(indexing > -1){
                            items[indexing].qty = parseInt(items[indexing].qty) + parseInt(local[x].qty)
                        } else {
                            items.push(order) 
                        }
                      }

                      console.log(items, 'itemsMerge')
                      let addCart = {
                        items: items
                      }

                      vm.$firestoreApp.collection('CartItems').doc(uid).set(addCart)
                      .then(()=>{
                        vm.$firestoreApp.collection("CartItems").doc(key).delete().
                          then(()=> {
                              console.log("Document successfully deleted!")
                              vm.$q.localStorage.clear()
                              this.$firestoreApp.collection('Customers').doc(uid).set(newUser)
                              .then(()=>{
                                console.log('saved user')
                                //save progress for future reference
                                // console.log('progress', this.returnProgress)
                                this.login = false

                              })

                              console.log('newUser',newUser)
                              // location.reload()
                          }).catch((error)=> {
                              console.error("Error removing document: ", error)
                          })
                      })
                    }
                  }




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
    basketChecker(){
      if(this.returnCart.length != 0){
            this.login = false
            this.$q.dialog({
                title: 'You have '+this.returnLength+` Items in your Basket`,
                message:'This will be automatically saved to your account once you login in. Do you want to continue ?',
                type: 'negative',
                color: 'pink-3',
                class: 'text-grey-8',
                icon: 'warning',
                ok: 'Ok',
                cancel: 'Cancel',
                persistent: true
                
            }).onOk(()=>{
              this.loginGoogle()
              this.login = false
            }).onCancel(()=>{
              this.login = true
            })
      } else {
          this.loginGoogle()
          this.login = false
      } 

    },
    removeOrder(item){
      console.log(this.ordersKey, 'keke')
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

        let key 
        var user = this.$firebase.auth().currentUser
        if(user){
          key = user.uid
        } else {
          key = this.ordersKey
        }


        this.$firestoreApp.collection('CartItems').doc(key).set(add)
        .then((ref) =>{
            console.log('cart updated')
            
        })  

      }).onCancel(()=>{
        this.basket = true
      })

    },
    checkOutOrders(){
      this.$q.localStorage.clear()
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
          this.$router.push('/checkout')
        }).onCancel(()=>{
          this.basket = true
        })
      } else {
        this.login = true
      }
    },
    checkOutOrdersMob(){
      this.$q.localStorage.clear()
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
          this.$router.push('/checkoutmob')
        }).onCancel(()=>{
          this.basket = true
        })
      } else {
        this.login = true
      }
    },
    getDataOfReservations(array,key){
        try {
          let filter = this.$lodash.filter(array,a=>{
                  return key == a.key
              })[0]
          if(filter == undefined){
              return null
          } else {
              return filter
          }
        } catch (error) {
            return null
        }
    }
  }
}
</script>
