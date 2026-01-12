<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import Logo from '@/components/Logo.vue';

const hoverSide = (id) => {
  console.log(`${id} side hover`);
};
const resetSide = () => {
  // console.log('aa');
};

const blackChefArea = ref(null);
const whiteChefArea = ref(null);
const sides = [
  {
    id: 'black',
    className: 'black-side',
    bg: '/img/main_bg-left.webp',
    subTitle: '무명의 반란',
    title: '맛에는 계급이 없다',
    desc: '이름을 버리고 실력만으로 승부하는<br>80인의 재야 요리사들',
    link: '/black-chefs',
  },
  {
    id: 'white',
    className: 'white-side',
    bg: '/img/main_bg-right.webp', // 백수저용 배경 이미지 경로 확인 필요
    subTitle: '거장의 품격',
    title: '정점은 증명하는 자리다',
    desc: '이미 왕좌에 오른 미슐랭 마스터<br>20인의 압도적 요리 세계',
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
</script>
<template>
  <section class="home-hero">
    <div class="home-hero-wrap">
      <figure class="painting">
        <video ref="videoRef" src="/videos/painting.mp4" playsinline muted></video>
      </figure>

      <div v-for="side in sides" :key="side.id" :class="['side', side.className]">
        <div class="background" :style="{ backgroundImage: `url(${side.bg})` }"></div>

        <div class="hover-area" @mouseenter="hoverSide(side.id)" @mouseleave="resetSide"></div>

        <div class="content">
          <p class="sub-title">{{ side.subTitle }}</p>
          <h2>{{ side.title }}</h2>
          <p class="desc" v-html="side.desc"></p>
          <button @click="$router.push(side.link)">{{ side.id === 'black' ? '흑수저' : '백수저' }} 참가자 보기</button>
        </div>
      </div>
    </div>
    <Logo @animation-finish="onLogoDone" />
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

    .painting {
      position: absolute;
      z-index: 2;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
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
    transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1), flex-grow 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    position: relative;
    z-index: 0;
    border: 1px solid #f00;
    // opacity: 0;

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
      // filter: brightness(0.25);
      z-index: -1;
    }

    .content {
      opacity: 1;

      .sub-title {
        font-family: 'BookkMyungjo';
        font-size: 30px;
        font-weight: 700;
      }
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

    .hover-area {
      position: absolute;
      z-index: 0;
      left: 0;
      top: 0;
      width: calc(100% - 100px);
      height: 100%;
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
