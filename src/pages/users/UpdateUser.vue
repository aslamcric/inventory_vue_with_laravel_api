<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Update User</h5>
        </div>

        <div class="card-body">
          <form @submit.prevent="submitData">
            <div class="app-form">
              <!-- Name -->
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="userData.name" type="text" class="form-control" placeholder="Enter Name" id="name" />
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="userData.email" type="email" class="form-control" placeholder="Enter Email" id="email" />
              </div>

              <!-- Password -->
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="userData.password" type="password" class="form-control" placeholder="Enter New Password (optional)" id="password" />
              </div>

              <!-- Submit -->
              <div>
                <button type="submit" class="btn btn-primary">Update</button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/Api';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { id } = useRoute().params;
// console.log(id);

const router = useRouter();

const userData = reactive({
  id: "",
  name: "",
  email: "",
  password: ""
});

onMounted(() => {
  fetchUser();
});

const fetchUser = () => {
  api.get(`/users/${id}`)
  .then((result) => {
    const user = result.data.user;
    
    userData.id = user.id;
    userData.name = user.name;
    userData.email = user.email;
    userData.password = user.password;
  })
  .catch((err) => {
    console.log("Fetch error:", err);
  });
};

const submitData = () => {
  api.put(`/users/${userData.id}`, userData)
    .then((result) => {
      console.log("User updated:", result.data);
      router.push('/users');
    })
    .catch((err) => {
      console.log("Update error:", err);
    });
};
</script>

<style scoped>
/* Optional: Add your styles */
</style>
