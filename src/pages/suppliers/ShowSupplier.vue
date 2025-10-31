<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3 class="mb-0">Supplier Details</h3>
        </div>

        <div class="card-body">
          <div v-if="loading" class="text-center my-3">
            <h5>Loading supplier details...</h5>
          </div>

          <div v-else class="app-form">
            <div class="mb-3">
              <label class="form-label fw-bold">Name:</label>
              <p class="form-control-plaintext">{{ supplierData.name }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Phone:</label>
              <p class="form-control-plaintext">{{ supplierData.phone }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Company:</label>
              <p class="form-control-plaintext">{{ supplierData.company }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Email:</label>
              <p class="form-control-plaintext">{{ supplierData.email }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Address:</label>
              <p class="form-control-plaintext">
                {{ supplierData.address || "No address provided." }}
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

const supplierData = reactive({
  id: "",
  name: "",
  phone: "",
  company: "",
  email: "",
  address: "",
});

const loading = ref(true);

onMounted(() => {
  fetchSupplier();
});

const fetchSupplier = async () => {
  try {
    const res = await api.get(`/suppliers/${id}`);
    const supplier = res.data.supplier;
    supplierData.id = supplier.id;
    supplierData.name = supplier.name;
    supplierData.phone = supplier.phone;
    supplierData.company = supplier.company;
    supplierData.email = supplier.email;
    supplierData.address = supplier.address;
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
