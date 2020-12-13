import { Pie } from 'vue-chartjs';

export default {
    extends: Pie,
    mounted() {
        var budget = this.$store.state.budget;
        this.renderChart({
            labels: budget.titles,
            datasets: [
                {
                    backgroundColor: budget.colors,
                    data: budget.totals
                }
            ]
        });
    }
};
