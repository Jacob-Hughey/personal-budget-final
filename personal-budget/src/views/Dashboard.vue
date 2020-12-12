<template>
    <v-container fluid>
        <v-row>
            <v-col md="4">
                <v-card outlined>
                    <v-card-title primary-title class="justify-center">
                        All Budgets
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col md="4">
                <v-card outlined>
                    <v-card-title primary-title class="justify-center">
                        Budget Used
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col md="4">
                <v-card outlined>
                    <v-card-title primary-title class="justify-center">
                        Usage Over Time
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Dashboard'
};
</script>

<style scoped>
.container--fluid {
    padding-top: 4%;
}
</style>
