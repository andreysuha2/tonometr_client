<template>
    <div class="app">
        <div class="app--content">
            <AppHeader class="app--header"/>
            <div class="app--main">
                <slot></slot>
            </div>
        </div>
        <AppFooter class="app--footer"/>
    </div>
</template>

<script lang="ts">
export default { name: "MainLayout" };
</script>

<script setup lang="ts">
import { AppHeader, AppFooter } from "#components";
</script>

<style lang="scss" scoped>
.app {
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr auto;

    &--main {
        margin-top: 20px;
    }

    &--footer  {
        grid-row-start: 2;
        grid-row-end: 3;
    }
}
</style>