<template>
    <q-avatar color="primary" text-color="white">
        {{ value }}
    </q-avatar>
</template>

<script>
    export default {
        name: 'avatarInitials',
        props: {
            value:{
                type: String,
                default: ''
            }
        }
    }
</script>