// Firebase 기본 SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { v4 as uuidv4 } from 'uuid';

// Firebase Auth 관련 추가
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";

// Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyC9o7gfzjiDJDuYhs086LE4eD35TTWDYFo",
  authDomain: "board-e6aa8.firebaseapp.com",
  databaseURL: "https://board-e6aa8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "board-e6aa8",
  storageBucket: "board-e6aa8.firebasestorage.app",
  messagingSenderId: "912852783709",
  appId: "1:912852783709:web:9945e2d3e589a79c37f3b4",
  measurementId: "G-X96YZ46CRK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Auth 객체 생성
export const auth = getAuth(app);

// ✅ 구글 로그인 프로바이더
const provider = new GoogleAuthProvider();

// ✅ Firebase 초기화
const database = getDatabase(app);

// ✅ 로그인 함수
export const login = async () => {
    const isMobile = /Mobi/i.test(navigator.userAgent);
    try {
      if (isMobile) {
        // 모바일은 리디렉션만 시키고 함수 종료
        await signInWithRedirect(auth, provider);
        return;
      } else {
        // 데스크탑은 팝업으로 로그인하고 바로 user 반환
        const result = await signInWithPopup(auth, provider);
        return result.user;
      }
    } catch (error) {
      console.error("로그인 에러", error);
    }
  };

  // ✅ 로그아웃 함수
export const logout = async () => {
    try {
        await signOut(auth);
        console.log("Success LogOut🔥🔥🔥")
    } catch (error) {
        console.error("로그아웃 에러", error);
    }
};

// ✅ 로그인 상태 감지
export const onUserStateChanged = (callback) => {
    onAuthStateChanged(auth, async (user) => {
        if(user) {
            console.log(user)
            callback(user);
        } else {
            callback(null)
        }
    });
};

// ✅ 게시글 추가
export const addNewPost = async (form) => {
    try{
      const id = uuidv4();
      const { uid, ...formData } = form;
      await set(ref(database, `posts/${uid}/${id}`), formData);
      return true
    } catch(error) {
      console.log('게시글 등록 실패 : ', error)
      return false 
    }
  }