<template>
    <v-container fluid fill-height class="home-hero">
        <v-layout justify-center align-center column pa-5>
            <div class="display-4 font-weight-black text-xs-center">
                PERSONAL BUDGET
            </div>
            <div class="display-1 font-weight-bold text-xs-center">
                Grab hold of your finances with a great budget-management
                solution.
            </div>
            <v-btn fab class="mt-5 blue accent-4" name="nav-down">
                <v-icon large color="white">mdi-chevron-down</v-icon>
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'HomeHero'
};
</script>

<style scoped>
.home-hero {
    background: url('https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
