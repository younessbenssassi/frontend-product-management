<template>
    <div class="content-wrapper">
        <div class="row">
            <div class="col-md-12 grid-margin">
                <div class="row">
                    <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                        <h3 class="font-weight-bold">Welcome {{ auth.user.firstname }}</h3>
                        <h6 class="font-weight-normal mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit!</h6>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 transparent">
                <div class="row">
                    <div class="col-md-6 mb-4 transparent">
                        <div class="card card-tale">
                            <div class="card-body">
                                <p class="mb-4">Today’s products</p>
                                <p class="fs-30 mb-2">{{ content.todayProductsCount }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4 stretch-card transparent">
                        <div class="card card-dark-blue">
                            <div class="card-body">
                                <p class="mb-4">Total products</p>
                                <p class="fs-30 mb-2">{{ content.allProductsCount }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import DashboardController from "@/controllers/DashboardController";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Dashboard",
    data(){
        return{
            content:{},
        }
    },
    computed:{
        ...mapState({
            auth: state => state.auth,
        }),
    },
    methods:{
        async getDashboardContent(){
            const controller = new DashboardController();
            const response = await controller.getDashboardContent();
            if(response.status)
                this.content = response.content;
        },
    },
    async mounted(){
        await this.getDashboardContent();
    }
}
</script>
