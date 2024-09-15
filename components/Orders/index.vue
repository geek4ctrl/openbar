<script setup lang="ts">
import { onMounted, ref } from 'vue';
const { $toast } = useNuxtApp();
import { useBarStore } from '@/stores/bar';

const barStore = useBarStore();
const { addToTab } = barStore;

interface Beverage {
    name: string;
    price: number;
}

const currentUser = ref(null);
const selectedBeverage = ref(null);
const selectedBeverageCount = ref(0);

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

function clearTabFields() {
    currentUser.value = "";
    selectedBeverage.value = "";
    selectedBeverageCount.value = 0;

    $toast.success(`Orders have been cleared`);
}

</script>

<template>
            <div class="flex flex-col grow pl-5 pr-5 p-8 border-2 border-slate-200 ml-4 mr-4 rounded-md">
                <div class="font-bold text-2xl  pb-4 rounded-md">Orders</div>
                <hr class="border-1 mb-8">

                <div>
                    <h2 class="font-bold mb-4">Client name:</h2>
                </div>
                <input v-model="currentUser" type="text" placeholder="Who is ordering" required
                    class="mb-8 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                <div>
                    <h3 class="font-bold mb-4">List of beverages available :</h3>
                </div>

                <select v-model="selectedBeverage" required class="bg-gray-100 p-2 mb-4">
                    <option v-for="beverage in beverages" :value="beverage">{{ beverage.name }}</option>
                </select>

                <div>
                    <h2 class="font-bold mt-4 mb-4">How many of each beverage?</h2>
                </div>
                <input v-model="selectedBeverageCount" type="number" placeholder="Please insert how many you want" required
                    class="mb-8 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                <div>
                    <Button  @click="() => addToTab(currentUser, selectedBeverage, selectedBeverageCount)" classes="p-2 text-slate-900 font-bold w-40 border-2 border-slate-200 mr-4 mb-4 mt-4 rounded-md">Add to tab</Button>
                    <Button  @click="clearTabFields" classes="p-2 text-slate-900 font-bold w-40 border-2 border-slate-200 mr-4 mb-4 mt-4 rounded-md">Clear</Button>
                </div>
            </div>
</template>

<style></style>