<template>
  <q-item
    clickable
    :to="to"
    :tag="tag"
    :target="target"
    :href="href"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    to: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    tag: {
      type: String,
      default: ''
    },

    target: {
      type: String,
      default: ''
    },

    href: {
      type: String,
      default: ''
    },
  }
}
</script>