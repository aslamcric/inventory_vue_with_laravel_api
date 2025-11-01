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
                            <input v-model="search" @input="fetchUsers" type="text" class="form-control"
                                placeholder="Search User..." aria-label="Search" />
                            <span class="input-group-text bg-white border-start-0">
                                <i class="ti ti-search text-dark"></i>
                            </span>
                        </div>
                    </form>
                </div>

                <!-- Table -->
                <div class="card-body table-responsive">
                    <table class="table table-striped table-bordered">
                        <thead class="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="users.data && users.data.length === 0">
                                <td colspan="4" class="text-center text-danger">
                                    <h5>No data found!</h5>
                                </td>
                            </tr>

                            <tr v-for="user in users.data" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)">
                                        Delete
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
                            <li v-for="page in users.links" :key="page.label" class="page-item"
                                :class="{ active: page.active, disabled: !page.url }">
                                <button class="page-link" :disabled="!page.url"
                                    @click="page.url && fetchUsers(page.url)">
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

const users = ref({ data: [], links: [] });
const search = ref("");

// Fetch users with optional pagination URL
const fetchUsers = (url = "/allUser") => {
    api.get(url, { params: { search: search.value } })
        .then(res => {
            console.log(res.data);
            
            users.value = res.data;
        })
        .catch(err => console.error("Error fetching users:", err));
};

// Delete user with confirmation
const deleteUser = (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    api.delete(`/users/${id}`)
        .then(() => fetchUsers()) // refresh list
        .catch((err) => console.error(err));
};

// Format pagination labels
const formatPageLabel = (label) => {
    if (label === "&laquo; Previous") return "Previous";
    if (label === "Next &raquo;") return "Next";
    return label;
};

// Initial load
onMounted(() => {
    fetchUsers();
});
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}
</style>
