<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h3 class="mb-0">Create User</h3>
                </div>

                <div class="card-body">
                    <form @submit.prevent="createUser">
                        <div class="app-form">
                            <!-- Name -->
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input v-model="userData.name" type="text" class="form-control" id="name"
                                    placeholder="Enter name" />
                            </div>

                            <!-- Email -->
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input v-model="userData.email" type="email" class="form-control" id="email"
                                    placeholder="Enter email" />
                            </div>

                            <!-- Password -->
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input v-model="userData.password" type="password" class="form-control" id="password"
                                    placeholder="Enter password" />
                            </div>

                            <!-- Submit Button -->
                            <div>
                                <button type="submit" class="btn btn-primary">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from "@/Api";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userData = reactive({
    name: "",
    email: "",
    password: "",
});

const createUser = () => {
    api
        .post("/users", userData)
        .then((result) => {
            console.log(result);
            router.push({ path: "/users" });
        })
        .catch((err) => {
            console.log(err.response?.data || err);
        });
};
</script>

<style></style>
