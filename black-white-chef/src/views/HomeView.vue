<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { useRouter } from 'vue-router';
import Logo from '@/components/Logo.vue';

const router = useRouter();
const logoRef = ref(null);
const activeSide = ref(null); // 현재 마우스가 올라간 사이드의 ID 저장
const hoverSide = (id) => {
  activeSide.value = id;
  console.log(`${id} side active`);
};
const resetSide = () => {
  activeSide.value = null;
  console.log('all sides reset');
};

const blackChefArea = ref(null);
const whiteChefArea = ref(null);
const sides = [
  {
    id: 'black',
    className: 'black-side',
    bg: '/img/main_bg-left.webp',
    title: '80인의 흑수저 요리사',
    desc: '이름을 버리고 실력만으로 승부하는 80인의 재야 요리사들',
    link: '/black-chefs',
  },
  {
    id: 'white',
    className: 'white-side',
    bg: '/img/main_bg-right.webp', // 백수저용 배경 이미지 경로 확인 필요
    title: '20인의 백수저 요리사',
    desc: '이미 왕좌에 오른 미슐랭 마스터 20인의 압도적 요리 세계',
    link: '/white-chefs',
  },
];

const videoRef = ref(null);
const onLogoDone = () => {
  console.log('로고 완료 확인, 홈 콘텐츠 애니메이션 시작');
  if (videoRef.value) {
    videoRef.value.playbackRate = 2.5; // 속도를 1.5배속으로 올림 (원하는 수치로 조절 가능)
    videoRef.value.play();
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power3.inOut' },
  });
  tl.to('.side', {
    opacity: 1,
    duration: 1,
    // stagger: 0.3,
  })
    .to('.side .background', {
      duration: 1,
      delay: 2,
      opacity: 0.15,
    })
    .to('.painting', {
      visibility: 'hidden',
    });
};

/* Router Animation */
const linkToSubPage = async (id) => {
  console.log(`이동할 페이지 ID: ${id}`);

  // 1. 전체 화면(Side 영역 등) 사라지는 애니메이션 실행
  const mainTl = gsap.timeline();
  mainTl.to('.home-hero-wrap', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
  });

  // 2. 자식(Logo) 컴포넌트의 아웃트로 애니메이션 호출 (await로 끝날 때까지 대기)
  if (logoRef.value) {
    await logoRef.value.animateOut(id);
  }

  // 3. 모든 애니메이션이 끝난 후 실제 페이지 이동
  // router.push(`/${id}-chefs`);
};
</script>
<template>
  <section class="home-hero">
    <div class="home-hero-wrap">
      <figure class="painting">
        <video ref="videoRef" src="/videos/painting.mp4" playsinline muted></video>
      </figure>

      <div v-for="side in sides" :key="side.id" :class="['side', side.className, { 'is-active': activeSide === side.id, 'is-dimmed': activeSide && activeSide !== side.id }]" @mouseenter="hoverSide(side.id)" @mouseleave="resetSide">
        <div class="background" :style="{ backgroundImage: `url(${side.bg})` }"></div>

        <div class="hover-area"></div>

        <div class="content">
          <h2>{{ side.title }}</h2>
          <p class="desc" v-html="side.desc"></p>
          <button @click="linkToSubPage(side.id)">{{ side.id === 'black' ? '흑수저' : '백수저' }} 참가자 보기</button>
        </div>
      </div>
    </div>
    <Logo ref="logoRef" @animation-finish="onLogoDone" />
  </section>
</template>

<style lang="scss">
.home-hero {
  display: flex;
  width: 100%;
  height: auto;
  aspect-ratio: 1920/1080;
  position: relative;
  background: #000;

  &-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    overflow: hidden;

    .painting {
      position: absolute;
      z-index: 2;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      mix-blend-mode: multiply;

      video {
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
  }

  .side {
    width: 50%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 0;
    // opacity: 0;

    // &:hover {
    //   flex: 2.5; // 마우스 오버 시 영역이 넓어지는 효과
    //   width: 75%;
    // }

    &.is-active {
      .content {
        opacity: 1;
        * {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .background {
        opacity: 8 !important;
      }
    }

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: bottom center;
      background-repeat: no-repeat;
      // filter: brightness(0.25);
      transition: opacity 0.5s;
      transition-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
      z-index: -1;
    }

    .content {
      transition: opacity 0.25s;
      opacity: 0;
      font-family: 'Pretendard';

      * {
        opacity: 0;
        transform: translateY(15px);
        transition: transform 0.25s, opacity 0.25s;
        transition-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }

      // .sub-title {
      //   font-family: 'Pretendard';
      //   font-size: 30px;
      //   font-weight: 700;
      // }
      h2 {
        font-size: 42px;
        font-weight: 600;
        margin-bottom: 15px;
        text-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.5);
      }

      p {
        font-size: 18px;
        margin-bottom: 15px;
        transition-delay: 0.15s;
        text-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.5);
      }

      button {
        color: #000;
        font-size: 16px;
        font-weight: 500;
        padding: 12px 15px;
        position: relative;
        z-index: 0;
        transition-delay: 0.25s;

        &::before {
          content: '';
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          display: block;
          transform: skew(-15deg);
        }
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

    .hover-area {
      position: absolute;
      z-index: 0;
      left: 0;
      top: 0;
      width: calc(100% - 100px);
      height: 100%;
      pointer-events: auto;
    }
  }

  .white-side {
    color: #fff;

    .background {
      background: url('/img/main_bg-right.webp') no-repeat bottom center / cover;
    }
    .hover-area {
      position: absolute;
      z-index: 0;
      right: 0;
      top: 0;
      width: calc(100% - 100px);
      height: 100%;
    }
    .content {
      text-align: right;
    }
  }
}
</style>
