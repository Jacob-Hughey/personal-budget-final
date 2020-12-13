import BudgetUsed from '@/components/BudgetUsed.js';
<template>
    <v-container fluid>
        <v-row>
            <v-col md="6">
                <v-layout justify-center align-center column class="info">
                    <div class="display-2 font-weight-black">
                        Configure Budgets
                    </div>
                    <v-data-table :headers="headers" :items="budgets">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row.item.label }}</td>
                                <td>{{ row.item.total }}</td>
                                <td>
                                    <v-btn
                                        class="mx-2"
                                        dark
                                        small
                                        color="red"
                                        @click="onButtonClick(row.item)"
                                        >Delete</v-btn
                                    >
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-layout>
            </v-col>
            <v-col md="6">
                <v-layout justify-center align-center column class="info">
                    <div class="display-2 font-weight-black">
                        Add Budget
                    </div>
                </v-layout>
                <v-form ref="form" v-model="isFormValid" lazy-validation>
                    <v-text-field
                        v-model="label"
                        :rules="labelRules"
                        label="Label"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="total"
                        :rules="totalRules"
                        label="Total"
                        :type="'number'"
                        required
                    ></v-text-field>
                </v-form>
                <v-btn
                    :disabled="!isFormValid"
                    color="success"
                    class="mr-4"
                    @click="submit"
                >
                    Submit
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        var storedBudgets = this.$store.state.budget;
        var budgets = [];
        for (var i = 0; i < storedBudgets.titles.length; i++) {
            budgets.push({
                label: storedBudgets.titles[i],
                total: storedBudgets.totals[i]
            });
        }
        return {
            isFormValid: false,
            label: '',
            labelRules: [
                v => !!v || 'Label is required',
                v =>
                    /^[A-Za-z]+$/.test(v) ||
                    'Label must only contain letters without spaces'
            ],
            total: '',
            totalRules: [
                v => !!v || 'Total is required and must be numerical',
                v =>
                    /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(v) ||
                    'The total must be numerical'
            ],
            headers: [
                { text: 'Label', value: 'Label' },
                { text: 'Total', value: 'Total' },
                { text: 'Delete', value: 'Delete' }
            ],
            budgets
        };
    },
    methods: {
        onButtonClick(item) {
            this.$store.dispatch('DeleteBudget', { label: item.label });
            var deleteIndex = this.budgets.findIndex(
                deletedItem => deletedItem.label === item.label
            );
            this.budgets.splice(deleteIndex, 1);
        },
        async submit() {
            if (this.isFormValid) {
                var matches = false;
                for (
                    var i = 0;
                    i < this.$store.state.budget.titles.length;
                    i++
                ) {
                    if (this.label === this.$store.state.budget.titles[i])
                        matches = true;
                }
                if (matches) {
                    alert('Budget name matches existing budget');
                } else {
                    this.$store.dispatch('AddBudget', {
                        label: this.label,
                        total: this.total
                    });
                    this.budgets.push({
                        label: this.label,
                        total: this.total
                    });
                    this.label = '';
                    this.total = '';
                }
            }
        }
    },
    name: 'Configure'
};
</script>

<style scoped>
.info {
    background-color: white !important;
    width: 70%;
    height: 70%;
    margin-top: 7.5%;
    margin-left: 15%;
}
</style>
