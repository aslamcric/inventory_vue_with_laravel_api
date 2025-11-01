import { defineStore } from "pinia";
import api from "@/Api";
import router from "@/router";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setToken(token) {
      this.token = token;
      if (token) {
        localStorage.setItem("token", token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        localStorage.removeItem("token");
        delete api.defaults.headers.common.Authorization;
      }
    },

    async login({ email, password }) {
      const res = await api.post("/login", { email, password });
      const token = res.data.token || res.data?.data?.token;
      if (!token) throw new Error("No token returned from login");

      this.setToken(token);
      return res;
    },

    

    async fetchUser() {
      if (!this.token) return null;
      const res = await api.get("/user");
      this.user = res.data;
      return this.user;
    },

    async logout() {
      try {
        await api.post("/logout");
      } catch (e) {
        // ignore network error on logout
      }
      this.setToken(null);
      this.user = null;
      router.push("/login");
    },
  },
});
