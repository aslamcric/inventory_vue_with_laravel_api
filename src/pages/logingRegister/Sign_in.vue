<template>
    <div class="main-wrapper">
        <div class="account-content">
            <div class="login-wrapper bg-img">
                <div class="login-content">
                    <form @submit.prevent="handleLogin">
                        <div class="login-userset">
                            <div class="login-logo logo-normal">
                                <img src="/assets/img/logo.png" alt="Logo" />
                            </div>

                            <div class="login-userheading">
                                <h3>Sign In</h3>
                                <h4>Access the system using your email and password.</h4>
                            </div>

                            <div class="form-login mb-3">
                                <label class="form-label">Email Address</label>
                                <div class="form-addons">
                                    <input v-model="loginObj.email" type="email" class="form-control" required />
                                    <img src="/assets/img/mail.svg" alt="mail" />
                                </div>
                            </div>

                            <div class="form-login mb-3">
                                <label class="form-label">Password</label>
                                <div class="pass-group">
                                    <input v-model="loginObj.password" type="password" class="form-control" required />
                                    <span class="fas toggle-password fa-eye-slash"></span>
                                </div>
                            </div>

                            <div class="form-login">
                                <button type="submit" class="btn btn-login">Sign In</button>
                            </div>

                            <!-- Error Message -->
                            <div class="form-login" v-if="errorMessage">
                                <div class="alert alert-danger">{{ errorMessage }}</div>
                            </div>

                            <div class="signinform">
                                <h4>
                                    New on our platform?
                                    <a href="#" class="hover-a">Create an account</a>
                                </h4>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- <script setup>
import { reactive, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/AuthStore";

const loginObj = reactive({
    email: "",
    password: "",
});

const errorMessage = ref("");
const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
    errorMessage.value = "";

    try {
        await auth.login(loginObj);  // login & save token
        await auth.fetchUser();      // fetch user info
        await nextTick();
        router.push("/dashboard");   // redirect to dashboard
    } catch (err) {
        console.error("Login failed:", err);
        errorMessage.value = err.response?.data?.message || "Invalid email or password";
    }
};
</script> -->

<!-- inside Sign_in.vue (script) -->
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/AuthStore";
import { nextTick } from "vue";

const loginObj = reactive({
    email: "",
    password: "",
});

const errorMessage = ref("");
const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
    errorMessage.value = "";

    try {
        // 1. call login -> sets token in store + axios header
        await auth.login(loginObj);

        // 2. fetch user details and set in store
        await auth.fetchUser();

        // ensure reactivity updates
        await nextTick();

        // 3. navigate to dashboard
        router.push("/dashboard");
    } catch (err) {
        console.error("Login failed:", err);
        errorMessage.value = err.response?.data?.message || err.message || "Invalid email or password";
    }
};
</script>


<style scoped>
.bg-img {
    background-image: url("/assets/img/login_aslam_done.png");
    background-size: cover;
    background-position: center;
    height: 100vh;
}

.alert {
    padding: 12px;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
}

.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
}
</style>
