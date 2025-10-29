<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <button @click="goHome">Go to Home</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/dashboard')
}
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}

h1 {
  font-size: 3rem;
  color: #ff4c4c;
}

p {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #666;
}

button {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}
</style>
