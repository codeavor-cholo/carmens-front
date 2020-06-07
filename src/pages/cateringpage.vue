<template>
    <q-page>
<!-- START OF DESKTOP ONLY -->
      <div class="desktop-only">
        <div class="row justify-around">  
          <div class=" col-5 q-pa-xl q-pl-xl">
              <p class="q-pa-sm" style="font-size:60px;font-family: 'Domine', serif;padding:0;margin:0;line-height:50px">CATERING<br>SERVICES</p>
              <p class="q-pt-md q-pa-sm" style="color:#e4acbf;font-size:18px;font-family: 'Noto Serif SC', serif;"><i>Avail our budget friendly catering packages for</i><br><i>your special life events.</i></p>
              <p class="q-pa-sm" style="font-size:15px;font-family: 'Noto Serif SC', serif;">Fill up our reservation form to get a free quotation</p>
          </div>
          <div class="col-5 q-pa-xl">
              <q-card flat class="my-card">
                <q-card-section class="q-pb-none">
                  <div class="column items-center q-pt-sm" style="font-size:20px"><b>RESERVATION FORM</b></div>
                </q-card-section>
                <q-slide-transition :duration="500">
                  <q-card-section v-show="formStep == 1" >
                      <div class="column items-center">
                      <!-- <q-input dense filled v-model="name" label="Event Name" />
                      <q-input dense filled v-model="pax" label="Number of Head" /> -->
                            <q-date
                              v-model="date"
                              minimal=""
                              class="shadow-0 q-ma-none"
                              mask="YYYY-MM-DD"
                              color="grey-8"
                              :options="returnOpenDates"
                              :events="returnReserved"
                              event-color="blue"
                              @input="atInput"
                            >
                            </q-date>
                      </div>
                      <div class="column items-center q-mb-md">
                      <q-btn dense style="background-color:#e4acbf;width:250px" text-color="white" label="NEXT" @click="formStep = 2"/>
                      </div>
                  </q-card-section>
                </q-slide-transition>
                <q-slide-transition :duration="500">
                  <q-card-section v-show="formStep == 2">
                    <div class="column items-center q-gutter-md q-pa-md">
                      <div class="text-red" v-show="!isValid"><q-icon name="error"/> We can't accomodate pax greater than <b class="text-h6">150</b> anymore. Lower down your number of pax / Go back and select another date. </div>
                      <q-input dense outlined="" v-model="name" type="text" label="Event Name" class="full-width" color="pink-3"/>
                      <div class="row full-width">
                      <q-input 
                        dense outlined="" 
                        type="number" 
                        v-model="pax" 
                        hide-bottom-space=""
                        :error="!isValid"
                        label="Number of Head"
                        class="col q-mr-sm"
                        color="pink-3"
                      />


                      <q-select class="col" color="grey-10" dense outlined  v-model="selectMotif" options-selected-class="bg-grey text-white" multiple="" :options="motifOpt" emit-value map-options label="Select Motif" @input="showInput">
                              <template v-slot:option="scope">
                                <q-item
                                  v-bind="scope.itemProps"
                                  v-on="scope.itemEvents"
                                >
                                  <q-item-section avatar>
                                    <q-avatar :style="'background-color:'+scope.opt.hex" size="3em" />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                                  </q-item-section>
                                </q-item>
                              </template>
                      </q-select>
                    </div>
                    <div class="row full-width">
                      <q-input type="time" class="col" color="pink-3" dense outlined v-model="startTime" hint="Start Time" mask="`YYYY-MM-DDTHH:mm:ss:sssZ`"/>
                      <q-input type="time" class="col q-ml-sm" dense color="pink-3" outlined v-model="endTime" hint="End Time" mask="`YYYY-MM-DDTHH:mm:ss:sssZ`"/>
                    </div>
                    <div class="q-pa-sm q-pt-md row full-width">
                      <q-btn dense flat color="grey-8" label="BACK" class="col q-mr-sm" @click="formStep = 1"/>
                      <q-btn dense style="background-color:#e4acbf;" text-color="white" label="NEXT" class="col" @click="formStep = 3"/>
                    </div>
                    </div>
                  </q-card-section>
                </q-slide-transition>
                <q-slide-transition :duration="500">
                  <q-card-section v-show="formStep == 3">
                    <div class="column items-center q-gutter-md q-pa-md ">
                      <q-input class="q-pt-sm full-width" color="pink-3" outlined dense v-model="clientAddress" label="Event Place Address" autogrow=""/>
                      <q-select class="q-pt-sm full-width" color="pink-3" dense outlined v-model="selectCity" :options="cityOpt" emit-value map-options label="Select City" />
                    <div class="q-pa-sm q-pt-md row full-width">
                      <q-btn dense flat color="grey-8" label="BACK" class="col q-mr-sm" @click="formStep = 2"/>
                      <q-btn dense style="background-color:#e4acbf;" text-color="white" label="PROCEED TO PACKAGES" class="col-8" @click="saveInquiry"/>
                    </div>
                    </div>
                  </q-card-section>
                  </q-slide-transition>
              </q-card>
          </div>    
        </div>  
      </div>
<!-- END OF DESKTOP ONLY -->

<!-- START OF MOBILE ONLY -->

      <div class="mobile-only">
        <div class="q-pt-xl">
            <p class="text-center" style="font-size:30px;font-family: 'Domine', serif">CATERING SERVICES</p>
            <p class="q-px-sm" style="color:#e4acbf;font-size:15px;font-family: 'Noto Serif SC', serif;"><i>Avail our budget friendly catering packages for</i><br><i>your special life events.</i></p>
            <p class="q-px-sm" style="font-size:14px;font-family: 'Noto Serif SC', serif;">Fill up our reservation form to get a free quotation</p>
        </div>
        <div class="">
             <q-card flat class="my-card">
               <q-card-section class="q-pb-none">
                 <div class="column items-center q-pt-sm" style="font-size:20px"><b>RESERVATION FORM</b></div>
               </q-card-section>
               <q-slide-transition :duration="500">
                <q-card-section v-show="formStep == 1" >
                    <div class="column items-center">
                    <!-- <q-input dense filled v-model="name" label="Event Name" />
                    <q-input dense filled v-model="pax" label="Number of Head" /> -->
                          <q-date
                            v-model="date"
                            minimal=""
                            class="shadow-0 q-ma-none"
                            mask="YYYY-MM-DD"
                            color="grey-8"
                            :options="returnOpenDates"
                            :events="returnReserved"
                            event-color="blue"
                            @input="atInput"
                          >
                          </q-date>
                    </div>
                    <div class="column items-center q-mb-md">
                    <q-btn dense style="background-color:#e4acbf;width:250px" text-color="white" label="NEXT" @click="formStep = 2"/>
                    </div>
                </q-card-section>
               </q-slide-transition>
               <q-slide-transition :duration="500">
                <q-card-section v-show="formStep == 2">
                  <div class="column items-center q-gutter-md q-pa-md">
                    <div class="text-red" v-show="!isValid"><q-icon name="error"/>  We can't accomodate pax greater than <b class="text-h6">150</b> anymore. Lower down your number of pax / Go back and select another date. </div>
                    <q-input dense outlined="" v-model="name" type="text" label="Event Name" class="full-width" color="pink-3"/>
                    <div class="row full-width">
                      <q-input 
                        dense outlined="" 
                        type="number" 
                        v-model="pax" 
                        hide-bottom-space=""
                        :error="!isValid"
                        label="Number of Head"
                        class="col q-mr-sm"
                        color="pink-3"
                      />
                     <q-select class="col" color="grey-10" dense outlined  v-model="selectMotif" options-selected-class="bg-grey text-white" multiple="" :options="motifOpt" emit-value map-options label="Select Motif" @input="showInput">
                             <template v-slot:option="scope">
                              <q-item
                                v-bind="scope.itemProps"
                                v-on="scope.itemEvents"
                              >
                                <q-item-section avatar>
                                  <q-avatar :style="'background-color:'+scope.opt.hex" size="3em" />
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                                </q-item-section>
                              </q-item>
                            </template>
                     </q-select>
                   </div>
                  <div class="row full-width">
                    <q-input type="time" class="col" color="pink-3" dense outlined v-model="startTime" hint="Start Time" mask="`YYYY-MM-DDTHH:mm:ss:sssZ`"/>
                    <q-input type="time" class="col q-ml-sm" dense color="pink-3" outlined v-model="endTime" hint="End Time" mask="`YYYY-MM-DDTHH:mm:ss:sssZ`"/>
                  </div>
                  <div class="q-pa-sm q-pt-md row full-width">
                    <q-btn dense flat color="grey-8" label="BACK" class="col q-mr-sm" @click="formStep = 1"/>
                    <q-btn dense style="background-color:#e4acbf;" text-color="white" label="NEXT" class="col" @click="formStep = 3"/>
                  </div>
                  </div>
                </q-card-section>
               </q-slide-transition>
               <q-slide-transition :duration="500">
                <q-card-section v-show="formStep == 3">
                  <div class="column items-center q-gutter-md q-pa-md ">
                    <q-input class="q-pt-sm full-width" color="pink-3" outlined dense v-model="clientAddress" label="Event Place Address" autogrow=""/>
                    <q-select class="q-pt-sm full-width" color="pink-3" dense outlined v-model="selectCity" :options="cityOpt" emit-value map-options label="Select City" />
                  <div class="q-pa-sm q-pt-md row full-width">
                    <q-btn dense flat color="grey-8" label="BACK" class="col q-mr-sm" @click="formStep = 2"/>
                    <q-btn dense style="background-color:#e4acbf;" text-color="white" label="PROCEED TO PACKAGES" class="col-8" @click="saveInquirymob"/>
                  </div>
                  </div>
                </q-card-section>
                </q-slide-transition>
             </q-card>
        </div>
        </div>    
      </div>
<!-- END OF MOBILE ONLY -->

      <div class="desktop-only">
          <div class="row q-pt-lg">
             <div class="row">
                <div class="col-12 text-center" style="font-size:30px;font-family: 'Domine', serif"> FOOD CHOICE </div>
                <div class="col-12">
                <q-table grid :data="returnWithPartyTrays" :columns="columns" :rows-per-page-options="[0]" hide-bottom :pagination="pagination" :filter="filter" class="row items-center q-pa-lg q-ma-lg">
                <template v-slot:item="props">            
                    <div class="q-pa-sm grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                        <q-card flat class="transparent my-card" style="width:162px;height:180px" >
                            <div>
                                <q-img :src="props.row.foodPic" :ratio="4/3"/>
                            
                            <q-card-section side>
                            <q-list dense>
                                <div class="row items-center justify-between">
                                    <div class="col">    
                                        <div>
                                            <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><b>{{props.row.foodName}}</b></div>
                                            <!-- <div style="font-size:12px">{{props.row.partyTrayPrice[0].price}} Pesos</div> -->
                                        </div>
                                    </div>
                                    <!-- <div class="col">
                                        <q-btn round color="pink-3" @click="openDialog(props.row)" class="q-ml-lg" flat size="md" icon="shopping_cart"/>
                                    </div> -->
                                </div>
                            </q-list>
                            </q-card-section>
                            </div>
                        </q-card>
                    </div>
                </template>
            </q-table>
            </div>
            </div>     
                   
          </div>

        <div class="row q-pa-sm  q-gutter-lg">
            <div class="col-12 text-center" style="font-size:30px;font-family: 'Domine', serif">PACKAGES</div>
            <div>
             <q-table grid :data="Packages" :columns="columnss" :rows-per-page-options="[0]" hide-bottom :pagination.sync="paginations" row-key=".key">
                    <template v-slot:item="props">
                        <div class="q-pa-xs q-pl-lg col-xs-12 col-sm-6 col-md-3 col-lg-4 grid-style-transition" color="pink-3">
                            <q-card class="my-card" style="height: 470px">
                              <q-card-section class="column items-center">
                                <div style="font-size:50px;color:#E4ACBF;font-family: 'Zhi Mang Xing', cursive;">{{props.row.name}}</div>
                                <div style="font-size:15px"><b>{{props.row.price}}php per pax</b></div>
                                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px" ><b>FOOD CHOICES</b></div>  
                                <div v-for="(price, index) in props.row.viands" :key="index" >
                                  <div class="q-pt-sm" style="font-size:12px"><i>{{ price.viandsQty }} viand<span v-show="price.viandsQty != '1'">s</span> of {{ price.category }}</i></div>
                                </div>
                                <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>INCLUSIONS</b></div>
                                <div v-for="(s, indexs) in props.row.inclusions" :key="indexs">
                                  <div style="font-size:12px"><i>{{ s.inclusion }}</i></div>
                                </div>
                              </q-card-section>
                            </q-card>
                        </div>
                    </template>
                </q-table>      
            </div>
        </div>
        <br><br>    
      </div>    


    </q-page>
</template>
<style>

.q-date__header{
  background: #e4acbf;
}

</style>

<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      name: '',
      pax: 0,
      date: date.formatDate(new Date(),'YYYY-MM-DD'),
      Motif: [],
      City: [],

      startTime: '09:00',
      endTime: '13:00',
      selectMotif: [],
      formStep: 1,
      clientAddress: '',
      selectCity: '',
      Food: [],
      filter: '',
      Packages: [],
      Reservation: [],
      pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10000},
      paginations: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10000},
      columns: [
          { name: 'category', required: true, label: 'Food Category', align: 'center', field: 'category', sortable: true },
          { name: 'foodName', align: 'center', label: 'Food Name', field: 'foodName', sortable: true },
          // { name: 'foodPrice', align: 'center', label: 'Package Price', field: 'foodPrice', sortable: true },
      ],
      columnss: [
            { name: 'name', required: true, label: 'Package name', align: 'center', field: 'name', sortable: true },
            { name: 'price', align: 'center', label: 'Package Per Head Price', field: 'price', sortable: true },
      ],
      blockCount: 0
    }
  },
  mounted(){
    this.$binding('Packages', this.$firestoreApp.collection('Packages'))
            .then(Packages => {
            console.log(Packages, 'Packages')
        }),
    this.$binding('Motif', this.$firestoreApp.collection('Motif'))
            .then(Motif => {
            console.log(Motif, 'Motif')
        }),
    this.$binding('City', this.$firestoreApp.collection('City'))
            .then(City => {
            console.log(City, 'City')
        }),
    this.$binding('Food', this.$firestoreApp.collection('Food'))
            .then(Food => {
            console.log(Food, 'Food')
        }),
    this.$binding('Reservation', this.$firestoreApp.collection('Reservation'))
            .then(Reservation => {
            console.log(Reservation, 'Reservation')
        })
  },
  computed : {
    isValid () {
      let max = 150
      if (this.blockCount <= 1){
        return this.pax <= max
      } else {
        return true
      }
    },    
    returnWithPartyTrays(){
        let party = this.$lodash.filter(this.Food, a=>{
              return a.foodPrice
        })
        return party
    },
    returnDate(){
      let now = date.formatDate(new Date(),'YYYY-MM-DD')
      if(this.date == now){
        return 'Select Date'
      } else {
        return ''
      }
      
    },
    motifOpt(){
      let optionss = this.Motif.map(m => {
          return {
              label: m.motif,
              value: m.motif,
              hex: m.hex
          }
      })
      return optionss
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
  },
  methods: {
    saveInquiry(){
      //get all data
      let newInquiry= {
        clientCity: this.selectCity,
        clientEvent: this.name,
        clientPax: this.pax,
        clientPlace: this.clientAddress,
        clientDateofReserve: this.date,
        clientStartTime: this.startTime,
        clientEndTime: this.endTime,
        clientMotif: this.selectMotif,
        clientReserveType: 'ONLINE',
      }

      console.log(newInquiry,'newInquiry')
      //save to database
      this.$firestoreApp.collection('OnlineInquiry').add(newInquiry)
      .then((ref)=> {
        let key = ref.id
        this.$router.push('/reservation/'+key)
      })
      //get key order code
      //router push to reservations page
    },
    saveInquirymob(){
      //get all data
      let newInquiry= {
        clientCity: this.selectCity,
        clientEvent: this.name,
        clientPax: this.pax,
        clientPlace: this.clientAddress,
        clientDateofReserve: this.date,
        clientStartTime: this.startTime,
        clientEndTime: this.endTime,
        clientMotif: this.selectMotif,
        clientReserveType: 'ONLINE',
      }

      console.log(newInquiry,'newInquiry')
      //save to database
      this.$firestoreApp.collection('OnlineInquiry').add(newInquiry)
      .then((ref)=> {
        let key = ref.id
        this.$router.push('/res/'+key)
      })
      //get key order code
      //router push to reservations page
    },
    formatTimeInput(time){
      //get time to format for display
      let baseDate = new Date(2020,1,1)
      let arr = time.split(':')
      let formatTime = date.addToDate(baseDate, {hours:arr[0],minutes:arr[1]})

      return this.$moment(formatTime).format('LT')
    },
    showInput(){
      console.log(this.selectMotif)
    },
    returnReserved(base){
        let eventsBase = []

        let filter = this.Reservation.forEach(a=>{
          if(date.formatDate(base,'YYYY-MM-DD') == date.formatDate(a.clientReserveDate,'YYYY-MM-DD')){
            eventsBase.push(a)
          }
        })

        if(eventsBase.length > 0){
          return true
        } else {
          return false
        }
    },
    returnOpenDates(base){
      let today = new Date()
      let today1week = date.addToDate(today,{days: 6})
      let format = date.formatDate(today1week,'YYYY/MM/DD')
      if(format < base){
        let eventCount = 1
        let eventsBase = []

        let filter = this.Reservation.forEach(a=>{
          if(date.formatDate(base,'YYYY-MM-DD') == date.formatDate(a.clientReserveDate,'YYYY-MM-DD')){
            eventsBase.push(a)
          }
        })

        eventsBase.forEach(b=>{
          let count = b.clientPax > 150 ? 2 : 1
          // console.log(b['.key'],' - ',b.clientPax,' = ',count)
          eventCount = eventCount + count
        })
       
        if(eventCount > 4){
          // console.log('BLOCKED',base)
          return false
        } else {
          // console.log(eventCount,base)
          return true
        }
      }
    },
    atInput(value){
        let eventCount = 1
        let eventsBase = []

        let filter = this.Reservation.forEach(a=>{
          if(date.formatDate(value,'YYYY-MM-DD') == date.formatDate(a.clientReserveDate,'YYYY-MM-DD')){
            eventsBase.push(a)
          }
        })

        eventsBase.forEach(b=>{
          let count = b.clientPax > 150 ? 2 : 1
          // console.log(b['.key'],' - ',b.clientPax,' = ',count)
          eventCount = eventCount + count
        })
       
        if(eventCount > 4){
          this.blockCount = (4 - eventCount) + 1
          console.log('BLOCKED',value)
          console.log(this.blockCount,'remaining event')
        } else {
          this.blockCount = (4 - eventCount) + 1
          console.log(eventCount,value)
          console.log(this.blockCount,'remaining event')  
        }      
    }

  }

}
</script>