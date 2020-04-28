<template>
    <q-banner
        class="banner-custom bg-primary text-white"
    >
        <q-item class="banner-custom-item">
            <q-item-section class="banner-custom-item-title" :class="titleClass" v-if="title">
                <span>{{ title }}</span>
            </q-item-section>

            <q-item-section
                v-if="!!this.$slots['center'] || !!this.$scopedSlots['center']"
                class="banner-custom-item-center"
            >
                <slot name="center"></slot>
            </q-item-section>

            <q-item-section
                v-if="!!this.$slots['center2'] || !!this.$scopedSlots['center2']"
                class="banner-custom-item-center2"
            >
                <slot name="center2"></slot>
            </q-item-section>

            <q-item-section
                v-if="!!this.$slots['right'] || !!this.$scopedSlots['right']"
                class="banner-custom-item-right"
                side
            >
                <slot name="right"></slot>
            </q-item-section>
        </q-item>
    </q-banner>
</template>

<script>
    export default {
        name: "Banner",
        props:{
            title:{
                type: String,
                required: true
            },
            titleClass:{
                type: String
            }
        }
    }
</script>