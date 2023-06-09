<template>
    <div class="table-responsive">
        <div class="row">
            <div class="col-md-8">
                <el-button
                    class="mb-3"
                    size="mini"
                    type="primary"
                    @click.prevent="showProductModal = true"
                >
                    Create new product
                </el-button>
            </div>
            <div class="col-md-4 justify-content-end d-flex">
                <div class="dropdown flex-md-grow-1 flex-xl-grow-0">
                    <button
                        @click.prevent="showFilters = !showFilters"
                        class="btn btn-sm btn-light bg-white dropdown-toggle"
                        type="button" id="dropdownMenuDate2"
                    >
                        <i class="mdi mdi-calendar"></i>
                        Filters
                    </button>
                    <div
                        v-if="showFilters"
                        class="dropdown-menu dropdown-menu-right show"
                    >
                        <div class="dropdown-item">
                            <label class="form-check mx-sm-2 form-check-label">
                                <input
                                    v-model="filters.createdToday"
                                    type="checkbox"
                                    class="form-check-input"
                                >
                                Show only today products
                            </label>
                        </div>
                        <div class="dropdown-item">
                            <label class="form-check mx-sm-2 form-check-label">
                                <input
                                    v-model="filters.soldOut"
                                    type="checkbox"
                                    class="form-check-input"
                                >
                                Show only sold out products
                            </label>
                        </div>

                        <div class="dropdown-item">
                            <label for="priceMoreThan">Price more than</label>
                            <div class="form-group">
                                <input
                                    v-model="filters.priceMoreThan"
                                    type="number"
                                    id="priceMoreThan"
                                    class="form-control"
                                    placeholder="More than"
                                >
                            </div>
                        </div>
                        <div class="dropdown-item">
                            <label for="priceLessThan">Price less than</label>
                            <div class="form-group">
                                <input
                                    v-model="filters.priceLessThan"
                                    type="number"
                                    id="priceLessThan"
                                    class="form-control"
                                    placeholder="Less than"
                                >
                            </div>
                        </div>
                        <el-button
                            class="mb-3"
                            size="mini"
                            type="primary"
                            @click.prevent="ApplyFilters"
                        >
                            Apply filters
                        </el-button>

                    </div>
                </div>
            </div>
        </div>

        <el-table
                :data="products"
                style="width: 100%"
                :default-sort = "{prop: 'name', order: 'descending'}"
                id="scrollElement"
        >
            <el-table-column
                sortable
                prop="name"
                label="Name"
            >
            </el-table-column>
            <el-table-column
                prop="description"
                label="Description"
            >
            </el-table-column>
            <el-table-column
                sortable
                prop="quantity"
                label="Quantity"
            >
            </el-table-column>
            <el-table-column
                label="Price"
            >
                <template slot-scope="scope">
                    {{ scope.row.price }}$
                </template>
            </el-table-column>
            <el-table-column
                label="Created at"
            >
                <template slot-scope="scope">
                    {{ ParseDateTimeFormat(scope.row.created_at)  }}
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="info"
                        @click.prevent="openProductModal(scope.row)"
                    >
                        Edit
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click.prevent="handleDeleteProduct(scope.row)"
                    >
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <CreateEditProductModal
            v-if="showProductModal"
            :default-product="selectedProduct"
            @close="closeProductModal"
            @product-saved="handleProductSaved"
        />

        <ConfirmationModal
            v-if="showConfirmationModal"
            :content="'Are you sure to want to delete '+selectedProduct.name+' ?'"
            @close="cancelDeleteProduct"
            @confirmed="deleteProduct"
        />
    </div>
</template>

<script>
import ProductController from "@/controllers/ProductController";
import {ParseDateTimeFormat} from "@/helpers/DateTimeHelper";
import CreateEditProductModal from "@/components/modals/CreateEditProductModal";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { EventBus } from '@/event-bus';
export default {
    name: "ProductsListing",
    components:{
        CreateEditProductModal,
        ConfirmationModal
    },
    data(){
        return{
            products:[],
            search:'',
            showConfirmationModal:false,
            showProductModal:false,
            selectedProduct:null,
            showFilters:false,
            allProductsLoaded:false,
            loading:false,
            page:1,
            filters:{
                createdToday:false,
                soldOut:false,
                priceMoreThan:0,
                priceLessThan:0,
            }
        }
    },
    methods:{
        ParseDateTimeFormat,

        async getProducts(search = '',page = 1){
            this.loading = true;
            const controller = new ProductController();
            const payload = Object.assign({search,page}, this.filters)
            const response = await controller.getProducts(payload);
            if(response.status){
                if(!response.products || response.products.length < 20)
                    this.allProductsLoaded = true;
                else
                    this.page++;

                this.products = [...this.products, ...response.products]
                this.loading = false;
            }
        },
        async handleSearch(search){
            if(this.loading)
                return;

            this.page = 1;
            this.search = search;
            this.products = [];
            await this.getProducts(search);
        },

        handleDeleteProduct(product){
            this.selectedProduct = product;
            this.showConfirmationModal = true;
        },
        cancelDeleteProduct(){
            this.showConfirmationModal = false;
            this.selectedProduct = null;
        },
        async deleteProduct(){
            const controller = new ProductController();
            let response = await controller.deleteProduct(this.selectedProduct.hash);
            if(response.status){
                this.products.forEach((product,index)=>{
                    if(product.id === this.selectedProduct.id){
                        this.products.splice(index,1);
                        return 0;
                    }
                })
                this.cancelDeleteProduct();
            }
        },

        openProductModal(product){
            this.selectedProduct = product.id ? product : {};
            this.showProductModal = true;
        },
        closeProductModal(){
            this.showProductModal = false;
            this.selectedProduct = null;
        },
        handleProductSaved(payload){
            if(payload.isUpdate){
                let position = this.products.findIndex((product) => {
                    return product.id === payload.product.id;
                });
                this.$set(this.products, position, payload.product);
            }
            else
                this.products.unshift(payload.product);

            this.closeProductModal();
        },

        async handleScrollToLoadMore(){
            if(this.allProductsLoaded || this.loading)
                return;

            //bottom when e.target.scrollTop === e.target.scrollHeight-e.target.offsetHeight
            if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
                window.scrollBy(0,-80);
                await this.getProducts(this.search,this.page);
            }
        },

        async ApplyFilters(){
            this.page = 1;
            this.products = [];
            await this.getProducts(this.search,this.page);
        }
    },
    async mounted(){
        await this.getProducts();
        window.addEventListener("scroll", this.handleScrollToLoadMore);
        EventBus.$on('global-search', this.handleSearch);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScrollToLoadMore);
        EventBus.$off('global-search', this.handleSearch);
    },
}
</script>
