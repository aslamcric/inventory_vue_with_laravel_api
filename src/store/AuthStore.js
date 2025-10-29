// AuthStore.js
import { defineStore } from "pinia";
import { api } from "../services/axios";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    user: null,
    token: localStorage.getItem("auth_token") || null, // ✅ load token from localStorage
  }),

  actions: {
    async login(loginObj) {
      try {
        const res = await api.post("/login", {
          email: loginObj.email,
          password: loginObj.password,
        });

        // Save user and token
        this.user = res.data.user;
        this.token = res.data.token;

        // Save token to localStorage
        localStorage.setItem("auth_token", this.token);

        return res;
      } catch (err) {
        console.error("Login error:", err);
        throw err;
      }
    },

    async fetchUser() {
      if (!this.token) return;
      try {
        const res = await api.get("/user"); // interceptor already adds Authorization
        this.user = res.data;
      } catch (err) {
        console.error("Fetch user error:", err);
        this.user = null;
      }
    },

    async logout() {
      try {
        await api.post("/logout"); // interceptor handles token
        this.user = null;
        this.token = null;
        localStorage.removeItem("auth_token");
      } catch (err) {
        console.error("Logout error:", err);
      }
    },
  },
});
