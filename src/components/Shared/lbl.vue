<template>
    <div>
        <q-item-label
            caption
            v-if="caption"
        >
            {{ caption }}
        </q-item-label>
        
        <q-item-label>{{ label }}</q-item-label>
    </div>
</template>

<script>
    export default {
        name: 'lbl',
        props: {
            caption:{
                type: String,
                default: ''
            },
            label:{
                type: String,
                default: ''
            }
        }
    }
</script>