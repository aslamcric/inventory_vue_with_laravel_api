<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <!-- Header -->
                <div
                    class="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="mb-0">Purchase Details</h3>

                    <!-- Search bar -->
                    <form class="d-flex align-items-center" @submit.prevent>
                        <div class="input-group">
                            <input v-model="search" @input="fetchPurchaseItems" type="text" class="form-control"
                                placeholder="Search with Purchase ID..." aria-label="Search" />
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
                                <td colspan="7" class="text-center text-danger">
                                    <h4>No Data Found!</h4>
                                </td>
                            </tr>

                            <!-- Loop through purchase items -->
                            <tr v-for="item in purchaseItems.data" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.purchase_id }}</td>
                                <td>{{ item.product.name }}</td>
                                <td>{{ item.product_id }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.discount ?? 0 }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="card-footer d-flex justify-content-end">
                    <nav>
                        <ul class="pagination mb-0">
                            <li v-for="page in purchaseItems.links" :key="page.label" class="page-item"
                                :class="{ active: page.active, disabled: !page.url }">
                                <button class="page-link" :disabled="!page.url"
                                    @click="page.url && fetchPurchaseItems(page.url)">
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
import { ref, onMounted } from 'vue';
import api from '@/Api';

const purchaseItems = ref({ data: [], links: [] });
const search = ref('');

onMounted(() => {
    fetchPurchaseItems();
});

const fetchPurchaseItems = (url = '/purchaseDetail') => {
    if (typeof url !== 'string') url = '/purchaseDetail';

    api.get(url, { params: { search: search.value } })
        .then((res) => {
            purchaseItems.value = res.data;
        })
        .catch((err) => console.error(err));
};

const formatPageLabel = (label) => {
    if (label === '&laquo; Previous') return 'Previous';
    if (label === 'Next &raquo;') return 'Next';
    return label;
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
