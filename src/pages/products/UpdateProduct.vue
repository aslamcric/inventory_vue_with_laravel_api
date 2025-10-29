<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3 class="mb-0">Update Product</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateProduct" enctype="multipart/form-data">
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

              <div class="mb-3">
                <label for="stock" class="form-label">Stock</label>
                <input v-model="productData.stock" type="text" class="form-control" id="stock" placeholder="Enter Stock" />
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea v-model="productData.description" class="form-control" id="description" rows="3"
                  placeholder="Enter product description"></textarea>
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
import api from "@/Api";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { id } = useRoute().params;
const categories = ref([]);
const router = useRouter();

const photoPreview = ref(null);
const imgUrl = import.meta.env.VITE_IMG_BASE_URL;

onMounted(() => {
  fetchCategories();
  fetchProductDetails();
});

// Fetch Categories
const fetchCategories = () => {
  api.get("/dropCategory")
    .then((result) => {
      categories.value = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const productData = reactive({
  id: "",
  name: "",
  price: "",
  category_id: "",
  stock: "",
  description: "",
});

// Fetch Product Details
const fetchProductDetails = () => {
  api.get(`/products/${id}`)
    .then((result) => {
      const product = result.data.product;
      productData.id = product.id;
      productData.name = product.name;
      productData.price = product.price;
      productData.category_id = product.category_id;
      productData.stock = product.stock;
      productData.description = product.description;
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateProduct = () => {
  const formData = new FormData();
  formData.append('_method', 'PUT');

  // Append all product data fields
  for (const key in productData) {
    formData.append(key, productData[key]);
  }

  api.post(`/products/${productData.id}`, formData)
    .then(() => {
      router.push({ path: "/products" });
    })
    .catch((err) => {
      console.log(err.response?.data || err);
    });
};


</script>

<style scoped>

</style>
