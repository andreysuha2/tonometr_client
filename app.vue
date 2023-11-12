<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script lang="ts" setup>
import useDiaryStore from '~/store/diary';

const store = useDiaryStore();
onNuxtReady(() => store.loadRecords());
</script>

<style lang="scss">
#__nuxt {
    height: 100%;
}
</style>