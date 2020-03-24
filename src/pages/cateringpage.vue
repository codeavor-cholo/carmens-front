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
                      <q-input dense outlined="" v-model="name" type="text" label="Event Name" class="full-width" color="pink-3"/>
                      <div class="row full-width">
                      <q-input dense outlined="" type="number" v-model="pax" label="Number of Head" class="col q-mr-sm" color="pink-3"/>
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
                    <q-input dense outlined="" v-model="name" type="text" label="Event Name" class="full-width" color="pink-3"/>
                    <div class="row full-width">
                     <q-input dense outlined="" type="number" v-model="pax" label="Number of Head" class="col q-mr-sm" color="pink-3"/>
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
<!-- END OF MOBILE ONLY -->

      <div class="desktop-only">
          <div class="row q-pt-lg">
            <div style="color:#e4acbf;font-size:20px;font-family: 'Domine', serif;padding-left:110px">FOOD CHOICES</div>
            <div class="row q-gutter-md q-pl-xl">
                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>   
            </div>       
        </div>

        <div class="row q-pt-lg">
            <div class="row q-gutter-md q-pl-xl" style="padding-left:310px">
                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                </div>
                </q-card-section>
                </q-card>   
            </div>       
        </div>

        <div class="row q-pa-sm q-pt-xl q-gutter-lg">
            <div style="color:#e4acbf;font-size:20px;font-family: 'Domine', serif;padding-left:110px">PACKAGES</div>
            <div class="q-pl-xl">
            <q-card class="my-card" style="width:300px">
                <q-card-section class="column items-center">
                  <div style="font-size:50px;color:#E4ACBF;font-family: 'Zhi Mang Xing', cursive;">The Paradise</div>
                  <div style="font-size:15px"><b>CATERING MENU</b></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>STARTER</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Lentif Salad with Cumin and Garlic</i></div>
                  <div style="font-size:12px"><i>Tabbouich with Mint and Parsier Puree</i></div>
                  <div style="font-size:12px"><i>Bobo Ghanoush with Pita Bread</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>ENTREE</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Chicken Souviaki with Tzatziki Sauce</i></div>
                  <div style="font-size:12px"><i>Beef Falafel with Walnuts and Red Pepper</i></div>
                  <div style="font-size:12px"><i>Chickpea Stew with Saffron and Roasted Onions</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>DESSERT</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Turkish Delight Cheesecake</i></div>
                  <div style="font-size:12px"><i>Semolina Almond-Anis Tea Cake</i></div>
                  <div style="font-size:12px"><i>Knafeh with Orange Blossom Syrup</i></div>
                </q-card-section>
              </q-card>
            </div>

              <q-card class="my-card" style="width:300px">
                <q-card-section class="column items-center">
                  <div style="font-size:50px;color:#E4ACBF;font-family: 'Zhi Mang Xing', cursive;">The Paradise</div>
                  <div style="font-size:15px"><b>CATERING MENU</b></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>STARTER</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Lentif Salad with Cumin and Garlic</i></div>
                  <div style="font-size:12px"><i>Tabbouich with Mint and Parsier Puree</i></div>
                  <div style="font-size:12px"><i>Bobo Ghanoush with Pita Bread</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>ENTREE</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Chicken Souviaki with Tzatziki Sauce</i></div>
                  <div style="font-size:12px"><i>Beef Falafel with Walnuts and Red Pepper</i></div>
                  <div style="font-size:12px"><i>Chickpea Stew with Saffron and Roasted Onions</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>DESSERT</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Turkish Delight Cheesecake</i></div>
                  <div style="font-size:12px"><i>Semolina Almond-Anis Tea Cake</i></div>
                  <div style="font-size:12px"><i>Knafeh with Orange Blossom Syrup</i></div>
                </q-card-section>
              </q-card>
            
            <q-card class="my-card" style="width:300px">
                <q-card-section class="column items-center">
                  <div style="font-size:50px;color:#E4ACBF;font-family: 'Zhi Mang Xing', cursive;">The Paradise</div>
                  <div style="font-size:15px"><b>CATERING MENU</b></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>STARTER</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Lentif Salad with Cumin and Garlic</i></div>
                  <div style="font-size:12px"><i>Tabbouich with Mint and Parsier Puree</i></div>
                  <div style="font-size:12px"><i>Bobo Ghanoush with Pita Bread</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>ENTREE</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Chicken Souviaki with Tzatziki Sauce</i></div>
                  <div style="font-size:12px"><i>Beef Falafel with Walnuts and Red Pepper</i></div>
                  <div style="font-size:12px"><i>Chickpea Stew with Saffron and Roasted Onions</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>DESSERT</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Turkish Delight Cheesecake</i></div>
                  <div style="font-size:12px"><i>Semolina Almond-Anis Tea Cake</i></div>
                  <div style="font-size:12px"><i>Knafeh with Orange Blossom Syrup</i></div>
                </q-card-section>
              </q-card>
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
      pax: '',
      date: date.formatDate(new Date(),'YYYY-MM-DD'),
      Motif: [],
      City: [],

      startTime: '09:00',
      endTime: '13:00',
      selectMotif: [],
      formStep: 1,
      clientAddress: '',
      selectCity: ''
    }
  },
  mounted(){
    this.$binding('Motif', this.$firestoreApp.collection('Motif'))
            .then(Motif => {
            console.log(Motif, 'Motif')
        }),
    this.$binding('City', this.$firestoreApp.collection('City'))
            .then(City => {
            console.log(City, 'City')
        })

  },
  computed : {
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
    }
  }

}
</script>