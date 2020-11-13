<template>
    <v-container fluid class="login">
        <v-layout justify-center align-center column class="info">
            <div class="display-2 font-weight-black">
                Log In
            </div>
            <v-form ref="form" lazy-validation>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    :type="'password'"
                    required
                ></v-text-field>
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="submit"
                >
                    Submit
                </v-btn>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid'
        ],
        password: '',
        passwordRules: [v => !!v || 'Password is required']
    }),
    name: 'Log-In'
};
</script>

<style scoped>
.login {
    background: url('https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80');
    background-size: cover;
    width: 100%;
    height: 100%;
}
.info {
    background-color: white !important;
    width: 70%;
    height: 70%;
    margin-top: 7.5%;
    margin-left: 15%;
}
input {
    border-style: solid;
}
</style>
