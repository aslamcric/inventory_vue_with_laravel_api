<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3 class="mb-0">Product Details</h3>
        </div>
        <div class="card-body">
          <div class="app-form">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <p class="form-control-static">{{ productData.name }}</p>
            </div>

            <div class="mb-3">
              <label for="photo" class="form-label">Photo</label>
              <div v-if="photoPreview" class="mt-2">
                <img :src="photoPreview" alt="Selected Photo" width="100" />
              </div>
              <div v-else-if="productData.photo" class="mt-2">
                <img :src="`${imgUrl}/${productData.photo}`" alt="Current Photo" width="80" />
              </div>
            </div>

            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <p class="form-control-static">{{ productData.price }}</p>
            </div>

            <div class="mb-3">
              <label for="offer_price" class="form-label">Offer Price</label>
              <p class="form-control-static">{{ productData.offer_price }}</p>
            </div>

            <div class="mb-3">
              <label for="category_id" class="form-label">Category</label>
              <p class="form-control-static">{{ categories.find(c => c.id === productData.category_id)?.name || 'N/A' }}</p>
            </div>

            <div class="mb-3">
              <label for="barcode" class="form-label">Barcode</label>
              <p class="form-control-static">{{ productData.barcode }}</p>
            </div>

            <div class="mb-3">
              <label for="sku" class="form-label">SKU</label>
              <p class="form-control-static">{{ productData.sku }}</p>
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <p class="form-control-static">{{ productData.description }}</p>
            </div>

            <div class="mb-3">
              <label for="weight" class="form-label">Weight</label>
              <p class="form-control-static">{{ productData.weight }}</p>
            </div>

            <div class="mb-3">
              <label for="size" class="form-label">Size</label>
              <p class="form-control-static">{{ productData.size }}</p>
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
import { useRoute } from "vue-router";

const { id } = useRoute().params;
const categories = ref([]);

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
  photo: "",
  price: "",
  offer_price: "",
  category_id: "",
  barcode: "",
  sku: "",
  description: "",
  weight: "",
  size: "",
});

// Fetch Product Details
const fetchProductDetails = () => {
  api.get(`/products/${id}`)
    .then((result) => {
      const product = result.data.product;
      productData.id = product.id;
      productData.name = product.name;
      productData.price = product.price;
      productData.offer_price = product.offer_price;
      productData.category_id = product.category_id;
      productData.barcode = product.barcode;
      productData.sku = product.sku;
      productData.description = product.description;
      productData.weight = product.weight;
      productData.size = product.size;
      productData.photo = product.photo;
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
.form-control-static {
  border: none;
  background-color: transparent;
  padding: 0;
}
</style>
