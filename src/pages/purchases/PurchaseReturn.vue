<template>
    <div class="container mt-4">
        <h2>Purchase Return</h2>
        <hr>
        <!-- Search input -->
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="input-group">
                    <input v-model="purchases_id" type="number" class="form-control" placeholder="Enter Purchase ID" />
                    <button @click="searchPurchase" class="btn btn-primary">Search</button>
                </div>
            </div>
        </div>

        <!-- Display loading or error -->
        <div v-if="loading" class="alert alert-info">Loading...</div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <!-- Display purchase details -->
        <div v-if="purchaseDetails.length > 0" class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Product ID</th>
                        <th>Purchase ID</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in purchaseDetails" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.product_id }}</td>
                        <td>{{ item.purchases_id }}</td>
                        <td>{{ item.qty }}</td>
                        <td>{{ item.price | currency }}</td>
                        <td>{{ item.discount }}</td>
                        <td>
                            <button @click="initiateReturn(item.id, item)" class="btn btn-warning btn-sm">
                                <i class="fas fa-undo"></i> Return
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else-if="!loading && !error">
            <p class="text-center text-muted">No purchase details available.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/Api'; // Assuming you have an Axios instance set up in '@/Api'
import router from '@/router';

// Reactive variables
const purchases_id = ref('');
const purchaseDetails = ref([]);
const loading = ref(false);
const error = ref('');

// Search for purchase details by ID
const searchPurchase = () => {
    if (!purchases_id.value) {
        error.value = 'Please enter a valid Purchase ID.';
        return;
    }

    loading.value = true;
    error.value = ''; // Clear any previous errors

    api.get(`/purchase/${purchases_id.value}`)
        .then(response => {
            console.log(response.data);
            purchaseDetails.value = response.data.data;
        })
        .catch(err => {
            error.value = 'Error fetching purchase details.';
            console.error(err);
        })
        .finally(() => {
            loading.value = false;
        });
};

// Initiate return for a specific purchase detail
const initiateReturn = (purchaseDetailId, purchaseItem) => {
    if (!purchaseItem) {
        error.value = 'Invalid purchase item for return.';
        return;
    }

    const reason = prompt("Enter the return reason:");
    if (!reason) {
        error.value = 'Return reason is required.';
        return;
    }

    const returnData = {
        order_total: purchaseItem.order_total,
        paid_amount: purchaseItem.paid_amount,
        discount: purchaseItem.discount,
        vat: purchaseItem.vat,
        reason: reason,
    };

    // Clear previous error before initiating the return
    error.value = '';

    api.put(`/purchase-return/${purchaseDetailId}`, returnData)
        .then((res) => {
            console.log(res);
            alert('Return processed successfully');
            searchPurchase(); // Re-fetch purchase details
        })
        .catch(error => {
            console.error('Error during return', error);
            error.value = 'Error processing the return.';
        })
        .finally(() => {
            // Always redirect after return process, whether success or failure
            router.push('/purchase');
        });
};

// Auto-search purchase on component mount if needed
onMounted(() => {
    const { purchases_id: routePurchasesId } = useRoute().params;
    if (routePurchasesId) {
        purchases_id.value = routePurchasesId;
        searchPurchase();
    }
});
</script>

<style scoped>
.error {
    color: red;
}
</style>
