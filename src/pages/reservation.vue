<template>
    <q-page>
        <div class="row">
<!-- LEFT PART -->
            <div class="col-8 q-pt-xl q-pl-xl q-pl-md">
                <q-card class="my-card">
                    <q-card-section>
                        <div class="q-px-md q-pt-md" style="font-size:30px;font-family: 'Noto Serif SC', serif;"><b>{{OnlineInquiry.clientEvent}}</b></div>
                        
                        <div class="row q-mb-sm q-ml-md">
                            <div class="q-pa-lg text-weight-bold col-3">EVENT DATE & TIME:</div>
                            <div class="col-3">
                                <div class="q-pt-md row"> 
                                    <div class="col q-pa-sm">
                                    {{this.$moment(OnlineInquiry.clientDateofReserve).format('LL')}}
                                    </div>
                                    <div class="col-3"><q-btn flat text-color="teal" icon="edit" @click="openDateDialog(OnlineInquiry.clientDateofReserve)"/></div>
                                </div>
                                <div class="row q-pt-sm"> 
                                    <div class="col q-pa-sm">
                                    {{this.formatTimeInput(OnlineInquiry.clientStartTime)}} - {{this.formatTimeInput(OnlineInquiry.clientEndTime)}}
                                    </div>
                                    <div class="col-3"><q-btn flat text-color="teal" icon="edit" @click="openDialog(OnlineInquiry.clientStartTime,OnlineInquiry.clientEndTime,'Time')"/></div>

                                    
                                </div>
                            </div>
                            <div class="q-pt-lg q-pl-md text-weight-bold col-1 row">
                           <span class="col-12">PAX:</span> 
                           <span class="col-12 q-mt-md">MOTIF:</span> 
                            </div>
                            <div class="col-4">
                                <div class="q-pt-md row">
                                    <span class="col-12 q-pa-sm cursor-pointer v-ripple">{{OnlineInquiry.clientPax}}<q-icon name="edit" size="sm" class="q-ml-lg" color="teal" v-ripple/>
                                        <q-popup-edit v-model="OnlineInquiry.clientPax">
                                          <template v-slot="{ initialValue, value, emitValue, set, cancel }">
                                            <q-input style="width: 400px" class="relative position" autofocus dense :value="OnlineInquiry.clientPax" hint="Enter PAX" @input="emitValue">
                                              <template v-slot:after>
                                                <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                                <q-btn flat dense color="teal" icon="check_circle" @click.stop="set" />
                                              </template>
                                            </q-input>
                                          </template>
                                        </q-popup-edit>
                                    </span>
                                </div> 
                                <div class="q-pt-sm row">
                                    <span class="col-12 q-pa-sm cursor-pointer v-ripple">{{OnlineInquiry.clientMotif}}<q-icon name="edit" size="sm" class="q-ml-lg" color="teal" v-ripple/>
                                        <q-popup-edit v-model="OnlineInquiry.clientMotif">
                                          <template v-slot="{ initialValue, value, emitValue, set, cancel }">
                                            <q-select style="width: 400px" class="relative position" autofocus outlined v-model="OnlineInquiry.clientMotif" :options="motifOpt" emit-value map-options hint="Select Motif" @input="emitValue">
                                              <template v-slot:after>
                                                <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                                <q-btn flat dense color="teal" icon="check_circle" @click.stop="set" />
                                              </template>
                                            </q-select>
                                          </template>
                                        </q-popup-edit>
                                    </span>
                                </div> 
                            </div>
                        </div>
                        
                        <div class="q-pa-sm"> 
                        <q-card class="my-card bg-grey-3">
                        <q-card-section>
                        <div class="row">
                        <div class="q-px-md text-weight-bold col-3">EVENT PLACE ADDRESS:  </div>    
                        <div class="col">{{OnlineInquiry.clientPlace}}, {{OnlineInquiry.clientCity}}  </div>
                        <div class="col-1">
                        <q-btn dense flat text-color="teal" label="change" @click="openDialog(OnlineInquiry.clientPlace,OnlineInquiry.clientCity,'Address')"/>
                        </div>
                        </div>
                        </q-card-section>

                        </q-card>                    
                        </div>
                        
                        <div class="q-pa-sm q-pt-md"> 
                        <q-stepper
                            v-model="step"
                            ref="stepper"
                            header-nav
                            color="pink-3"
                            active-color="pink-3" inactive-color="grey-8"
                            animated
                            >
                            <q-step
                                :name="1"
                                title="Select Package"
                                icon="settings"
                                :done="step > 1"
                            >
                                <q-table grid :data="Packages" :columns="columns" :filter="filter" row-key=".key" selection="single" :selected.sync="selected">
                                    <template v-slot:item="props">
                                        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-4 grid-style-transition" color="pink-3" :style="props.selected ? 'transform: scale(0.95);' : ''">
                                            <q-card class="my-card" style="border: 2px solid;border-color: grey;" :class="props.selected ? 'bg-grey-2' : ''">
                                                <q-card-section side>
                                                    <q-list dense>
                                                    <q-item class="q-mt-sm">
                                                    <span class="full-width text-center text-teal text-h6 text-weight-bold">
                                                        <q-checkbox color="pink-3" dense v-model="props.selected" :label="props.row.name" />
                                                        <br>
                                                        <q-chip class="text-center">{{props.row.price}}php per pax</q-chip>
                                                    </span>
                                                    </q-item>     
                                                    <q-separator class="q-mt-sm"/>
                                                    <q-item class="q-mt-sm text-grey-8" v-show="props.row.viands">
                                                    <span class="full-width text-center text-weight-bold">FOOD CATEGORIES</span>
                                                    </q-item>
                                                    <q-item v-for="(price, index) in props.row.viands" :key="index" class="text-grey-8">
                                                        <q-item-section>
                                                        <q-item-label> {{ price.viandsQty }} viand<span v-show="price.viandsQty != '1'">s</span> of {{ price.category }}</q-item-label>
                                                        </q-item-section>
                                                    </q-item>
                                                    <q-separator class="q-mt-sm"/>
                                                    <q-item class="q-mt-sm" v-show="props.row.inclusions">
                                                    <span class="full-width text-center text-weight-bold text-grey-8" >INCLUSIONS</span>
                                                    </q-item>
                                                    <q-item v-for="(price, index) in props.row.inclusions" :key="index" class="text-grey-8">
                                                        <q-item-section>
                                                        <q-item-label> {{ price.inclusion }}</q-item-label>
                                                        </q-item-section>
                                                    </q-item>
                                                </q-list>
                                                </q-card-section>
                                            </q-card>
                                        </div>
                                    </template>
                                </q-table>
                            </q-step>

                            <q-step
                                :name="2"
                                title="Select Food of Choice"
                                icon="fastfood"
                                :done="step > 2"
                            >
                                <div v-for="(food,i) in foodChoice" :key="i" v-show="selected != null">
                                  <span class="q-mb-none q-mt-md text-subtitle2"> Select <span class="text-teal text-h6 text-weight-bolder">{{returnLimit(food.viandName)}}</span> Choice<span v-show="returnLimit(food.viandName) > 1">s</span> of {{food.viandName}}  </span>
                                  <div class="row">
                                    <q-img
                                      v-for="(choice,j) in food.foodChoices" :key="j"
                                      :src="choice.foodPic"
                                      :ratio="1"
                                      class="col-3 q-ma-md rounded-borders"
                                      :style="returnSelectedStatus(choice) ? 'transform: scale(0.95);border: 4px solid;border-color: pink;' : ''"
                                    >
                                    <div class="absolute-bottom text-overline">
                                      <q-checkbox color="pink-3" v-model="choiceOfFood" :val="choice" :label="choice.foodName" @input="checkQty(choice,returnLimit(food.viandName),food.viandName)"/>
                                    </div>
                                    </q-img>
                                  </div>
                                </div>
                            </q-step>

                            <q-step
                                :name="3"
                                title="Add-Ons"
                                icon="add"
                            >
                                <div class="row">
                                  <div class="text-subtitle2 q-mb-sm full-width">Package Includes The Following:</div>
                                  <q-card flat style="max-width: 150px" class="my-card bg-grey-3 col-3 q-ma-md" v-for="(inc,i) in returnSelectedPackageInclusion" :key="i">
                                    <q-card-section>
                                        <!-- <q-checkbox color="pink-3" dense v-model="choiceOfInclusions" :val="inc" :label="inc.inclusion" />-->
                                        {{inc.inclusion}} 
                                    </q-card-section>
                                  </q-card>
                                </div>
                                <div class="row q-mt-md">
                                  <div class="text-subtitle2 q-mb-sm full-width">You can add any of the following ADD-ON Items:</div>
                                  <q-card flat class="my-card bg-grey-3 col-3 q-ma-md" v-for="(inc,i) in Addons" :key="i">
                                    <q-card-section>
                                        <q-checkbox color="pink-3" dense v-model="choiceOfAddOns" :val="inc" :label="inc.addons +' - P '+inc.addonsPrice+' each'" class="text-weight-bold" @input="checkIfRemoved(inc.addons),showFoodChoices = false"/>
                                    </q-card-section>
                                  </q-card>
                                </div>
                                <div class="row q-mt-md" v-show="choiceOfAddOns.length !== 0">
                                  <q-list dense class="text-left" style="width:500px">
                                      <div class="text-subtitle2 q-mb-md full-width">Fill up QTY of Add-ons needed.</div>
                                      <q-item dense v-for="(i, index) in this.choiceOfAddOns" :key="index">
                                          <q-item-section>
                                            <div class="row items-center">
                                              <q-item-label class="col" lines="1" >{{i.addons}}</q-item-label>
                                              <q-input color="teal" outlined="" class="q-my-sm col" style="" type="number" dense min="1" v-model="AddOnsQty[i.addons]" label="Add-On Qty" />
                                              <span class="col-2 text-weight-bold text-center" >x  P {{i.addonsPrice}} = </span>
                                              <span class="col-3" v-show="isNaN(AddOnsQty[i.addons]) != false"><q-space></q-space></span>
                                              <span class="col-3 text-weight-bold text-teal" v-show="isNaN(AddOnsQty[i.addons]) != true">P {{formatNumber(i.addonsPrice * AddOnsQty[i.addons])}}.00 </span>
                                            </div>
                                          </q-item-section>
                                      </q-item>
                                  </q-list>
                                </div>
                            </q-step>

                            <q-step
                                :name="4"
                                title="Reserve the Date"
                                icon="money"
                            >
                              <div class="bg-grey-3 q-pa-xl rounded-borders">
                                <div class="text-subtitle2 q-pl-lg  q-mb-sm full-width">Fill up this form and <span class="text-teal">PAY NOW</span>  to reserve the date.</div>
                                <div class="container full-width" >
                                  <div class="">
                                    <div class="q-pl-lg row q-mt-md">
                                      <div class="col-6 row">
                                      <q-input v-model="clientFName" type="text" label="First Name" class="col q-mr-md" outlined dense color="teal"/>
                                      <q-input v-model="clientLName" type="text" label="Last Name" class="col" outlined dense color="teal"/>
                                      </div>
                                    </div>
                                    <div class="q-mb-md q-mt-md q-pl-lg row">
                                      <q-input v-model="clientEmail" type="email" label="Email Address" class="col-6 q-pr-sm" outlined dense color="teal"/>
                                    </div>
                                    <div class="q-mb-lg q-pl-lg row">
                                      <q-input v-model="clientContact" type="number" label="Contact Number" class="col-6 q-pr-sm" outlined dense color="teal"/>
                                    </div>  
                                  </div>   
                                </div>                           
                                <div class="text-subtitle2 q-mb-sm q-pl-lg full-width">Select amount to pay :</div>
                                <div>
                                  <q-list dense>
                                    <q-item>
                                        <q-item-section class="q-ml-lg">
                                        <strong>
                                          <!-- <q-checkbox @input="paymentSelect" color="pink-3" v-model="fullPayment" label="Total Payment" /> -->
                                        <q-radio v-model="paymentMode" val="fullPayment" label="Total Payment" />
                                        </strong>
                                        </q-item-section>
                                        <q-item-section class="q-mr-lg" side><strong>P {{formatNumber(returnTotalPrice)}}.00</strong></q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section class="q-ml-lg"><strong>
                                          <!-- <q-checkbox @input="paymentSelect" color="pink-3" v-model="downPayment" label="Down Payment Fee" /> -->
                                        <q-radio v-model="paymentMode" val="downPayment" label="Down Payment Fee (50%)" /></strong></q-item-section>
                                        <q-item-section class="q-mr-lg" side><strong>P {{formatNumber(returnDownPayment)}}.00</strong></q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section class="q-ml-lg"><strong>
                                          <!-- <q-checkbox @input="paymentSelect" color="pink-3" v-model="reservationFee" label="Reservation Fee" /> -->
                                        <q-radio v-model="paymentMode" val="reservationFee" label="Reservation Fee" />
                                        </strong>
                                        </q-item-section>
                                        <q-item-section class="q-mr-lg" side><strong>P {{formatNumber(5000)}}.00</strong></q-item-section>
                                    </q-item>

                                  </q-list>
                                </div>
                                    <div class="container q-mx-lg q-mt-lg relative-position">
                                      <div class="row q-pa-md q-py-xl">
                                        <stripe-elements ref="elementsRef" :pk="publishableKey" :amount="amount" @token="tokenCreated" @loading="loading = $event" outline class="col-8 q-mr-md">
                                        </stripe-elements>
                                        <q-btn outlined color="teal" class="col" size="md" @click="submit">PAY&nbsp;&nbsp;&nbsp;<b>P {{formatNumber(toPayAmount)}}.00</b></q-btn>
                                      </div>
                                      <div class="dimmed absolute-full text-center rounded-borders">
                                        <div style="z-index:100" class="absolute-center">
                                          <h6 class="text-white q-ma-none q-pb-sm">Login first before proceeding to payment</h6>
                                          <q-btn color="teal" icon-right="account_circle" label="Login First" @click="completeForm"/>
                                        </div>
                                            
                                      </div>
                                    </div>
                              </div>
                            </q-step>

                            <template v-slot:navigation>
                                <q-stepper-navigation>
                                <q-btn @click="$refs.stepper.next()" color="teal" :label="step === 4 ? 'Finish' : 'Continue'" />
                                <q-btn v-if="step > 1" flat color="grey-8" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                                </q-stepper-navigation>
                            </template>
                        </q-stepper>
                        </div>

                    </q-card-section>
                    </q-card>

            </div>
<!-- END OF LEFT PART -->

<!-- RIGHT PART -->
            <div class="col-4 q-pt-xl q-pr-xl q-pl-md">
                <q-card class="my-card">
                    <q-card-section>
                       
                        <div class="column items-center q-pa-sm">
                             <q-card flat class="my-card bg-grey-3" style="width:300px">
                                <q-card-section>
                                    <div class="text-center text-uppercase">Order Summary - #<span class="text-weight-bolder">{{this.$route.params.id.toString().slice(0,6)}}</span></div>
                                </q-card-section>
                              </q-card>
                        </div>
       
                        <div class="q-pa-sm row justify-between">
                            <div>Date</div>
                            <div>{{this.$moment(OnlineInquiry.clientDateofReserve).format('LL')}}</div>
                        </div>
                        <div class="q-pa-sm row justify-between">
                            <div>Time</div>
                            <div> {{this.formatTimeInput(OnlineInquiry.clientStartTime)}} - {{this.formatTimeInput(OnlineInquiry.clientEndTime)}} </div>
                        </div>
                        <div class="q-pa-sm row justify-between">
                            <div :class="returnSelectedPackagePrice !== 0 ? 'text-weight-bold' : ''">Total Number of Heads</div>
                            <div :class="returnSelectedPackagePrice !== 0 ? 'text-weight-bold' : ''">{{OnlineInquiry.clientPax}}</div>
                        </div>
                        <div class="q-pa-sm row justify-between" v-show="returnSelectedPackagePrice !== 0">
                            <div class="text-weight-bold">Package Price per Head</div>
                            <div class="text-weight-bold">x <span class="text-teal q-ml-sm"> P {{formatNumber(returnSelectedPackagePrice)}}.00</span></div>
                        </div>
                        <div v-show="returnSelectedPackagePrice !== 0"> 
                        <q-separator inset class="black"/>
                        </div>
                        <div class="q-pa-sm row justify-between" v-show="returnSelectedPackagePrice !== 0">
                            <div class="text-weight-bold">(Package price * No# of Heads)</div>
                            <div class="text-weight-bold text-teal">P {{formatNumber(returnSelectedPackagePrice * OnlineInquiry.clientPax)}}.00</div>
                        </div>
                        
                        <div class="q-my-sm" v-show="returnChoiceOfFood.length !== 0"> 
                        <q-separator inset class="black"/>
                        </div>
                        
                        <div class="q-pa-sm" v-show="returnChoiceOfFood.length !== 0">
                          
                          <div class="text-weight-bold text-uppercase row justify-between">
                           <span>Food Choices</span> 
                           <q-btn color="teal" dense size="sm" flat :label="showFoodChoices == true ? 'SHOW LESS':'SHOW MORE'" :icon-right="showFoodChoices == true ? 'expand_less':'expand_more'" @click="showFoodChoices = !showFoodChoices"/>
                          </div>
                          <q-slide-transition :delay="1000">
                          <transition-group
                            appear
                            enter-active-class="animated slideUp"
                            leave-active-class="animated slideDown"
                          >
                            <div class="q-pl-md q-pt-sm" v-for="(choice) in returnChoiceOfFood" :key="choice.viandName" v-show="showFoodChoices">
                                <span class="text-weight-bold">{{choice.viandName}} <q-chip size="sm" :color="choice.foodChoices.length == returnLimit(choice.viandName) ? 'teal' : 'pink-6'" class="text-white" :label="choice.foodChoices.length+' / '+returnLimit(choice.viandName)" /></span>
                              <div class="q-pl-sm q-mb-sm row" v-for="(pick) in choice.foodChoices" :key="pick.foodName">
                                <div dense class="col q-mr-sm">{{pick.foodName}}</div>
                                <div dense class="col-1 text-right text-weight-bold">x 1</div>
                              </div>
                            </div>
                          </transition-group>
                          </q-slide-transition>
                        </div>  

                        <div class="q-mt-md q-mb-sm" v-show="returnSelectedPackagePrice !== 0"> 
                        <q-separator inset class="black"/>
                        </div>
                        
                        
                        <div class="q-pa-sm" v-show="returnSelectedPackagePrice !== 0">
                        <strong class="text-weight-bold text-uppercase">Inclusions</strong>
                          <div class="q-px-md q-pt-sm" v-for="(choice,i) in returnSelectedPackageInclusion" :key="i">
                               <span>{{choice.inclusion}}</span>
                          </div>
                        </div>
                        <div class="q-pa-sm" v-show="step >= 3">
                        <strong class="text-weight-bold text-uppercase">Add-Ons</strong>
                            <div class="q-mt-sm row q-pl-md" v-for="(i,q) in choiceOfAddOns" :key="q">
                              <div dense class="col q-mr-sm">{{i.addons}} </div>
                              <div dense class="col-4 text-right text-weight-bold">P {{formatNumber(i.addonsPrice)}}.00 x {{AddOnsQty[i.addons]}}</div>
                              <div dense class="col-12 text-right q-mt-sm text-weight-bold text-teal" v-show="isNaN(AddOnsQty[i.addons]) != true">P {{formatNumber(i.addonsPrice * AddOnsQty[i.addons])}}.00</div>
                            </div>
                        </div>

                        <div class="q-mt-md q-mb-sm" v-show="returnSelectedPackagePrice !== 0"> 
                        <q-separator inset class="black"/>
                        </div>

                        <div class="q-pa-sm row justify-between text-h6" v-show="returnSelectedPackagePrice !== 0">
                            <div class="text-weight-bold">TOTAL PRICE</div>
                            <div class="text-weight-bold text-teal">P {{formatNumber(returnTotalPrice)}}.00</div>
                        </div>
                    </q-card-section>
                 </q-card>
            </div>    
<!-- END OF RIGHT PART -->

<!-- DATE -->
            <q-dialog v-model="change" persistent>
            <q-card style="min-width: 250px">
                <q-card-section class="q-pa-lg">
                <div class="text-h6 q-mb-md">Event Date</div>
                <q-date
                v-model="date"
                minimal=""
                class="shadow-0 q-ma-none"
                mask="YYYY-MM-DD"
                color="grey-8"
                >
                </q-date>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup color="grey-8"/>
                <q-btn flat label="SET DATE" v-close-popup color="teal" @click="OnlineInquiry.clientDateofReserve = date"/>
                </q-card-actions>
            </q-card>
            </q-dialog>

<!-- ADDRESS -->
            <q-dialog v-model="adr" persistent>
            <q-card style="min-width: 350px">
                <q-card-section v-show="whatToEdit == 'Address'">
                <div class="text-h6 q-mb-md">Event Place Address</div>

                <q-input dense v-model="address" outlined hint="Enter Address" color="teal"/>

                 <q-select class="q-pt-sm full-width" color="teal" dense outlined v-model="city" :options="cityOpt" emit-value map-options hint="Select City" />
                </q-card-section>


                <q-card-section v-show="whatToEdit == 'Time'">
                <div class="text-h6 q-mb-md">Event Start & End Time</div>

                <div class="q-pt-sm row">
                    <q-input type="time" class="col" color="teal" dense outlined v-model="startTime" hint="Start Time" mask="`YYYY-MM-DDTHH:mm:ss:sssZ`"/>
                    <q-input type="time" class="col q-ml-sm" dense color="teal" outlined v-model="endTime" hint="End Time" mask="`YYYY-MM-DDTHH:mm:ss:sssZ`"/>
                </div>
                </q-card-section>


                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup color="grey-8"/>
                <q-btn flat :label="whatToEdit == 'Address' ? 'Change address' : 'Change Time' " v-close-popup color="teal" @click="changeData"/>
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
                                          
                    <q-btn color="grey"  label="LOGIN VIA GOOGLE" @click="onClick" class="col-5"/>
                    <div class="text-overline text-center col-2">OR</div>
                    <q-btn color="teal" label="LOGIN account" @click="onClick" class="col"/>

                    </div>
                    
                  </q-card-section>

                  <q-card-section class="q-pt-none q-mb-md text-center">
                    
                    
                  </q-card-section>
                </q-card>
              </q-dialog>

        </div>
    </q-page>
</template>
<style >
  #payment-form button {
    display: none
  }
</style>
<script>
import { date } from 'quasar'
import { StripeElements } from 'vue-stripe-checkout'
export default {
  components: {
    StripeElements
  },
  data () {
    return {
        login: false,
        change: false,
        date: '',
        adr: false,
        address: '',
        city: '',
        whatToEdit: '',
        step: 1 ,
        startTime: '',
        endTime: '',
        OnlineInquiry: {},
        Motif: [],
        City: [],
        Packages: [],
        Inclusion: [],
        Food: [],
        Addons: [],
        filter: '',
        pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10},
        columns: [
            { name: 'name', required: true, label: 'Package name', align: 'center', field: 'name', sortable: true },
            { name: 'price', align: 'center', label: 'Package Per Head Price', field: 'price', sortable: true },
        ],
        selected: [],
        choiceOfFood: [],
        choiceOfAddOns: [],
        AddOnsQty: [],
        showFoodChoices: true,
        //for payment
        paymentMode: 'fullPayment',
        loading: false,
        amount: 0,
        publishableKey: 'pk_test_kUO5j8FaZUKitD1Qh3ibZ2HP00YkxaEOOS', 
        token: null,
        charge: null,
        //additionalDetails
        clientFName: '',
        clientLName: '',
        clientEmail: '',
        clientContact: '',
        clientPassword: ''
    }
  },
  created(){
        this.$binding('OnlineInquiry', this.$firestoreApp.collection('OnlineInquiry').doc(this.$route.params.id))
            .then(OnlineInquiry => {
            console.log(OnlineInquiry, 'OnlineInquiry')
        })
  },
    mounted(){
    this.$binding('Motif', this.$firestoreApp.collection('Motif'))
            .then(Motif => {
            console.log(Motif, 'Motif')
        }),
    this.$binding('City', this.$firestoreApp.collection('City'))
            .then(City => {
            console.log(City, 'City')
        }),
    this.$binding('Packages', this.$firestoreApp.collection('Packages'))
            .then(Packages => {
            console.log(Packages, 'Packages')
            }),
    this.$binding('Inclusion', this.$firestoreApp.collection('Inclusion'))
            .then(Inclusion => {
            console.log(Inclusion, 'Inclusion')
            })
    this.$binding('Food', this.$firestoreApp.collection('Food'))
            .then(Food => {
            console.log(Food, 'Food')
            }),
    this.$binding('Addons', this.$firestoreApp.collection('Addons'))
            .then(Addons => {
            console.log(Addons, 'Addons')
            })
  },
  computed:{
    motifOpt(){
      let optionss = this.Motif.map(m => {
          return {
              label: m.motif,
              value: m.motif
          }
      })
      console.log(optionss,'asd')
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
    foodChoice(){
        try {
          let viands = this.selected[0].viands
          console.log(viands)
          let foodWithPriceInViands = []
          let foods =  this.Food
          for(var x = 0; x < foods.length; x++){
            for(var y=0; y < viands.length; y++){
              if(foods[x].foodPrice != null && foods[x].category == viands[y].category){
                let push = {...foods[x]}
                let key = push['.key']
                delete push['.key']
                push.foodKey = key
                foodWithPriceInViands.push(push)
              }
            }
          }
          console.log(foodWithPriceInViands,'foodWithPriceInViands')
          let groups = this.$lodash.groupBy(foodWithPriceInViands,'category')
          console.log(groups,'groups')

          let map = this.$lodash.map(groups,function(value,key){
            return {
              viandName: key,
              foodChoices: value
            }
          })

          console.log(map,'map')
          return map
        } catch (err) {
          return []
        }
      },
      returnChoiceOfFood(){
        try {
          let groups = this.$lodash.groupBy(this.choiceOfFood,'category')
          console.log(groups,'groups')

          let map = this.$lodash.map(groups,function(value,key){
            return {
              viandName: key,
              foodChoices: value
            }
          })

          console.log(map,'mapChoices')

          return map
        } catch (err){
          return []
        }
      },
      returnSelectedPackage(){
        try {
          let packages = {...this.selected[0]}
          let key = packages['.key']
          packages.packageKey = key
          delete packages['.key']
          return packages
        } catch (err) {
          return []
        }
      },
      returnSelectedPackageInclusion(){
        try {
          return this.selected[0].inclusions
        } catch (err) {
          return []
        }
      },
      returnSelectedPackagePrice(){
        try {
          return this.selected[0].price
        } catch (err) {
          return 0
        }
      },
      mergeQtyAddOns(){
        try {
          let keys = this.$lodash.keys(this.AddOnsQty)
          if(keys.length == 0){
            return []
          } else if (this.choiceOfAddOns.length !== keys.length){
            let merge = []
            for( var x = 0; x < this.choiceOfAddOns.length; x++){
              let m = {...this.choiceOfAddOns[x]}
              let id = m['.key'] 
              let name = m.addons

              if(this.$lodash.includes(keys,name)){
                m.addOnsKey = id
                m.addOnsQty = this.AddOnsQty[name]
                m.totalPrice = this.AddOnsQty[name] * parseInt(m.addonsPrice)
                merge.push(m)
              }
            }
            return merge
          }

          let merge = []
          for( var x = 0; x < this.choiceOfAddOns.length; x++){
              let m = {...this.choiceOfAddOns[x]}
              let id = m['.key']
              delete m['.key']
              m.addOnsKey = id
              m.addOnsQty = this.AddOnsQty[m.addons]
              m.totalPrice = this.AddOnsQty[m.addons] * parseInt(m.addonsPrice)
              merge.push(m)
          }
          // console.log(merge,'merge')
          return merge
        } catch (err) {
          return []
        }
      },
      returnTotalPrice(){
        try {
          let vm = this
          if(this.returnSelectedPackagePrice != 0 && vm.mergeQtyAddOns.length == 0){
            return this.returnSelectedPackagePrice * this.OnlineInquiry.clientPax
          } else if (vm.mergeQtyAddOns.length > 0){
            // console.log('here')
            let addons = vm.$lodash.sumBy(vm.mergeQtyAddOns, 'totalPrice')
            // console.log(addons,'sum')
            let pax = vm.returnSelectedPackagePrice * vm.OnlineInquiry.clientPax
            // console.log(pax + addons,'sum')
            return pax + addons
          } else {
            return 0
          }

        } catch (err) {
          return 0
        }
      },
      returnDownPayment(){
        try {
          let down = this.returnTotalPrice * .5
          return down
        } catch(err){
          return 0
        }
      },
      toPayAmount(){
        if(this.paymentMode == 'fullPayment'){
          // this.enterAmount = this.returnTotalPrice
          this.amount = this.returnTotalPrice
          return this.returnTotalPrice
        } else if (this.paymentMode == 'downPayment'){
          // this.enterAmount = this.discountedPayment
          this.amount = this.returnDownPayment     
          return this.returnDownPayment
        } else {
          // this.enterAmount = 5000
          this.amount = 5000
          return 5000  
        }
      },
      reMapAddOns(){
        try {
          let addons = this.mergeQtyAddOns.map(m=>{
            return {
              addonsNames:m.addons,
              addonsPrices:parseInt(m.addonsPrice),
              addonsQuatities: parseInt(m.addOnsQty),
              addonsTotalPrices: m.totalPrice
            }
          })
          console.log(addons,'reMap')

          return []
        } catch (ERR) {
          return []
        }
      }
  },

  methods: {
    formatTimeInput(time){
      //get time to format for display
      let baseDate = new Date(2020,1,1)
      let arr = time.split(':')
      let formatTime = date.addToDate(baseDate, {hours:arr[0],minutes:arr[1]})

      return this.$moment(formatTime).format('LT')
    },
    openDialog(initialAddress,initialCity,whatToEdit){
        this.adr = true
        this.address = initialAddress
        this.city = initialCity
        this.startTime = initialAddress
        this.endTime = initialCity
        this.whatToEdit = whatToEdit
    },
    changeData(){
        if(this.whatToEdit == 'Address'){
            this.OnlineInquiry.clientPlace = this.address
            this.OnlineInquiry.clientCity = this.city
        } else {
            this.OnlineInquiry.clientStartTime = this.startTime
            this.OnlineInquiry.clientEndTime = this.endTime
        }
    },
    openDateDialog(initialData){
        this.date = initialData
        this.change = true
    },
    returnLimit(viand){
      try {
        let viands = this.selected[0].viands
        let limit = viands.filter(a=>{
          return a.category == viand
        })
        return limit[0].viandsQty

      }catch(err){
        return ''
      }
    },
    checkQty(food,qty,viandName){
      console.log(food)
      console.log(qty)
      console.log(viandName, 'yeah')
      let selection = this.choiceOfFood
      console.log(selection,'selection')
      //get QTY of viand in selection
      let count = this.$lodash.filter(selection, a=>{
        return a.category == viandName
      })
      if(count.length > qty){
        this.$q.dialog({
            title: viandName + ' Selection Max Reached',
            message: 'Removing last food choice.',
            ok: 'Ok',
            persistent: true
          }).onOk(() => {
            this.choiceOfFood.splice(selection.length-1,1)
            console.log('removed last')
            console.log(selection)
          })
      }

    },
    returnSelectedStatus(choice){
      let count = this.$lodash.findIndex(this.choiceOfFood, a=>{
        return a.foodName == choice.foodName
      })
      // console.log(count,'index')
      if(count > -1){
        return true
      } else {
        return false
      }
    },
    findIndexSelection(arr,val){
        return this.$lodash.findIndex(arr,val)
    },
    checkIfRemoved(addOns){
        var index = this.findIndexSelection(this.choiceOfAddOns,addOns)
        if(index == -1){
            delete this.AddOnsQty[addOns]
            console.log(this.AddOnsQty,'this.AddOnsQty')
        }
    },
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
        amount: this.amount,
      }
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer (charge) {
      // Send to server
      console.log(charge,'charge')
      if(this.amount === 0){
        this.$q.dialog({
            title: `Unable to Continue??`,
            message: 'Please Select Payment Type??',
            color: 'pink-6',
            textColor: 'grey',
            icon: 'negative',
            ok: 'Ok'
        })
      }else{
          this.paydetails = charge
          this.reserveNowCard()
          this.$q.notify({
                  message: 'RESERVED!',
                  icon: 'mdi-folder-plus-outline',
                  color: 'pink-3',
                  textColor: 'white',
                  position: 'center'
          })
      }
    },
    reserveNowCard(){
        console.log('inquiry',this.OnlineInquiry)
        let inquiry = this.OnlineInquiry
        let reserveDetails = {
            clientReserveDate: inquiry.clientDateofReserve,
            clientFName: this.clientFName,
            clientLName: this.clientLName,
            clientPlace: inquiry.clientPlace,
            clientCity: inquiry.clientCity,
            clientEvent: inquiry.clientEvent,
            clientMotif: inquiry.clientMotif,
            clientPax: inquiry.clientPax,
            clientEmail: this.clientEmail,
            clientContact: this.clientContact,
            clientStartTime: inquiry.clientStartTime,
            clientEndTime: inquiry.clientEndTime,
            clientSelectPackage: this.returnSelectedPackage,
            clientFoodChoice: this.choiceOfFood,
            clientAddOns: this.reMapAddOns,
            clientTotalPayment: this.returnTotalPrice,
            clientTotalDownPayment: this.returnDownPayment,
            clientPaidAmount: this.amount,
            clientPayDetails: this.paydetails,
            clientTokenID: this.token.id,
            clientPaymentType: 'CARD',
            clientReserveType: 'ONLINE',
            clientDateofReserve: date.formatDate(new Date(), 'YYYY-MM-DD'),
        }
        console.log(reserveDetails,'reserveDetails')
    },
    completeForm(){
      if(this.clientEmail == '' || this.clientFName == '' || this.clientLName == '' || this.clientContact == ''){
          this.$q.dialog({
            title: `Incomplete Form`,
            message: 'Please complete contact form before logging in.',
            color: 'pink-6',
            textColor: 'grey',
            icon: 'negative',
            ok: 'Ok'
        })
      } else {
        this.login = true
      }
    }
  }
}
</script>