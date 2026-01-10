<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const emit = defineEmits(['animation-finish']);

onMounted(() => {
  const tl = gsap.timeline({
    defaults: { ease: 'power3.inOut' },
    onComplete: () => {
      emit('animation-finish');
    },
  });

  tl.set('.spoon', {
    rotate: 90,
    opacity: 0,
    scale: 0.95,
  })
    .to('.spoon', {
      rotate: 0,
      opacity: 1,
      scale: 1,
      duration: 2.5,
      ease: 'expo.inOut',
    })
    .to('.spoon-bg-wt', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      duration: 1,
      ease: 'power3.inOut',
    })
    .to(
      '.spoon-black img',
      {
        rotateY: 0,
        duration: 1,
        ease: 'power3.inOut',
      },
      '-=0.45'
    )
    .to('.spoon-bg-bl', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      duration: 1,
      ease: 'power3.inOut',
    })
    .to(
      '.spoon-black img',
      {
        rotateY: 90,
        duration: 1,
        ease: 'power3.inOut',
      },
      '-=0.45'
    )
    .to(
      '.spoon-white img',
      {
        rotateY: 0,
        duration: 1,
        ease: 'power3.inOut',
      },
      '-=0.45'
    )
    .to('.spoon-black img', {
      rotateY: 0,
      duration: 1,
      ease: 'power3.inOut',
    })
    .to('.bls-logo', {
      backgroundColor: 'rgba(245, 245, 245, 0)',
      duration: 2,
    });
});
</script>

<template>
  <div class="bls-logo">
    <!-- 로고 전체 wrap -->
    <div class="spoon">
      <div class="spoon-bg">
        <div class="spoon-bg-first-floor">
          <!-- white -->
          <div></div>
          <!-- black -->
          <div></div>
        </div>

        <div class="spoon-bg-second-floor">
          <div class="spoon-bg-second-floor-wrap">
            <div class="spoon-bg-wt"></div>
            <div class="spoon-bg-bl"></div>
          </div>
        </div>

        <div class="spoon-figure">
          <div class="spoon-figure-wrap">
            <figure class="spoon-black">
              <img src="/img/spoon-black.webp" alt="" />
            </figure>
            <figure class="spoon-white">
              <img src="/img/spoon-white.webp" alt="" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bls-logo {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #f5f5f5, $alpha: 1);
  .spoon {
    width: 200px;
    aspect-ratio: 1/1;
    // width: 100%;
    // height: 100%;
    position: relative;
    border-radius: 50%;
    overflow: hidden;

    &-bg {
      &-first-floor {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        z-index: 0;
        div {
          flex: 1;
          &:first-child {
            background: #fff;
          }
          &:last-child {
            background: #000;
          }
        }
      }
      &-second-floor {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 20px);
        aspect-ratio: 1/1;
        border-radius: 50%;
        display: flex;
        background: url('/img/texture.webp') no-repeat center center/cover;

        &-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          border-radius: 50%;
          overflow: hidden;

          div {
            flex: 1;
            &:first-child {
              background: #000;
              clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
            }
            &:last-child {
              background: #fff;
              clip-path: polygon(100% 0, 100% 0%, 100% 100%, 100% 100%);
            }
          }
        }
      }
    }

    &-figure {
      position: absolute;
      z-index: 2;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 20px);
      aspect-ratio: 1/1;

      &-wrap {
        width: 100%;
        height: 100%;
        position: relative;

        figure {
          height: 100%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);

          &.spoon-white {
            left: calc(50% + 1px);
          }
          &.spoon-black {
            left: calc(50% - 0px);
          }

          img {
            height: 100%;
            object-fit: contain;
            transform: rotateY(90deg);
          }

          &.spoon-black {
            filter: drop-shadow(-4px 0 0 rgba(#000, 1));
          }
        }
      }
    }
  }
}
</style>
