import { ref } from 'vue';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/firebase';

export function useAuth() {
  const user = ref(null);

  // 로그인 상태 관찰
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      user.value = result.user;
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  };

  const logout = () => signOut(auth);

  return { user, loginWithGoogle, logout };
}
