<template>
    <v-container fluid>
        <v-layout justify-center align-center column class="info">
            <div class="display-2 font-weight-black">
                Enter Expenses
            </div>
            <v-data-table :headers="headers" :items="budgets">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.item.label }}</td>
                        <td>{{ row.item.total }}</td>
                        <td>{{ row.item.used }}</td>
                        <td>
                            <v-text-field
                                v-model="row.item.expense"
                                :rules="expenseRules"
                                :type="'number'"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-btn
                                class="mx-2"
                                dark
                                small
                                color="Green"
                                @click="onButtonClick(row.item)"
                                >Add</v-btn
                            >
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-layout>
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
                total: storedBudgets.totals[i],
                used: storedBudgets.used[i],
                expense: null
            });
        }
        return {
            expense: '',
            expenseRules: [
                v => !!v || 'Value is required and must be numerical',
                v =>
                    /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(v) ||
                    'The expense must be numerical'
            ],
            headers: [
                { text: 'Label', value: 'Label' },
                { text: 'Total', value: 'Total' },
                { text: 'Used', value: 'Used' },
                { text: 'Add Expense', value: 'Add Expense' }
            ],
            budgets
        };
    },
    methods: {
        onButtonClick(item) {
            var updatedIndex = this.budgets.findIndex(
                updatedItem => updatedItem.label === item.label
            );
            this.$store.dispatch('EnterExpense', {
                label: item.label,
                expense: this.budgets[updatedIndex].expense
            });
            this.budgets[updatedIndex].used += Number(
                this.budgets[updatedIndex].expense
            );
            this.budgets[updatedIndex].expense = null;
        }
    },
    name: 'Enter-Expenses'
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
