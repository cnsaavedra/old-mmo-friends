<template>
  <div class="hello">
    <v-carousel
        delimiter-icon="stop"
        prev-icon="mdi-arrow-left"
        next-icon="mdi-arrow-right"
    >
        <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
        >
    </v-carousel-item>
  </v-carousel>

    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>

  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items: [
          {
              src: 'https://s3.amazonaws.com/ext-asset/fb-image.jpg'
          },
          {
              src: 'https://www.idcgames.com/media_xml/mediaFiles/wallpaper-16071418042016-1920x1080.jpg'
          },
          {
            src: 'https://1.bp.blogspot.com/-sp9QgSc5UyY/WvRTpdXNGUI/AAAAAAAAC6g/xcFvfrzT11AzGUKDgabCC7zRhWKy5IuRACLcBGAs/s1600/lineage-2-revolution-mobile-mmorpg-lancamento-1440x500.png'
          },
          {
            src: 'http://www.oddonegames.com/home/wp-content/uploads/2017/02/S-1.jpg'
          }
        ]
    }
  }
}
</script>
