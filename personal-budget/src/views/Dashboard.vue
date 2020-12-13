<template>
    <v-container fluid>
        <v-row>
            <v-col md="4">
                <v-card outlined>
                    <v-card-title primary-title class="justify-center">
                        All Budgets
                    </v-card-title>
                    <All-Budgets></All-Budgets>
                </v-card>
            </v-col>
            <v-col md="4">
                <v-card outlined>
                    <v-card-title primary-title class="justify-center">
                        Total Budget Used
                    </v-card-title>
                    <Budget-Used></Budget-Used>
                </v-card>
            </v-col>
            <v-col md="4">
                <v-card outlined>
                    <v-card-title primary-title class="justify-center">
                        Individual Budget Usage
                    </v-card-title>
                    <Each-Budget-Used></Each-Budget-Used>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AllBudgets from '@/components/AllBudgets.js';
import BudgetUsed from '@/components/BudgetUsed.js';
import EachBudgetUsed from '@/components/EachBudgetUsed.js';

export default {
    name: 'Dashboard',
    components: {
        AllBudgets,
        BudgetUsed,
        EachBudgetUsed
    }
};
</script>

<style scoped>
.container--fluid {
    padding-top: 4%;
}
</style>
