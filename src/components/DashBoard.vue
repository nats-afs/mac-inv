<template lang="pug">
  v-app
    v-navigation-drawer(fixed, :mini-variant='miniVariant', :clipped='clipped', v-model='drawer', app, width="220")
      v-list
        v-list-tile(value='true', v-for='(item, i) in items', :key='i')
          v-list-tile-action
            v-icon(v-html='item.icon')
          v-list-tile-content
            v-list-tile-title(v-text='item.title')
    v-toolbar(dark, fixed, app, :clipped-left='clipped')
      v-toolbar-side-icon(@click.stop='drawer = !drawer')
      v-btn(icon, @click.stop='miniVariant = !miniVariant')
        v-icon(v-html="miniVariant ? 'chevron_right' : 'chevron_left'")
      v-btn(icon, @click.stop='clipped = !clipped')
        v-icon web
      v-btn(icon, @click.stop='fixed = !fixed')
        v-icon remove
      v-toolbar-title(v-text='title')
      v-spacer
      v-btn(icon, @click.stop='rightDrawer = !rightDrawer')
        v-icon menu
    v-content
      v-container(fluid,grid-list-xl)
        v-slide-y-transition(mode='out-in')
          router-view
    v-navigation-drawer(temporary, :right='right', v-model='rightDrawer', fixed)
      v-list
        v-list-tile(@click.native='right = !right')
          v-list-tile-action
            v-icon compare_arrows
          v-list-tile-title Switch drawer (click me)
    v-footer(:fixed='fixed', app)
      span © 2017

</template>

<script>
export default {
  data: () => ({
    clipped: false,
    drawer: true,
    fixed: false,
    items: [
      { icon: "bubble_chart", title: "Modelo" },
      { icon: "bubble_chart", title: "Acopio" },
      { icon: "bubble_chart", title: "Destinos" }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: "Mac Inventario"
  })
};
</script>
