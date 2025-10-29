<template>
  <div class="row">
    <div class="col">
      <div class="card">

        <!-- Header -->
        <div
          class="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h3 class="mb-0">Manage Suppliers</h3>

          <!-- Search -->
          <form class="d-flex align-items-center" @submit.prevent>
            <div class="input-group">
              <input v-model="search" @input="fetchSuppliers" type="text" class="form-control"
                placeholder="Search Supplier..." aria-label="Search" />
              <span class="input-group-text bg-white border-start-0">
                <i class="ti ti-search text-dark"></i>
              </span>
            </div>
          </form>

          <RouterLink to="/suppliers/create" class="btn btn-dark">Add New Supplier</RouterLink>
        </div>

        <!-- Table -->
        <div class="card-body table-responsive">
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Email</th>
                <th>Address</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- Show message when no data -->
              <tr v-if="suppliers.data && suppliers.data.length === 0">
                <td colspan="7" class="text-center text-danger">
                  <h3>No data found!</h3>
                </td>
              </tr>

              <!-- Loop through suppliers -->
              <tr v-for="supplier in suppliers.data" :key="supplier.id">
                <td>{{ supplier.id }}</td>
                <td>{{ supplier.name }}</td>
                <td>{{ supplier.phone }}</td>
                <td>{{ supplier.company }}</td>
                <td>{{ supplier.email }}</td>
                <td>{{ supplier.address }}</td>
                <td class="text-center btn btn-group">
                  <RouterLink :to="`/suppliers/show/${supplier.id}`" class="btn btn-sm btn-primary me-2">
                    <i class="fas fa-eye"></i>
                  </RouterLink>
                  <RouterLink :to="`/suppliers/edit/${supplier.id}`" class="btn btn-sm btn-success me-2">
                    <i class="fas fa-edit"></i>
                  </RouterLink>
                  <a class="btn btn-sm btn-danger" @click="deleteSupplier(supplier.id)">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="card-footer d-flex justify-content-end">
          <nav>
            <ul class="pagination mb-0">
              <li v-for="page in suppliers.links" :key="page.label" class="page-item"
                :class="{ active: page.active, disabled: !page.url }">
                <button class="page-link" :disabled="!page.url" @click="page.url && fetchSuppliers(page.url)">
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
import { onMounted, ref } from 'vue';

const suppliers = ref({});
const search = ref("");

// ✅ Image base URL
const imgUrl = import.meta.env.VITE_IMG_BASE_URL;

onMounted(() => {
  fetchSuppliers();
});

// Fetch suppliers with optional search and pagination URL
const fetchSuppliers = (url = "/suppliers") => {
  if (typeof url !== "string") url = "/suppliers";
  

  api.get(url, {
    params: { search: search.value },
  })
    .then(res => {
      console.log(res.data);

      suppliers.value = res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

// Format pagination labels
const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "Previous";
  if (label === "Next &raquo;") return "Next";
  return label;
};

// Delete supplier
const deleteSupplier = (id) => {
  if (!confirm("Are you sure you want to delete this Supplier?")) return;
  api.delete(`/suppliers/${id}`)
    .then((res) => {
      console.log(res);
      // Refresh list
      fetchSuppliers();
    })
    .catch(err => {
      console.log(err);
    });
};

</script>

<style scoped></style>
