<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card shadow-sm border-0">
                <div class="card-body p-4">
                    <div class="invoice-wrap">
                        <div class="row">
                            <!-- From Address -->
                            <div class="col-md-6">
                                <div class="invoice-address mb-4">
                                    <h6 class="fw-bold mb-2 text-primary">Purchase Invoice From:</h6>
                                    <ul class="list-unstyled">
                                        <li>Laravel POS</li>
                                        <li>Dhaka, Bangladesh</li>
                                        <li>Phone: 01793 956 777</li>
                                        <li>Email: mdaslamcric@gmail.com</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Supplier Select -->
                            <div class="col-md-3">
                                <div class="invoice-address text-start mb-4">
                                    <h6 class="fw-bold mb-2 text-primary">Invoice To:</h6>
                                    <option value="">Select Supplier</option>

                                    <select v-model="dataObj.selectedSupplier" class="form-control mb-2">
                                        <option v-for="s in suppliers" :key="s.id" :value="s">{{ s.name }}</option>
                                    </select>

                                    <p>Address: <span>{{ dataObj.selectedSupplier.address || 'N/A' }}</span></p>
                                    <p>Email: <span>{{ dataObj.selectedSupplier.email || 'N/A' }}</span></p>
                                    <p>Phone: <span>{{ dataObj.selectedSupplier.phone || 'N/A' }}</span></p>
                                </div>
                            </div>
                        </div>

                        <!-- Product Table -->
                        <div class="table-responsive mt-2">
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
                                        <th><button @click="clearCart" class="btn btn-danger">Clear All</button></th>
                                    </tr>
                                    <!-- Add New Product Row -->
                                    <tr>
                                        <th>#</th>
                                        <th>
                                            <option value="">Select Product</option>
                                            <select v-model="dataObj.selectedProduct" class="form-control">
                                                <option v-for="p in products" :key="p.id" :value="p">{{ p.name }}
                                                </option>
                                            </select>
                                        </th>
                                        <th>
                                            <textarea class="form-control" v-model="dataObj.selectedProduct.description"
                                                disabled></textarea>
                                        </th>
                                        <th>
                                            <input type="text" class="form-control"
                                                v-model="dataObj.selectedProduct.price" disabled>
                                        </th>
                                        <th>
                                            <input type="number" class="form-control" v-model="dataObj.qty" min="1">
                                        </th>
                                        <th>
                                            <input type="number" class="form-control" v-model="dataObj.discount">
                                        </th>
                                        <th>
                                            <input type="text" class="form-control" :value="calculatedSubtotal"
                                                disabled>
                                        </th>
                                        <th>
                                            <button @click="addToCart" class="btn btn-success">Add</button>
                                        </th>
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
                            <button @click="processPurchase" class="btn btn-success">Process</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Imports
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

// Computed Subtotal for Single Row
const calculatedSubtotal = computed(() => {
    if (dataObj.selectedProduct && dataObj.selectedProduct.price) {
        let price = dataObj.selectedProduct.price;
        let qty = dataObj.qty || 1;
        let discount = dataObj.discount || 0;
        return (price * qty) - discount;
    }
    return 0;
});

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
    if (!dataObj.selectedProduct.id) return; // ✅ check product selected

    let calculate_discount = dataObj.discount;
    let subtotal = (dataObj.selectedProduct.price * dataObj.qty) - calculate_discount;

    const data = {
        item_id: dataObj.selectedProduct.id,
        name: dataObj.selectedProduct.name,
        description: dataObj.selectedProduct.description,
        price: dataObj.selectedProduct.price,
        discount: calculate_discount,
        qty: dataObj.qty,
        subtotal: subtotal
    }

    cart.save(data);
    cartItems.value = cart.getCart();
    grandTotalCalculation(); // ✅ must recalculate

    // Reset Form
    dataObj.selectedProduct = {};
    dataObj.qty = 1;
    dataObj.discount = 0;
}

// Remove item from Cart
const itemRemove = (id) => {
    cart.deleteItem(id);
    cartItems.value = cart.getCart();
    grandTotalCalculation(); // ✅ must recalculate
}

// Clear entire Cart
const clearCart = () => {
    cart.clearCart();
    cartItems.value = cart.getCart();
    grandTotalCalculation(); // ✅ must recalculate
}

// Process Purchase (Send to API)
const processPurchase = () => {
    const processData = {
        products: cart.getCart(),
        supplier: dataObj.selectedSupplier,
        order_total: dataObj.grandTotal,
        paid_amount: dataObj.grandTotal,
        discount: dataObj.totalDiscount,
        vat: dataObj.tax,
    };

    api.post("/purchase/processOrder", processData)
        .then(result => {
            console.log(result.data);
            clearCart();
            router.push('/purchase')
        })
        .catch(err => {
            console.log(err);
        });
}

// Fetch Suppliers and Products
const purchaseData = () => {
    api.get("/purchase/data")
        .then(result => {
            console.log(result.data);
            suppliers.value = result.data.suppliers;
            products.value = result.data.products;
        })
        .catch(err => {
            console.log(err);
        });
}

// Load on Page Mount
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