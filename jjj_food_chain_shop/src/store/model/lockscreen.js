import { defineStore  } from 'pinia';

// 长时间不操作默认锁屏时间
const initTime = 60 * 60 * 24 * 30;


export const useLockscreenStore = defineStore({
  id: 'app-lockscreen',
  state: () => ({
    isLock: false,   // 是否锁屏 原isLock === true, 
    // lockTime: isLock == 'true' ? initTime : 0,
    lockTime: 0,
  }),
  getters: {

  },
  actions: {
    setLock(payload) {
      this.isLock = payload;
    },
    setLockTime(payload = initTime) {
      this.lockTime = payload;
    },
  },
  persist:{
    key:'app-lockscreen',
    storage: localStorage,
    },
});
