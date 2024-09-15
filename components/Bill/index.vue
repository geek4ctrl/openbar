<script setup lang="ts">
import { onMounted, ref } from 'vue';
const { $toast } = useNuxtApp();
import { useBarStore } from '@/stores/bar';

const barStore = useBarStore();
const { addToTab, requestBill, getOpenTab } = barStore;

    const currentUserBillName: any = ref("");
    const numberOfPeople = ref(1);

    function clearOrderFields() {
        currentUserBillName.value = "";
        numberOfPeople.value = 1;

        $toast.success(`Bill have been cleared`);
    }
</script>

<template>
            <div class="flex flex-col grow pl-5 pr-5 p-8 mt-7 border-2 border-slate-200 ml-4 mr-4 rounded-md">
                <div class="font-bold text-2xl pb-4 rounded-md">Bill</div>
                <hr class="border-1 mb-8">

                <div>
                    <h2 class="font-bold mb-4">Client name</h2>
                </div>
                <input v-model="currentUserBillName" type="text" placeholder="Who is requesting"
                    class="mb-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                <div class="mt-10">
                    <h3 class="font-bold mb-4">How many will split(optional)?</h3>
                </div>
                <input v-model="numberOfPeople" type="number" placeholder="Enter the number of people who will spit"
                    class="mb-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                <div>
                    <Button  @click="requestBill(currentUserBillName, numberOfPeople)" classes="p-2 text-slate-900 font-bold w-40 border-2 border-slate-200 mr-4 mb-4 mt-4 rounded-md">Request Bill</Button>
                    <Button  @click="clearOrderFields" classes="p-2 text-slate-900 font-bold w-40 border-2 border-slate-200 mr-4 mb-4 mt-4 rounded-md">Clear</Button>
                </div>
            </div>
</template>

<style></style>