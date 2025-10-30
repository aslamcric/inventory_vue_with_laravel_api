<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card shadow-sm border-0">
                <div class="card-body p-4">
                    <div class="invoice-wrap">
                        <!-- Supplier Section -->
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <h6 class="fw-bold mb-2 text-primary">Purchase Invoice From:</h6>
                                <ul>
                                    <li>Smart Inventory & Billing System</li>
                                    <li>Dhaka, Bangladesh</li>
                                    <li>Phone: 01793 956 777</li>
                                    <li>Email: mdaslamcric@gmail.com</li>
                                </ul>
                            </div>
                            <div class="col-md-3">
                                <h6 class="fw-bold mb-2 text-primary">Invoice To:</h6>
                                <select v-model="dataObj.selectedSupplier" class="form-control mb-2">
                                    <option value="">Select Supplier</option>
                                    <option v-for="s in suppliers" :key="s.id" :value="s">{{ s.name }}</option>
                                </select>
                                <p>Address: <span>{{ dataObj.selectedSupplier.address || 'N/A' }}</span></p>
                                <p>Email: <span>{{ dataObj.selectedSupplier.email || 'N/A' }}</span></p>
                                <p>Phone: <span>{{ dataObj.selectedSupplier.phone || 'N/A' }}</span></p>
                            </div>
                        </div>

                        <!-- Product Table -->
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead class="table-light text-white bg-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Discount</th>
                                        <th>Subtotal</th>
                                        <th>
                                            <button @click="clearCart" class="btn btn-danger">Clear All</button>
                                        </th>
                                    </tr>
                                    <!-- Add Product Row -->
                                    <tr>
                                        <th>#</th>
                                        <th>
                                            <select v-model="dataObj.selectedProduct" class="form-control">
                                                <option value="">Select Product</option>
                                                <option v-for="p in products" :key="p.id" :value="p">{{ p.name }}
                                                </option>
                                            </select>
                                        </th>
                                        <th><textarea class="form-control" v-model="dataObj.selectedProduct.description"
                                                disabled></textarea></th>
                                        <th><input type="text" class="form-control"
                                                v-model="dataObj.selectedProduct.price" disabled></th>
                                        <th><input type="number" class="form-control" v-model="dataObj.qty" min="1">
                                        </th>
                                        <th><input type="number" class="form-control" v-model="dataObj.discount"></th>
                                        <th><input type="text" class="form-control" :value="calculatedSubtotal"
                                                disabled></th>
                                        <th><button @click="addToCart" class="btn btn-success">Add</button></th>
                                    </tr>
                                </thead>

                                <!-- Cart Items -->
                                <tbody>
                                    <tr v-for="(item, i) in cartItems" :key="item.item_id">
                                        <td>{{ i + 1 }}</td>
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.description }}</td>
                                        <td>{{ item.price }}</td>
                                        <td>{{ item.qty }}</td>
                                        <td>{{ item.discount }}</td>
                                        <td>{{ item.subtotal }}</td>
                                        <td><button @click="itemRemove(item.item_id)"
                                                class="btn btn-warning">Remove</button></td>
                                    </tr>
                                    <tr v-if="cartItems.length === 0">
                                        <td colspan="8" class="text-center text-danger">No items in cart</td>
                                    </tr>
                                </tbody>

                                <!-- Totals -->
                                <tfoot>
                                    <tr>
                                        <td colspan="7" class="text-end">Sub Total</td>
                                        <td>{{ dataObj.subtotal }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="7" class="text-end">Tax (5%)</td>
                                        <td>{{ dataObj.tax }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="7" class="text-end">Discount</td>
                                        <td>{{ dataObj.totalDiscount }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="7" class="text-end fw-bold">Grand Total</td>
                                        <td class="fw-bold">{{ dataObj.grandTotal }}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <!-- Process Button -->
                        <div class="d-flex justify-content-end mt-4">
                            <button @click="processPurchase" class="btn btn-success" :disabled="cartItems.length === 0">
                                Process
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/Api';
import { ref, reactive, onMounted, computed } from 'vue';
import { useCart } from '../cart/Cart';
import router from '@/router';

// Cart System
const cart = useCart("purchases");
const cartItems = ref(cart.getCart());

// Suppliers and Products
const suppliers = ref([]);
const products = ref([]);

// Form Data
const dataObj = reactive({
    selectedSupplier: {},
    selectedProduct: {},
    qty: 1,
    discount: 0,
    subtotal: 0,
    tax: 0,
    totalDiscount: 0,
    grandTotal: 0,
});

// Computed Subtotal for Current Row
const calculatedSubtotal = computed(() => {
    if (!dataObj.selectedProduct.price) return 0;
    return (dataObj.selectedProduct.price * dataObj.qty) - (dataObj.discount || 0);
});

// Grand Total Calculation
const grandTotalCalculation = () => {
    const cartList = cart.getCart();
    const subtotalBeforeDiscount = cartList.reduce((acc, ele) => acc + (ele.price * ele.qty), 0);
    const totalDiscount = cartList.reduce((acc, ele) => acc + ele.discount, 0);
    const subtotalAfterDiscount = subtotalBeforeDiscount - totalDiscount;
    const tax = (subtotalAfterDiscount * 5) / 100;
    const grandTotal = subtotalAfterDiscount + tax;

    dataObj.subtotal = subtotalBeforeDiscount;
    dataObj.tax = tax;
    dataObj.totalDiscount = totalDiscount;
    dataObj.grandTotal = grandTotal;
}

// Add to Cart
const addToCart = () => {
    if (!dataObj.selectedProduct.id) return;

    const subtotal = (dataObj.selectedProduct.price * dataObj.qty) - (dataObj.discount || 0);

    cart.save({
        item_id: dataObj.selectedProduct.id,
        name: dataObj.selectedProduct.name,
        description: dataObj.selectedProduct.description,
        price: dataObj.selectedProduct.price,
        discount: dataObj.discount,
        qty: dataObj.qty,
        subtotal
    });

    cartItems.value = cart.getCart();
    grandTotalCalculation();

    // Reset Form
    dataObj.selectedProduct = {};
    dataObj.qty = 1;
    dataObj.discount = 0;
}

// Remove Item
const itemRemove = (id) => {
    cart.deleteItem(id);
    cartItems.value = cart.getCart();
    grandTotalCalculation();
}

// Clear Cart
const clearCart = () => {
    cart.clearCart();
    cartItems.value = cart.getCart();
    grandTotalCalculation();
}

// Process Purchase
const processPurchase = () => {
    if (!dataObj.selectedSupplier.id) return alert("Select supplier");

    const processData = {
        products: cart.getCart(),
        supplier: dataObj.selectedSupplier,
        order_total: dataObj.grandTotal,
        paid_amount: dataObj.grandTotal,
        discount: dataObj.totalDiscount,
        vat: dataObj.tax,
        purchase_date: new Date().toISOString().split('T')[0],
    };

    api.post("/purchase/processPurchase", processData)
        .then(result => {
            console.log(result.data);
            clearCart();
            dataObj.selectedSupplier = {};
            router.push('/purchases');

        })
        .catch(err => {
            console.log(err);
        });
}

// Fetch Suppliers & Products
const purchaseData = () => {
    api.get("/purchases/data")
        .then(result => {
            console.log(result.data);
            suppliers.value = result.data.suppliers;
            products.value = result.data.products;
        })
        .catch(err =>
            console.log(err)
        );
}

// Load on Mounted
onMounted(() => {
    purchaseData();
});
</script>

<style scoped>
.invoice-wrap {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
}
</style>
