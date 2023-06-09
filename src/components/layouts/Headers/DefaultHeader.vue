<template>
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a class="navbar-brand brand-logo mr-5" href="#">
            <router-link :to="{ name: 'Dashboard'}">
                <img src="@/assets/logo.png" class="mr-2" alt="logo"/>
            </router-link>
        </a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">

        <ul class="navbar-nav mr-lg-2">
          <li class="nav-item nav-search d-none d-lg-block">
            <div class="input-group">
              <div class="input-group-prepend hover-cursor" id="navbar-search-icon">
                <span class="input-group-text" id="search">
                  <i class="icon-search"></i>
                </span>
              </div>
              <input
                  v-model="search"
                  @input="handleSearch"
                  type="text"
                  class="form-control"
                  id="navbar-search-input"
                  placeholder="Search now"
              >
            </div>
          </li>
        </ul>
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item nav-profile dropdown">
            <a
                @click.prevent="openProfileDropdown = !openProfileDropdown"
                class="nav-link dropdown-toggle"
                href="#"
                id="profileDropdown"
            >
                <img src="@/assets/images/no-avatar.png" alt="profile"/>
            </a>
            <div
                v-if="openProfileDropdown"
                class="dropdown-menu dropdown-menu-right navbar-dropdown show"
            >
              <a
                  @click.prevent="navigate('ManageProfile')"
                  class="dropdown-item"
              >
                <i class="ti-settings text-primary"></i>
                Manage profile
              </a>
              <a
                  @click.prevent="logout"
                  class="dropdown-item"
              >
                <i class="ti-power-off text-primary"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
import {mapActions} from "vuex";
import AuthController from "@/controllers/AuthController";
import { EventBus } from '@/event-bus';
export default {
    name: "DefaultHeader",
    data(){
        return{
            openProfileDropdown:false,
            search:'',
        }
    },
    methods:{
        ...mapActions({
            'resetAuthState': 'auth/resetAuthState',
        }),
        async navigate(routeName){
            if(this.$route.name === routeName)
                return;

            await this.$router.push({
                name:routeName
            })
        },
        async logout(){
            const controller = new AuthController();
            const response = await controller.Logout();
            if(response.status){
                this.resetAuthState();
                await this.$router.push({
                    name:'Login'
                })
            }
        },
        handleSearch(){
            if(this.search.length > 2 || !this.search){
                setTimeout(() => {
                    EventBus.$emit('global-search', this.search);
                }, 500);
            }
        }
    }
}
</script>