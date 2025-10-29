<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <!-- Header -->
        <div
          class="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h3 class="mb-0">Manage Users</h3>

          <!-- Search bar -->
          <form class="d-flex align-items-center" @submit.prevent>
            <div class="input-group">
              <input v-model="search" @input="fetchUsers" type="text" class="form-control" placeholder="Search User..."
                aria-label="Search" />
              <span class="input-group-text bg-white border-start-0">
                <i class="ti ti-search text-dark"></i>
              </span>
            </div>
          </form>

          <!-- Add user button -->
          <RouterLink to="/users/create" class="btn btn-dark">
            Add New User
          </RouterLink>
        </div>

        <!-- Table -->
        <div class="card-body table-responsive">
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <!-- <th class="text-center">Action</th> -->
              </tr>
            </thead>
            <tbody>
              <!-- Show message when no data -->
              <tr v-if="users.data && users.data.length === 0">
                <td colspan="4" class="text-center text-danger">
                  <h3>No data found!</h3>
                </td>
              </tr>

              <!-- Loop through users -->
              <tr v-for="user in users.data" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td class="text-center">
                  <!-- <RouterLink :to="`/users/edit/${user.id}`" class="btn btn-sm btn-primary me-2">
                    Edit
                  </RouterLink>
                  <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)">
                    Delete
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
              <li v-for="page in users.links" :key="page.label" class="page-item"
                :class="{ active: page.active, disabled: !page.url }">
                <button class="page-link" :disabled="!page.url" @click="page.url && fetchUsers(page.url)">
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
import { onMounted, reactive, ref } from "vue";

const users = ref([]);
const search = ref("");

const form = reactive({
  name: "",
  email: "",
  password: ""
});

onMounted(() => {
  fetchUsers();
});

const fetchUsers = (url = "/users") => {
  if (typeof url !== "string") url = "/users";
  api
    .get(url, { params: { search: search.value } })
    .then((result) => {
      users.value = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const submitUser = () => {
  api
    .post("/users", form)
    .then((res) => {
      console.log(res.data);
      fetchUsers(); // Refresh list after submit
      form.name = "";
      form.email = "";
      form.password = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteUser = (id) => {
  api
    .delete(`/users/${id}`)
    .then((res) => {
      fetchUsers();
    })
    .catch((err) => {
      console.log(err);
    });
};

const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "Previous";
  if (label === "Next &raquo;") return "Next";
  return label;
};
</script>

<style scoped></style>
