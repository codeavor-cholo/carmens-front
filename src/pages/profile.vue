<template>
    <q-page>
        <div class="q-pa-sm q-pt-xl">
        <q-splitter v-model="splitterModel" >
            <template v-slot:before>
                <div>
                <q-tabs v-model="tab" vertical inline-label class="text-pink-3 full-height relative-position" >
                <q-tab name="account" label="My Account" />
                <q-tab name="cart" label="My Cart" />
                <q-tab name="order" label="My Orders" />
                <q-tab name="reserve" label="My Reservation" />
                <q-tab name="cancel" label="My Cancelled Reservation" />
                </q-tabs>
                </div>
            </template>
            <template v-slot:after>
                <q-tab-panels v-model="tab" animated class="transparent" transition-prev="jump-up" transition-next="jump-up" >
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
                    <q-input filled v-model="search_cart" color="pink-3" label="Search">
                        <template v-slot:prepend>
                        <q-icon name="search" />
                        </template>
                   </q-input>
                        <div class="q-pt-lg row justify-between">
                        <span class="text-h6 col q-pl-lg"> <span class="text-teal-6 text-subtitle2">({{returnLength}} ITEMS)</span></span>
                        </div>
                    <q-table grid :data="returnCart" :columns="search_cartcolumns" :filter="search_cart" :rows-per-page-options="[0]" hide-bottom :pagination.sync="pagination" row-key=".key">
                      <template v-slot:item="props">
                        <q-card flat style="min-width:500px;border-radius:20px;" class="transparent my-card col-12">
                        <q-card-section class="row items-center">
                        <!-- <q-scroll-area style="width: 100%; height: 400px;" :visible="false"> -->
                        <q-list dense class="full-width q-pt-none q-mt-none q-mb-none q-pb-none">
                            <q-item style="margin-top: -20px">
                            <q-item-section avatar>
                                <q-img :src="props.row.foodPic" :ratio="1" spinner-color="primary" spinner-size="82px" style="width:5em;border-radius:5px;" class="q-my-xs"/>
                            </q-item-section>
                            <q-item-section>
                            <q-item-label>{{props.row.foodName}}</q-item-label>
                            <q-item-label caption lines="1">Size: {{props.row.size}}({{props.row.min}} - {{props.row.max}})</q-item-label>
                            <q-item-label class="text-subtitle2" lines="1">₱ {{props.row.price}}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-btn color="grey-8" icon="delete" round size="md" flat class="absolute-top-right q-ma-xs" @click="removeOrder(props.row)" />
                                <q-item-label caption class="q-mt-lg">x {{props.row.qty}}</q-item-label>
                                <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ {{props.row.price * props.row.qty}}</q-item-label>
                            </q-item-section>
                            </q-item>
                        </q-list>
                        <!-- </q-scroll-area> -->
                        </q-card-section>
                        </q-card>
                      </template>
                    </q-table>
                        <q-card-actions align="right" class="justify-between row">
                        <div class="text-weight-bold text-h6" >SUBTOTAL : <span class="text-teal-6">{{returnSubTotal}}</span></div>
                        <q-btn :label="'Checkout '+returnLength+ ' items'" color="pink-6" v-close-popup  class="text-weight-bold" outline="" @click="checkOutOrders"/>
                        </q-card-actions>
                </q-tab-panel>
<!-- END OF CART AREA -->
<!-- ORDER AREA -->
                <q-tab-panel name="order">
                   <div style="font-size:50px;font-family: 'Domine', serif;" class="q-px-xl">My Orders</div>
                   <q-input filled v-model="search_order" color="pink-3" label="Search">
                        <template v-slot:prepend>
                        <q-icon name="search" />
                        </template>
                   </q-input>
                   <q-tabs v-model="ordertab" dense class="text-grey" active-color="pink-3" indicator-color="pink-3" align="justify" narrow-indicator >
                        <q-tab name="pending" label="Pending" />
                        <q-tab name="finish" label="Completed" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="ordertab" animated>
                        <q-tab-panel name="pending">
                            <q-list bordered separator>
                            <q-item >
                                <q-item-section>
                                    <div >
                                        <q-table grid :data="returnUserOrders" :filter="search_order" :columns="cartcolumns" :rows-per-page-options="[0]" hide-bottom :pagination.sync="paginations">
                                            <template v-slot:item="props">
                                                    <q-list bordered class="full-width" separator="">
                                                        <q-card class="my-card" style="border: 2px solid;border-color: pink;margin-bottom: 10px">
                                                            <div class="row q-pl-xl">
                                                                <div class="col-9 q-pa-md">
                                                                    <div class="col-4"><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-size: 1.2rem"><b>Name:</b> {{props.row.clientName}}</p></div>
                                                                    <div class="col-4"><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-size: 1.2rem"><b>Address:</b> {{props.row.clientAddress}},{{props.row.city}}</p></div>
                                                                </div>
                                                                <div class="col-3 q-pa-md">
                                                                    <div class="col-4"><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-size: 1.2rem"><b>Date:</b> {{props.row.clientReserveDate}}</p></div>
                                                                    <div class="col-4"><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-size: 1.2rem"><b>Time:</b> {{props.row.clientStartTime}}</p></div>
                                                                </div>
                                                            </div>
                                                            <q-separator inset/>
                                                            <div class="row items-center justify-between">
                                                                <div class="row items-center">
                                                                    <div class="q-pa-sm ">
                                                                    <q-icon name="local_shipping" style="font-size: 2rem" />
                                                                    </div>
                                                                    <div>Latest tracking update will be put here!</div>
                                                                </div>
                                                                    <div class="q-pr-xl">
                                                                    <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" @click="openStatus(props.row),partytraystatus = true" label="View Status" />
                                                                    </div>
                                                                </div>
                                                                <q-separator inset/>
                                                            <q-item v-for="(i, index) in props.row.orders" :key="index">
                                                                <q-item-section avatar>
                                                                    <q-img :src="i.foodPic" :ratio="1" spinner-color="primary" spinner-size="82px" style="width:5em;border-radius:5px;" class="q-my-sm" />
                                                                </q-item-section>
                                                                <q-item-section>
                                                                <q-item-label>{{i.foodName}}</q-item-label>
                                                                <q-item-label caption lines="1">Size: {{i.size}}</q-item-label>
                                                                <q-item-label class="text-subtitle2" lines="1">₱ {{i.price}}</q-item-label>
                                                                </q-item-section>
                                                                <q-item-section side>
                                                                    <!-- <q-btn color="grey-8" icon="delete" round size="md" flat class="absolute-top-right q-ma-xs" @click="removeOrder(items)" /> -->
                                                                    <q-item-label caption class="q-mt-lg">x {{i.qty}}</q-item-label>
                                                                    <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ {{i.price * i.qty}}</q-item-label>
                                                                </q-item-section>
                                                            </q-item>
                                                                <!-- <q-separator inset/>
                                                                <q-card-actions align="right" class="text-primary">
                                                                    <q-btn flat label="Cancel Order" v-close-popup color="pink-6"/>
                                                                    <q-btn flat label="Pay Balance" v-close-popup color="pink-6"/>
                                                                </q-card-actions>  -->
                                                        </q-card>
                                                </q-list>
                                            </template>
                                        </q-table>
                                    </div>
                                </q-item-section>
                            </q-item>
                            </q-list>
                        </q-tab-panel>

                        <q-tab-panel name="finish">
                            <q-list bordered separator>
                            <q-item >
                                <q-item-section>
                                    <div >
                                        <q-table grid :data="returnUserOrders" :filter="search_order" :columns="cartcolumns" :rows-per-page-options="[0]" hide-bottom :pagination.sync="paginations">
                                            <template v-slot:item="props">
                                                    <q-list bordered class="full-width" separator="">
                                                        <q-card class="my-card" style="border: 2px solid;border-color: pink;margin-bottom: 10px">
                                                            <div class="row q-pl-xl">
                                                                <div class="col-9 q-pa-md">
                                                                    <div class="col-4"><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-size: 1.2rem"><b>Name:</b> {{props.row.clientName}}</p></div>
                                                                    <div class="col-4"><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-size: 1.2rem"><b>Address:</b> {{props.row.clientAddress}}</p></div>
                                                                </div>
                                                                <div class="col-3 q-pa-md">
                                                                    <div class="col-4"><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-size: 1.2rem"><b>Date:</b> {{props.row.clientReserveDate}}</p></div>
                                                                    <div class="col-4"><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-size: 1.2rem"><b>Time:</b> {{props.row.clientStartTime}}</p></div>
                                                                </div>
                                                            </div>
                                                            <!-- <q-separator inset/>
                                                            <div class="row items-center justify-between">
                                                                <div class="row items-center">
                                                                    <div class="q-pa-sm ">
                                                                    <q-icon name="local_shipping" style="font-size: 2rem" />
                                                                    </div>
                                                                    <div>Latest tracking update will be put here!</div>
                                                                </div>
                                                                    <div class="q-pr-xl">
                                                                    <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" @click="viewstatus = true" label="Track" />
                                                                    </div>
                                                                </div> -->
                                                                <q-separator inset/> 
                                                            <q-item v-for="(i, index) in props.row.orders" :key="index">
                                                                <q-item-section avatar>
                                                                    <q-img :src="i.foodPic" :ratio="1" spinner-color="primary" spinner-size="82px" style="width:5em;border-radius:5px;" class="q-my-sm" />
                                                                </q-item-section>
                                                                <q-item-section>
                                                                <q-item-label>{{i.foodName}}</q-item-label>
                                                                <q-item-label caption lines="1">Size: {{i.size}}</q-item-label>
                                                                <q-item-label class="text-subtitle2" lines="1">₱ {{i.price}}</q-item-label>
                                                                </q-item-section>
                                                                <q-item-section side>
                                                                    <!-- <q-btn color="grey-8" icon="delete" round size="md" flat class="absolute-top-right q-ma-xs" @click="removeOrder(items)" /> -->
                                                                    <q-item-label caption class="q-mt-lg">x {{i.qty}}</q-item-label>
                                                                    <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ {{i.price * i.qty}}</q-item-label>
                                                                </q-item-section>
                                                            </q-item>
                                                                <!-- <q-separator inset/>
                                                                <q-card-actions align="right" class="text-primary">
                                                                    <q-btn flat label="Cancel Order" v-close-popup color="pink-6"/>
                                                                    <q-btn flat label="Pay Balance" v-close-popup color="pink-6"/>
                                                                </q-card-actions>  -->
                                                        </q-card>
                                                </q-list>
                                            </template>
                                        </q-table>
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
                   <q-input filled v-model="filterReserve" color="pink-3" label="Search">
                        <template v-slot:prepend>
                        <q-icon name="search" />
                        </template>
                   </q-input>
                   <q-tabs v-model="reservationtab" dense class="text-grey" active-color="pink-3" indicator-color="pink-3" align="justify" narrow-indicator >
                        <q-tab name="pending_res" label="Pending" />
                        <q-tab name="complete_res" label="Completed" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="reservationtab" animated>
                        <q-tab-panel name="pending_res">
                            <q-table grid :data="returnUserReservation" :columns="columns" :rows-per-page-options="[0]" hide-bottom :pagination.sync="pagination" :filter="filterReserve">
                            <template v-slot:item="props">
                                    <q-card flat class="col-12" style="border: 2px solid;border-color: #ffdab9;margin-bottom: 5px" >
                                        <q-card-section side>
                                            <q-separator inset/>
                                                    <div class="row items-center justify-between">
                                                        <div class="row items-center">
                                                            <div class="q-pa-sm ">
                                                            <q-icon name="local_shipping" style="font-size: 2rem" />
                                                            </div>
                                                            <div>Latest tracking update will be put here!</div>
                                                        </div>
                                                            <div class="q-pr-xl">
                                                            <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" @click="openStatus(props.row), eventstatus = true" label="View Status" />
                                                            </div>
                                                        </div>
                                                <q-separator inset/>
                                            <q-list dense>
                                            <q-item >
                                                <q-item-section>
                                                    <div style="font-size:25px;font-family: 'Noto Serif SC', serif; "><b>{{props.row.clientEvent}}</b></div>
                                                    <div class="q-pl-xl column">
                                                        <div class="row">
                                                            <div class="col-6 row items-center q-gutter-sm">
                                                                <q-icon name="today" class="text-black" style="font-size: 2rem;" />
                                                                <div class="">Date of Event: </div>
                                                                <div class="text-weight-bold text-h6"> {{formatDate(props.row.clientReserveDate)}}</div>
                                                            </div>
                                                            <div class="col-6 row items-center q-gutter-sm">
                                                                <q-icon name="watch_later" class="text-black" style="font-size: 2rem;" />
                                                                <div class="">Time of Event: </div>
                                                                <div class="text-weight-bold text-h6"> {{props.row.clientStartTime}} - {{props.row.clientEndTime}}</div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-6 row items-center q-gutter-sm">
                                                                <q-icon name="place" class="text-black" style="font-size: 2rem;" />
                                                                <div class="">Place of Event: </div>
                                                                <div class="text-weight-bold">{{props.row.clientPlace}},{{props.row.clientCity}}</div>
                                                            </div>
                                                            <div class="col-6 row items-center q-gutter-sm">
                                                                <q-icon name="people" class="text-black" style="font-size: 2rem;" />
                                                                <div class="">Number of attendies: </div>
                                                                <div class="text-weight-bold text-h6">{{props.row.clientPax}}</div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row justify-end q-gutter-md">
                                                        <q-btn style="background-color:#e4acbf;width:150px" text-color="white" @click="openResched(props.row),rescheduleEvent=true" label="Reschedule Event" dense />
                                                        <q-btn style="background-color:#e4acbf;width:120px" text-color="white" @click="openResched(props.row),cancelEvent=true" label="Cancel Event" dense />
                                                        <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" @click="openReserve(props.row)" label="Details" />
                                                        <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" :disable="props.row.clientTotalPayment == props.row.clientPaidAmount" @click="openPayment(props.row)" :label="props.row.clientTotalPayment == props.row.clientPaidAmount ? 'No Balance' : 'PAYMENT'" />
                                                    </div>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                        </q-card-section>
                                    </q-card>
                            </template>
                        </q-table>
                        </q-tab-panel>

                        <q-tab-panel name="complete_res">
                            <q-table grid :data="returnUserReservation" :columns="columns" :rows-per-page-options="[0]" hide-bottom :pagination.sync="pagination" :filter="filterReserve">
                            <template v-slot:item="props">
                                    <q-card flat class="col-12" style="border: 2px solid;border-color: #ffdab9;margin-bottom: 5px" >
                                        <q-card-section side>
                                            <q-list dense>
                                            <q-item >
                                                <q-item-section>
                                                    <div style="font-size:25px;font-family: 'Noto Serif SC', serif; "><b>{{props.row.clientEvent}}</b></div>
                                                    <div class="q-pl-xl column">
                                                        <div class="row">
                                                            <div class="col-6 row items-center q-gutter-sm">
                                                                <q-icon name="today" class="text-black" style="font-size: 2rem;" />
                                                                <div class="">Date of Event: </div>
                                                                <div class="text-weight-bold text-h6"> {{formatDate(props.row.clientReserveDate)}}</div>
                                                            </div>
                                                            <div class="col-6 row items-center q-gutter-sm">
                                                                <q-icon name="watch_later" class="text-black" style="font-size: 2rem;" />
                                                                <div class="">Time of Event: </div>
                                                                <div class="text-weight-bold text-h6"> {{props.row.clientStartTime}} - {{props.row.clientEndTime}}</div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-6 row items-center q-gutter-sm">
                                                                <q-icon name="place" class="text-black" style="font-size: 2rem;" />
                                                                <div class="">Place of Event: </div>
                                                                <div class="text-weight-bold">{{props.row.clientPlace}},{{props.row.clientCity}}</div>
                                                            </div>
                                                            <div class="col-6 row items-center q-gutter-sm">
                                                                <q-icon name="people" class="text-black" style="font-size: 2rem;" />
                                                                <div class="">Number of attendies: </div>
                                                                <div class="text-weight-bold text-h6">{{props.row.clientPax}}</div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row justify-end q-gutter-md">
                                                        <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" @click="openReserve(props.row)" label="Details" />
                                                        <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" :disable="props.row.clientTotalPayment == props.row.clientPaidAmount" @click="openPayment(props.row)" :label="props.row.clientTotalPayment == props.row.clientPaidAmount ? 'No Balance' : 'PAYMENT'" />
                                                    </div>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                        </q-card-section>
                                    </q-card>
                            </template>
                        </q-table>
                        </q-tab-panel>
                        </q-tab-panels>
                        
                </q-tab-panel>
<!-- END OF RESERVATION AREA -->
                <q-tab-panel name="cancel">
                    <div style="font-size:50px;font-family: 'Domine', serif;" class="q-px-xl">My Cancelled Events</div>
                    <q-input filled v-model="filterReserve" color="pink-3" label="Search">
                        <template v-slot:prepend>
                        <q-icon name="search" />
                        </template>
                    </q-input>
                    <q-table grid :data="returnUserCancelledEvent" :columns="columns" :rows-per-page-options="[0]" hide-bottom :pagination.sync="pagination" :filter="filterReserve">
                        <template v-slot:item="props">
                                <q-card flat class="col-12" style="border: 2px solid;border-color: #ffdab9;margin-bottom: 5px" >
                                    <q-card-section side>
                                        <q-list dense>
                                        <q-item >
                                            <q-item-section>
                                                <div style="font-size:25px;font-family: 'Noto Serif SC', serif; "><b>{{props.row.clientEvent}}</b></div>
                                                <div class="q-pl-xl column">
                                                    <div class="row">
                                                        <div class="col-6 row items-center q-gutter-sm">
                                                            <q-icon name="today" class="text-black" style="font-size: 2rem;" />
                                                            <div class="">Date of Event: </div>
                                                            <div class="text-weight-bold text-h6"> {{formatDate(props.row.clientReserveDate)}}</div>
                                                        </div>
                                                        <div class="col-6 row items-center q-gutter-sm">
                                                            <q-icon name="watch_later" class="text-black" style="font-size: 2rem;" />
                                                            <div class="">Time of Event: </div>
                                                            <div class="text-weight-bold text-h6"> {{props.row.clientStartTime}} - {{props.row.clientEndTime}}</div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6 row items-center q-gutter-sm">
                                                            <q-icon name="place" class="text-black" style="font-size: 2rem;" />
                                                            <div class="">Place of Event: </div>
                                                            <div class="text-weight-bold">{{props.row.clientPlace}},{{props.row.clientCity}}</div>
                                                        </div>
                                                        <div class="col-6 row items-center q-gutter-sm">
                                                            <q-icon name="people" class="text-black" style="font-size: 2rem;" />
                                                            <div class="">Number of attendies: </div>
                                                            <div class="text-weight-bold text-h6">{{props.row.clientPax}}</div>
                                                            
                                                        </div>
                                                    </div>  
                                                </div>
                                                <div class="row justify-end q-gutter-md">
                                                    <!-- <q-btn style="background-color:#e4acbf;width:150px" text-color="white" @click="openResched(props.row),rescheduleEvent=true" label="Reschedule Event" dense />
                                                    <q-btn style="background-color:#e4acbf;width:120px" text-color="white" @click="openResched(props.row),cancelEvent=true" label="Cancel Event" dense /> -->
                                                    <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" @click="openReserve(props.row)" label="Details" />
                                                    <q-btn dense style="background-color:#e4acbf;width:120px" text-color="white" :disable="props.row.clientTotalPayment == props.row.clientPaidAmount" @click="openPayment(props.row)" :label="props.row.clientTotalPayment == props.row.clientPaidAmount ? 'No Balance' : 'PAYMENT'" />
                                                </div>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                    </q-card-section>
                                </q-card>
                        </template>
                    </q-table>
                </q-tab-panel>
                </q-tab-panels>
            </template>
            
            </q-splitter>
            </div>
            <!-- QDIALOG FOR DETAILS OF RESERVATION -->
            <q-dialog v-model="reserveDetails">
            <q-card class="my-card shadow-0" style="width: 900px; max-width: 90vw;">
                    <q-card-section>
                            <div align="center">
                            <img class="q-ma-none q-pa-none" style="height:80%;width:300px" src="statics/pics/carmen-logo.png">
                            </div>
                            <div class="text-grey-8" align="center">
                                <p class="q-pb-none q-mb-none">J Center Bldg. Vista Verde Ave., Vista Verde Executive Village Cainta, Rizal</p>
                                <p class="q-pt-none q-mt-none">09175057991 . 09772774030</p>
                            </div>
                            <div class="row q-pa-sm" style="margin-top: -20px">
                                <div class="col-8 ">
                                    <div class="col q-pa-sm"> 
                                        <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif" >Full Name:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientFName}}&nbsp;{{this.selectedReservation.clientLName}}</b></p>
                                        <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Email Address:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientEmail}}</b></p>
                                        <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Event Address:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientPlace}},&nbsp;{{this.selectedReservation.clientCity}}</b></p>
                                        <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Time:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientStartTime}} - {{this.selectedReservation.clientEndTime}}</b></p>
                                    </div>
                                </div>
                                <div class="col-4 class-q-pa-sm">
                                    <div>
                                        <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif" >Date of Event:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientReserveDate}}</b></p>
                                        <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Event:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientEvent}}</b></p>
                                        <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Guest:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientPax}}</b></p>
                                        <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Motif:&nbsp;&nbsp; <b v-for="(i, index) in this.selectedReservation.clientMotif" :key="index" class="q-pa-sm text-weight-bold">{{i}}</b></p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-8" style="margin-top: -20px">
                                    <q-list dense> 
                                            <q-item class="text-grey-8">
                                            <span class="full-width text-weight-bold" style="font-family: 'Roboto Slab', serif;">FOOD Choices</span>
                                            </q-item>
                                            <q-item v-for="(i, index) in this.selectedReservation.clientFoodChoice" :key="index" >
                                                <q-item-section class="text-weight-bold"> 
                                                <q-item-label>{{i.foodName}}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                </div>
                                <div class="col-4" style="margin-top: -20px">
                                    <q-list class="q-ma-none q-pa-none" dense> 
                                        <q-item v-show="this.returnFree.inclusions" class="text-grey-8">
                                        <span class="full-width text-weight-bold" style="font-family: 'Roboto Slab', serif;">Inclusions</span>
                                        </q-item>
                                        <q-item class="q-ma-none q-pa-none q-mb-none q-pb-none text-weight-bold" v-for="(i, index) in this.returnFree.inclusions" :key="index">
                                            <q-item-section>
                                            <q-item-label>{{i.inclusion}}</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                        <q-item class="q-ma-none q-pa-none q-mb-none q-pb-none text-weight-bold"  v-for="(i, index) in this.selectedReservation.clientAddOns" :key="index">
                                            <q-item-section>
                                            <q-item-label>{{i.addonsQuantities}}x {{i.addonsNames}}</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                            </div>
                            <div>
                                <div>
                                        <span class="q-pl-xl full-width text-weight-bold" style="font-family: 'Roboto Slab', serif;">Total Payment:</span><span class="q-pl-xl text-h6 full-width text-weight-bold">{{this.selectedReservation.clientTotalPayment}}</span>
                                </div>
                                <div style="margin-top: -10px">
                                    <span class="q-pl-xl full-width text-weight-bold" style="font-family: 'Roboto Slab', serif;">Total Paid Amount:</span><span class="q-pl-xl text-h6 full-width text-weight-bold">{{this.selectedReservation.clientPaidAmount}}</span>
                                </div>
                                <div style="margin-top: -10px">
                                    <span class="q-pl-xl full-width text-weight-bold" style="font-family: 'Roboto Slab', serif;">Balance:</span><span class="q-pl-xl text-h6 full-width text-weight-bold">{{this.selectedReservation.clientTotalPayment - this.selectedReservation.clientPaidAmount}}</span>
                                </div>
                            </div>
                            </div>
                            <div class="text-grey-8" align="center">
                                <p class="q-pb-none q-mb-none text-h6 text-weigh-bold">TERMS AND CONDITIONS</p>
                            </div>
                            <div class="text-weight-bold">
                            <q-list dense>
                                <q-item class="column">
                                    <li>P 5,000.00 reservation fee is deductible from the total bill. Non refundable upon cancellation</li>
                                    <li>50% downpayment upon signing of contract. Full payment on the day of event.</li>
                                </q-item>
                            </q-list>
                            </div>
                            <div class="text-h6 column items-center">
                                <q-btn class="bodyText" label="Print" color="pink-3" @click="printNow" icon="print" />
                            </div>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END OF QDIALOG FOR DETAILS OF RESERVATION -->
            <!-- QDIALOG FOR DETAILS OF RESERVATION -->
            <q-dialog v-model="paymentDetails">
            <q-card class="my-card shadow-0" style="width: 900px; max-width: 90vw;">
                    <q-card-section>
                    <div align="center">
                        <img class="q-ma-none q-pa-none" style="height:80%;width:300px" src="statics/pics/carmen-logo.png">
                        </div>
                        <div class="text-grey-8" align="center">
                            <p class="q-pb-none q-mb-none">J Center Bldg. Vista Verde Ave., Vista Verde Executive Village Cainta, Rizal</p>
                            <p class="q-pt-none q-mt-none">09175057991 . 09772774030</p>
                        </div>
                    <div class="row q-pa-sm q-pl-xl q-ml-xl">
                        <div class="col-8 ">
                            <div class="col q-pa-sm"> 
                                <p style="font-family: 'Roboto Slab', serif" >Full Name:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedPayment.clientFName}}&nbsp;{{this.selectedPayment.clientLName}}</b></p>
                                <p style="font-family: 'Roboto Slab', serif; margin-top: -15px" >Email Address:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedPayment.clientEmail}}</b></p>
                                <p style="font-family: 'Roboto Slab', serif; margin-top: -15px" >Event Address:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedPayment.clientPlace}},&nbsp;{{this.selectedPayment.clientCity}}</b></p>
                                <p style="font-family: 'Roboto Slab', serif; margin-top: -15px" >Time:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedPayment.clientStartTime}} - {{this.selectedPayment.clientEndTime}}</b></p>
                            </div>
                        </div>
                        <div class="col-4 class-q-pa-sm">
                            <div>
                                <p style="font-family: 'Roboto Slab', serif" >Date of Event:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedPayment.clientReserveDate}}</b></p>
                                <p style="font-family: 'Roboto Slab', serif; margin-top: -15px" >Event:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedPayment.clientEvent}}</b></p>
                                <p style="font-family: 'Roboto Slab', serif; margin-top: -15px" >Guest:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedPayment.clientPax}}</b></p>
                                <p style="font-family: 'Roboto Slab', serif; margin-top: -15px" >Motif:&nbsp;&nbsp; <b v-for="(i, index) in this.selectedPayment.clientMotif" :key="index" class="q-pa-sm text-weight-bold">{{i}}</b></p>
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
                            <q-radio v-model="paymentMode" val="fullPayment" label="Current Balance" />
                            </strong>
                            </q-item-section>
                            <q-item-section class="q-mr-lg" side><strong>P {{formatNumber(this.selectedPayment.clientTotalPayment - this.selectedPayment.clientPaidAmount)}}.00</strong></q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section class="q-ml-lg"><strong>
                                <!-- <q-checkbox @input="paymentSelect" color="pink-3" v-model="reservationFee" label="Reservation Fee" /> -->
                            <q-radio v-model="paymentMode" val="desiredAmount" label="Desired Amount (should not be less than reservation fee)" />
                            </strong>
                            </q-item-section>
                            <q-item-section class="q-mr-lg" side><q-input hint="To Enable Select Desired Amount" input-class="text-right" v-model="desiredAmountInput" style="width: 200px" :disable="this.paymentMode == 'fullPayment'" type="number" min="5000" label="Desired Amount" dense outlined="" color="teal" :rules="[ val => val >= 5000  || 'Amount should not be less than reservation fee.']"/></q-item-section>
                        </q-item>
                        </q-list>
                    </div>
                        <div class="container q-mx-lg q-mt-lg relative-position">
                            <div class="row q-pa-md q-py-xl">
                            <stripe-elements ref="elementsRef" :pk="publishableKey" :amount="amount" @token="tokenCreated" @loading="loading = $event" outline class="col-8 q-mr-md">
                            </stripe-elements>
                            <q-btn outlined color="teal" class="col" size="md" @click="submit">PAY&nbsp;&nbsp;&nbsp;<b>P {{formatNumber(toPayAmount)}}.00</b></q-btn>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END OF QDIALOG FOR DETAILS OF RESERVATION -->
            <q-dialog v-model="reschedCancel" persistent>
                    <q-card style="min-width: 1000px">
                        <q-card-section class="items-center">
                                <div align="center">
                                <img class="q-ma-none q-pa-none" style="height:80%;width:300px" src="statics/pics/carmen-logo.png">
                                </div>
                                <div class="text-grey-8" align="center">
                                    <p class="q-pb-none q-mb-none">J Center Bldg. Vista Verde Ave., Vista Verde Executive Village Cainta, Rizal</p>
                                    <p class="q-pt-none q-mt-none">09175057991 . 09772774030</p>
                                </div>
                                <div class="row q-pa-sm" style="margin-top: -20px">
                                    <div class="col-8 ">
                                        <div class="col q-pa-sm"> 
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif" >Full Name:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedResched.clientFName}}&nbsp;{{this.selectedResched.clientLName}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Email Address:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedResched.clientEmail}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Event Address:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedResched.clientPlace}},&nbsp;{{this.selectedResched.clientCity}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Time:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedResched.clientStartTime}} - {{this.selectedResched.clientEndTime}}</b></p>
                                        </div>
                                    </div>
                                    <div class="col-4 class-q-pa-sm">
                                        <div>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif" >Date of Event:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedResched.clientReserveDate}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Event:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedResched.clientEvent}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Guest:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedResched.clientPax}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Motif:&nbsp;&nbsp; <b v-for="(i, index) in this.selectedResched.clientMotif" :key="index" class="q-pa-sm text-weight-bold">{{i}}</b></p>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="this.rescheduleEvent === true">
                                    <div class="column items-center">
                                        <div class="row">
                                            <div>
                                                <q-date v-model="dates" mask="YYYY/MM/DD" color="deep-orange-4" today-btn/>
                                            </div>
                                            <div class="q-pa-xl">
                                                <q-input type="time" mask="YYYY-MM-DD HH:mm:ss" class="q-pt-xl q-pl-sm" color="deep-orange-3" dense outlined style="width: 170px" v-model="startTime" hint="Start Time" />
                                                <q-input type="time" class="q-pt-xl q-ml-sm" mask="YYYY-MM-DD HH:mm:ss" dense style="width: 163px" color="deep-orange-3" outlined v-model="endTime" hint="End Time"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="q-pa-md column items-center">
                                    <q-btn class="q-pa-sm" label="Reschedule Event" @click="rescheduleNow" color="pink-3" icon="settings" />
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="q-pa-md column items-center">
                                        <q-btn class="q-pa-sm" @click="cancelNow" style="width: 400px" label="Cancel Event" color="pink-3" icon="close" />
                                    </div>
                                </div>
                        </q-card-section>

                        <q-card-actions align="right">
                        <q-btn label="Cancel" v-close-popup @click="cancelEvent = false, rescheduleEvent = false" flat dense/>
                        </q-card-actions>
                    </q-card>
                </q-dialog>
                <!-- status -->
                <q-dialog v-model="viewstatus" persistent>
                    <q-card style="min-width: 200px">
                        <q-card-section class="items-center">
                            <div class="row text-overline items-center justify-around">  
                                <div style="font-size:20px">Delivery Status</div>
                            </div>
                            <div v-if="this.partytraystatus === true">
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
                        </q-card-section>

                        <q-card-actions align="right">
                        <q-btn label="Cancel" @click="eventstatus = false,partytraystatus = false" v-close-popup flat dense/>
                        </q-card-actions>
                    </q-card>
                </q-dialog>
    </q-page>
</template>

<script>
import { date } from 'quasar'
import { StripeElements } from 'vue-stripe-checkout'
export default {
  components: {
    StripeElements
  },
  data () {
    return {
      eventstatus: false,
      partytraystatus: false,
      eventStatusArray: ['Preparing Food!','Preparing Setup!','The Catering Team is en route!','Arrived at the Event Area','Setup on Progress','Event Place Is Ready!'],
      orderStatusArray: ['Order Confirmed!','Preparing Order!','Done Preparing!','Pending for Delivery','Order is  out for delivery!','Order Delivered!'],
      viewstatus: false,
      storageRef: null,
      startTime: '09:00',
      endTime: '13:00',
      selectedResched: [],
      dates: date.formatDate(new Date(), 'YYYY/MM/DD'),
      reschedCancel: false,
      rescheduleEvent: false,
      cancelEvent: false,
      ordersKey: this.$q.localStorage.getItem('addCart'),
      desiredAmountInput: 5000,
      loading: false,
      amount: 0,
      publishableKey: 'pk_test_kUO5j8FaZUKitD1Qh3ibZ2HP00YkxaEOOS', 
      token: null,
      charge: null,
      paymentMode: 'fullPayment',
      paymentDetails: false,
      reserveDetails: false,
      tab: 'reserve',
      ordertab: 'pending',
      reservationtab: 'pending_res',
      splitterModel: 20,
      search_wish: '',
      search_order: '',
    //   search_reserve: '',
      search_cart: '',
      val: true,
      CartItems: [],
      num: 1,
      selectedReservation: [],
      Reservation: [],
      Cancelled: [],
      selectedPayment: [],
      partyTrayOrders: [],
      clientUID: '',
      status: [],
      id: '',
      filterReserve: '',
      pagination: { sortBy: 'clientReserveDate', descending: false, page: 1, rowsPerPage: 10000},
      paginations: { sortBy: 'clientReserveDate', descending: false, page: 1, rowsPerPage: 10},
      search_cartcolumns: [
                { name: 'foodName', required: true, label: 'First Name', align: 'center', field: 'foodName', sortable: true }
            ],
      cartcolumns: [
                { name: 'clientName', required: true, label: 'First Name', align: 'center', field: 'clientName', sortable: true },
                { name: 'clientReserveDate', align: 'center', label: 'Last Name', field: 'clientReserveDate', sortable: true },
            ],
      columns: [
                { name: 'clientFName', required: true, label: 'First Name', align: 'center', field: 'clientFName', sortable: true },
                { name: 'clientEvent', align: 'center', label: 'Last Name', field: 'clientEvent', sortable: true },
            ]
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
        this.$binding('EventStatus', this.$firestoreApp.collection('EventStatus'))
        .then(EventStatus => {
        console.log(EventStatus, 'EventStatus')
        }),
        this.$binding('CartItems', this.$firestoreApp.collection('CartItems'))
        .then(CartItems => {
        console.log(CartItems, 'CartItems')
        }),
        this.$binding('Cancelled', this.$firestoreApp.collection('Cancelled'))
        .then(Cancelled => {
        console.log(Cancelled, 'Cancelled')
        }),
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation'))
            .then(Reservation => {
            console.log(Reservation, 'Reservation')
        }),
        this.$binding('partyTrayOrders', this.$firestoreApp.collection('partyTrayOrders'))
            .then(partyTrayOrders => {
            console.log(partyTrayOrders, 'partyTrayOrders')
        }),
        this.storageRef = this.$firebase.storage().ref()
        console.log(this.storageRef, 'store')
  },
  computed:{
      returnSubTotal(){
        try {
            return this.$lodash.sumBy(this.returnCart,a=>{return parseInt(a.price) * parseInt(a.qty)})
        } catch (error) {
            console.log(error,'er')
            return 0
        }
      },
      returnLength(){
        try {
            return this.$lodash.sumBy(this.returnCart,a=>{return parseInt(a.qty)})
        } catch (error) {
            return 0
        }
      },
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
      toPayAmount(){
        if(this.paymentMode == 'fullPayment'){
            if(this.selectedPayment === []){
                return 0
            }else{
                this.amount = parseInt(this.selectedPayment.clientTotalPayment) - parseInt(this.selectedPayment.clientPaidAmount)
                return this.amount
            }
        }else if(this.paymentMode == 'desiredAmount'){
          this.amount = parseInt(this.desiredAmountInput)
          return this.amount
        }else {
          // this.enterAmount = 5000
          this.amount = 5000
          return 5000  
        }
      },
      returnFree(){
         if(this.selectedReservation === []){
                return []
            } else {
                let data = {...this.selectedReservation.clientSelectPackage}
                var key = data['.key']
                delete data.__index
                delete data['.key']
                console.log(data, 'datas')
                return data
            }   
        },
      returnUserCancelledEvent(){
          try {
                let reservations = this.$lodash.filter(this.Cancelled,a=>{
                    return a.clientUID == this.clientUID && a.clientReserveDate > date.formatDate(new Date(), 'YYYY-MM-DD')
                })
                console.log('reservations',reservations)
                return reservations
          } catch(err){
              console.log(err,'err')
              return []
          }
      },
      returnUserReservation(){
          try {
            if(this.reservationtab === 'pending_res'){
                let reservations = this.$lodash.filter(this.Reservation,a=>{
                    return a.clientUID == this.clientUID && a.clientReserveDate >= date.formatDate(new Date(), 'YYYY-MM-DD')
                })
                console.log('reservations',reservations)
                return reservations
            }else{
                let reservations = this.$lodash.filter(this.Reservation,a=>{
                    return a.clientUID == this.clientUID && a.clientReserveDate < date.formatDate(new Date(), 'YYYY-MM-DD')
                })
                console.log('reservations',reservations)
                return reservations
            }

          } catch(err){
              console.log(err,'err')
              return []
          }
      },
        returnUserOrders(){
          try {
            if(this.ordertab === 'finish'){
                let reservations = this.$lodash.filter(this.partyTrayOrders,a=>{
                return a.accountUID == this.clientUID && a.clientReserveDate < date.formatDate(new Date(), 'YYYY/MM/DD')
                })
                console.log('partyTrayOrders',reservations)
                return reservations
            }else{
                let reservations = this.$lodash.filter(this.partyTrayOrders,a=>{
                return a.accountUID == this.clientUID && a.clientReserveDate > date.formatDate(new Date(), 'YYYY/MM/DD')
                })
                console.log('partyTrayOrders',reservations)
                return reservations
            }
          } catch(err){
              console.log(err,'err')
              return []
          }
      }
  },
  methods: {
    openStatus(props){
            this.selectedStatus = props 
            this.viewstatus = true
            try {
                    let reservations = this.$lodash.filter(this.EventStatus,a=>{
                        return a.reservationKey == props['.key']
                        console.log('ss',a.reservationKey)
                    })
                    this.status = reservations
                    
                    console.log('id',this.status)
                    return this.status
            } catch(err){
                console.log(err,'err')
                return []
            }
    },
    returnColor(index){
          try {
              if(this.status[index] === undefined){
                  return 'deep-orange-4'
              }else{
                  return 'green'
              }
          } catch (error) {
              return 'green'
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
    returnStatusTime(index){
          try {
              return this.$moment(this.status[index].dateTime).format('LT')
          } catch (error) {
              return '--:-- --'
          }
      },
    rescheduleNow(){
        var reschedBago = {
            clientUID: this.selectedResched.clientUID,
            clientReserveDate: this.dates,
            clientFName: this.selectedResched.clientFName,
            clientLName: this.selectedResched.clientLName,
            clientPlace: this.selectedResched.clientPlace,
            clientCity: this.selectedResched.clientCity,
            clientEmail: this.selectedResched.clientEmail,
            clientEvent: this.selectedResched.clientEvent,
            clientMotif: this.selectedResched.clientMotif,
            clientPax: this.selectedResched.clientPax,
            clientStartTime: this.formatTimeInput(this.startTime),
            clientEndTime: this.formatTimeInput(this.endTime),
            clientSelectPackage: this.selectedResched.clientSelectPackage,
            clientFoodChoice: this.selectedResched.clientFoodChoice,
            clientAddOns: this.selectedResched.clientAddOns,
            clientTotalPayment: this.selectedResched.clientTotalPayment,
            clientTotalDownPayment: this.selectedResched.clientTotalDownPayment,
            clientPaidAmount: this.selectedResched.clientPaidAmount,
            clientPayDetails: this.selectedResched.clientPayDetails,
            clientPaymentType: this.selectedResched.clientPaymentType,
            clientTokenID: this.selectedResched.clientTokenID,
            clientReserveType: this.selectedResched.clientReserveType,
            clientDateofReserve: this.selectedResched.clientDateofReserve,
        }
            this.$q.dialog({
                    title: 'Reschedule Event',
                    message: 'Reschedule This Event?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                this.$firestoreApp.collection('Reservation').doc(this.reschedID).set(reschedBago)
                .then((ref) =>{
                        this.$q.notify({
                            message: 'Event Rescheduled!',
                            icon: 'mdi-folder-plus-outline',
                            color: 'orange-8',
                            textColor: 'white',
                            position: 'center'
                            })
                        })  
                    })
                    this.reschedCancel = false
    },  
    cancelNow(){
        let cancelled = {
            clientUID: this.selectedResched.clientUID,
            clientReserveDate: this.selectedResched.clientReserveDate,
            clientFName: this.selectedResched.clientFName,
            clientLName: this.selectedResched.clientLName,
            clientPlace: this.selectedResched.clientPlace,
            clientCity: this.selectedResched.clientCity,
            clientEmail: this.selectedResched.clientEmail,
            clientEvent: this.selectedResched.clientEvent,
            clientMotif: this.selectedResched.clientMotif,
            clientPax: this.selectedResched.clientPax,
            clientStartTime: this.selectedResched.clientStartTime,
            clientEndTime: this.selectedResched.clientEndTime,
            clientSelectPackage: this.selectedResched.clientSelectPackage,
            clientFoodChoice: this.selectedResched.clientFoodChoice,
            clientAddOns: this.selectedResched.clientAddOns,
            clientTotalPayment: this.selectedResched.clientTotalPayment,
            clientTotalDownPayment: this.selectedResched.clientTotalDownPayment,
            clientPaidAmount: this.selectedResched.clientPaidAmount,
            clientPayDetails: this.selectedResched.clientPayDetails,
            clientPaymentType: this.selectedResched.clientPaymentType,
            clientTokenID: this.selectedResched.clientTokenID,
            clientReserveType: this.selectedResched.clientReserveType,
            clientDateofReserve: this.selectedResched.clientReserveDate,
            clientCancelDate: date.formatDate(new Date(), 'YYYY/MM/DD'),
        }
            this.$q.dialog({
                title: 'Cancel Event?',
                message: 'Cancel This Event?',
                ok: 'Yes',
                cancel: 'Cancel'
            }).onOk(() => {
            this.$firestoreApp.collection('Cancelled').add(cancelled)
            .then((ref) =>{
                var id = this.reschedID
                this.$firestoreApp.collection('Reservation').doc(id).delete()
                this.$q.notify({
                            message: 'Event Cancelled!',
                            icon: 'mdi-delete',
                            color: 'grey-8',
                            textColor: 'white',
                            position: 'center'
                        })
                    })
                })
                this.reschedCancel = false
    },
    removeOrder(props){
      //var id = props['.key']
      console.log(props.foodKey, 'kekeke')
      this.$q.dialog({
        title: 'Remove '+props.foodName + ' ?',
        message: 'Do you want to remove this item from your basket?.',
        ok: 'Yes',
        cancel: 'Cancel',
        persistent: true,
        color:'pink-6'
      }).onOk(() => {
        let orders = this.returnCart
        let indexing = this.$lodash.findIndex(orders,a=>{
            return a.checkerName == props.checkerName
        })

        orders.splice(indexing,1)
        let add = {
          items: orders
        }
        this.$firestoreApp.collection('CartItems').doc(id).set(add)
        .then((ref) =>{
            console.log('cart updated')
            
        })  
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
    openResched(props){
            this.reschedID = props['.key']
            this.selectedResched = props 
            this.reschedCancel = true
            this.dates = date.formatDate(props.clientReserveDate, 'YYYY/MM/DD'),
            this.startTime = props.clientStartTime
            this.endTime = props.clientEndTime
    },
    updatePaymentNow(){
        var PaymentBago = {
            clientUID: this.selectedPayment.clientUID,
            clientReserveDate: this.selectedPayment.clientReserveDate,
            clientFName: this.selectedPayment.clientFName,
            clientLName: this.selectedPayment.clientLName,
            clientPlace: this.selectedPayment.clientPlace,
            clientCity: this.selectedPayment.clientCity,
            clientEmail: this.selectedPayment.clientEmail,
            clientEvent: this.selectedPayment.clientEvent,
            clientMotif: this.selectedPayment.clientMotif,
            clientPax: this.selectedPayment.clientPax,
            clientStartTime: this.selectedPayment.clientStartTime,
            clientEndTime: this.selectedPayment.clientEndTime,
            clientSelectPackage: this.selectedPayment.clientSelectPackage,
            clientFoodChoice: this.selectedPayment.clientFoodChoice,
            clientAddOns: this.selectedPayment.clientAddOns,
            clientTotalPayment: this.selectedPayment.clientTotalPayment,
            clientTotalDownPayment: this.selectedPayment.clientTotalDownPayment,
            clientPaidAmount: parseInt(this.selectedPayment.clientPaidAmount) + parseInt(this.toPayAmount),
            clientPayDetails: this.selectedPayment.clientPayDetails,
            clientPaymentType: this.selectedPayment.clientPaymentType,
            clientTokenID: this.selectedPayment.clientTokenID,
            clientReserveType: this.selectedPayment.clientReserveType,
            clientDateofReserve: this.selectedPayment.clientDateofReserve,
        }
                this.$firestoreApp.collection('Reservation').doc(this.paymentID).set(PaymentBago)
                .then((ref) =>{
                    let paymentDetails = {
                        clientReservationKey: this.paymentID,
                        clientPayDetails: this.paydetails,
                        clientTokenID: this.token.id,
                        clientPaymentType: 'CARD',
                        clientUID: this.selectedPayment.clientUID,
                        transactionType: 'ONLINE',
                        forReservation: true,
                        clientPaymentDate: date.formatDate(new Date(), 'YYYY-MM-DD')
                    }
                    this.$firestoreApp.collection('Payments').add(paymentDetails)
                    .then(()=>{
                        this.$q.notify({
                            message: 'Payments Updated!',
                            icon: 'mdi-folder-plus-outline',
                            color: 'orange-8',
                            textColor: 'white',
                            position: 'center'
                            })
                        })  
                    })
                    this.amount = 0
                    this.desiredAmountInput = 5000
                    this.paymentDetails = false
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    printNow(){
            // this.$htmlToPaper('printMe', () => {
            //   console.log('Printing completed or was cancelled!');
            window.print();
            // })
    },
    openReserve(props){
            this.reservationID = props['.key']
            this.selectedReservation = props 
            this.reserveDetails = true
    },
    openPayment(props){
            this.paymentID = props['.key']
            this.selectedPayment = props 
            this.paymentDetails = true
    },
    formatTimeInput(time){
      //get time to format for display
      let baseDate = new Date(2020,1,1)
      let arr = time.split(':')
      let formatTime = date.addToDate(baseDate, {hours:arr[0],minutes:arr[1]})

      return this.$moment(formatTime).format('LT')
    },
    formatDate(date){
        return this.$moment(date).format('LL')
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
          }).onOk(()=>{
            this.paydetails = charge     
            this.updatePaymentNow()    
          })

      }
    },
  }
}
</script>
<style type = "text/css">
      @media print {
        .bodyText {
            display: none;
          }
        ::-webkit-scrollbar {
            display: none;
        }
      }
</style>
