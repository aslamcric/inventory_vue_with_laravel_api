<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Create Customer</h5>
        </div>

        <div class="card-body">
          <form @submit.prevent="submitData">
            <div class="app-form">
              <div class="mb-3">
                <label for="username" class="form-label">Name</label>
                <input v-model="customerData.name" type="text" class="form-control" placeholder="Enter Name"
                  id="username" />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="customerData.email" type="email" class="form-control" placeholder="Enter Email"
                  id="email" />
              </div>

              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input v-model="customerData.phone" type="text" class="form-control" placeholder="Enter Phone Number"
                  id="phone" />
              </div>

              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <textarea v-model="customerData.address" class="form-control" id="address" rows="3"
                  placeholder="Enter Address"></textarea>
              </div>

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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const customerData = reactive({
  name: "",
  phone: "",
  email: "",
  address: "",
});

const submitData = () => {
  const formData = new FormData();
  
  for (const key in customerData) {
    formData.append(key, customerData[key]);
  }

  api.post("/customers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      console.log(res);
      router.push({ path: "/customers" });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
img {
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
