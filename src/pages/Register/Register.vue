<template>
    <q-page
        class="flex justify-center items-start bg-grey-1"
        style="padding-top: 10%"
    >
        <q-card
            style="margin: 0; padding: 0; min-width: 320px; max-width: 400px;"
        >
            <q-card-section
                class="text-center bg-warning text-white"
                style="margin: 0 0 15px 0; padding: 0;"
            >
                <component
                    :is="$getComponent('cardTitle')"
                    title="Register"
                    class="text-h5 text-bold"
                >
                </component>
            </q-card-section>
            
            <q-card-section class="q-card-partner-form">
                <q-form
                    ref="regiserForm"
                    @submit="submitRegister"
                    class="flex q-form-partner justify-around"
                >
                    <component
                        class="q-card-partner-form-items"
                        v-for="component in registerForm"
                        :key="component.id"
                        :is="$getComponent(component.name)"
                        :value.sync="registerModel[component.id]"
                        v-bind="component"
                        :name="component.id"
                    ></component>

                    <div>
                        <component
                            :is="$getComponent('btn')"
                            v-bind="btnLoginSetup"
                            @click="loginUser"
                        ></component>

                        <component
                            :is="$getComponent('btn')"
                            v-bind="btnRegisterSetup"
                        ></component>
                    </div>
                </q-form>
            </q-card-section>

        </q-card>
    </q-page>
</template>

<script>
    export default {
        name: 'Register',

        data(){
            return {
                registerModel:{
                    name: '',
                    username: '',
                    email: '',
                    password: ''
                },
                registerForm: [
                    {
                        id: 'name',
                        name: 'inPut',
                        label: 'Name',
                        rules: [
                            val => !!val
                        ]
                    },
                    {
                        id: 'username',
                        name: 'inPut',
                        label: 'Username',
                        rules: [
                            val => !!val
                        ]
                    },
                    {
                        id: 'email',
                        name: 'inPut',
                        label: 'Email',
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

                btnRegisterSetup: {
                    color: "warning",
                    tooltip: "Register",
                    label: 'Register',
                    flat: true,
                    type: 'submit'
                },

                btnLoginSetup: {
                    color: "primary",
                    label: 'Login',
                    flat: true
                },
            }
        },

        methods: {
            submitRegister(){
                this.$store.dispatch('auth/register', this.registerModel, { root: true });
            }, 
            loginUser(){
                this.$router.push({
                    path: '/login'
                })
            }
        },

    }
</script>