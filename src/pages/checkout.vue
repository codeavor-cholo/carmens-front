<template>
    <q-page>
<!-- START OF DESKTOP -->
        <div class="desktop-only">
        <div class="container row q-gutter-md q-pt-xl q-pb-xl">
        
        <div class="col-4 q-pl-xl">
            <q-card class="my-card" style="border: 5px solid;border-color: pink;">
                <q-card-section class="bg-grey-3"> 
                <div class="row q-gutter-sm items-center">
                <q-icon name="shopping_cart" class="text-black" color="pink" style="font-size: 2rem;" />
                <div class="text-h6">Basket Summary</div>
                </div>
            </q-card-section>
            <!-- <q-separator color="black" /> -->
            <q-card-section>
                <div class="q-pt-sm">
                <q-list separator>
                    <q-item v-for="(order,i) in returnCart" :key="i">
                    <q-item-section>
                        <div class="row q-gutter-md">
                        <q-img
                            :src="order.foodPic"
                            :ratio="1"
                            spinner-color="primary"
                            spinner-size="82px"
                            style="width:4em;border-radius:5px;"
                            class=""
                        />
                        <div class="column">
                            <q-item-label>{{order.foodName}}</q-item-label>
                            <q-item-label caption lines="1">{{order.size}}</q-item-label>
                            <q-item-label class="text-subtitle2" lines="1">₱ {{order.price}}</q-item-label>
                        </div>
                        </div>
                    </q-item-section>
                    <q-item-section side>
                    <q-btn color="grey-8" icon="clear" round size="sm" flat class="absolute-top-right q-ma-xs" @click="removeOrder(items)" />
                    <q-item-label caption class="q-mt-lg">x {{order.qty}}</q-item-label>
                    <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ {{order.qty * order.price}}</q-item-label>
                    </q-item-section>
                    </q-item>


                </q-list>

                </div>
            </q-card-section>

            <q-separator color="black" />
            
            <div class="row justify-end q-pa-md text-weight-bold text-h6 ">
                <div>SUBTOTAL:</div>
                <div class="q-ml-md text-teal-6"><b>₱ {{returnSubTotal}}</b></div>
            </div>
            </q-card>
        </div>
        
        <div class="col-7">
            <q-card class="my-card">
                 <q-stepper
                    v-model="step"
                    ref="stepper"
                    color="pink-4"
                    active-color="pink-3" inactive-color="grey-8"
                    animated
                    >
                    <q-step
                        :name="1"
                        title="Customer Details"
                        icon="settings"
                        :done="step > 1"
                    >
                        <div class="text-h5">Please fill-up all the details below </div>

                        <div class="column q-gutter-md q-pt-md">
                            <div class="row">
                                <div class="col q-pr-sm"><q-input outlined v-model="fname" color="pink-3" label="First Name" /></div>
                                <div class="col q-pl-sm"><q-input outlined v-model="lname" color="pink-3" label="Last Name" /></div>
                            </div>
                            <q-input 
                            outlined v-model="cnum"  
                            mask="(####) ### - ####"
                            fill-mask
                            color="pink-3" 
                            label="Contact Number" />
                            <q-input color="pink-3" outlined v-model="address" label="Delivery Address" />
                            <q-select color="pink-3" outlined v-model="city" :options="cityOpt" label="Select City" emit-value="" map-options=""/>
                        </div>
                        <div class="column q-gutter-md q-pt-md">
                            <div class="text-h6">Delivery Date and Time</div>
                            <div class="row">
                                <div class="col">
                                    <q-date
                                        v-model="date"
                                        landscape
                                        minimal
                                        flat
                                        color="pink-6"
                                    />
                                </div>
                                <div class="col">
                                    <q-input v-model="time" type="time" label="Delivery Time" outlined color="pink-6"/>
                                </div>
                            </div>
                        </div>
                    </q-step>

                    <q-step
                        :name="2"
                        title="Payment Details"
                        icon="credit_card"
                        :done="step > 2"
                    >
                    <div class="row">
                        <div class="q-pa-md col">
                            <div class="text-h6 text-weight-bold">Order Summary</div>
                            <div class="q-pl-md row q-gutter-sm items-center q-pt-sm">
                                <q-icon name="place" class="text-black" color="pink" style="font-size: 1.5rem;" />
                                <div class="text-weight-medium">{{address}}, {{city}}</div>
                            </div>
                            <div class="row q-gutter-md q-pt-md">
                                <div class="q-pl-xl">{{fname}} {{lname}}</div>
                                <div>{{cnum}}</div>
                            </div>
                            <div class="q-pl-xl">{{address}}, {{city}}</div>
                            <div class="q-pl-md row q-gutter-sm items-center q-pt-sm">
                                <q-icon name="date_range" class="text-black" color="pink" style="font-size: 1.5rem;" />
                                <div class="text-weight-medium">{{date}}, {{time}}</div>
                            </div>
                        </div>    
                        
                        <div class="col q-pl-md q-pa-md ">    
                            <div class="text-h6 text-weight-bold">Delivery Message</div>
                            <q-input
                            v-model="message"
                            outlined=""
                            dense
                            type="textarea"
                            class="bg-white"
                            label="Leave your messages and requests here."
                            /> 
                        </div>    
                    </div>  
                    <div class="row q-pa-md q-mt-md bg-grey-2">
                        <div class="col q-pa-sm text-weight-bold">Payment Options</div>
                        <div class="col-3"><q-radio v-model="paymentOpt" val="FULL" label="FULL PAYMENT" color="pink-6"/></div>
                        <div class="col q-pa-sm text-weight-bold">₱ {{returnSubTotal}}</div>
                        <div class="col-3"><q-radio v-model="paymentOpt" val="COD" label="50% PAYMENT, 50% COD" color="pink-6"/></div>
                        <div class="col q-pa-sm text-weight-bold">₱ {{returnSubTotal *.5}} NOW, ₱ {{returnSubTotal *.5}} LATER</div>
                    </div>
                    <div class="row q-pa-md q-py-xl">
                        <stripe-elements ref="elementsRef" :pk="publishableKey" :amount="returnToPay" @token="tokenCreated" @loading="loading = $event" outline class="col-8 q-mr-md">
                        </stripe-elements>
                    <q-btn outlined color="teal" class="col" size="md" @click="submit">PAY&nbsp;&nbsp;&nbsp;<b>P {{formatNumber(returnToPay)}}.00</b></q-btn>
                    </div>
                    </q-step>

                    <template v-slot:navigation>
                        <q-stepper-navigation>
                        <q-btn @click="$refs.stepper.next()" color="teal" :label="step === 2 ? 'Finish' : 'Continue'" v-show="step !== 2"/>
                        <q-btn v-if="step > 1" color="grey-8" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </template>
                    </q-stepper>
            </q-card>
        </div>
        </div>
        </div>
<!-- END OF DESKTOP -->

    </q-page>    
</template>     
<style >
  #payment-form button {
    display: none
  }
</style>
<script>
import { StripeElements } from 'vue-stripe-checkout'
import { uid } from 'quasar'
import { date } from 'quasar'
export default {
  components: {
    StripeElements
  },
    data () {
        return {
            step: 1,
            car: false,
            CartItems: [],
            fname: '',
            lname: '',
            city: '',
            address: '',
            cnum: '',
            City: [],
            displayName: '',
            message: '',
            date: '',
            time: '09:00',
            paymentOpt: 'FULL',
            uid: '',
            //payment
            loading: false,
            amount: 0,
            publishableKey: 'pk_test_kUO5j8FaZUKitD1Qh3ibZ2HP00YkxaEOOS', 
            token: null,
            charge: null,
        }
    },
    mounted(){
        this.$binding('CartItems', this.$firestoreApp.collection('CartItems'))
            .then(CartItems => {
            console.log(CartItems, 'CartItems')
        }),
        this.$binding('City', this.$firestoreApp.collection('City'))
            .then(City => {
            console.log(City, 'City')
        })
    },  
    computed: {
        returnCart(){
            try {
                console.log('hi')

                let key 
                var user = this.$firebase.auth().currentUser
                if(user){
                key = user.uid
                this.uid = user.uid
                this.displayName = user.displayName
                console.log(this.displayName)
                let arr = this.displayName.split(' ')
                this.fname = arr[0]
                this.lname = arr[1]
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
        returnSubTotal(){
            try {
                return this.$lodash.sumBy(this.returnCart,a=>{return parseInt(a.price) * parseInt(a.qty)})
            } catch (error) {
                console.log(error,'er')
                return 0
            }
        },
        cityOpt(){
            let optionss = this.City.map(m => {
                return {
                    label: m.city,
                    value: m.city
                }
            })
            return optionss
        },
        returnToPay(){
            let amount = this.returnSubTotal
            if(this.paymentOpt == 'FULL'){
                return amount
            } else {
                return amount * .5
            }
        }
    },
    methods:{
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        submit () {
            this.$refs.elementsRef.submit();
        },
        tokenCreated (token) {
            this.token = token;
            console.log(token,'token')
            // for additional charge objects go to https://stripe.com/docs/api/charges/object
            this.charge = {
                source: token.card,
                amount: this.returnToPay,
            }
            this.sendTokenToServer(this.charge);
        },
        sendTokenToServer (charge) {
            // Send to server
            console.log(charge,'charge')
            if(this.returnToPay === 0){
                this.$q.dialog({
                    title: `Unable to Continue??`,
                    message: 'Please Select Payment Type??',
                    color: 'pink-6',
                    textColor: 'grey',
                    icon: 'negative',
                    ok: 'Ok'
                })
            }else{
                this.$q.dialog({
                    title: `Continue with the payment?`,
                    message: 'This action cannot be undone.',
                    color: 'teal',
                    textColor: 'grey',
                    icon: 'negative',
                    ok: 'YES',
                    cancel: 'NO'
                }).onOk(()=>{
                    this.loadingOn = true
                    this.paydetails = charge
                    this.payCheckout()
                    // this.reserveNowCard()            
                })

            }
        },
        payCheckout(){
            let checkout = {
                clientName: this.fname +' '+this.lname,
                firstName: this.fname,
                lastName: this.lname,
                clientAddress: this.address,
                city: this.city,
                clientNumber: this.cnum,
                deliveryDate: this.date,
                deliveryTime: this.time,
                message: this.message,
                accountUID: this.uid,
                paymentTerms: this.paymentOpt,
                firstPayment: this.returnToPay,
                totalToPayAmount: this.returnSubTotal,
                orders: this.returnCart,
                clientReserveDate: this.date,
                clientStartTime: this.formatTimeInput(this.time),
                clientEndTime: this.formatEndTimeInput(this.time)
            }
            let id = ''
            this.$firestoreApp.collection('partyTrayOrders').add(checkout)
            .then((ref) =>{
                id = ref.id //for payment saving
                console.log(id,'id for payment')
                this.$firestoreApp.collection('CartItems').doc(this.uid).delete()
                .then(()=>{
                    console.log('Successfully deleted cart')
                    let details = {
                        clientReservationKey: id,
                        clientPayDetails: this.charge,
                        clientTokenID: this.token.id,
                        clientPaymentType: 'CARD',
                        clientUID: this.uid,
                        transactionType: 'ONLINE',
                        forPartyTray: true,
                        clientPaymentDate: date.formatDate(new Date(), 'YYYY-MM-DD')
                    }
                    this.$firestoreApp.collection('Payments').add(details)
                    .then(()=>{
                        this.$q.dialog({
                            title: `Successfully Placed Orders`,
                            message: 'Go to your account to see the details.',
                            color: 'teal',
                            textColor: 'grey',
                            icon: 'negative',
                            persistent: true,
                            ok: 'OK',
                            cancel: 'RETURN HOME'
                        }).onOk(()=>{
                            this.$router.push('/profile')
                        }).onCancel(()=>{
                            this.$router.push('/')
                        })
                    })
                })


            })
            //save partytrays
            //get ref id
            //delete from CartItems
            //save payment with and indication that its from party trays

        },
        formatTimeInput(time){
            //get time to format for display
            let baseDate = new Date(2020,1,1)
            let arr = time.split(':')
            let formatTime = date.addToDate(baseDate, {hours:arr[0],minutes:arr[1]})

            return this.$moment(formatTime).format('LT')
        },
        formatEndTimeInput(time){
            //get time to format for display
            let baseDate = new Date(2020,1,1)
            let arr = time.split(':')
            let formatTime = date.addToDate(baseDate, {hours:parseInt(arr[0])+1,minutes:arr[1]})

            return this.$moment(formatTime).format('LT')
        },    
    }
}
</script>