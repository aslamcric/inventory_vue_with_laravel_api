<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 class="mb-0">Create Product</h3>
          <button class="btn btn-dark" @click="router.back()">
            ← Back
          </button>
        </div>

        <div class="card-body">
          <form @submit.prevent="createProduct">
            <div class="app-form">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="productData.name" type="text" class="form-control" id="name"
                  placeholder="Enter product name" />
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input v-model="productData.price" type="number" class="form-control" id="price"
                  placeholder="Enter price" />
              </div>

              <div class="mb-3">
                <label for="category_id" class="form-label">Category</label>
                <select v-model="productData.category_id" class="form-control" id="category_id">
                  <option value="">Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <!-- <div class="mb-3">
                <label for="stock" class="form-label">Stock</label>
                <input v-model="productData.stock" type="number" class="form-control" id="stock" placeholder="Enter Stock" />
              </div> -->

              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea v-model="productData.description" class="form-control" id="description" rows="3"
                  placeholder="Enter product description"></textarea>
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
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const categories = ref([]);

onMounted(() => {
  fetchCategories();
});

const fetchCategories = () => {
  api.get("/dropCategory")
    .then((result) => {
      console.log(result);
      categories.value = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const productData = reactive({
  name: "",
  price: "",
  category_id: "",
  // stock: "",
  description: "",
});


const createProduct = () => {
  const formData = new FormData();
  for (const key in productData) {
    formData.append(key, productData[key]);
  }

  api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((result) => {
      console.log(result);
      router.push({ path: "/products" });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped></style>
