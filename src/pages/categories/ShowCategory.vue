<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h3 class="mb-0">View Category</h3>
                </div>

                <!-- {{ categoryData }} -->

                <div class="card-body">
                    <form @submit.prevent="updateData">
                        <div class="app-form">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <!-- Set the input to readonly to prevent editing -->
                                <input v-model="categoryData.name" type="text" class="form-control" id="name"
                                    placeholder="Enter product name" readonly />
                            </div>

                            <div class="mb-3">
                                <label for="description" class="form-label">Description</label>
                                <!-- Set the input to readonly to prevent editing -->
                                <input v-model="categoryData.description" type="text" class="form-control"
                                    id="description" placeholder="Enter description" readonly />
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/Api';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { id } = useRoute().params
// console.log(id);

const router = useRouter();

const categoryData = reactive({
    "id": "",
    "name": "",
    "description": ""
})

onMounted(() => {
    fetchCategories();
});

// fetchCategory
const fetchCategories = () => {
    api.get(`/categories/${id}`)
        .then((result) => {
            console.log(result);
            const category = result.data.category

            categoryData.id = category.id;
            categoryData.name = category.name;
            categoryData.description = category.description;
        })
        .catch((err) => {
            console.log(err);
        });
};


</script>

<style></style>
