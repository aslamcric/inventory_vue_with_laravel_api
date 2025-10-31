<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3 class="mb-0">Customer Details</h3>
        </div>

        <div class="card-body">
          <div v-if="loading" class="text-center my-3">
            <h5>Loading customer details...</h5>
          </div>

          <div v-else class="app-form">
            <div class="mb-3">
              <label class="form-label fw-bold">Name:</label>
              <p class="form-control-plaintext">{{ customerData.name }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Email:</label>
              <p class="form-control-plaintext">{{ customerData.email }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Phone:</label>
              <p class="form-control-plaintext">{{ customerData.phone }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Address:</label>
              <p class="form-control-plaintext">
                {{ customerData.address || "No address provided." }}
              </p>
            </div>

            <div>
              <button class="btn btn-secondary" @click="router.back()">Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/Api";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { id } = route.params;

const customerData = reactive({
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
});

const loading = ref(true);

onMounted(() => {
  fetchCustomer();
});

const fetchCustomer = async () => {
  try {
    const res = await api.get(`/customers/${id}`);
    const customer = res.data.customer;
    customerData.id = customer.id;
    customerData.name = customer.name;
    customerData.email = customer.email;
    customerData.phone = customer.phone;
    customerData.address = customer.address;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-control-plaintext {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px 12px;
  background-color: #f9f9f9;
}
</style>
