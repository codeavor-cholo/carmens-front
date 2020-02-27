<template>
    <q-page>
        <div class="q-pa-sm q-pt-xl">
        <q-splitter
            v-model="splitterModel"
            >

            <template v-slot:before>
                <div>
                <q-tabs
                v-model="tab"
                vertical
                inline-label
                class="text-pink-3 full-height relative-position"
                >
                <q-tab name="account" label="My Account" />
                <q-tab name="cart" label="My Cart" />
                <q-tab name="wish" label="My Wishlist" />
                <q-tab name="order" label="My Orders" />
                <q-tab name="reserve" label="My Reservation" />
                </q-tabs>
                </div>
            </template>

            <template v-slot:after>
                <q-tab-panels
                v-model="tab"
                animated
                class="transparent"
                transition-prev="jump-up"
                transition-next="jump-up"
                >
<!-- ACCOUNT AREA -->
                <q-tab-panel name="account">
                    <div style="font-size:50px;font-family: 'Domine', serif;" class="q-px-xl">My Profile</div>
                    
                    <div class="row items-center q-pl-xl">
                    <div class="q-px-xl">
                        <q-avatar size="120px" font-size="52px" color="teal" text-color="white">
                        <img src="statics/pics/foo.jpeg">
                        </q-avatar>
                    </div>
                    <div class="q-px-xl" style="padding-left:200px">
                        <q-btn flat text-color="pink-3" label="Edit Profile" icon="settings" />
                    </div>
                    </div>
                    
                    <div class="column q-px-xl q-pt-lg q-gutter-md">
                    <div class="q-pl-xl" style="font-size:20px;font-family: 'Noto Serif SC', serif;">Name: Codeavor</div>
                    <div class="q-pl-xl" style="font-size:20px;font-family: 'Noto Serif SC', serif;">Contact Number: 0999-999-9999</div>
                    <div class="q-pl-xl" style="font-size:20px;font-family: 'Noto Serif SC', serif;">Delivery Address: Tondo, Manila</div>
                    </div>
                </q-tab-panel>
<!-- END OF ACCOUNT AREA -->
<!-- CART AREA -->
                <q-tab-panel name="cart">
                    <div style="font-size:50px;font-family: 'Domine', serif;" class="q-px-xl">My Cart</div>
                    <q-input filled v-model="search_cart" label="Search">
                        <template v-slot:prepend>
                        <q-icon name="search" />
                        </template>
                   </q-input>
                    <q-list bordered separator>
                            <q-item>
                                <q-item-section>
                                    
                                    <div class="row items-center justify-between">
                                        <div>
                                            Food Category!
                                        </div>
                                        <q-btn flat icon="delete" text-color="red" />
                                    </div>    


                                    <div class="q-pb-md"> 
                                    <q-separator class="black"/>
                                    </div>

                                    <div class="row justify-between">
                                        <div class="row">
                                            <div class="row items-center q-pr-md">
                                                <q-checkbox v-model="val" />
                                            </div>
                                            <div>
                                                <img style="height:100px;width:100px" src="statics/pics/foo.jpeg">
                                            </div>
                                            <div class="column q-gutter-md">
                                                <div class="q-pl-md q-pt-md"><b>Breakfast Food</b></div>
                                                <div>
                                                <div class="row items-center q-pl-md">    
                                                    <q-btn dense outline round text-color="grey-8" icon="remove" />    
                                                    <q-input readonly style="width:50px" outlined dense v-model="num" />
                                                    <q-btn dense outline round text-color="grey-8" icon="add" />
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="q-pt-md">Food Definition in Here!</div>
                                        <div class="column q-gutter-sm justify-end">
                                            <div class="q-px-md"><b>Total: 200 Pesos</b></div>
                                            <div class="q-px-xl"><q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" label="Checkout" /></div>
                                        </div>
                                    </div>
                                        
                                </q-item-section>
                            </q-item>
                            </q-list>
                </q-tab-panel>
<!-- END OF CART AREA -->
<!-- WISHLIST AREA -->
                <q-tab-panel name="wish">
                   <div style="font-size:50px;font-family: 'Domine', serif;" class="q-px-xl">My Wishlist</div>
                   <q-input filled v-model="search_wish" label="Search">
                        <template v-slot:prepend>
                        <q-icon name="search" />
                        </template>
                   </q-input>
                    <q-list bordered separator>
                        <q-item>
                            <q-item-section>
                                <div class="row justify-between">
                                    <div class="row">
                                        <div>
                                        <img style="height:100px;width:100px" src="statics/pics/foo.jpeg">
                                        </div>
                                        <div class="column">
                                        <div class="q-pl-md q-pt-md"><b>Breakfast Food</b></div>
                                        <div class="q-pl-md text-subtitle2">x 3</div>
                                        </div>
                                    </div>
                                    <div class="q-pt-md">Food Definition in Here!</div>
                                    <div class="column q-gutter-sm justify-end">
                                        <div class="q-px-md"><b>Total: 200 Pesos</b></div>
                                        <div class="q-px-xl"><q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" label="Add To Cart" /></div>
                                    </div>
                                </div>
                            </q-item-section>
                        </q-item>

                        </q-list>
 
                </q-tab-panel>
<!-- END OF WISHLIST AREA -->
<!-- ORDER AREA -->
                <q-tab-panel name="order">
                   <div style="font-size:50px;font-family: 'Domine', serif;" class="q-px-xl">My Orders</div>
                   <q-input filled v-model="search_order" label="Search">
                        <template v-slot:prepend>
                        <q-icon name="search" />
                        </template>
                   </q-input>
                   <q-tabs
                        v-model="ordertab"
                        dense
                        class="text-grey"
                        active-color="pink-3"
                        indicator-color="pink-3"
                        align="justify"
                        narrow-indicator
                        >
                        <q-tab name="pending" label="Pending" />
                        <q-tab name="finish" label="Completed" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="ordertab" animated>
                        <q-tab-panel name="pending">
                            <q-list bordered separator>
                            <q-item>
                                <q-item-section>
                                    
                                    <div class="row items-center justify-between">
                                    <div class="row items-center">
                                        <div class="q-pa-sm ">
                                        <q-icon name="local_shipping" style="font-size: 2rem" />
                                        </div>
        
                                        <div>
                                            Latest tracking update will be put here!
                                        </div>
                                    </div>
                                        <div class="q-pr-xl">
                                        <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" label="Track" />
                                        </div>
                                    </div>    


                                    <div class="q-pb-md"> 
                                    <q-separator class="black"/>
                                    </div>

                                    <div class="row justify-between">
                                        <div class="row">
                                            <div>
                                            <img style="height:100px;width:100px" src="statics/pics/foo.jpeg">
                                            </div>
                                            <div class="column">
                                            <div class="q-pl-md q-pt-md"><b>Breakfast Food</b></div>
                                            <div class="q-pl-md text-subtitle2">x 3</div>
                                            </div>
                                        </div>
                                        <div class="q-pt-md">Food Definition in Here!</div>
                                        <div class="column q-gutter-sm justify-end">
                                            <div class="q-px-md"><b>Total: 200 Pesos</b></div>
                                            <div class="q-px-xl"><q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" label="Payment" /></div>
                                        </div>
                                    </div>
                                        
                                </q-item-section>
                            </q-item>
                            </q-list>

                        </q-tab-panel>

                        <q-tab-panel name="finish">
                            <q-list bordered separator>
                            <q-item>
                                <q-item-section>
                                    
                                    <div class="row items-center justify-between">
                                    <div class="row items-center">
                                        <div class="q-pa-sm ">
                                        <q-icon name="local_shipping" style="font-size: 2rem" />
                                        </div>
        
                                        <div>
                                            Delivered!
                                        </div>
                                    </div>
                                    </div>    


                                    <div class="q-pb-md"> 
                                    <q-separator class="black"/>
                                    </div>

                                    <div class="row justify-between">
                                        <div class="row">
                                            <div>
                                            <img style="height:100px;width:100px" src="statics/pics/foo.jpeg">
                                            </div>
                                            <div class="column">
                                            <div class="q-pl-md q-pt-md"><b>Breakfast Food</b></div>
                                            <div class="q-pl-md text-subtitle2">x 3</div>
                                            </div>
                                        </div>
                                        <div class="q-pt-md">Food Definition in Here!</div>
                                        <div class="column q-gutter-sm justify-end">
                                            <div class="q-px-md"><b>Total: 200 Pesos</b></div>
                                            <div class="q-px-xl"><q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" label="Payment" /></div>
                                        </div>
                                    </div>
                                        
                                </q-item-section>
                            </q-item>
                            </q-list>
                        </q-tab-panel>
                        </q-tab-panels>
                </q-tab-panel>
<!-- END OF ORDER AREA -->
<!-- RESERVATION AREA -->
                <q-tab-panel name="reserve">
                   <div style="font-size:50px;font-family: 'Domine', serif;" class="q-px-xl">My Reservation</div>
                   <q-input filled v-model="search_reserve" label="Search">
                        <template v-slot:prepend>
                        <q-icon name="search" />
                        </template>
                   </q-input>
                   <q-tabs
                        v-model="reservationtab"
                        dense
                        class="text-grey"
                        active-color="pink-3"
                        indicator-color="pink-3"
                        align="justify"
                        narrow-indicator
                        >
                        <q-tab name="pending_res" label="Pending" />
                        <q-tab name="complete_res" label="Completed" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="reservationtab" animated>
                        <q-tab-panel name="pending_res">
                            <q-list bordered separator>
                            <q-item  v-for="(reserve,i) in returnUserReservation" :key="i">
                                <q-item-section>
                                    <div style="font-size:25px;font-family: 'Noto Serif SC', serif; "><b>{{reserve.clientEvent}}</b></div>
                                    <div class="q-pl-xl column">
                                        <div class="row">
                                            <div class="col-6 row items-center q-gutter-sm">
                                                <q-icon name="today" class="text-black" style="font-size: 2rem;" />
                                                <div class="">Date of Event: </div>
                                                <div class="text-weight-bold text-h6"> {{formatDate(reserve.clientReserveDate)}}</div>
                                            </div>
                                            <div class="col-6 row items-center q-gutter-sm">
                                                <q-icon name="watch_later" class="text-black" style="font-size: 2rem;" />
                                                <div class="">Time of Event: </div>
                                                <div class="text-weight-bold text-h6"> {{formatTime(reserve.clientStartTime)}} - {{formatTime(reserve.clientEndTime)}}</div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6 row items-center q-gutter-sm">
                                                <q-icon name="place" class="text-black" style="font-size: 2rem;" />
                                                <div class="">Place of Event: </div>
                                                <div class="text-weight-bold">{{reserve.clientPlace}},{{reserve.clientCity}}</div>
                                            </div>
                                            <div class="col-6 row items-center q-gutter-sm">
                                                <q-icon name="people" class="text-black" style="font-size: 2rem;" />
                                                <div class="">Number of attendies: </div>
                                                <div class="text-weight-bold text-h6">{{reserve.clientPax}}</div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row justify-end q-gutter-md">
                                        <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" @click="reserveDetails = true" label="Details" />
                                        <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" label="Payment" />
                                    </div>
                                </q-item-section>
                            </q-item>

                            </q-list>
                        </q-tab-panel>

                        <q-tab-panel name="complete_res">
                            <q-list bordered separator>
                            <q-item>
                                <q-item-section>
                                    <div style="font-size:25px;font-family: 'Noto Serif SC', serif; "><b>Name of Package</b></div>
                                    <div class="q-pl-xl column">
                                        <div class="row">
                                            <div class="col-6 row items-center q-gutter-sm">
                                                <q-icon name="today" class="text-black" style="font-size: 2rem;" />
                                                <div class="">Date of Event: </div>
                                            </div>
                                            <div class="col-6 row items-center q-gutter-sm">
                                                <q-icon name="watch_later" class="text-black" style="font-size: 2rem;" />
                                                <div class="">Time of Event: </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6 row items-center q-gutter-sm">
                                                <q-icon name="place" class="text-black" style="font-size: 2rem;" />
                                                <div class="">Place of Event: </div>
                                            </div>
                                            <div class="col-6 row items-center q-gutter-sm">
                                                <q-icon name="people" class="text-black" style="font-size: 2rem;" />
                                                <div class="">Number of attendies: </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row justify-end q-gutter-md">
                                        <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" label="Details" />
                                    </div>
                                </q-item-section>
                            </q-item>

                            </q-list>
                        </q-tab-panel>
                        </q-tab-panels>
                </q-tab-panel>
<!-- END OF RESERVATION AREA -->
                </q-tab-panels>
            </template>
            
            </q-splitter>
            </div>


            <!-- QDIALOG FOR DETAILS OF RESERVATION -->
            <q-dialog v-model="reserveDetails" persistent>
            <q-card style="min-width: 750px">
                
                    <div class="row justify-between">
                        <div class="col q-pa-sm" style="font-size:15px">
                            <q-card-section class="column q-gutter-sm">
                                <div><b>Date:</b> EXAMPLE</div>
                                <div><b>Start time:</b>EXAMPLE</div>
                                <div><b>End Time:</b>EXAMPLE</div>
                                <div><b>Place:</b>EXAMPLE</div>
                                <div><b>Number of Pax:</b>EXAMPLE</div>
                                <div><b>Motif:</b>EXAMPLE</div>
                            </q-card-section>
                            <div class="q-pt-xl column items-end"><b>REMAINING BALANCE</b></div>    
                        </div>
                        
                        <q-separator vertical color="black" />
                        
                        <div class="col-8">
                            <div class="float-right">
                                <q-btn round flat text-color="pink-3" icon="cancel" v-close-popup />
                            </div>
                            <div>
                                <div class="column">
                                <div class="column items-center" style="font-size:40px;color:#E4ACBF;font-family: 'Zhi Mang Xing', serif;">PACKAGE NAME</div>
                                <div class="column items-center"><b>FOOD CATEGORIES</b></div>
                                <div class="q-pl-xl">sample food</div>
                                <div class="q-pl-xl">sample food</div>
                                <div class="q-pl-xl">sample food</div>
                                <div class="q-pl-xl">sample food</div>
                                <div class="column items-center"><b>INCLUSION</b></div>
                                <div class="q-pl-xl">sample inclusion</div>
                                <div class="q-pl-xl">sample inclusion</div>
                                <div class="q-pl-xl">sample inclusion</div>
                                <div class="q-pl-xl">sample inclusion</div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </q-card>
            </q-dialog>
            <!-- END OF QDIALOG FOR DETAILS OF RESERVATION -->
    </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      reserveDetails: 'false',
      tab: 'reserve',
      ordertab: 'pending',
      reservationtab: 'pending_res',
      splitterModel: 20,
      search_wish: '',
      search_order: '',
      search_reserve: '',
      search_cart: '',
      val: true,
      num: 1,
      Reservation: [],
      clientUID: ''
    }
  },
  created(){
          let self = this
          this.$firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                self.clientUID = user.uid
              } else {
                self.clientUID = ''
                this.$router.push('/')
              }
          })
  },
  mounted(){
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation'))
            .then(Reservation => {
            console.log(Reservation, 'Reservation')
        })
  },
  computed:{
      returnUserReservation(){
          try {

            let reservations = this.$lodash.filter(this.Reservation,a=>{
                return a.clientUID == this.clientUID
            })
            console.log('reservations',reservations)
            return reservations
        

          } catch(err){
              console.log(err,'err')
              return []
          }
      }
  },
  methods: {
    formatTime(time){
      //get time to format for display
      let baseDate = new Date(2020,1,1)
      let arr = time.split(':')
      let formatTime = date.addToDate(baseDate, {hours:arr[0],minutes:arr[1]})

      return this.$moment(formatTime).format('LT')
    },
    formatDate(date){
        return this.$moment(date).format('LL')
    }
  }
}
</script>
