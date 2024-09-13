<script setup lang="ts">
import { onMounted, ref } from 'vue';
const { $toast } = useNuxtApp();

interface Beverage {
    name: string;
    price: number;
}

const currentUser = ref(null);
const selectedBeverage = ref(null);
const selectedBeverageCount = ref(0);
const numberOfPeople = ref(0);
const beverages: Array<Beverage> = [
    {
        name: 'Beer',
        price: 45.00
    },
    {
        name: 'Cider',
        price: 52.00
    },
    {
        name: 'Premix',
        price: 59.00
    },
];

const openTab: [] = ref([]);
const isNewUser = ref(true);

const userBill: object = ref({});
const currentUserBillName: any = ref("");
const totalBill = ref(0);
const totalBillAfterSplit = ref(0)

onMounted(() => {
});

function addToTab(event: any) {
    if (event) {

        if (currentUser.value === null || currentUser.value === undefined) {
            $toast.warning(`Please enter client name`);
            return;
        };

        if (selectedBeverage.value === null || selectedBeverage.value === undefined) {
            $toast.warning(`Please select beverage`);
            return;
        };

        if (selectedBeverageCount.value < 1) {
            $toast.warning(`Please enter correct number for each beverage`);
            return;
        };

        if (selectedBeverage.value !== null || selectedBeverage.value !== undefined) {

            // Check if user exists
                openTab?.value.map((element: any) => {
                    if (element.user === currentUser.value) {
                        isNewUser.value = false;

                        element.order.push({
                                    name: selectedBeverage.value.name,
                                    count: selectedBeverageCount.value,
                                    price: selectedBeverage.value.price,
                                });

                        $toast.success(`Order for ${element.user} has been added`);
                    }
                });

            // Check if new user
            if (isNewUser.value === true) {

                    openTab.value.push({
                        user: currentUser.value,
                        order: [
                            {
                                name: selectedBeverage.value.name,
                                count: selectedBeverageCount.value,
                                price: selectedBeverage.value.price,
                            }
                        ]
                    });

                    $toast.success(`Order for ${ currentUser.value} has been created`);
            }
        }
    }

    isNewUser.value = true;
}

function clearTabFields() {
    currentUser.value = "";
    selectedBeverage.value = "";
    selectedBeverageCount.value = 0;

    $toast.success(`Orders have been cleared`);
}

function clearOrderFields() {
    currentUserBillName.value = "";
    numberOfPeople.value = 0;

    $toast.success(`Bill have been cleared`);
}

function requestBill() {
    if (currentUserBillName.value == "") {
        $toast.warning(`Please enter name of client`);
    }

    // Check if user exists
    openTab?.value.map((element: any) => {
        if (element.user === currentUserBillName.value) {
                $toast.success(`Request for ${ currentUserBillName.value } is being processed`);

                userBill.value = element;
            }
        });

       let sum = 0;

       const total = userBill.value.order.map((bill: any) => {
          sum += bill.count;
          totalBill.value += bill.count * bill.price;
       });

       if (numberOfPeople.value > 0) {
            totalBillAfterSplit.value = totalBill.value / numberOfPeople.value
       }
}

function printBill() {
    window.print()
}

</script>

<template>

    <div class="container mx-auto flex flex-col m-5">
            <div class="flex flex-col justify-center justify-items-center align-middle text-center border-2 border-slate-200 ml-4 mr-4 mb-4 rounded-md">
                <h1 class="font-bold text-4xl p-8 m-4 rounded-md text-slate-800">Tiger's Milk</h1>
            </div>

            <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

                <div class="flex flex-col grow pl-5 pr-5 p-8 border-2 border-slate-200 ml-4 mr-4 rounded-md">
                    <div class="font-bold text-2xl  pb-4 rounded-md">Orders</div>
                    <hr class="border-1 mb-8">

                    <div><h2 class="font-bold mb-4">Client name:</h2></div>
                        <input v-model="currentUser" type="text" placeholder="Who is ordering" class="mb-8 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                    <div><h3 class="font-bold mb-4">List of beverages available :</h3></div>

                    <select v-model="selectedBeverage" required class="bg-gray-100 p-2 mb-4" >
                        <option v-for="beverage in beverages" :value="beverage">{{ beverage.name }}</option>
                    </select>

                    <div><h2 class="font-bold mt-4 mb-4">How many of each beverage?</h2></div>
                        <input v-model="selectedBeverageCount" type="number" placeholder="Please insert how many you want" class="mb-8 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                        <div>
                            <button @click="addToTab" class="p-2 text-slate-900 font-bold w-40 border-2 border-slate-200 mr-4 mb-4 mt-4 rounded-md">Add to tab</button>
                            <button @click="clearTabFields" class="p-2 text-slate-900 font-bold w-40 border-2 border-slate-200 mr-4 mb-4 mt-4 rounded-md">Clear</button>
                        </div>
                </div>

                <div class="flex flex-col grow pl-5 pr-5 ml-4 mr-4 rounded-md p-8 overflow-auto scroll-smooth border-2 border-slate-200 h-90">
                    <div class="font-bold text-2xl pb-4 rounded-md">Open tabs</div>
                    <hr class="border-1 mb-8">

                    <div class="flex flex-col pt-2 pb-2 scroll-smooth border-2 border-slate-200 ml-4 mr-4 rounded-md h-52 p-8 overflow-auto mb-4 bg-gray-100" v-for="element of openTab">
                        <p class="font-bold">Name: {{ element.user }}</p>

                        <ul class="max-h-2"><span class="font-bold">Orders:</span>
                            <li class="font-semi-bold" v-for="order of element.order">
                            <p>{{ order.name }} - {{ order.count }}</p>
                        </li>
                        </ul>
                    </div>
                </div>

            <div class="flex flex-col grow pl-5 pr-5 p-8 mt-7 border-2 border-slate-200 ml-4 mr-4 rounded-md">
                    <div class="font-bold text-2xl pb-4 rounded-md">Bill</div>
                    <hr class="border-1 mb-8">

                    <div><h2 class="font-bold mb-4">Client name</h2></div>
                        <input v-model="currentUserBillName" type="text" placeholder="Who is requesting" class="mb-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                    <div class="mt-10"><h3 class="font-bold mb-4">How many will split(optional)?</h3></div>
                        <input v-model="numberOfPeople" type="number" placeholder="Enter the number of people who will spit" class="mb-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                        <div>
                            <button @click="requestBill" class="p-2 text-slate-900 font-bold w-40 border-2 border-slate-200 mr-4 mb-4 mt-4 rounded-md">Request Bill</button>
                            <button @click="clearOrderFields" class="p-2 text-slate-900 font-bold w-40 border-2 border-slate-200 mr-4 mb-4 mt-4 rounded-md">Clear</button>
                        </div>
                </div>

                <div class="flex flex-col grow pl-5 pr-5 ml-4 mr-4 rounded-md p-8 overflow-auto scroll-smooth border-2 border-slate-200 h-90 mt-7">
                    <div class="font-bold text-2xl pb-4 rounded-md">Current Bill</div>
                    <hr class="border-1 mb-8">

                    <div class="flex flex-col pt-2 pb-2 scroll-smooth border-2 border-slate-200 ml-4 mr-4 rounded-md h-90 p-8 overflow-auto mb-4 bg-gray-100">
                        <div class="flex flex-col pt-2 pb-2">

                            <div class="font-semi-bold mt-8"><span class="font-bold">Tiger's Milk restaurant </span></div>
                            <hr class="mt-2 border">

                            <ul class="">
                                <li class="font-semi-bold" v-for="(order, index) of userBill.order">
                                    <p>{{index + 1}} - Drinks: {{ order.name }} - {{ order.count }} - {{ order.price }}</p>
                                </li>
                            </ul>

                            <div class="font-semi-bold mt-8"><span class="font-bold">Total: R </span>{{ totalBill }}</div>
                            <div class="font-semi-bold mt-8"><span class="font-bold">VAT: % </span>15 </div>
                            <div class="font-semi-bold mt-8"><span class="font-bold">Total after VAT: R </span>{{ totalBill + (totalBill * 0.15) }}</div>
                            <div class="font-semi-bold"><span class="font-bold">Number of people splitting: </span> {{ numberOfPeople }}</div>
                            <div class="font-semi-bold"><span class="font-bold">Total after optional split: R </span>{{ totalBillAfterSplit }}</div>

                        </div>
                    </div>

                        <button @click="printBill" class="p-2 text-slate-900 font-bold w-40 border-2 border-slate-200 ml-4 mr-4 mb-4 mt-4 rounded-md">Print</button>
                </div>

            </div>

    </div>

</template>

<style lang="scss">

</style>