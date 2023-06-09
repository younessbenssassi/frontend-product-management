<template>
    <div class="container-scroller">
        <template v-if="auth.loggedIn">
            <DefaultHeader />
            <div class="container-fluid page-body-wrapper">
                <DefaultNavBar />
                <div class="main-panel">
                    <div class="content-wrapper">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
    </div>
</template>

<script>
import DefaultHeader from "@/components/layouts/Headers/DefaultHeader";
import DefaultNavBar from "@/components/layouts/NavBars/DefaultNavBar";
import {mapState} from "vuex";
export default {
    name: "DefaultLayout",
    components: {
        DefaultHeader,
        DefaultNavBar,
    },
    computed:{
        ...mapState({
            auth: state => state.auth,
        }),
    },
}
</script>
