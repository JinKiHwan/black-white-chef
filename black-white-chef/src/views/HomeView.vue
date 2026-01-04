<script setup>
const hoverSide = () => {
  console.log('aa');
};
const resetSide = () => {
  console.log('aa');
};
</script>
<template>
  <section class="home-hero">
    <div class="side black-side" @mouseenter="hoverSide('black')" @mouseleave="resetSide">
      <div class="content">
        <h2>BLACK SPOON</h2>
        <button @click="$router.push('/black-chefs')">참가자 보러가기</button>
      </div>
    </div>

    <div class="side white-side" @mouseenter="hoverSide('white')" @mouseleave="resetSide">
      <div class="content">
        <h2>WHITE SPOON</h2>
        <button @click="$router.push('/white-chefs')">참가자 보러가기</button>
      </div>
    </div>

    <!-- <div class="center-logo">
      <img src="@/assets/images/logo.png" alt="Logo" class="flip-target" />
    </div> -->
  </section>
</template>

<style lang="scss">
.home-hero {
  display: flex;
  width: 100%;
  height: auto;
  aspect-ratio: 1920/1080;
  position: relative;

  .side {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1), flex-grow 0.6s cubic-bezier(0.25, 1, 0.5, 1);

    // &:hover {
    //   flex: 2.5; // 마우스 오버 시 영역이 넓어지는 효과
    //   width: 75%;
    // }
  }

  .black-side {
    background: url('/img/main_bg-left.webp') no-repeat bottom center / cover;
    color: #fff;
  }

  .white-side {
    background: url('/img/main_bg-right.webp') no-repeat bottom center / cover;
    color: #fff;
  }

  .center-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
}
</style>
