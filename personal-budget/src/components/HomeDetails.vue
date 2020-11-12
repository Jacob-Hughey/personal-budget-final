<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="4">
                <v-card to="/dashboard" class="pa-2" outlined tile>
                    <v-card-title primary-title class="justify-center">
                        <div class="display-2">
                            Dashboard
                        </div>
                    </v-card-title>
                    <v-img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1302&h=890&q=80"
                    ></v-img>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card to="/configure" class="pa-2" outlined tile>
                    <v-card-title primary-title class="justify-center">
                        <div class="display-2">
                            Configure
                        </div>
                    </v-card-title>
                    <v-img
                        src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1302&h=890&q=80"
                    ></v-img>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card to="/enter-expenses" class="pa-2" outlined tile>
                    <v-card-title primary-title class="justify-center">
                        <div class="display-2">
                            Enter Expenses
                        </div>
                    </v-card-title>
                    <v-img
                        src="https://images.unsplash.com/photo-1520695625556-c2a7bfe87a2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1302&h=890&q=80"
                    ></v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'HomeDetails'
};
</script>

<style scoped></style>
