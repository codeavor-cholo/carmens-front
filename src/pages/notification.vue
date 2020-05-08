<template>
    <q-page id="page">
        <div id="noti" class="text-weight-bold">
            Notifications
        </div>

        <div id="list">
            <q-list bordered separator>
                <div v-for="(notif,i) in returnWithUserUID" :key="i">
                <q-item clickable v-ripple v-if="notif.typeOf == 'reserve'">
                    <q-item-section>
                        <div id="row" class="row justify-between">
                            <div>
                                <q-chip color="pink-3" text-color="white">
                                    Catering Reservation
                                </q-chip>
                            </div>
                            <div class="text-overline">
                                {{notif.notifStatus}}
                                 <q-item-label class="text-blue text-right" caption>{{$moment(notif.notifTime).fromNow()}}</q-item-label>
                            </div>
                        </div>
                        <div id="eve">{{notif.clientEvent}}</div>
                        
                        
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple v-else-if="notif.typeOf == 'payment'">
                    <q-item-section>
                        <div id="row" class="row justify-between">
                            <div>

                                <q-chip color="teal" text-color="white">
                                    Payment
                                </q-chip>
                            </div>
                            <div class="text-overline">
                                {{notif.message}}
                                 <q-item-label class="text-blue text-right" caption>{{$moment(notif.dateTime).fromNow()}}</q-item-label>
                            </div>
                        </div>
                        <div id="eve">{{notif.forPartyTray == true ? 'Party Tray' : 'Catering Reservation'}} <br>
                        ₱ {{notif.amount}}.00</div>
                        
                        
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple v-else>
                    <q-item-section>
                        <div id="row" class="row justify-between">
                            <div>
                                <q-chip color="pink-3" text-color="white">
                                    Party Tray
                                </q-chip>
                            </div>
                            <div class="text-overline">
                                {{notif.notifStatus}}
                                 <q-item-label class="text-blue text-right" caption>{{$moment(notif.notifTime).fromNow()}}</q-item-label>
                            </div>
                        </div>
                        <div id="eve" v-for="order in notif.orders.slice(0,3)" :key="order.checkerName">{{order.foodName}} {{order.size}} - x{{order.qty}}</div>
                    </q-item-section>
                </q-item>
                </div>
            </q-list>
        </div>
    </q-page>
</template>
<script>
export default {
    data (){
        return {
            ClientNotifications: [],
            Reservation: [],
            partyTrayOrders: [],
            AdminNotifications: []
        }
    },
    created(){

    },
    mounted(){
        this.$binding('ClientNotifications', this.$firestoreApp.collection('ClientNotifications'))
        .then(ClientNotifications => {
        console.log(ClientNotifications, 'ClientNotifications')
        }),
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation'))
        .then(Reservation => {
        console.log(Reservation, 'Reservation')
        }),
        this.$binding('partyTrayOrders', this.$firestoreApp.collection('partyTrayOrders'))
        .then(partyTrayOrders => {
        console.log(partyTrayOrders, 'partyTrayOrders')
        }),
        this.$binding('AdminNotifications', this.$firestoreApp.collection('AdminNotifications'))
        .then(AdminNotifications => {
        console.log(AdminNotifications, 'AdminNotifications')
        })
    },
    computed:{
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
                
                let myNotifs = []
                let loop = keys.forEach(a=>{


                    let find = this.ClientNotifications.filter(b=>{
                        return b.reservationKey == a.key
                    })[0]

                    if(typeof find != "undefined"){
                        let notif = {...a.data}
                        notif.notifTime = find.dateTime
                        notif.notifStatus = find.status
                        myNotifs.push(notif)
                    }      
                })

                console.log(orders,'orders') 
                console.log(concat,'concat')         
                console.log(keys,'keys')  
                console.log(myNotifs,'myNotifs')  
                console.log(this.getPaymentNotifs,'payments')  
                let join = myNotifs.concat(this.getPaymentNotifs)
                return join
            } catch (error) {
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
    }
    },

}
</script>

<style type = "text/css">
    /* #page {
        padding-top:50px;
    } */
    #noti {
        font-size:30px;
        padding-left:10px;
        padding-bottom:10px;
        padding-top:50px;
    }
    #eve {
        font-size:17px;
        font-weight: bold;
    }
    #row {
        padding-right:25px;
    }

@media only screen and (min-width: 1200px) {
  #noti {
      padding-top:85px;
      padding-bottom:20px;
      font-size:30px;
      padding-left:350px;
  }
  #list{
      padding-left:350px;
      padding-right:350px;
  }
}

</style>