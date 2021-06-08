<template>
  <d2-container type="ghost">
    <d2-module-index-menu :menu="menu"/>
  </d2-container>
</template>

<script>
import menu from '@/menu/modules/lab'
export default {
  data () {
    return {
      menu
    }
  }
}
</script>
