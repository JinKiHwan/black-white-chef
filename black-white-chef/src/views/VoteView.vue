<script setup>
import { onMounted } from 'vue';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import VoteResult from '@/components/VoteResult.vue';

const isVoted = ref(false);
const { user, loginWithGoogle } = useAuth();
const selectedChefs = ref([]);

// 샘플 데이터 (나중에 Firebase에서 가져오도록 확장 가능)
const chefs = ref([
  { id: 'chef1', name: '트리플 스타', team: 'black' },
  { id: 'chef2', name: '철가방 요리사', team: 'black' },
  { id: 'chef3', name: '최강록', team: 'white' },
  { id: 'chef4', name: '에드워드 리', team: 'white' },
]);

const toggleSelection = (id) => {
  const idx = selectedChefs.value.indexOf(id);
  if (idx > -1) selectedChefs.value.splice(idx, 1);
  else if (selectedChefs.value.length < 3) selectedChefs.value.push(id);
};

const submitVote = async () => {
  console.log('1. 투표 함수 진입'); // 확인용
  console.log('2. 현재 유저 상태:', user.value); // 이게 null이면 아래서 return 됩니다.

  if (!user.value) {
    console.error('유저 정보가 없어 투표를 중단합니다.');
    return;
  }

  try {
    console.log('3. 데이터 저장 시도 중...');
    await setDoc(doc(db, 'votes', user.value.uid), {
      userId: user.value.uid,
      userName: user.value.displayName,
      selections: selectedChefs.value,
      timestamp: new Date(),
    });

    console.log('4. aaa'); // 이제 여기까지 도달하는지 확인!
    isVoted.value = true;
    alert('투표가 완료되었습니다!');
  } catch (e) {
    console.error('5. 투표 저장 실패:', e);
  }
};

onMounted(() => {
  // 사용자의 로그인 상태가 바뀌는지 관찰합니다.
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // 로그인된 사용자의 투표 기록이 DB에 있는지 확인합니다.
      const docRef = doc(db, 'votes', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('이미 투표한 기록이 있습니다.');
        isVoted.value = true; // 자동으로 결과창으로 이동!
      }
    }
  });
});
</script>

<template>
  <div class="vote-container">
    <div v-if="!user" class="login-gate">
      <h2>투표를 위해 로그인이 필요합니다</h2>
      <button @click="loginWithGoogle" class="btn-google">구글로 시작하기</button>
    </div>

    <div v-else class="vote-content">
      <transition name="page-flip" mode="out-in">
        <div v-if="!isVoted" key="voting" class="view-step">
          <header class="vote-header">
            <p>반가워요, {{ user.displayName }}님!</p>
            <p class="guide">가장 응원하는 셰프를 <strong>최대 3명</strong> 선택해주세요 ({{ selectedChefs.length }}/3)</p>
          </header>

          <div class="chef-grid">
            <div v-for="chef in chefs" :key="chef.id" class="chef-card" :class="{ selected: selectedChefs.includes(chef.id), black: chef.team === 'black', white: chef.team === 'white' }" @click="toggleSelection(chef.id)">
              <div class="card-inner">
                <span class="team-tag">{{ chef.team.toUpperCase() }}</span>
                <h3>{{ chef.name }}</h3>
              </div>
            </div>
          </div>

          <div class="footer-action">
            <button @click="submitVote" class="btn-submit" :disabled="selectedChefs.length === 0">투표 제출하기</button>
          </div>
        </div>

        <div v-else key="result" class="view-step">
          <VoteResult />
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vote-container {
  padding: 100px 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  .chef-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    margin: 40px 0;
  }

  .chef-card {
    cursor: pointer;
    padding: 30px;
    border: 1px solid #333;
    transition: all 0.3s ease;

    &.selected {
      // border-color: $white-color;
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-5px);
    }
  }

  .btn-submit {
    width: 100%;
    padding: 15px;
    background: #fff;
    color: #000;
    font-weight: bold;
    &:disabled {
      opacity: 0.3;
    }
  }
}
</style>
