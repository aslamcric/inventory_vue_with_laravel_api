<template>
  <div class="card">
    <div class="card-body">
      <div id="invoice">
        <!-- Invoice Header -->
        <div class="row mb-4">
          <div class="col-md-6">
            <h6 class="fw-bold text-primary">Purchase Invoice From:</h6>
            <ul class="list-unstyled">
              <li>Invoice: INV-100{{ id }}</li>
              <li>Phone: 01793 956 777</li>
              <li>Email: mdaslamcric@gmail.com</li>
            </ul>
          </div>

          <div class="col-md-3">
            <h6 class="fw-bold text-primary">Supplier Info:</h6>
            <ul class="list-unstyled">
              <li>Name: {{ purchase.suppliers?.name }}</li>
              <li>Address: {{ purchase.suppliers?.address || 'N/A' }}</li>
              <li>Email: {{ purchase.suppliers?.email || 'N/A' }}</li>
              <li>Phone: {{ purchase.suppliers?.phone || 'N/A' }}</li>
            </ul>
          </div>
        </div>

        <!-- Purchase Table -->
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

            <!-- Totals Section -->
            <tfoot>
              <tr>
                <td colspan="5" class="text-end fw-bold">Sub Total</td>
                <td class="fw-bold">{{ format(subtotal) }}</td>
              </tr>
              <tr>
                <td colspan="5" class="text-end fw-bold">Tax (5%)</td>
                <td class="fw-bold">{{ format(tax) }}</td>
              </tr>
              <tr>
                <td colspan="5" class="text-end fw-bold">Discount</td>
                <td class="fw-bold">{{ format(totalDiscount) }}</td>
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

const purchase = ref({});
const route = useRoute();
const id = route.params.id;

// Fetch purchase details
onMounted(() => {
  api
    .get(`/vuepurchase/show/${id}`)
    .then(res => {
      purchase.value = res.data.purchase;
    })
    .catch(err => console.log(err));
});

// Format number
function format(value) {
  return parseFloat(value || 0).toFixed(2);
}

// Print Invoice
function printInvoice() {
  const btn = document.getElementById('printButton');
  btn.style.display = 'none';
  window.print();
  setTimeout(() => {
    btn.style.display = 'block';
  }, 1000);
}

// Computed Subtotal
const subtotal = computed(() => {
  if (!purchase.value.purchase_details) return 0;
  return purchase.value.purchase_details.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);
});

// Computed Discount
const totalDiscount = computed(() => {
  return parseFloat(purchase.value.discount || 0);
});

// Computed Tax (5% of subtotal)
const tax = computed(() => {
  return (subtotal.value * 5) / 100;
});

// Computed Grand Total
const grandTotal = computed(() => {
  return subtotal.value + tax.value - totalDiscount.value;
});
</script>

<style scoped></style>
