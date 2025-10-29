<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <!-- Header -->
                <div
                    class="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="mb-0">Manage Categories</h3>

                    <!-- Search bar -->
                    <form class="d-flex align-items-center" @submit.prevent>
                        <div class="input-group">
                            <input v-model="search" @input="fetchCategories" type="text" class="form-control"
                                placeholder="Search Category..." aria-label="Search" />
                            <span class="input-group-text bg-white border-start-0">
                                <i class="ti ti-search text-dark"></i>
                            </span>
                        </div>
                    </form>

                    <!-- Add Category button -->
                    <RouterLink to="/categories/create" class="btn btn-dark">
                        Add New Category
                    </RouterLink>
                </div>

                <!-- Table -->
                <div class="card-body table-responsive">
                    <table class="table table-striped table-bordered">
                        <thead class="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>

                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Show message when no data -->
                            <tr v-if="categories.data && categories.data.length === 0">
                                <td colspan="12" class="text-center text-danger">
                                    <h3>No data found!</h3>
                                </td>
                            </tr>

                            <!-- Loop through categories -->
                            <tr v-for="category in categories.data" :key="category.id">
                                <td>{{ category.id }}</td>
                                <td>{{ category.name }}</td>
                                <td>{{ category.description }}</td>

                                <td class="text-center btn btn-group">
                                    <RouterLink :to="`/categories/show/${category.id}`"
                                        class="btn btn-sm btn-primary me-2">
                                        <i class="fas fa-eye"></i>
                                    </RouterLink>

                                    <RouterLink :to="`/categories/edit/${category.id}`"
                                        class="btn btn-sm btn-success me-2">
                                        <i class="fas fa-edit"></i>
                                    </RouterLink>

                                    <button class="btn btn-sm btn-danger" @click="deleteCategory(category.id)">
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
                            <li v-for="page in categories.links" :key="page.label" class="page-item"
                                :class="{ active: page.active, disabled: !page.url }">
                                <button class="page-link" :disabled="!page.url"
                                    @click="page.url && fetchCategories(page.url)">
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

const categories = ref([]);
const search = ref("");

onMounted(() => {
    fetchCategories();
});

// fetchCategory
const fetchCategories = (url = "/categories") => {
    if (typeof url !== "string") {
        console.log(url);
        url = "/categories";
    }
    api.get(url, { params: { search: search.value } })
        .then((result) => {
            console.log(result.data);
            categories.value = result.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

// const debouncedFetchUsers = debounce(fetchUsers, 300);
const formatPageLabel = (label) => {
    if (label === "&laquo; Previous") return "Previous";
    if (label === "Next &raquo;") return "Next";
    return label;
};

const deleteCategory = (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    api.delete(`/categories/${id}`)
        .then((result) => {
            console.log(result.data);

            // Refresh list
            fetchCategories();
        })
        .catch((err) => {
            console.error("Error deleting category:", err);
        });
};



</script>

<style></style>