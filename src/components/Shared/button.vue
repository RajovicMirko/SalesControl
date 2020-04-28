<template>
    <q-btn
        class="customComponent"
        :flat="flat"
        :round="round"
        :icon="icon !== '' ? icon : ''"
        :color="color"
        :text-color="textColor"
        :type="type"
        :size="size"
        :label="label"
        :dense="dense"
        @click.stop="type | clickMe()"
    >
        <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
    </q-btn>
</template>

<script>
    export default {
        name: "CustomButton",
        props:{
            label:{
                type: String,
                default: ''
            },
            flat:{
                type: Boolean,
                default: false
            },
            round:{
                type: Boolean,
                default: false
            },
            icon:{
                type: String
            },
            color:{
                type: String,
                default: 'primary'
            },
            textColor:{
                type: String
            },
            tooltip:{
                type: String,
                default: ''
            },
            type:{
                type: String,
                default: ''
            },
            size:{
                type: String,
                default: ''
            },
            dense:{
                type: Boolean,
                default: false
            }
        },
        methods:{
            clickMe(){
                this.$emit("click");
            }
        }
    }
</script>