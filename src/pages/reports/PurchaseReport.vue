<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow-sm rounded">
                    <div class="card-body">
                        <h2 class="mb-4">Purchase Report</h2>
                        <hr>

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
                                <div class="col-md-4">
                                    <label for="payment_status_id" class="form-label">Payment Status</label>
                                    <select v-model="search.payment_status_id" id="payment_status_id"
                                        class="form-control">
                                        <option value="">All Status</option>
                                        <option v-for="p in paymentStatuses" :key="p.id" :value="p.id">{{ p.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4 d-flex align-items-end">
                                    <button type="submit" class="btn btn-primary w-100">Generate Report</button>
                                </div>
                            </div>
                        </form>

                        <div v-if="purchases.length > 0" class="table-responsive mt-4">
                            <table class="table table-bordered table-hover">
                                <thead class="table-success text-dark">
                                    <tr>
                                        <th>Id</th>
                                        <th>Supplier</th>
                                        <th>Payment Status</th>
                                        <th>Order Total</th>
                                        <th>Paid Amount</th>
                                        <th>Discount</th>
                                        <th>VAT</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="purchase in purchases" :key="purchase.id">
                                        <td>{{ purchase.id }}</td>
                                        <td>{{ getSupplierName(purchase.supplier_id) }}</td>
                                        <td>{{ getPaymentStatusName(purchase.status_id) }}</td>
                                        <td>{{ purchase.order_total.toFixed(2) }}</td>
                                        <td>{{ purchase.paid_amount.toFixed(2) }}</td>
                                        <td>{{ purchase.discount.toFixed(2) }}</td>
                                        <td>{{ purchase.vat.toFixed(2) }}</td>
                                        <td>{{ purchase.date }}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4" class="text-end fw-bold">Total Paid Amount:</td>
                                        <td class="fw-bold text-success">{{ totalPaid.toFixed(2) }}</td>
                                        <td colspan="3"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="text-end fw-bold">Total Unpaid Amount:</td>
                                        <td class="fw-bold text-danger">{{ totalUnpaid.toFixed(2) }}</td>
                                        <td colspan="3"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="text-end fw-bold">Total Pending Amount:</td>
                                        <td class="fw-bold text-warning">{{ totalPending.toFixed(2) }}</td>
                                        <td colspan="3"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <p v-else class="mt-4 text-center text-muted">No purchases found for the selected date range.
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
const paymentStatuses = ref([]);
const purchases = ref([]);

const totalPaid = ref(0);
const totalUnpaid = ref(0);
const totalPending = ref(0);

const search = reactive({
    start_date: '',
    end_date: '',
    supplier_id: '',
    payment_status_id: ''
});

const fetchInitialData = () => {
    api.get('/purchaseReport/data')
        .then(res => {
            console.log(res.data);            
            suppliers.value = res.data.suppliers;
            paymentStatuses.value = res.data.payment_statuses;
        })
        .catch(err => console.error('Error loading initial data:', err));
};

const fetchPurchaseReport = () => {
    api.post('/purchaseReport', search)
        .then(res => {
            console.log(res.data);
            purchases.value = res.data.purchases;
            totalPaid.value = res.data.total_paid;
            totalUnpaid.value = res.data.total_unpaid;
            totalPending.value = res.data.total_pending;
        })
        .catch(err => console.error('Error fetching purchase report:', err));
};

const getSupplierName = (id) => {
    const s = suppliers.value.find(s => s.id === id);
    return s ? s.name : 'N/A';
};

const getPaymentStatusName = (id) => {
    const p = paymentStatuses.value.find(p => p.id === id);
    return p ? p.name : 'N/A';
};

onMounted(() => {
    fetchInitialData();
});
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
</style>
