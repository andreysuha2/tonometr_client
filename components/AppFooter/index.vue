<template>
    <footer class="app-footer">
        <div class="app-footer--container base-container">
            <span>Developed By Andrii Sukhenko &copy; {{ years }}</span>
        </div>
    </footer>
</template>

<script lang="ts">
export default { name: "AppFooter" };
</script>

<script lang="ts" setup>
const startYear = 2023,
    currentYear = (new Date()).getFullYear(),
    years = startYear < currentYear ? `${startYear} - ${currentYear}` : startYear;
</script>

<style lang="scss" scoped>
.app-footer {
    padding: 20px 0;
    border-top: 1px solid #000;
    text-align: center;
}
</style>