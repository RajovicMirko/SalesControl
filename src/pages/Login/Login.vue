<template>
    <q-page
        class="flex justify-center items-start bg-grey-1"
        style="padding-top: 10%"
    >
        <q-card
            style="margin: 0; padding: 0; min-width: 320px; max-width: 400px;"
        >
            <q-card-section
                class="text-center bg-primary text-white"
                style="margin: 0 0 15px 0; padding: 0;"
            >
                <component
                    :is="$getComponent('cardTitle')"
                    title="Login"
                    class="text-h5 text-bold"
                >
                </component>
            </q-card-section>
            
            <q-card-section class="q-card-partner-form">
                <q-form
                    @submit="submitLogin"
                    class="flex q-form-partner justify-around"
                >
                    <component
                        class="q-card-partner-form-items"
                        v-for="component in loginForm"
                        :key="component.id"
                        :is="$getComponent(component.name)"
                        :value.sync="loginModel[component.id]"
                        v-bind="component"
                        :name="component.id"
                    ></component>

                    <div>
                        <component
                            :is="$getComponent('btn')"
                            v-bind="btnLoginSetup"
                        ></component>

                        <component
                            :is="$getComponent('btn')"
                            v-bind="btnRegisterSetup"
                            @click="regiserUser"
                        ></component>
                    </div>

                </q-form>
            </q-card-section>

        </q-card>
    </q-page>
</template>

<script>
    export default {
        name: 'Login',

        data(){
            return {
                loginModel:{
                    username: '',
                    password: ''
                },
                loginForm: [
                    {
                        id: 'username',
                        name: 'inPut',
                        label: 'Username',
                        rules: [
                            val => !!val
                        ]
                    },
                    {
                        id: 'password',
                        name: 'inPut',
                        label: 'Password',
                        type: 'password',
                        rules: [
                            val => !!val
                        ]
                    }
                ],

                btnLoginSetup: {
                    color: "primary",
                    tooltip: "Login",
                    label: 'Login',
                    flat: true,
                    type: 'submit'
                },

                btnRegisterSetup: {
                    color: "warning",
                    label: 'Register',
                    flat: true
                }
            }
        },

        methods: {
            submitLogin(){
                this.$store.dispatch('auth/login', this.loginModel, { root: true });
            },

            regiserUser(){
                this.$router.push({
                    path: '/register'
                })
            }
        },

    }
</script>