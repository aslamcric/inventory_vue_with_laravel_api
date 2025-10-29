<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow-sm rounded">
                    <div class="card-body">
                        <h2 class="mb-4">Order Report</h2>
                        <hr>

                        <form @submit.prevent="fetchOrderReport">
                            <div class="row mb-3 g-3">
                                <div class="col-md-3">
                                    <label for="start_date" class="form-label">Start Date</label>
                                    <input v-model="search.start_date" type="date" id="start_date" class="form-control"
                                        required />
                                </div>
                                <div class="col-md-3">
                                    <label for="end_date" class="form-label">End Date</label>
                                    <input v-model="search.end_date" type="date" id="end_date" class="form-control"
                                        required />
                                </div>
                                <div class="col-md-3">
                                    <label for="customer_id" class="form-label">Select Customer</label>
                                    <select v-model="search.customer_id" id="customer_id" class="form-control">
                                        <option value="">All Customers</option>
                                        <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name }}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label for="status_id" class="form-label">Order Status</label>
                                    <select v-model="search.status_id" id="status_id" class="form-control">
                                        <option value="">All Statuses</option>
                                        <option v-for="s in statuses" :key="s.id" :value="s.id">{{ s.name }}</option>
                                    </select>
                                </div>
                                <div class="col-md-3 d-flex align-items-end">
                                    <button type="submit" class="btn btn-primary w-100">Generate Report</button>
                                </div>
                            </div>
                        </form>

                        <div v-if="orders.length > 0" class="table-responsive mt-4">
                            <table class="table table-bordered table-hover">
                                <thead class="table-success text-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer</th>
                                        <th>Order Total</th>
                                        <th>Discount</th>
                                        <th>Shipping Address</th>
                                        <th>Paid Amount</th>
                                        <th>Status</th>
                                        <th>Order Date</th>
                                        <th>Delivery Date</th>
                                        <th>VAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="order in orders" :key="order.id">
                                        <td>{{ order.id }}</td>
                                        <td>{{ getCustomerName(order.customer_id) }}</td>
                                        <td>{{ order.order_total }}</td>
                                        <td>{{ order.discount }}</td>
                                        <td>{{ getCustomerAddress(order.customer_id) }}</td>
                                        <td>{{ order.paid_amount }}</td>
                                        <td>{{ getStatusName(order.status_id) }}</td>
                                        <td>{{ order.order_date }}</td>
                                        <td>{{ order.delivery_date }}</td>
                                        <td>{{ order.vat }}</td>
                                    </tr>
                                </tbody>
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

const customers = ref([]);
const statuses = ref([]);
const orders = ref([]);

const search = reactive({
    start_date: '',
    end_date: '',
    customer_id: '',
    status_id: ''
});

const fetchInitialData = () => {
    api.get('/orderReport/data')
        .then(res => {
            console.log(res.data);            
            customers.value = res.data.customers;
            statuses.value = res.data.statuses;
        })
        .catch(err => console.error('Error loading initial data:', err));
};

const fetchOrderReport = () => {
    api.post('/orderReport', search)
        .then(res => {
            console.log(res.data);            
            orders.value = res.data.orders;
        })
        .catch(err => console.error('Error fetching order report:', err));
};

const getCustomerName = (id) => {
    const c = customers.value.find(c => c.id === id);
    return c ? c.name : 'Unknown';
};

const getCustomerAddress = (id) => {
    const c = customers.value.find(c => c.id === id);
    return c ? c.address : 'N/A';
};

const getStatusName = (id) => {
    const s = statuses.value.find(s => s.id === id);
    return s ? s.name : 'N/A';
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
