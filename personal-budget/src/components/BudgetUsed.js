import { Pie } from 'vue-chartjs';

export default {
    extends: Pie,
    mounted() {
        var budget = this.$store.state.budget;
        var used = budget.used.reduce((a, b) => a + b, 0);
        var total = budget.totals.reduce((a, b) => a + b, 0);
        function random_rgb() {
            var o = Math.round,
                r = Math.random,
                s = 255;
            return (
                'rgba(' +
                o(r() * s) +
                ',' +
                o(r() * s) +
                ',' +
                o(r() * s) +
                ',' +
                1 +
                ')'
            );
        }
        this.renderChart({
            labels: ['Used', 'Remaining'],
            datasets: [
                {
                    backgroundColor: [random_rgb(), random_rgb()],
                    data: [used, total - used]
                }
            ]
        });
    }
};
