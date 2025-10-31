<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h3 class="mb-0">Category Details</h3>
                </div>

                <div class="card-body">
                    <div class="app-form">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Name</label>
                            <p class="form-control-plaintext">{{ categoryData.name }}</p>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-bold">Description</label>
                            <p class="form-control-plaintext">
                                {{ categoryData.description || "No description available." }}
                            </p>
                        </div>

                        <div>
                            <button class="btn btn-secondary" @click="router.back()">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/Api';
import { reactive, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { id } = useRoute().params;
const router = useRouter();

const categoryData = reactive({
    id: "",
    name: "",
    description: ""
});

const loading = ref(true);

onMounted(() => {
    fetchCategory();
});

// Fetch category details
const fetchCategory = async () => {
    try {
        const res = await api.get(`/categories/${id}`);
        const category = res.data.category;

        categoryData.id = category.id;
        categoryData.name = category.name;
        categoryData.description = category.description;
    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.form-control-plaintext {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 8px 12px;
    background-color: #f9f9f9;
}
</style>
