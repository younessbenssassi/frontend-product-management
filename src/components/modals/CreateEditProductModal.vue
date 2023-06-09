<template>
    <el-dialog
            :title="product.id ? 'Edit | '+product.name : 'Create new product'"
            width="50%"
            :before-close="close"
            :visible="true"
        >
        <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card-body">
                    <form class="forms-sample">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input
                                v-model="product.name"
                                type="text"
                                class="form-control"
                                id="name"
                                placeholder="Name"
                            >
                            <p
                                v-if="$v.product.name.$error"
                                class="text-danger"
                            >
                                Name is required
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="size">Size</label>
                            <input
                                v-model="product.size"
                                type="text"
                                class="form-control"
                                id="size"
                                placeholder="Size"
                            >
                            <p
                                v-if="$v.product.size.$error"
                                class="text-danger"
                            >
                                Size is required
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="quantity">Quantity</label>
                            <input
                                v-model="product.quantity"
                                type="number"
                                class="form-control"
                                id="quantity"
                                placeholder="Quantity"
                            >
                            <p
                                v-if="$v.product.quantity.$error"
                                class="text-danger"
                            >
                                Quantity is required
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="price">Price</label>
                            <input
                                v-model="product.price"
                                type="number"
                                class="form-control"
                                id="price"
                                placeholder="Price"
                            >
                            <p
                                v-if="$v.product.price.$error"
                                class="text-danger"
                            >
                                Price is required
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea
                                v-model="product.description"
                                class="form-control"
                                id="description"
                                rows="4"
                                cols="50"
                                placeholder="Description"
                            />
                            <p
                                v-if="$v.product.description.$error"
                                class="text-danger"
                            >
                                Description is required
                            </p>
                        </div>
                        <button
                            @click.prevent="save"
                            type="submit"
                            class="btn btn-primary mr-2"
                        >
                            Save
                        </button>
                        <button
                            @click.prevent="close"
                            class="btn btn-light"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </el-dialog>
</template>
<script>
import ProductController from "@/controllers/ProductController";
import {required} from "vuelidate/lib/validators";
export default {
    name: 'CreateEditProductModal',
    props:{
        defaultProduct:{
            type:Object,
            default:(()=>{ return {} })
        }
    },
    validations(){
        return{
            product:{
                name: {
                    required
                },
                size: {
                    required
                },
                quantity: {
                    required
                },
                price: {
                    required
                },
                description: {
                    required
                },
            }
        }
    },
    data(){
        return{
            product:{
                name:null,
                size:null,
                quantity:null,
                price:null,
                description:null,
            }
        }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        async save(){
            this.$v.product.$touch();
            if(this.$v.product.$error)
                return;

            const controller = new ProductController();
            let response = {};

            if(this.product.id)
                response = await controller.updateProduct(this.product,this.product.hash);
            else    
                response = await controller.createProduct(this.product);

            if(response.status)
                this.$emit('product-saved',{
                    isUpdate:this.product.id ? true : false,
                    product:response.product
                })
        }
    },
    mounted(){
        this.product = Object.assign({}, this.defaultProduct);
    }
   
}
</script>