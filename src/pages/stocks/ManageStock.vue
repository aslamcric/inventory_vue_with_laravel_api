<template>
    <div class="row">
      <div class="col">
        <div class="card">
  
          <!-- Card Header -->
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h3 class="mb-0">Manage Stocks</h3>
  
            <!-- Search Bar -->
            <form class="d-flex align-items-center" @submit.prevent>
              <div class="input-group">
                <input 
                  v-model="search" 
                  @input="fetchStocks" 
                  type="text" 
                  class="form-control"
                  placeholder="Search Product..." 
                  aria-label="Search" 
                />
                <span class="input-group-text bg-white border-start-0">
                  <i class="ti ti-search text-dark"></i>
                </span>
              </div>
            </form>
          </div>
  
          <!-- Card Body -->
          <div class="card-body table-responsive">
            <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="stocks.data && stocks.data.length === 0">
                  <td colspan="3" class="text-center text-danger">
                    <h4>No stock data found!</h4>
                  </td>
                </tr>
  
                <tr v-for="stock in stocks.data" :key="stock.id">
                  <td>{{ stock.id }}</td>
                  <td>{{ stock.name }}</td>
                  <td>{{ stock.qty }}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Pagination -->
          <div class="card-footer d-flex justify-content-end">
            <nav>
              <ul class="pagination mb-0">
                <li v-for="page in stocks.links" :key="page.label" class="page-item"
                  :class="{ active: page.active, disabled: !page.url }">
                  <button class="page-link" :disabled="!page.url" @click="page.url && fetchStocks(page.url)">
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
  import { ref, onMounted } from "vue";
  import api from "@/Api";
  
  const stocks = ref({ data: [] });
  const search = ref("");
  
  onMounted(() => {
    fetchStocks();
  });
  
  const fetchStocks = (url = "/stocks") => {
    if (typeof url !== "string") {
      url = "/stocks";
    }
    api
      .get(url, { params: { search: search.value } })
      .then((response) => {
        console.log(response.data);
        stocks.value = response.data;
      })
      .catch((error) => {
        console.error('Error fetching stocks:', error);
      });
  };
  
  const formatPageLabel = (label) => {
    if (label === "&laquo; Previous") return "Previous";
    if (label === "Next &raquo;") return "Next";
    return label;
  };
  </script>
  
  <style scoped>
  /* Custom Styling if needed */
  </style>
  