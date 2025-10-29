<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <!-- Header -->
                <div
                    class="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="mb-0">Manage Orders</h3>

                    <!-- Search bar -->
                    <form class="d-flex align-items-center" @submit.prevent>
                        <div class="input-group">
                            <input v-model="search" @input="fetchOrders" type="text" class="form-control"
                                placeholder="Search Order..." aria-label="Search" />
                            <span class="input-group-text bg-white border-start-0">
                                <i class="ti ti-search text-dark"></i>
                            </span>
                        </div>
                    </form>

                    <!-- Add Order button -->
                    <RouterLink to="/orders/create" class="btn btn-dark">
                        Create New Order
                    </RouterLink>
                </div>

                <!-- Table -->
                <div class="card-body table-responsive">
                    <table class="table table-striped table-bordered">
                        <thead class="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Customer Name</th>
                                <th>Order Total</th>
                                <th>Discount</th>
                                <th>Paid Amount</th>
                                <th>VAT</th>
                                <th>Order Date</th>
                                <th>Delivery Date</th>
                                <th>Status</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Show message when no data -->
                            <tr v-if="orders.data && orders.data.length === 0">
                                <td colspan="13" class="text-center text-danger">
                                    <h3>No data found!</h3>
                                </td>
                            </tr>

                            <!-- Loop through orders -->
                            <tr v-for="order in orders.data" :key="order.id">
                                <td>{{ order.id }}</td>
                                <td>{{ order.customers?.name || 'N/A' }}</td>
                                <td>{{ order.order_total }}</td>
                                <td>{{ order.discount }}</td>
                                <td>{{ order.paid_amount }}</td>
                                <td>{{ order.vat }}</td>
                                <td>{{ order.order_date }}</td>
                                <td>{{ order.delivery_date }}</td>
                                <td>{{ order.statuse?.name || 'N/A' }}</td>

                                <td class="text-center btn btn-group">
                                    <RouterLink :to="`/orders/show/${order.id}`" class="btn btn-sm btn-primary me-2">
                                        <i class="fas fa-eye"></i>
                                    </RouterLink>

                                    <!-- <RouterLink :to="`/orders/edit/${order.id}`" class="btn btn-sm btn-success me-2">
                                        <i class="fas fa-edit"></i>
                                    </RouterLink> -->

                                    <!-- <button class="btn btn-sm btn-danger" @click="deleteOrder(order.id)">
                                        <i class="fas fa-trash-alt"></i>
                                    </button> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="card-footer d-flex justify-content-end">
                    <nav>
                        <ul class="pagination mb-0">
                            <li v-for="page in orders.links" :key="page.label" class="page-item"
                                :class="{ active: page.active, disabled: !page.url }">
                                <button class="page-link" :disabled="!page.url"
                                    @click="page.url && fetchOrders(page.url)">
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
import api from "@/Api";
import { onMounted, ref } from "vue";

const orders = ref({ data: [] });
const search = ref("");

onMounted(() => {
    fetchOrders();
});

// fetchOrders
const fetchOrders = (url = "/allOrderindex") => {
    if (typeof url !== "string") {
        url = "/allOrderindex";
    }
    api
        .get(url, { params: { search: search.value } })
        .then((result) => {
            console.log(result);
            orders.value = result.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

// Pagination Button Label Formatting
const formatPageLabel = (label) => {
    if (label === "&laquo; Previous") return "Previous";
    if (label === "Next &raquo;") return "Next";
    return label;
};

// Optional: deleteOrder (Uncomment when ready)
// const deleteOrder = (id) => {
//     api
//         .delete(`/orders/${id}`)
//         .then((res) => {
//             console.log(res);
//             if (res.data.orders) {
//                 fetchOrders();
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
</script>


<style scoped></style>
