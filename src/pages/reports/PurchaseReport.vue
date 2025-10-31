<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow-sm rounded">
                    <div class="card-body">
                        <h2 class="mb-4">Purchase Report</h2>
                        <hr />

                        <!-- Filter Form -->
                        <form @submit.prevent="fetchPurchaseReport">
                            <div class="row mb-3 g-3">
                                <div class="col-md-4">
                                    <label for="start_date" class="form-label">Start Date</label>
                                    <input v-model="search.start_date" type="date" id="start_date" class="form-control"
                                        required />
                                </div>

                                <div class="col-md-4">
                                    <label for="end_date" class="form-label">End Date</label>
                                    <input v-model="search.end_date" type="date" id="end_date" class="form-control"
                                        required />
                                </div>

                                <div class="col-md-4">
                                    <label for="supplier_id" class="form-label">Supplier</label>
                                    <select v-model="search.supplier_id" id="supplier_id" class="form-control">
                                        <option value="">All Suppliers</option>
                                        <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.name }}</option>
                                    </select>
                                </div>

                                <div class="col-md-4 d-flex align-items-end">
                                    <button type="submit" class="btn btn-primary w-100">Generate Report</button>
                                </div>
                            </div>
                        </form>

                        <!-- Report Table -->
                        <div v-if="purchases.length > 0" class="table-responsive mt-4">
                            <table class="table table-bordered table-hover">
                                <thead class="table-success text-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Supplier</th>
                                        <th>Total Amount</th>
                                        <th>Paid Amount</th>
                                        <th>Discount</th>
                                        <th>VAT</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="purchase in purchases" :key="purchase.id">
                                        <td>{{ purchase.id }}</td>
                                        <td>{{ purchase.supplier?.name || getSupplierName(purchase.supplier_id) }}</td>
                                        <td>{{ formatCurrency(purchase.total_amount) }}</td>
                                        <td>{{ formatCurrency(purchase.paid_amount) }}</td>
                                        <td>{{ formatCurrency(purchase.discount) }}</td>
                                        <td>{{ formatCurrency(purchase.vat) }}</td>
                                        <td>{{ purchase.purchase_date }}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="3" class="text-end fw-bold">Total Paid Amount:</td>
                                        <td class="fw-bold text-success">{{ formatCurrency(totalPaid) }}</td>
                                        <td colspan="3"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <p v-else class="mt-4 text-center text-muted">
                            No purchases found for the selected date range.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '@/Api';

const suppliers = ref([]);
const purchases = ref([]);
const totalPaid = ref(0);

const search = reactive({
    start_date: '',
    end_date: '',
    supplier_id: '',
});

// Load suppliers
const fetchInitialData = () => {
    api.get('/purchaseReport/data')
        .then(res => {
            console.log(res.data);
            suppliers.value = res.data.suppliers;
        })
        .catch(err => console.error('Error loading suppliers:', err));
};

// Fetch report
const fetchPurchaseReport = () => {
    api.post('/purchaseReport', search)
        .then(res => {
            console.log(res.data);
            purchases.value = res.data.purchases;
            totalPaid.value = res.data.total_paid;

            // console.log('Purchase report fetched:', purchases.value); // <-- log purchases
            // console.log('Totals:', {
            //     totalPaid: totalPaid.value,
            // });
        })
        .catch(err => console.error('Error fetching purchase report:', err));
};

// Helper for supplier name if relation not loaded
const getSupplierName = (id) => {
    const s = suppliers.value.find(s => s.id === id);
    return s ? s.name : 'N/A';
};

const formatCurrency = (value) => parseFloat(value || 0).toFixed(2);

onMounted(() => fetchInitialData());
</script>

<style scoped>
.card {
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;
}

h2 {
    color: #007bff;
}

.table th,
.table td {
    vertical-align: middle;
}

tfoot td {
    background-color: #f8f9fa;
}
</style>
