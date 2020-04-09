<template>
    <q-page class="q-pt-md">
        <div class="row justify-between q-mb-lg">
            <div>
                <div class="q-pl-md text-grey-6" style="font-size:1.5em" v-if="schedule.type == 'PARTY TRAY DELIVERY'">{{schedule.firstName}} {{schedule.lastName}} Order</div>
                <div class="q-pl-md text-grey-6" style="font-size:1.5em" v-else>{{schedule.clientFName}} {{schedule.clientLName}} Event</div>
                <div class="q-pl-md text-grey-6 text-caption">{{schedule.clientReserveDate}}, {{schedule.clientStartTime}} - {{schedule.clientEndTime}}</div>
            </div>
            <q-btn v-if="schedule.type == 'PARTY TRAY DELIVERY'" color="deep-orange-4" flat @click="$router.push('/viewdetails/'+$route.params.id)" icon="keyboard_arrow_left" label="Back" />
            <q-btn v-else color="deep-orange-4" flat @click="$router.push('/reservationdetails/'+$route.params.id)" icon="keyboard_arrow_left" label="Back" />
        </div>
        
        <div class="row text-overline items-center justify-around">  
            <div style="font-size:20px" v-if="schedule.type == 'PARTY TRAY DELIVERY'">Delivery Status</div>
            <div style="font-size:20px" v-else>Event Setup Status</div>
        </div>
        <div v-if="schedule.type == 'PARTY TRAY DELIVERY'">
            <q-timeline color="grey-6" class="q-pa-md">
                <div class="q-pl-md">
                <q-timeline-entry
                    v-for="(status,i) in this.orderStatusArray"
                    :key="i"
                    :title="status" 
                    :subtitle="returnStatusTime(i)"  
                    :icon="returnIcon(i)" 
                    :color="returnColor(i)"
                    :class="status[i] == undefined ? 'text-grey-6' : 'text-grey-10'"
                >
                </q-timeline-entry>

                </div>
            </q-timeline>
        </div>
        <div v-else>
            <q-timeline color="deep-orange-4">
                <div class="q-pl-md">

                <q-timeline-entry
                    v-for="(status,i) in this.eventStatusArray"
                    :key="i"
                    :title="status" 
                    :subtitle="returnStatusTime(i)"  
                    :icon="returnIcon(i)" 
                    :color="returnColor(i)"
                    :class="status[i] == undefined ? 'text-grey-6' : 'text-grey-10'"
                >

                </q-timeline-entry>
                </div>
            </q-timeline>
        </div>
        <div>
            <q-list class="fit" >

            <q-slide-item @left="onLeft" @action="getData(schedule)" v-if="returnLengthOfStatus(schedule) < returnTypeLength(schedule)">
                <template v-slot:left>
                    <q-icon name="done" class="q-mr-md"/>
                    <span class="text-overline text-uppercase"> {{returnCurrentStatus(schedule)}} </span>
                </template>
                <q-item class="bg-deep-orange-8 text-white">
                <q-item-section avatar>
                    <q-avatar icon="update" text-color="white">
                    </q-avatar>
                </q-item-section>
                <q-item-section >
                    <q-item-label overline class="text-white">SLIDE TO UPDATE STATUS</q-item-label>
                    <q-item-label caption class="text-capitalize text-white" v-show="returnLengthOfStatus(schedule) < returnTypeLength(schedule)">next status: {{returnNextStatus(schedule)}}</q-item-label>
                </q-item-section>
                </q-item>
            </q-slide-item>

            <q-item v-else class="bg-green">
                <q-item-section avatar>
                    <q-avatar icon="check_circle" text-color="white">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label overline class="text-white" v-if="schedule.type == 'PARTY TRAY DELIVERY'">ORDER DELIVERED</q-item-label>
                    <q-item-label overline class="text-white" v-else>EVENT PLACE READY</q-item-label>
                </q-item-section>
            </q-item>
            </q-list>
        </div>
    

        <q-dialog v-model="stat" persistent>
        <q-card style="min-width: 350px">
            
            <q-card-section class="column">
                <q-checkbox v-model="rec" color="deep-orange-4" label="Order Confirmed!" />
                <q-checkbox v-model="prep" color="deep-orange-4" label="Preparing Order!" />
                <q-checkbox v-model="done" color="deep-orange-4" label="Done Preparing!" />
                <q-checkbox v-model="pen" color="deep-orange-4" label="Pending for Delivery!" />
                <q-checkbox v-model="out" color="deep-orange-4" label="Order is out for delivery!" />
                <q-checkbox v-model="del" color="deep-orange-4" label="Order Delivered!" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" color="deep-orange-4" v-close-popup />
            <q-btn flat label="Submit" color="deep-orange-4" v-close-popup />
            </q-card-actions>
        </q-card>
        </q-dialog>
    </q-page>
</template>


<script>
export default {
  data () {
    return {
      stat: false,
      payment: false,
      rec: false,
      prep: false,
      done: false,
      pen: false,
      out: false,
      del: false,
      base: 1,
      orderId: '',
      StaffSchedules: [],
      EventStatus: [],
      selectedEvent: null,
      status: [],
      eventStatusArray: ['Preparing Food!','Preparing Setup!','The Catering Team is en route!','Arrived at the Event Area','Setup on Progress','Event Place Is Ready!'],
      orderStatusArray: ['Order Confirmed!','Preparing Order!','Done Preparing!','Pending for Delivery','Order is  out for delivery!','Order Delivered!']
    }
  },
  created(){
      this.orderId = this.$route.params.id
  },
  mounted(){
        this.$binding('StaffSchedules', this.$firestoreApp.collection('StaffSchedules').where('reservationKey','==',this.orderId))
        .then(StaffSchedules => {
        console.log(StaffSchedules, 'StaffSchedules')
        }),
        this.$binding('status', this.$firestoreApp.collection('EventStatus').where('reservationKey','==',this.orderId))
        .then(status => {
        console.log(status, 'status')
        }),
        this.$binding('EventStatus', this.$firestoreApp.collection('EventStatus'))
        .then(EventStatus => {
        console.log(EventStatus, 'EventStatus')
        })
  },
  computed:{
      schedule(){
          return this.StaffSchedules[0]
      },

  },
  methods:{
      returnStatusTime(index){
          try {
              return this.$moment(this.status[index].dateTime).format('LT')
          } catch (error) {
              return '--:-- --'
          }
      },
      returnIcon(index){
          try {
              if(this.status[index] !== undefined){
                  return 'check'
              }
          } catch (error) {
              return ''
          }
      },
      returnColor(index){
          try {
              if(this.status[index] !== undefined){
                  return 'green'
              }
          } catch (error) {
              return 'deep-orange-4'
          }          
      },
      // for slider codes
        returnLengthOfStatus(event){
            let filter = this.$lodash.filter(this.EventStatus,a=>{
                return a.scheduleKey == event['.key']
            })
            return filter.length            
        },
        returnNextStatus(event){
            if(event.type == 'PARTY TRAY DELIVERY'){
                return this.orderStatusArray[this.returnLengthOfStatus(event)]
            } else {
                return this.eventStatusArray[this.returnLengthOfStatus(event)]
            }
        },
        returnCurrentStatus(event){
            if(event.type == 'PARTY TRAY DELIVERY'){
                return this.orderStatusArray[this.returnLengthOfStatus(event)-1]
            } else {
                return this.eventStatusArray[this.returnLengthOfStatus(event)-1]
            }
        },
        onLeft ({ reset }) {
            this.$q.dialog({
                title: 'Update Status ?',
                message: 'This action cannot be undone.',
                ok: 'YES',
                cancel: 'NO',
                persistent: true
                }).onOk(() => {    
                    console.log(this.selectedEvent,'selectedEvent')
                    let payload = {
                        reservationKey: this.selectedEvent.reservationKey,
                        scheduleKey: this.selectedEvent['.key'],
                        status: this.selectedEvent.type == 'PARTY TRAY DELIVERY' ? this.orderStatusArray[this.returnLengthOfStatus(this.selectedEvent)] : this.eventStatusArray[this.returnLengthOfStatus(this.selectedEvent)],
                        dateTime: new Date().toString()
                    }
                    console.log(payload,'payload')
                    this.$firestoreApp.collection('EventStatus').add(payload)
                        .then(()=>{
                            console.log('done')
                        })
                        .catch(()=>{
                            console.log('error')
                        })

                    this.$q.notify('STATUS UPDATED = '+payload.status)
                    this.finalize(reset)
                }).onCancel(() =>{
                    this.resetCancel(reset)
                })
        },

        onRight ({ reset }) {
            this.$q.notify('Right action triggered. Resetting in 1 second.')
            this.finalize(reset)
        },

        finalize (reset) {
            this.timer = setTimeout(() => {
                reset()
            }, 1000)
        },
        resetCancel(reset){
            reset()
        },
        getData(event){
            console.log(event,'event with action')
            this.selectedEvent = event
        },
        returnTypeLength(event){
            if(event.type == 'PARTY TRAY DELIVERY'){
                return this.orderStatusArray.length
            } else {
                return this.eventStatusArray.length
            }
        },
        returnStandByStatus(event,section){
            if(event.type == 'PARTY TRAY DELIVERY'){
                return 'ORDER ON STANBY'
            } else {
                if(section == 'today'){
                    return 'EVENT IS TODAY'
                } else if(section == 'tomorrow'){
                    return 'EVENT IS TOMORROW'
                } else {
                    return 'COMING SOON'
                }
            }
        }
  }
}
</script>