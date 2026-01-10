<script setup>
// import { useGsap } from '@/composables/useGsap';
// const { pageTransition } = useGsap();

const onEnter = (el, done) => {
  //pageTransition(el, done);
};
</script>

<template>
  <div class="app-container">
    <nav class="global-nav">
      <router-link to="/">HOME</router-link>
      <router-link to="/black-chefs">BLACK</router-link>
      <router-link to="/white-chefs">WHITE</router-link>
      <router-link to="/vote">VOTE</router-link>
    </nav>

    <main class="content-wrapper">
      <router-view v-slot="{ Component }">
        <transition @enter="onEnter" :css="false">
          <div :key="$route.path"><component :is="Component" v-if="Component" /></div>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  // background-color: $black-color; // 기본 배경은 블랙
  // color: $white-color;
  background: #000;
  overflow-x: hidden;
}

.global-nav {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  gap: 20px;

  a {
    // color: rgba($white-color, 0.5);
    text-decoration: none;
    font-weight: 700;
    transition: color 0.3s;

    &.router-link-active {
      // color: $white-color;
      // border-bottom: 2px solid $white-color;
    }
  }
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
