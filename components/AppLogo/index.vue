<template>
    <nuxt-link to="/" class="app-logo">
        <span class="app-logo--text">Tonometr</span>
        <img class="app-logo--img" src="/images/logo.svg" alt="Thonometr logo">
    </nuxt-link>
</template>

<script lang="ts">
export default { name: 'AppLogo' };
</script>

<style lang="scss" scoped>
.app-logo {
    // vars
    --image-width: 20px;

    // styles
    &--img {
        width: var(--image-width);
    }

    &--text {
        margin-right: 5px;
        color: #000;

        font: {
            weight: bold
        }
    }
}
</style>