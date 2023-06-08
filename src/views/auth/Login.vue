<template>
    <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
                <div class="col-lg-4 mx-auto">
                    <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                        <div class="brand-logo">
                            <img src="@/assets/logo.png" alt="logo">
                        </div>
                        <h4>Hello! let's get started</h4>
                        <h6 class="font-weight-light">Sign in to continue.</h6>
                        <form class="pt-3">
                            <div class="form-group">
                                <input
                                    v-model="credential.email"
                                    class="form-control form-control-lg"
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                >
                                <p class="text-danger" v-if="$v.credential.email.$error">Please enter a valid email</p>
                            </div>
                            <div class="form-group">
                                <input
                                    v-model="credential.password"
                                    class="form-control form-control-lg"
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                >
                                <p class="text-danger" v-if="$v.credential.password.$error">Please enter a valid password</p>
                            </div>
                            <div class="mt-3">
                                <a
                                    @click.prevent="login"
                                    class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                    href="#"
                                >
                                    SIGN IN
                                </a>
                            </div>
                            <div class="my-2 d-flex justify-content-between align-items-center">
                                <a href="#" class="auth-link text-black">Forgot password?</a>
                            </div>
                            <div class="text-center mt-4 font-weight-light">
                                Don't have an account? <a href="register.html" class="text-primary">Create</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- content-wrapper ends -->
    </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import AuthController from "@/controllers/AuthController";
import {mapActions} from "vuex";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Login",
    validations(){
        return{
            credential:{
                email: { email,required },
                password: { required,min: minLength(8) }
            }
        }
    },
    data(){
        return{
            credential:{
                email:null,
                password:null
            }
        }
    },
    methods:{
        ...mapActions({
            'setAuthState': 'auth/setAuthState',
        }),
        async login(){
            this.$v.credential.$touch();
            if(this.$v.credential.$error)
                return;

            const controller = new AuthController();
            const response = await controller.Login(this.credential);
            if(response.status){
                this.setAuthState(response.auth);
                await this.$router.push({name: 'Dashboard'});
            }
        }
    }

}
</script>
