<template>
    <q-checkbox
        class="customComponent"
        :disable="disable"
        :value="value"
        :label="label"
        :left-label="leftLabel"
        :dark="dark"
        :name="name"
        @input="change"
    />
</template>

<script>
    export default {
        name: "check",

        props:{
            id: {
                type: String,
                default: ''
            },
            value: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: ''
            },
            leftLabel: {
                type: Boolean,
                default: false
            },
            disable:{
                type:Boolean,
                default: false
            },
            dark:{
                type: Boolean,
                default: false
            },
            name:{
                type: String,
                requiered: true
            }
        },

        methods:{
            change(event){
                this.$emit('update:value', event);
                this.$emit('onChange', this.value);
            }
        }
    }
</script>