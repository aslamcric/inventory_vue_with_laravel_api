<template>
  <div class="row">
      <div class="col">
          <div class="card">
              <!-- Header -->
              <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <h3 class="mb-0">Purchase Details</h3>

                  <!-- Search bar -->
                  <form class="d-flex align-items-center" @submit.prevent>
                      <div class="input-group">
                          <input v-model="search" @input="fetchPurchaseItems" type="text" class="form-control" placeholder="Search with Purchase ID..." aria-label="Search" />
                          <span class="input-group-text bg-white border-start-0">
                              <i class="ti ti-search text-dark"></i>
                          </span>
                      </div>
                  </form>

                  <!-- Add Purchase Item button -->
                  <!-- <RouterLink to="/purchase-items/create" class="btn btn-dark">
                      Add New Purchase Item
                  </RouterLink> -->
              </div>

              <!-- Table -->
              <div class="card-body table-responsive">
                  <table class="table table-striped table-bordered">
                      <thead class="thead-dark">
                          <tr>
                              <th>ID</th>
                              <th>Purchase ID</th>
                              <th>Product Name</th>
                              <th>Product ID</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Discount</th>
                          </tr>
                      </thead>
                      <tbody>
                          <!-- Show message when no data -->
                          <tr v-if="purchaseItems.data && purchaseItems.data.length === 0">
                              <td colspan="12" class="text-center text-danger">
                                  <h3>No Data Found!</h3>
                              </td>
                          </tr>

                          <!-- Loop through purchase items -->
                          <tr v-for="item in purchaseItems.data" :key="item.id">
                              <td>{{ item.id }}</td>
                              <td>{{ item.purchases_id }}</td>
                              <td>{{ item.product.name }}</td>
                              <td>{{ item.product_id }}</td>
                              <td>{{ item.qty }}</td>
                              <td>{{ item.price }}</td>
                              <td>{{ item.discount }}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              <!-- Pagination -->
              <div class="card-footer d-flex justify-content-end">
                  <nav>
                      <ul class="pagination mb-0">
                          <li v-for="page in purchaseItems.links" :key="page.label" class="page-item" :class="{ active: page.active, disabled: !page.url }">
                              <button class="page-link" :disabled="!page.url" @click="page.url && fetchPurchaseItems(page.url)">
                                  {{ formatPageLabel(page.label) }}
                              </button>
                          </li>
                      </ul>
                  </nav>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import api from '@/Api';
import { ref, onMounted } from 'vue';

const purchaseItems = ref([]);
const search = ref("");

onMounted(() => {
  fetchPurchaseItems();
});

// Fetch purchase items
const fetchPurchaseItems = (url = "/purchaseDetail") => {
  if (typeof url !== "string") {
      url = "/purchaseDetail";
  }
  api.get(url, { params: { search: search.value } })
  .then((result) => {
      console.log(result.data.data[0]);
      purchaseItems.value = result.data;
      // supplier.value = result.data.data[0].product
  })
  .catch((err) => {
      console.log(err);
  });
};

// Format pagination labels
const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "Previous";
  if (label === "Next &raquo;") return "Next";
  return label;
};

</script>

<style></style>
