<template>
    <div class="app-loader flex flex-center">
        <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
    </div>
</template>

<script lang="ts">
export default { name: "AppLoader" };
</script>

<style lang="scss">
.app-loader {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, .5);
    z-index: 100;
}
</style>