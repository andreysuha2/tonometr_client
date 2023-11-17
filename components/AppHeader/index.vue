<template>
    <header class="app-header">
        <div class="app-header--container base-container">
            <AppLogo/> 
        </div>
    </header>
</template>

<script lang="ts">
import AppLogo from '~/components/AppLogo/index.vue';
export default { 
    name: 'AppHeader',
    components: { AppLogo }
};
</script>

<style lang="scss" scoped>
.app-header {
    padding: 20px 0;
    border-bottom: 1px solid #000;
}
</style>