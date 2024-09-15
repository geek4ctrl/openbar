<script setup>
import { useBarStore } from '@/stores/bar';

const barStore = useBarStore();
const { getOpenTab } = barStore;

</script>

<template>
            <div
                class="flex flex-col grow pl-5 pr-5 ml-4 mr-4 rounded-md p-8 overflow-auto scroll-smooth border-2 border-slate-200 h-90">
                <div class="font-bold text-2xl pb-4 rounded-md">Open tabs</div>
                <hr class="border-1 mb-8">

                <div class="flex flex-col pt-2 pb-2 scroll-smooth border-2 border-slate-200 ml-4 mr-4 rounded-md h-52 p-8 overflow-auto mb-4 bg-gray-100"
                    v-for="element of getOpenTab">
                    <p class="font-bold">Name: {{ element.user }}</p>

                    <ul class="max-h-2"><span class="font-bold">Orders:</span>
                        <li class="font-semi-bold" v-for="order of element.order">
                            <p>{{ order.name }} - {{ order.count }}</p>
                        </li>
                    </ul>
                </div>
            </div>
</template>

<style lang="scss"></style>