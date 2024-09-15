<script setup lang="ts">
import { onMounted, ref } from 'vue';
const { $toast } = useNuxtApp();
import { useBarStore } from '@/stores/bar';

const barStore = useBarStore();

onMounted(() => {
});

</script>

<template>
    <div class="container mx-auto flex flex-col m-5">
        <div
            class="flex flex-col justify-center justify-items-center align-middle text-center border-2 border-slate-200 ml-4 mr-4 mb-4 rounded-md">
            <h1 class="font-bold text-4xl p-8 m-4 rounded-md text-slate-800">Tiger's Milk</h1>
        </div>

        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <Orders/>
            <OpenTabs/>
            <Bill/>
            <CurrentBill/>
        </div>
    </div>
</template>

<style lang="scss"></style>