<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Update Customer</h5>
        </div>

        <div class="card-body">
          <form @submit.prevent="submitData" enctype="multipart/form-data">
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
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { id } = useRoute().params;
const router = useRouter();

const imgUrl = import.meta.env.VITE_IMG_BASE_URL;
const photoPreview = ref(null);

const customerData = reactive({
  id: "",
  name: "",
  phone: "",
  email: "",
  address: "",
});

onMounted(() => {
  fetchCustomer();
});

const fetchCustomer = () => {
  api.get(`/customers/${id}`)
    .then((result) => {
      const customer = result.data.customer;
      customerData.id = customer.id;
      customerData.name = customer.name;
      customerData.phone = customer.phone;
      customerData.email = customer.email;
      customerData.address = customer.address;
    })
    .catch((err) => {
      console.log(err);
    });
};


const submitData = () => {
  const formData = new FormData();
  formData.append('_method', 'PUT');

  for (const key in customerData) {
    formData.append(key, customerData[key]);
  }

  api.post(`/customers/${customerData.id}`, formData)
    .then(() => {
      router.push('/customers');
    })
    .catch((err) => {
      console.log("Update error", err.response?.data || err);
    });
};
</script>

<style scoped></style>
