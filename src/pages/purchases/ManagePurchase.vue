<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <!-- Header -->
        <div
          class="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h3 class="mb-0">Manage Purchases</h3>

          <!-- Search bar -->
          <form class="d-flex align-items-center" @submit.prevent>
            <div class="input-group">
              <input
                v-model="search"
                @input="fetchPurchases"
                type="text"
                class="form-control"
                placeholder="Search Purchase..."
                aria-label="Search"
              />
              <span class="input-group-text bg-white border-start-0">
                <i class="ti ti-search text-dark"></i>
              </span>
            </div>
          </form>

          <!-- Add Purchase button -->
          <RouterLink to="/purchases/create" class="btn btn-dark">
            Create New Purchase
          </RouterLink>
        </div>

        <!-- Table -->
        <div class="card-body table-responsive">
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>ID</th>
                <th>Supplier Name</th>
                <th>Total Amount</th>
                <th>Discount</th>
                <th>VAT</th>
                <th>Purchase Date</th>
                <!-- <th>Status</th> -->
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- Show message when no data -->
              <tr v-if="purchases.data && purchases.data.length === 0">
                <td colspan="8" class="text-center text-danger">
                  <h3>No data found!</h3>
                </td>
              </tr>

              <!-- Loop through purchases -->
              <tr v-for="purchase in purchases.data" :key="purchase.id">
                <td>{{ purchase.id }}</td>
                <td>{{ purchase.suppliers?.name || 'N/A' }}</td>
                <td>{{ purchase.total_amount }}</td>
                <td>{{ purchase.discount }}</td>
                <td>{{ purchase.vat }}</td>
                <td>{{ purchase.purchase_date }}</td>
                <!-- <td>
                  <span
                    class="badge"
                    :class="purchase.status === 1 ? 'bg-success' : 'bg-warning'"
                  >
                    {{ purchase.status === 1 ? 'Completed' : 'Pending' }}
                  </span>
                </td> -->
                <td class="text-center btn btn-group">
                  <RouterLink
                    :to="`/purchases/show/${purchase.id}`"
                    class="btn btn-sm btn-primary me-2"
                  >
                    <i class="fas fa-eye"></i>
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="card-footer d-flex justify-content-end">
          <nav>
            <ul class="pagination mb-0">
              <li
                v-for="page in purchases.links"
                :key="page.label"
                class="page-item"
                :class="{ active: page.active, disabled: !page.url }"
              >
                <button
                  class="page-link"
                  :disabled="!page.url"
                  @click="page.url && fetchPurchases(page.url)"
                >
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
import api from "@/Api";
import { onMounted, ref } from "vue";

const purchases = ref({ data: [] });
const search = ref("");

onMounted(() => {
  fetchPurchases();
});

// Fetch purchases
const fetchPurchases = (url = "/allPurchaseindex") => {
  if (typeof url !== "string") url = "/allPurchaseindex";

  api
    .get(url, { params: { search: search.value } })
    .then((result) => {
      purchases.value = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Pagination Button Label Formatting
const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "Previous";
  if (label === "Next &raquo;") return "Next";
  return label;
};
</script>

<style scoped></style>
