<template>
  <div class="row">
    <div class="col">
      <div class="card">

        <!-- Header -->
        <div
          class="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h3 class="mb-0">Manage Customers</h3>

          <!-- Search bar -->
          <form class="d-flex align-items-center" @submit.prevent>
            <div class="input-group">
              <input v-model="search" @input="fetchCustomers" type="text" class="form-control"
                placeholder="Search Customer..." aria-label="Search" />
              <span class="input-group-text bg-white border-start-0">
                <i class="ti ti-search text-dark"></i>
              </span>
            </div>
          </form>

          <!-- Add new customer button -->
          <RouterLink to="/customers/create" class="btn btn-dark">Add New Customers</RouterLink>
        </div>

        <!-- Table -->
        <div class="card-body table-responsive">
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- No data found message -->
              <tr v-if="customers.data && customers.data.length === 0">
                <td colspan="7" class="text-center text-danger">
                  <h3>No data found!</h3>
                </td>
              </tr>

              <!-- Customer loop -->
              <tr v-for="customer in customers.data" :key="customer.id">
                <td>{{ customer.id }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.phone }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.address }}</td>
                <td class="text-center btn btn-group">
                  <RouterLink :to="`/customers/show/${customer.id}`" class="btn btn-sm btn-primary me-2">
                    <i class="fas fa-eye"></i>
                  </RouterLink>
                  <RouterLink :to="`/customers/edit/${customer.id}`" class="btn btn-sm btn-success me-2">
                    <i class="fas fa-edit"></i>
                  </RouterLink>
                  <button class="btn btn-sm btn-danger" @click="deleteCustomer(customer.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="card-footer d-flex justify-content-end">
          <nav>
            <ul class="pagination mb-0">
              <li v-for="page in customers.links" :key="page.label" class="page-item"
                :class="{ active: page.active, disabled: !page.url }">
                <button class="page-link" :disabled="!page.url" @click="page.url && fetchCustomers(page.url)">
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
import api from '@/Api'
import { onMounted, ref } from 'vue'

const customers = ref([]) // customer data with pagination
const search = ref("")    // search text

// Fetch customers (supports search + pagination)
const fetchCustomers = (url = "/customers") => {
  if (typeof url !== "string") {
    url = "/customers"
  }

  api.get(url, { params: { search: search.value } })
    .then(res => {
      console.log(res.data)
      customers.value = res.data
    })
    .catch(err => {
      console.log(err)
    })
}


// Delete a customer
const deleteCustomer = (id) => {
  if (!confirm("Are you sure you want to delete this Customer?")) return;

  api.delete(`/customers/${id}`)
    .then(res => {
      console.log(res.data)

      // Refresh list
      fetchCustomers()
    })
    .catch(err => {
      console.log(err)
    })
}


// Format pagination label
const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "Previous"
  if (label === "Next &raquo;") return "Next"
  return label
}


// Fetch on load
onMounted(() => {
  fetchCustomers()
})
</script>

<style scoped></style>
