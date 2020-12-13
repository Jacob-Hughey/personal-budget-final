import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    mounted() {
        var budget = this.$store.state.budget;
        var budgetData = {
            backgroundColor: [],
            data: []
        };
        var budgetLabels = [];
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
        for (var i = 0; i < budget.used.length; i++) {
            budgetData.backgroundColor.push(random_rgb());
            budgetData.data.push(budget.used[i] / budget.totals[i]);
            budgetLabels.push(budget.titles[i]);
        }
        this.renderChart(
            {
                labels: budgetLabels,
                datasets: [budgetData]
            },
            {
                scales: {
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 0.1,
                                suggestedMax: 1
                            }
                        }
                    ]
                },
                legend: {
                    display: false
                }
            }
        );
    }
};
