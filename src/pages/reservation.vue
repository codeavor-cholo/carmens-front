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
                                    <span class="col-12 q-pa-sm cursor-pointer v-ripple">{{returnArrayMotifToString(OnlineInquiry.clientMotif)}}<q-icon name="edit" size="sm" class="q-ml-lg" color="teal" v-ripple/>
                                        <q-popup-edit v-model="OnlineInquiry.clientMotif">
                                          <template v-slot="{ initialValue, value, emitValue, set, cancel }">
                                            <q-select style="width: 400px" class="relative position" autofocus outlined v-model="OnlineInquiry.clientMotif" multiple="" :options="motifOpt" emit-value map-options hint="Select Motif" @input="emitValue">
                                              <template v-slot:after>
                                                <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                                <q-btn flat dense color="teal" icon="check_circle" @click.stop="set" />
                                              </template>
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
                            color="pink-3"
                            active-color="pink-3" inactive-color="grey-8"
                            animated
                            >
                            <q-step
                                :name="1"
                                title="Select Package / Customize your own"
                                icon="settings"
                                :done="step > 1"
                            >
                                <div class="row q-pa-md" >
                                  <q-radio v-model="step1choice" val="package" label="Select a package" class="col" color="teal"/>
                                  <q-radio v-model="step1choice" val="custom" label="Customize your own" class="col" color="teal"/>
                                </div>

                                <div v-if="step1choice == 'package'">

                                

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
                                </div>
                                <div v-else class="text-center">
                                  <div class="text-h6">You want to customize your own package ?</div>
                                  <span class="text-subtitle2">Click <b class="text-teal">CONTINUE</b> to proceed to customization.</span>
                                </div>
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
                              <div class=" q-pa-xl rounded-borders">
                                <div class="text-subtitle2 q-pl-lg  q-mb-sm full-width">Fill up this contact form and <span class="text-teal">PAY NOW</span>  to reserve the date.</div>
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
                                    <q-item>
                                        <q-item-section class="q-ml-lg"><strong>
                                          <!-- <q-checkbox @input="paymentSelect" color="pink-3" v-model="reservationFee" label="Reservation Fee" /> -->
                                        <q-radio v-model="paymentMode" val="desiredAmount" label="Desired Amount (should not be less than reservation fee)" />
                                        </strong>
                                        </q-item-section>
                                        <q-item-section class="q-mr-lg" side><q-input v-model="desiredAmountInput" type="number" min="5000" label="Desired Amount" dense outlined="" color="teal" :rules="[ val => val >= 5000  || 'Amount should not be less than reservation fee.']"/></q-item-section>
                                    </q-item>
                                  </q-list>
                                </div>
                                    <div class="container q-mx-lg q-mt-lg relative-position">
                                      <div class="row q-pa-md q-py-xl">
                                        <stripe-elements ref="elementsRef" :pk="publishableKey" :amount="amount" @token="tokenCreated" @loading="loading = $event" outline class="col-8 q-mr-md">
                                        </stripe-elements>
                                        <q-btn outlined color="teal" class="col" size="md" @click="submit">PAY&nbsp;&nbsp;&nbsp;<b>P {{formatNumber(toPayAmount)}}.00</b></q-btn>
                                      </div>
                                      <div class="dimmed absolute-full text-center rounded-borders" v-show="userLoggedIn">
                                        <div style="z-index:100" class="absolute-center">
                                          <h6 class="text-white q-ma-none q-pb-sm">Login first before proceeding to payment</h6>
                                          <q-btn color="teal" icon-right="account_circle" label="Login First" @click="completeForm"/>
                                        </div>
                                            
                                      </div>
                                    </div>
                                    <q-inner-loading :showing="loadingOn"/>
                              </div>
                            </q-step>

                            <template v-slot:navigation>
                                <q-stepper-navigation>
                                <q-btn @click="stepcheck" color="teal" :label="step === 4 ? 'Finish' : 'Continue'" v-show="step < 4"/>
                                <q-btn v-if="step > 1" flat color="grey-8" @click="backFunction" label="Back" class="q-ml-sm" />
                                </q-stepper-navigation>
                            </template>
                        </q-stepper>
                        </div>

                    </q-card-section>
                    </q-card>

            </div>
<!-- END OF LEFT PART -->

<!-- RIGHT PART -->
            
            <!-- <div> -->
              <q-page-sticky position="top-right" :offset="[0, 0]" class="col-4 q-pt-xl q-pr-xl q-pl-md">
                <q-card class="my-card">
                  <div>
                    <q-card-section>
                       
                        <div class="column items-center q-pa-sm">
                             <q-card flat class="my-card bg-grey-3" style="width:300px">
                                <q-card-section>
                                    <div class="text-center text-uppercase">Order Summary - #<span class="text-weight-bolder">{{this.$route.params.id.toString().slice(0,6)}}</span></div>
                                </q-card-section>
                              </q-card>
                        </div>
                        <div v-show="step != 2">
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
                        </div>
                        
                        <div class="q-my-sm" v-show="returnChoiceOfFood.length !== 0"> 
                        <q-separator inset class="black"/>
                        </div>
                        
                        <div class="q-pa-sm" v-show="step > 1">
                          
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
                                    <span class="text-weight-bold">{{choice.viandName}} 
                                    <q-chip size="sm" :label="choice.foodChoices.length" color="teal" text-color="white" v-if="step1choice == 'custom'"/>  
                                    <q-chip size="sm" v-else :color="choice.foodChoices.length == returnLimit(choice.viandName) ? 'teal' : 'pink-6'" class="text-white" :label="choice.foodChoices.length+' / '+returnLimit(choice.viandName)" /></span>
                                  <div class="q-pl-sm q-mb-sm row" v-for="(pick) in choice.foodChoices" :key="pick.foodName">
                                    <div dense class="col q-mr-sm">{{pick.foodName}}</div>
                                    <div dense class="col-3 text-right text-weight-bold" v-if="step1choice == 'custom'">₱ {{pick.foodPrice}}.00</div>
                                    <div dense class="col-1 text-right text-weight-bold" v-else>x 1</div>
                                  </div>
                                </div>
                          </transition-group>
                          </q-slide-transition>
                          <div v-show="step1choice == 'custom'">
                            <q-separator spaced/>
                            <div class="row justify-between">
                              <span class="text-weight-bold">
                                Customize Package Per Head
                              </span>
                              <span class="float-right">
                                ₱ {{formatNumber(returnCustomPrice)}}.00
                              </span>
                            </div>
                            <div class="row justify-between">
                              <span class="text-weight-bold">
                                PAX
                              </span>
                              <span class="float-right">
                                x {{OnlineInquiry.clientPax}}
                              </span>
                            </div>
                            <q-separator spaced/>
                            <div class="row justify-between">
                              <span class="text-weight-bold">
                                Total Price
                              </span>
                              <span class="text-weight-bold text-teal">
                                ₱ {{formatNumber(returnCustomPrice * OnlineInquiry.clientPax)}}.00
                              </span>
                            </div>
                          </div>
                        </div>  

                        <div class="q-pa-sm" v-show="returnSelectedPackagePrice !== 0">
                          <div class="text-weight-bold text-uppercase row justify-between">
                           <span>Inclusions</span> 
                           <q-btn color="teal" dense size="sm" flat :label="showInclusions == true ? 'SHOW LESS':'SHOW MORE'" :icon-right="showInclusions == true ? 'expand_less':'expand_more'" @click="showInclusions = !showInclusions"/>
                          </div>
                          <q-slide-transition :delay="1000">
                          <transition-group
                            appear
                            enter-active-class="animated slideUp"
                            leave-active-class="animated slideDown"
                          >
                          <div class="q-px-md q-pt-sm" v-for="(choice) in returnSelectedPackageInclusion" :key="choice" v-show="showInclusions">
                               <span>{{choice.inclusion}}</span>
                          </div>
                          </transition-group>
                          </q-slide-transition>
                        </div>
                        <div class="q-pa-sm" v-show="step >= 3">
                        <strong class="text-weight-bold text-uppercase">Add-Ons</strong>
                            <div class="q-mt-sm row q-pl-md" v-for="(i,q) in choiceOfAddOns" :key="q">
                              <div dense class="col q-mr-sm">{{i.addons}} </div>
                              <div dense class="col-4 text-right text-weight-bold">P {{formatNumber(i.addonsPrice)}}.00 x {{AddOnsQty[i.addons]}}</div>
                              <div dense class="col-12 text-right q-mt-sm text-weight-bold text-teal" v-show="isNaN(AddOnsQty[i.addons]) != true">P {{formatNumber(i.addonsPrice * AddOnsQty[i.addons])}}.00</div>
                            </div>
                        </div>

                        <div class="q-mt-md q-mb-sm" v-show="returnSelectedPackagePrice !== 0 || returnCustomPrice !== 0"> 
                        <q-separator inset class="black"/>
                        </div>

                        <div class="q-pa-sm row justify-between text-h6" v-show="returnSelectedPackagePrice !== 0 || returnCustomPrice !== 0">
                            <div class="text-weight-bold">TOTAL PRICE</div>
                            <div class="text-weight-bold text-teal">P {{formatNumber(returnTotalPrice)}}.00</div>
                        </div>
                    </q-card-section>

                    </div>
                 </q-card>
                 </q-page-sticky>
            <!-- </div>     -->            
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
                                          
                    <q-btn color="grey"  label="LOGIN VIA GOOGLE" @click="loginGoogle" class="col-5"/>
                    <div class="text-overline text-center col-2">OR</div>
                    <q-btn color="teal" label="LOGIN account" class="col"/>

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
        step1choice: 'package',
        loadingOn:false,
        login: false,
        change: false,
        date: '',
        adr: false,
        address: '',
        city: '',
        whatToEdit: '',
        step: 1,
        startTime: '',
        endTime: '',
        OnlineInquiry: {},
        Motif: [],
        City: [],
        Packages: [],
        Inclusion: [],
        FoodCategory: [],
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
        showOrderSummary: false,
        showInclusions: true,
        //for payment
        paymentMode: 'fullPayment',
        loading: false,
        amount: 0,
        publishableKey: 'pk_test_kUO5j8FaZUKitD1Qh3ibZ2HP00YkxaEOOS', 
        token: null,
        charge: null,
        desiredAmountInput: 5000,
        userLoggedIn: true,
        //additionalDetails
        clientFName: '',
        clientLName: '',
        clientEmail: '',
        clientContact: '',
        clientPassword: '',
        clientUID: '',
        //designDAta
        thumbStyle: {
          right: '4px',
          borderRadius: '5px',
          backgroundColor: '#999999',
          width: '5px',
          opacity: 0.75
        },
        barStyle: {
          right: '2px',
          borderRadius: '9px',
          backgroundColor: '#ffffff',
          width: '9px',
          opacity: 0.2
        }
    }
  },
  created(){
        this.$binding('OnlineInquiry', this.$firestoreApp.collection('OnlineInquiry').doc(this.$route.params.id))
            .then(OnlineInquiry => {
            console.log(OnlineInquiry, 'OnlineInquiry')
        })

          let self = this
          this.$firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                self.clientUID = user.uid
                self.userLoggedIn = false
                self.login = false
              } else {
                self.clientUID = ''
                self.userLoggedIn = true
              }
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
            }),
    this.$binding('FoodCategory', this.$firestoreApp.collection('FoodCategory'))
          .then(FoodCategory => {
          console.log(FoodCategory, 'FoodCategory')
          })
  },
  computed:{
    motifOpt(){
      let optionss = this.Motif.map(m => {
          return {
              label: m.motif,
              value: m.motif,
              hex: m.hex
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
          let viands
          if(this.step1choice == 'package'){
            viands = this.selected[0].viands
          } else {
            viands = this.FoodCategory
          }
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
      returnCustomPrice(){
        let foods = this.returnChoiceOfFood
        console.log(foods,'returnCustomPrice')
        //get food choices
        let choices = []
        let sure
        foods.forEach(a=>{
          let base = a.foodChoices
          base.forEach(b=>{
            choices.push(b)
          })
        })
        console.log('choices',choices)

        return this.$lodash.sumBy(choices,a=>{
          return parseInt(a.foodPrice)
        })
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
          if(this.step1choice == 'package'){
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
          } else {
            if(this.returnCustomPrice != 0 && vm.mergeQtyAddOns.length == 0){
              return this.returnCustomPrice * this.OnlineInquiry.clientPax
            } else if (vm.mergeQtyAddOns.length > 0){

                let addons = vm.$lodash.sumBy(vm.mergeQtyAddOns, 'totalPrice')
                // console.log(addons,'sum')
                let pax = vm.returnCustomPrice * vm.OnlineInquiry.clientPax
                // console.log(pax + addons,'sum')
                return pax + addons
              } else {
                return 0
              }
            
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
        } else if(this.paymentMode == 'desiredAmount'){
          this.amount = parseInt(this.desiredAmountInput)
          return this.amount
        }else {
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
      },
      returnProgress(){
        try{
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
              // clientTotalPayment: this.returnTotalPrice,
              // clientTotalDownPayment: this.returnDownPayment,
              // clientPaidAmount: this.amount,
              // clientPayDetails: this.paydetails,
              // clientTokenID: this.token.id,
              // clientPaymentType: 'CARD',
              clientReserveType: 'ONLINE',
              clientDateofReserve: date.formatDate(new Date(), 'YYYY-MM-DD'),
          }
          return reserveDetails
        } catch(err) {
          console.log(err,'err')
          return {}
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
    formatEndTimeInput(time){
      //get time to format for display
      let baseDate = new Date(2020,1,1)
      let arr = time.split(':')
      let formatTime = date.addToDate(baseDate, {hours:parseInt(arr[0])+1,minutes:arr[1]})

      return this.$moment(formatTime).format('LT')
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
      if(count.length > qty && this.step1choice == 'package'){
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
            this.reserveNowCard()            
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
            clientStartTime: this.formatTimeInput(inquiry.clientStartTime),
            clientEndTime: this.formatTimeInput(inquiry.clientEndTime),
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
            clientUID: this.clientUID
        }
          if(this.step1choice == 'custom'){
            reserveDetails.clientReserveType = 'ONLINE-CUSTOMIZE'
            reserveDetails.clientSelectPackage = 'NONE'
          }

          this.$firestoreApp.collection('Reservation').add(reserveDetails)
            .then((ref) =>{
              let key = ref.id
              let paymentDetails = {
                  clientReservationKey: ref.id,
                  clientPayDetails: this.paydetails,
                  clientTokenID: this.token.id,
                  clientPaymentType: 'CARD',
                  clientUID: this.clientUID,
                  transactionType: 'ONLINE',
                  forReservation: true,
                  clientPaymentDate: date.formatDate(new Date(), 'YYYY-MM-DD')
              }
                  this.$firestoreApp.collection('Payments').add(paymentDetails)
                  .then(()=>{
                    this.loadingOn = false
                      this.$q.dialog({
                        title: `Reservation Created!`,
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
    },
    stepcheck(){
          if(this.step === 1){
              if(this.selected.length === 0 && this.step1choice == 'package'){
                   this.$q.dialog({
                    title: `Enable To Continue`,
                    message: 'Please Select Package',
                    type: 'negative',
                    color: 'pink-6',
                    textColor: 'grey',
                    icon: 'warning',
                    ok: 'Ok'
                })
              }else{
                this.showFoodChoices = true
                this.showInclusions = false
                this.$refs.stepper.next()
              }
          }else if(this.step === 2){
              if(this.choiceOfFood.length === 0){
                  this.$q.dialog({
                    title: `Unable To Continue`,
                    message: 'Please Select Food',
                    type: 'negative',
                    color: 'pink-6',
                    textColor: 'grey',
                    icon: 'warning',
                    ok: 'Ok'
                })
              }else{
                this.showInclusions = false
                this.showFoodChoices = false
                this.$refs.stepper.next()
              }
          }else if(this.step === 3){
            this.showInclusions = false
            this.showFoodChoices = false
              this.$refs.stepper.next()
          } else {
              this.$refs.stepper.next()
          }
    },
    backFunction(){
      if(this.step === 2){
        this.$q.dialog({
            title: 'Moving back will remove all your Food Choices.',
            message: 'Continue ?',
            ok: 'Yes',
            cancel: 'No',
            persistent: true
          }).onOk(() => {
            this.choiceOfFood = []
            this.addonsList = []
            this.$refs.stepper.previous()
          })
      }else {
          this.$refs.stepper.previous()
      }
      
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
                  
    },
    returnArrayMotifToString(motif){
      let string = ''
      for(var x = 0; x < motif.length ; x++){
        if(x == motif.length - 1){
          string = string + motif[x]
        } else {
          string = string + motif[x] + ' / '
        }
        
      }
      return string
    }
  }
}
</script>