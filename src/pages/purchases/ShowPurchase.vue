<template>
    <div class="card">
        <div class="card-body">
            <div id="invoice">
                <!-- Invoice Header -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <h6 class="fw-bold text-primary">Purchase Invoice From:</h6>
                        <ul class="list-unstyled">
                            <li>Invoice: NO-100{{ purchase.id }}</li>
                            <li>Dhaka, Bangladesh</li>
                            <li>Phone: 01793 956 777</li>
                            <li>Email: mdaslamcric@gmail.com</li>
                        </ul>
                    </div>

                    <div class="col-md-3">
                        <h6 class="fw-bold text-primary">Invoice To:</h6>
                        <ul class="list-unstyled">
                            <li>Supplier Name: {{ purchase.supplier?.name }}</li>
                            <li>Address: {{ purchase.supplier?.address }}</li>
                            <li>Email: {{ purchase.supplier?.email }}</li>
                            <li>Phone: {{ purchase.supplier?.phone }}</li>
                        </ul>
                    </div>
                </div>

                <!-- Invoice Table -->
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead class="bg-primary text-white">
                            <tr>
                                <th>SL</th>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in purchase.purchase_details" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.products?.name }}</td>
                                <td>{{ item.qty }}</td>
                                <td>{{ format(item.price) }}</td>
                                <td>{{ format(item.discount) }}</td>
                                <td>{{ format(item.price * item.qty - item.discount) }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5" class="text-end">Total</td>
                                <td>{{ format(total) }}</td>
                            </tr>
                            <tr>
                                <td colspan="5" class="text-end">Tax (5%)</td>
                                <td>{{ format(tax) }}</td>
                            </tr>
                            <tr>
                                <td colspan="5" class="text-end">Total Discount</td>
                                <td>{{ format(totalDiscount) }}</td>
                            </tr>
                            <tr>
                                <td colspan="5" class="text-end fw-bold">Grand Total</td>
                                <td class="fw-bold">{{ format(grandTotal) }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <!-- Print Button -->
                <div class="d-flex justify-content-end mt-3">
                    <button id="printButton" class="btn btn-success" @click="printInvoice">Print</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/Api';

const route = useRoute();
const id = route.params.id;

const purchase = ref({});
const error = ref(null);

onMounted(() => {
    fetchPurchase(id);
});

const fetchPurchase = (id) => {
    api
        .get(`/vuePurchase/show/${id}`)
        .then((res) => {
            console.log(res.data.purchase);            
            purchase.value = res.data.purchase[0];
        })
        .catch((err) => {
            console.error(err);
        });
};

function format(value) {
    return parseFloat(value).toFixed(2);
}

function printInvoice() {
    const btn = document.getElementById('printButton');
    btn.style.display = 'none';
    window.print();
    setTimeout(() => {
        btn.style.display = 'block';
    }, 1000);
}

// Calculations
const total = computed(() => {
    if (!purchase.value.purchase_details) return 0;
    return purchase.value.purchase_details.reduce((sum, item) => {
        return sum + (item.price * item.qty - item.discount);
    }, 0);
});

const totalDiscount = computed(() => {
    if (!purchase.value.purchase_details) return 0;
    return purchase.value.purchase_details.reduce((sum, item) => {
        return sum + item.discount;
    }, 0);
});

const tax = computed(() => (total.value * 5) / 100);
const grandTotal = computed(() => total.value + tax.value - totalDiscount.value);
</script>

<style scoped>
/* Add your custom styles if needed */
</style>
