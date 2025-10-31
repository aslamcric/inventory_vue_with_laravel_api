<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3 class="mb-0">Product Details</h3>
        </div>

        <div class="card-body">
          <div v-if="loading" class="text-center my-3">
            <h5>Loading product details...</h5>
          </div>

          <div v-else class="app-form">
            <div class="mb-3">
              <label class="form-label fw-bold">Name:</label>
              <p class="form-control-plaintext">{{ productData.name }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Price:</label>
              <p class="form-control-plaintext">{{ productData.price }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Category:</label>
              <p class="form-control-plaintext">
                {{ categoryName(productData.category_id) }}
              </p>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Description:</label>
              <p class="form-control-plaintext">
                {{ productData.description || "No description available." }}
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

const productData = reactive({
  id: "",
  name: "",
  price: "",
  category_id: "",
  description: "",
});

const categories = ref([]);
const loading = ref(true);

onMounted(() => {
  fetchCategories();
  fetchProductDetails();
});

// Fetch all categories for displaying the name
const fetchCategories = async () => {
  try {
    const res = await api.get("/dropCategory");
    categories.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

// Fetch Product details
const fetchProductDetails = async () => {
  try {
    const res = await api.get(`/products/${id}`);
    const product = res.data.product;
    productData.id = product.id;
    productData.name = product.name;
    productData.price = product.price;
    productData.category_id = product.category_id;
    productData.description = product.description;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

// Helper to get category name
const categoryName = (id) => {
  const cat = categories.value.find((c) => c.id === id);
  return cat ? cat.name : "Unknown";
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
