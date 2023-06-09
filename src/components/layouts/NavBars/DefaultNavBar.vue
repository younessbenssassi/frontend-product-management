<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                    @click.prevent="navigate('Dashboard')"
                >
                    <i class="icon-grid menu-icon"></i>
                    <span class="menu-title">Dashboard</span>
                </a>
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                    @click.prevent="navigate('ProductsListing')"
                >
                    <i class="icon-layout menu-icon"></i>
                    <span class="menu-title">Products</span>
                </a>
            </li>

        </ul>
      </nav>
</template>
<script>
export default {
    name: "DefaultNavBar",
    methods:{
        async navigate(routeName){
            if(this.$route.name === routeName)
                return;

            await this.$router.push({
                name:routeName
            })
        }
    }
}
</script>

