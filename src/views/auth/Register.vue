<template>
    <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
                <div class="col-lg-4 mx-auto">
                    <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                        <div class="brand-logo">
                            <img src="@/assets/logo.png" alt="logo">
                        </div>
                        <h4>New here?</h4>
                        <h6 class="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                        <form class="pt-3">
                            <div class="form-group">
                                <input
                                    v-model="user.firstname"
                                    type="text"
                                    class="form-control form-control-lg"
                                    id="firstname"
                                    placeholder="Firstname"
                                >
                                <p
                                    v-if="$v.user.firstname.$error"
                                    class="text-danger"
                                >
                                    Firstname is required
                                </p>
                            </div>
                            <div class="form-group">
                                <input
                                    v-model="user.lastname"
                                    type="text"
                                    class="form-control form-control-lg"
                                    id="lastname"
                                    placeholder="Lastname"
                                >
                                <p
                                    v-if="$v.user.lastname.$error"
                                    class="text-danger"
                                >
                                    Lastname is required
                                </p>
                            </div>
                            <div class="form-group">
                                <input
                                    v-model="user.email"
                                    type="email"
                                    class="form-control form-control-lg"
                                    id="email"
                                    placeholder="Email"
                                >
                                <p
                                    v-if="$v.user.lastname.$error"
                                    class="text-danger"
                                >
                                    Please enter a valid email
                                </p>
                            </div>
                            <div class="form-group">
                                <input
                                    v-model="user.password"
                                    type="password"
                                    class="form-control form-control-lg"
                                    id="password"
                                    placeholder="Password"
                                >
                                <p
                                    v-if="$v.user.password.$error"
                                    class="text-danger"
                                >
                                    Please enter a valid password
                                </p>
                            </div>
                            <div class="form-group">
                                <input
                                    v-model="user.password_confirmation"
                                    type="password"
                                    class="form-control form-control-lg"
                                    id="password_confirmation"
                                    placeholder="Password confirmation"
                                >
                                <p
                                    v-if="$v.user.password_confirmation.$error"
                                    class="text-danger"
                                >
                                    Password and password confirmation does not match
                                </p>
                            </div>
                            <div class="mt-3">
                                <a
                                    @click.prevent="register"
                                    class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                    href="#"
                                >
                                    SIGN UP
                                </a>
                            </div>
                            <div class="text-center mt-4 font-weight-light">
                                Already have an account?
                                <router-link :to="{ name: 'Login'}">Login</router-link>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import AuthController from "@/controllers/AuthController";
import {mapActions} from "vuex";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Register",
    validations(){
        return{
            user:{
                firstname: {
                    required
                },
                lastname: {
                    required
                },
                email: {
                    email,
                    required
                },
                password: {
                    required,
                    min: minLength(8)
                },
                password_confirmation: {
                    required,
                    min: minLength(8),
                    sameAsPassword: sameAs('password')
                }
            }
        }
    },
    data(){
        return{
            user:{
                firstname:null,
                lastname:null,
                email:null,
                password:null,
                password_confirmation:null,
            }
        }
    },
    methods:{
        ...mapActions({
            'setAuthState': 'auth/setAuthState',
        }),
        async register(){
            this.$v.user.$touch();
            if(this.$v.user.$error)
                return;

            const controller = new AuthController();
            const response = await controller.Register(this.user);
            if(response.status){
                this.setAuthState(response.auth);
                await this.$router.push({name: 'Dashboard'});
            }
        }
    }
}
</script>
