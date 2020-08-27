<template>
  <div>
    <Navbar style="position: relative;" :inBanner="true" />
    <vueper-slides
      autoplay
      ref="myVueperSlides"
      :arrows="false"
      :parallax="parallax"
      :parallax-fixed-content="parallaxFixedContent"
      :touchable="false"
      :duration=2000
      :fixedHeight="'35rem'"
      style="z-index: 1;"
    >
      <vueper-slide
        v-for="banner in banners"
        :key="banner.id"
        :image="banner.img_url"
      />
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import Navbar from "./Navbar";
export default {
  name: "Banner",
  components: {
    VueperSlides,
    VueperSlide,
    Navbar,
  },
  data() {
    return {
      parallax: 1,
      parallaxFixedContent: false,
    };
  },
  computed: {
    banners() {
      return this.$store.state.banners;
    },
  },
};
</script>
