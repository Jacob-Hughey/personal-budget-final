<template>
    <span>
        <v-navigation-drawer
            app
            v-model="drawer"
            class="blue lighten-2"
            dark
            disable-resize-watcher
        >
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-tile :key="index">
                        <v-list-tile-content>
                            {{ item.title }}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="blue accent-4" dark>
            <v-app-bar-nav-icon
                class="hidden-md-and-up"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title to="/">{{ appTitle }}</v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn text class="hidden-sm-and-down" to="/log-in">LOG IN</v-btn>
            <v-btn
                color="blue lighten-2"
                class="hidden-sm-and-down"
                to="/sign-up"
            >
                SIGN UP
            </v-btn>
        </v-toolbar>
    </span>
</template>

<script>
export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'Personal Budget',
            drawer: false,
            items: [
                { title: 'Menu' },
                { title: 'Log In' },
                { title: 'Sign Up' }
            ]
        };
    }
};
</script>

<style scoped>
.v-toolbar__title {
    color: white;
    text-decoration: none;
}
</style>
