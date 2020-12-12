<template>
    <div class="container">
        <pie-chart v-if="loaded" :chartdata="chartdata" :options="options" />
    </div>
</template>

<script>
import PieChart from './AllBudgets';

export default {
    name: 'AllBudgetsContainer',
    components: { PieChart },
    data: () => ({
        loaded: false,
        chartdata: null
    }),
    async mounted() {
        this.loaded = false;
        try {
            this.$store.dispatch('GetBudget');
            const { budget } = this.$store.state.budget;
            this.chartdata = budget;
            this.loaded = true;
        } catch (e) {
            console.error(e)
        }
    }
}
</script>
