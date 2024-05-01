import { defineStore } from "pinia";

export const userStore = defineStore("user", () => ({
  userId:'',
  userName: "",
  isLoggedIn: false,
  gid:'0',
  saveUserLogIn(userId:string,username: string,gid:string) {
    this.userId=userId;
    this.userName = username;
    this.isLoggedIn = true;
    localStorage.setItem('userId',userId);
    localStorage.setItem('userName', username); // 将用户名保存到 localStorage
    localStorage.setItem('isLoggedIn', 'true'); // 将登录状态保存到 localStorage
    localStorage.setItem('gid',gid);
  },

  getUserName(){
    return this.userName;
  },
  logout() {
    this.userName = ""; // 使用正确的属性名称
    this.isLoggedIn = false;
    localStorage.setItem('userName', ""); // 将用户名保存到 localStorage
    localStorage.setItem('isLoggedIn', 'false'); // 将登录状态保存到 localStorage
    localStorage.setItem('gid','0');//不需要
  }
}));

export const verfiyStore = defineStore("verfiy", () => ({
  email:'',
  saveEmail(email:string){
    this.email=email;
  },
  getEmail(){
    return this.email;
  }
}));

export default {verfiyStore,userStore};

