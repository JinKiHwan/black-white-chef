<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import Logo from '@/components/Logo.vue';

// const hoverSide = () => {
//   console.log('aa');
// };
// const resetSide = () => {
//   console.log('aa');
// };

const onLogoDone = () => {
  console.log('로고 완료 확인, 홈 콘텐츠 애니메이션 시작');
  const tl = gsap.timeline({
    defaults: { ease: 'power3.inOut' },
  });
  tl.to('.side', {
    opacity: 1,
    duration: 1,
    // stagger: 0.3,
  });
};
</script>
<template>
  <section class="home-hero">
    <div class="side black-side">
      <div class="background"></div>
      <div class="content">
        <h2>흑수저 참가자 보러가기</h2>
        <!-- <button @click="$router.push('/black-chefs')">참가자 보러가기</button> -->
      </div>
    </div>

    <div class="side white-side">
      <div class="background"></div>
      <div class="content">
        <h2>백수저 참가자 보러가기</h2>
        <!-- <button @click="$router.push('/white-chefs')">참가자 보러가기</button> -->
      </div>
    </div>

    <Logo @animation-finish="onLogoDone" />

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
  background: #e6e6e6;

  .side {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1), flex-grow 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    position: relative;
    z-index: 0;
    opacity: 0;

    // &:hover {
    //   flex: 2.5; // 마우스 오버 시 영역이 넓어지는 효과
    //   width: 75%;
    // }

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: bottom center;
      background-repeat: no-repeat;
      filter: brightness(0.25);
      z-index: -1;
    }

    .content {
      opacity: 0;

      h2 {
        font-family: 'BookkMyungjo';
        font-size: 30px;
        font-weight: 700;
      }
    }
  }

  .black-side {
    // background: url('/img/main_bg-left.webp') no-repeat bottom center / cover;
    color: #fff;
    z-index: 1;

    .background {
      background: url('/img/main_bg-left.webp') no-repeat bottom center / cover;
    }
  }

  .white-side {
    color: #fff;

    .background {
      background: url('/img/main_bg-right.webp') no-repeat bottom center / cover;
    }
  }

  // .center-logo {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   pointer-events: none;
  // }
}
</style>
