<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card wow-card">
          <div class="card-body d-flex flex-column align-items-center">
            <!-- ID Card Wrapper -->
            <div class="id-card" ref="idCard">
              <!-- Customer Photo -->
              <div class="photo mb-4">
                <img :src="photoPreview || `${imgUrl}/${customerData.photo}`" alt="Customer Photo" class="rounded-circle border shadow-lg" width="140" height="140" />
              </div>
  
              <!-- Customer Name -->
              <h4 class="card-title mb-3 text-primary font-weight-bold">{{ customerData.name }}</h4>
              
              <!-- Customer Details -->
              <div class="card-details text-center mb-4">
                <p class="card-text"><strong>Phone:</strong> {{ customerData.phone }}</p>
                <p class="card-text"><strong>Email:</strong> {{ customerData.email }}</p>
                <p class="card-text"><strong>Address:</strong> {{ customerData.address }}</p>
              </div>
  
              <!-- Card Footer -->
              <div class="card-footer text-center w-100 mt-2">
                <small class="text-muted font-italic">Customer ID: 2025_00{{ customerData.id }}</small>
              </div>
            </div>
  
            <!-- Print Button -->
            <button @click="printCard" class="btn btn-primary mt-4">Print ID Card</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import api from '@/Api';
  import { onMounted, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const { id } = useRoute().params;
  const router = useRouter();
  
  const imgUrl = import.meta.env.VITE_IMG_BASE_URL;
  const photoPreview = ref(null);
  
  const customerData = reactive({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    photo: ""
  });
  
  onMounted(() => {
    fetchCustomer();
  });
  
  const fetchCustomer = () => {
    api.get(`/customers/${id}`)
      .then((result) => {
        const customer = result.data.customer;
        customerData.id = customer.id;
        customerData.name = customer.name;
        customerData.phone = customer.phone;
        customerData.email = customer.email;
        customerData.address = customer.address;
        customerData.photo = customer.photo;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // Print ID Card Function
  const printCard = () => {
    const idCard = document.querySelector(".id-card");
    const printContents = idCard.outerHTML;
    const originalContents = document.body.innerHTML;
  
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  </script>
  
  <style scoped>
  /* Wow Card Styling */
  .wow-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    background: #f8f9fa;
    padding: 20px;
    margin-top: 30px;
    width: 450px;
  }
  
  .wow-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.2);
  }
  
  .id-card {
    width: 100%;
    padding: 20px;
    background: #ffffff;
    border-radius: 20px;
    text-align: center;
    border: 5px solid #003366;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .photo {
    margin-bottom: 20px;
  }
  
  .card-title {
    font-size: 1.7rem;
    font-weight: bold;
    margin-bottom: 15px;
    background: linear-gradient(135deg, #003366, #0099cc);
    color: #fff;
    padding: 5px;
    border-radius: 5px;
  }
  
  .card-details {
    color: #333;
    font-size: 1.1rem;
  }
  
  .card-text {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
  
  .card-footer {
    background-color: #f8f9fa;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }
  
  .card-footer small {
    font-size: 0.9rem;
    color: #777;
  }
  
  .card-text strong {
    font-weight: bold;
  }
  
  img {
    border: 4px solid #fff;
    border-radius: 50%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
  }
  
  img:hover {
    transform: scale(1.1);
  }
  </style>
  