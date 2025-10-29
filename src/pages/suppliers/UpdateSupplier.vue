<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3 class="mb-0">Update Supplier</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateSupplier" enctype="multipart/form-data">
            <div class="app-form">
              <!-- Name -->
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="supplierData.name" type="text" class="form-control" id="name"
                  placeholder="Enter supplier name" />
              </div>

              <!-- Phone -->
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input v-model="supplierData.phone" type="text" class="form-control" id="phone"
                  placeholder="Enter phone number" />
              </div>

              <!-- Company -->
              <div class="mb-3">
                <label for="company" class="form-label">Company</label>
                <input v-model="supplierData.company" type="text" class="form-control" id="company"
                  placeholder="Enter Company" />
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="supplierData.email" type="email" class="form-control" id="email"
                  placeholder="Enter email" />
              </div>

              <!-- Address -->
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input v-model="supplierData.address" type="text" class="form-control" id="address"
                  placeholder="Enter address" />
              </div>

              <div>
                <button type="submit" class="btn btn-primary">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import api from "@/Api";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { id } = useRoute().params;
const router = useRouter();

onMounted(() => {
  fetchSupplierDetails();
});

// Supplier Data
const supplierData = reactive({
  id: "",
  name: "",
  phone: "",
  company: "",
  email: "",
  address: "",
});

// Fetch Supplier Details
const fetchSupplierDetails = () => {
  api.get(`/suppliers/${id}`)
    .then((result) => {
      const supplier = result.data.supplier;
      supplierData.id = supplier.id;
      supplierData.name = supplier.name;
      supplierData.phone = supplier.phone;
      supplierData.company = supplier.company;
      supplierData.email = supplier.email;
      supplierData.address = supplier.address;
    })
    .catch((err) => {
      console.log(err);
    });
};


// // Update Supplier
// const updateSupplier = () => {
//   const formData = new FormData();
//   formData.append('_method', 'PUT');

//   // Append supplier data
//   for (const key in supplierData) {
//     formData.append(key, supplierData[key]);
//   }

//   api.post(`/suppliers/${supplierData.id}`, formData)
//     .then(() => {
//       router.push({ path: "/suppliers" });
//     })
//     .catch((err) => {
//       console.log(err.response?.data || err);
//     });
// };

// Update Supplier
const updateSupplier = () => {
  const formData = new FormData();
  formData.append('_method', 'PUT'); // Required for Laravel to treat as PUT

  // Append all supplier data fields
  for (const key in supplierData) {
    formData.append(key, supplierData[key]);
  }

  // Make API request
  api.post(`/suppliers/${supplierData.id}`, formData)
    .then(() => {
      router.push({ path: "/suppliers" }); // Redirect after successful update
    })
    .catch((err) => {
      console.log(err.response?.data || err); // Log errors
    });
};

</script>


<style scoped></style>
