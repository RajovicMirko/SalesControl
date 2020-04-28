<template>
    <div class="row items-center no-wrap">
        <div class="col">
            <q-item>
                <q-item-section>
                    <q-item-label v-if="title">{{ title }}</q-item-label>
                    <q-item-label v-if="caption" caption lines="2">Id: {{ caption }}</q-item-label>
                </q-item-section>
            </q-item>
        </div>

        <slot name="buttons" />

        <div
            class="col-auto"
            v-if="!!this.$slots['sideActions'] || !!this.$scopedSlots['sideActions']"
        >
            <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                    <slot name="sideActions" />
                </q-menu>
            </q-btn>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cardTitle",
        props: {
            caption:{
                type: String
            },
            title:{
                type: String,
                requiered: true
            }
        }
    }
</script>