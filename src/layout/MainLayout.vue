<script setup>
import Header from './Header.vue';
import Sidebar2 from './Sidebar2.vue';
import SidebarLeft from './SidebarLeft.vue';
import SidebarRight from './SidebarRight.vue';
</script>

<template>

    <!-- <div id="global-loader">
		<div class="whirly-loader"> </div>
	</div> -->


    <!-- Main Wrapper -->
    <div class="main-wrapper">

        <!-- Header -->
        <Header />
        <!-- /Header -->

        <!-- Sidebar -->
        <SidebarLeft />
        <!-- /Sidebar -->

        <!-- Sidebar -->
        <SidebarRight />
        <!-- /Sidebar -->

        <!-- Sidebar -->
        <Sidebar2 />
        <!-- /Sidebar -->

        <div class="page-wrapper">
            <div class="content">

                <!-- Dashboard Start-->


                <router-view></router-view>
                <!-- <RouterView/> -->


            </div>
        </div>

        <div class="customizer-links" id="setdata">
            <ul class="sticky-sidebar">
                <li class="sidebar-icons">
                    <a href="#" class="navigation-add" data-bs-toggle="tooltip" data-bs-placement="left"
                        data-bs-original-title="Theme">
                        <i data-feather="settings" class="feather-five"></i>
                    </a>
                </li>
            </ul>
        </div>

    </div>
    <!-- /Main Wrapper -->
</template>



<style></style>