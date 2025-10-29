<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <!-- Header -->
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h3 class="mb-0">Manage Purchases</h3>

          <!-- Search bar -->
          <form class="d-flex align-items-center" @submit.prevent>
            <div class="input-group">
              <input v-model="search" @input="fetchPurchases" type="text" class="form-control" placeholder="Search Purchase..." aria-label="Search" />
              <span class="input-group-text bg-white border-start-0">
                <i class="ti ti-search text-dark"></i>
              </span>
            </div>
          </form>

          <!-- Add Purchase button -->
          <RouterLink to="/purchases/create" class="btn btn-dark">
            New Purchase
          </RouterLink>
        </div>

        <!-- Table -->
        <div class="card-body table-responsive">
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Id</th>
                <th>Supplier</th>
                <th>Payment Status</th>
                <th>Order Total</th>
                <th>Paid Amount</th>
                <th>Discount</th>
                <th>Vat</th>
                <th>Date</th>
                <th>Shipping Address</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- No data found -->
              <tr v-if="purchases.data && purchases.data.length === 0">
                <td colspan="10" class="text-center text-danger">
                  <h3>No data found!</h3>
                </td>
              </tr>

              <!-- Data rows -->
              <tr v-for="purchase in purchases.data" :key="purchase.id">
                <td>{{ purchase.id }}</td>
                <td>{{ purchase.supplier?.name || 'N/A' }}</td>
                <td>{{ purchase.payment_status?.name || 'N/A' }}</td>
                <td>{{ purchase.order_total }}</td>
                <td>{{ purchase.paid_amount }}</td>
                <td>{{ purchase.discount }}</td>
                <td>{{ purchase.vat }}</td>
                <td>{{ purchase.date }}</td>
                <td>{{ purchase.supplier?.address || 'N/A' }}</td>

                <td class="text-center btn-group">
                  <RouterLink :to="`/purchases/show/${purchase.id}`" class="btn btn-sm btn-primary me-2">
                    <i class="fas fa-eye"></i>
                  </RouterLink>

                  <!-- <RouterLink :to="`/purchases/edit/${purchase.id}`" class="btn btn-sm btn-success me-2">
                    <i class="fas fa-edit"></i>
                  </RouterLink>

                  <button class="btn btn-sm btn-danger" @click="deletePurchase(purchase.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="card-footer d-flex justify-content-end">
          <nav>
            <ul class="pagination mb-0">
              <li v-for="page in purchases.links" :key="page.label" class="page-item" :class="{ active: page.active, disabled: !page.url }">
                <button class="page-link" :disabled="!page.url" @click="page.url && fetchPurchases(page.url)">
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
import { onMounted, ref } from "vue";
import api from "@/Api";

const purchases = ref({ data: [] });
const search = ref("");

onMounted(() => {
  fetchPurchases();
});

// Fetch Purchases
const fetchPurchases = (url = "/allPurchaseindex") => {
  if (typeof url !== "string") {
    url = "/allPurchaseindex";
  }
  api
    .get(url, { params: { search: search.value } })
    .then((res) => {
      console.log(res);
      purchases.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete Purchase
// const deletePurchase = (id) => {
//   if (confirm("Are you sure you want to delete this purchase?")) {
//     api
//       .delete(`/purchases/${id}`)
//       .then((res) => {
//         console.log(res);
//         fetchPurchases();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// };

// Pagination Button Label Formatting
const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "Previous";
  if (label === "Next &raquo;") return "Next";
  return label;
};
</script>

<style scoped>
</style>
