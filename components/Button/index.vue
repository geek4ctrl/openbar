<script setup>

    const props = defineProps({
        classes: String
    });

</script>

<template>
    <button :class="props.classes">
         <slot/>
    </button>
</template>

<style lang="scss"></style>