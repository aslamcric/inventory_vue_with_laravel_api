<template>
    <div class="row">

        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h3 class="mb-0">Create Category</h3>
                    <button class="btn btn-dark" @click="router.back()">
                        ← Back
                    </button>
                </div>

                <!-- {{ categoryData }} -->

                <div class="card-body">
                    <form @submit.prevent="createCategory">
                        <div class="app-form">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input v-model="categoryData.name" type="text" class="form-control" id="name"
                                    placeholder="Enter product name" />
                            </div>

                            <div class="mb-3">
                                <label for="description" class="form-label">Description</label>
                                <input v-model="categoryData.description" type="text" class="form-control" id="price"
                                    placeholder="Enter description" />
                            </div>

                            <div>
                                <button type="submit" class="btn btn-primary">Create</button>
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
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const categoryData = reactive({
    "name": "",
    "description": ""
})

const createCategory = () => {
    api.post("/categories", categoryData)
        .then((result) => {
            console.log(result);
            router.push({ path: "/categories" });
        }).catch((err) => {
            console.log(err);

        });
}

</script>

<style></style>