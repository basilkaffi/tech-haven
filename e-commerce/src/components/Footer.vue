<template>
  <div class="footer">
    <GmapMap
      :center="{ lat: -7.392769, lng: 109.244102 }"
      :zoom="16"
      map-type-id="roadmap"
      style="width: 76%; height: 100%"
    >
      <GmapMarker
        ref="myMarker"
        :position="google && new google.maps.LatLng(-7.392769, 109.244102)"
      />
    </GmapMap>
    <div class="address" style="width:24%">
      <p class="title">Contact</p>
      <p>
        <span
          ><img
            src="https://image.flaticon.com/icons/svg/447/447031.svg"
            alt="pin-icon"/></span
        > Banyumas, Central Java, Indonesia
      </p>
      <p>
        <span
          ><img
            src="https://image.flaticon.com/icons/svg/2089/2089181.svg"
            alt="mail-icon"/></span
        > basilarr7@gmail.com
      </p>
      <p>
        <span
          ><img
            src="https://image.flaticon.com/icons/svg/597/597177.svg"
            alt="phone-icon"/></span
        > +6282225822790
      </p>
    </div>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
export default {
  name: "Footer",
  computed: {
    google: gmapApi,
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #2f4f4f;
$secondary-color: #f5deb3;
$third-color: #ffffff;
$fourth-color: #808080;

$primary-font: "Merriweather", serif;
$secondary-font: "Roboto Condensed", sans-serif;

// $primary-color: #ffffff;
// $secondary-color: #5bc0de;
// $third-color: #146e8a;
// $fourth-color: #0e586e;

.footer {
  position: relative;
  bottom: 0;
  margin: 4rem auto 0 auto;
  height: 18rem;
  display: flex;
  background-color: $primary-color;
  .address {
    color: $third-color;
    text-align: left;
    padding: 1rem;
    .title {
      font-size: 1.4rem;
      font-family: $primary-font;
      color: $secondary-color;
      border-bottom: $secondary-color solid 3px;
      width: 7rem;
    }
    img {
      width: 1.5rem;
      filter: invert(90%);
    }
    p {
      font-family: $secondary-font;
      font-size: 1.1rem;
    }
  }
}
</style>
