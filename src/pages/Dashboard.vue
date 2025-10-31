<template>
  <div class="row">
    <!-- Total Purchase Amount -->
    <div class="col-xl-3 col-sm-6 col-12 d-flex">
      <div class="dash-widget w-100">
        <div class="dash-widgetimg">
          <span><img src="/assets/img/dash1.svg" alt="img" /></span>
        </div>
        <div class="dash-widgetcontent">
          <h5>${{ dashboard.total_purchases ?? 0 }}</h5>
          <h6>Total Purchase Amount</h6>
        </div>
      </div>
    </div>

    <!-- Total Sales Amount -->
    <div class="col-xl-3 col-sm-6 col-12 d-flex">
      <div class="dash-widget dash1 w-100">
        <div class="dash-widgetimg">
          <span><img src="/assets/img/dash2.svg" alt="img" /></span>
        </div>
        <div class="dash-widgetcontent">
          <h5>${{ dashboard.total_orders ?? 0 }}</h5>
          <h6>Total Orders Amount</h6>
        </div>
      </div>
    </div>

    <!-- Total Paid Purchase -->
    <div class="col-xl-3 col-sm-6 col-12 d-flex">
      <div class="dash-widget dash2 w-100">
        <div class="dash-widgetimg">
          <span><img src="/assets/img/dash3.svg" alt="img" /></span>
        </div>
        <div class="dash-widgetcontent">
          <h5>${{ dashboard.total_purchases_paid ?? 0 }}</h5>
          <h6>Total Purchase Paid</h6>
        </div>
      </div>
    </div>

    <!-- Total Paid Sales -->
    <div class="col-xl-3 col-sm-6 col-12 d-flex">
      <div class="dash-widget dash3 w-100">
        <div class="dash-widgetimg">
          <span><img src="/assets/img/dash4.svg" alt="img" /></span>
        </div>
        <div class="dash-widgetcontent">
          <h5>${{ dashboard.total_orders_paid ?? 0 }}</h5>
          <h6>Total Orders Paid</h6>
        </div>
      </div>
    </div>

    <!-- Total Customers -->
    <div class="col-xl-3 col-sm-6 col-12 d-flex">
      <div class="dash-count">
        <div class="dash-counts">
          <h4>{{ dashboard.total_customers ?? 0 }}</h4>
          <h5>Customers</h5>
        </div>
        <div class="dash-imgs">
          <i data-feather="user"></i>
        </div>
      </div>
    </div>

    <!-- Total Suppliers -->
    <div class="col-xl-3 col-sm-6 col-12 d-flex">
      <div class="dash-count das1">
        <div class="dash-counts">
          <h4>{{ dashboard.total_suppliers ?? 0 }}</h4>
          <h5>Suppliers</h5>
        </div>
        <div class="dash-imgs">
          <i data-feather="user-check"></i>
        </div>
      </div>
    </div>

    <!-- Total Purchase Invoice -->
    <div class="col-xl-3 col-sm-6 col-12 d-flex">
      <div class="dash-count das2">
        <div class="dash-counts">
          <h4>{{ dashboard.total_purchases_no ?? 0 }}</h4>
          <h5>Purchase Invoice</h5>
        </div>
        <div class="dash-imgs">
          <img src="/assets/img/file-text-icon-01.svg" class="img-fluid" alt="icon" />
        </div>
      </div>
    </div>

    <!-- Total Orders Invoice -->
    <div class="col-xl-3 col-sm-6 col-12 d-flex">
      <div class="dash-count das3">
        <div class="dash-counts">
          <h4>{{ dashboard.total_orders_no ?? 0 }}</h4>
          <h5>Orderss Invoice</h5>
        </div>
        <div class="dash-imgs">
          <i data-feather="file"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "@/services/axios";

const dashboard = ref({});

const fetchDashboardData = async () => {
  try {
    const response = await api.get("/dashboardData");
    dashboard.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error loading dashboard:", error);
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>

<style scoped>
h5 {
  font-weight: bold;
}
</style>
