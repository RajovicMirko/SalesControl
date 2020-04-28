<template>
    <q-input
        class="customComponent"
        outlined
        dense
        :value="value"
        :label="label"
        :disable="disable"
        :dark="dark"
        :clearable="true"
        :rules="rules"
        :name="name"
        @input="change"
        :type="type"
    >
        <template v-slot:append>
            <q-icon :name="icon" />
        </template>
    </q-input>
</template>

<script>
    export default {
        name: "inPut",
        
        props:{
            value: {
                type: String | Number,
                default: '' | 0
            },
            label: {
                type: String
            },
            disable: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String
            },
            dark:{
                type: Boolean
            },
            rules:{
                type: Array
            },
            name:{
                type: String,
                requiered: true
            },
            type:{
                type: String,
                default: ''
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