<script setup lang="ts">
import { onMounted, ref } from 'vue';
const { $toast } = useNuxtApp();
import { useBarStore } from '@/stores/bar';

const barStore = useBarStore();
const { addToTab, requestBill, getOpenTab } = barStore;

const { userBill } = storeToRefs(useBarStore());
const { totalBill } = storeToRefs(useBarStore());
const { totalBillAfterSplit } = storeToRefs(useBarStore());

function printBill() {
    window.print()
}

</script>

<template>
            <div
                class="flex flex-col grow pl-5 pr-5 ml-4 mr-4 rounded-md p-8 overflow-auto scroll-smooth border-2 border-slate-200 h-90 mt-7">
                <div class="font-bold text-2xl pb-4 rounded-md">Current Bill</div>
                <hr class="border-1 mb-8">

                <div
                    class="flex flex-col pt-2 pb-2 scroll-smooth border-2 border-slate-200 ml-4 mr-4 rounded-md h-90 p-8 overflow-auto mb-4 bg-gray-100">
                    <div class="flex flex-col pt-2 pb-2">

                        <div class="font-semi-bold mt-8"><span class="font-bold">Tiger's Milk restaurant </span></div>
                        <hr class="mt-2 border">

                        <ul class="">
                            <li class="font-semi-bold" v-for="(order, index) of userBill.order">
                                <p>{{ index + 1 }} - Drinks: {{ order.name }} - {{ order.count }} - {{ order.price }}</p>
                            </li>
                        </ul>

                        <div class="font-semi-bold mt-8"><span class="font-bold">Total: R </span>{{ totalBill }}</div>
                        <div class="font-semi-bold mt-8"><span class="font-bold">VAT: % </span>15 </div>
                        <div class="font-semi-bold mt-8"><span class="font-bold">Total after VAT: R </span>{{ totalBill +
                            (totalBill * 0.15) }}</div>
                        <div class="font-semi-bold"><span class="font-bold">Number of people splitting: </span> {{
                            numberOfPeople }}</div>
                        <div class="font-semi-bold"><span class="font-bold">Total after optional split: R </span>{{
                            totalBillAfterSplit }}</div>

                    </div>
                </div>

                <button @click="printBill"
                    class="p-2 text-slate-900 font-bold w-40 border-2 border-slate-200 ml-4 mr-4 mb-4 mt-4 rounded-md">Print</button>
            </div>
</template>

<style></style>