<template lang="pug">
  v-app
    router-view
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
