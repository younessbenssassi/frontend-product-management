<template>
    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <form class="forms-sample">
                        <div class="form-group">
                            <label for="firstname">Firstname</label>
                            <input
                                v-model="profile.firstname"
                                type="text"
                                class="form-control"
                                id="firstname"
                                placeholder="Firstname"
                            >
                            <p
                                v-if="$v.profile.firstname.$error"
                                class="text-danger"
                            >
                                Firstname is required
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="lastname">Lastname</label>
                            <input
                                v-model="profile.lastname"
                                type="text"
                                class="form-control"
                                id="lastname"
                                placeholder="Lastname"
                            >
                            <p
                                v-if="$v.profile.lastname.$error"
                                class="text-danger"
                            >
                                Lastname is required
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input
                                v-model="profile.email"
                                type="email"
                                class="form-control"
                                id="email"
                                placeholder="Email"
                            >
                            <p
                                    v-if="$v.profile.email.$error"
                                    class="text-danger"
                            >
                                Please enter a valid email
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                                v-model="profile.password"
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Password"
                            >
                            <p
                                v-if="$v.profile.password.$error"
                                class="text-danger"
                            >
                                Please enter a valid password
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation">Password confirmation</label>
                            <input
                                v-model="profile.password_confirmation"
                                type="password"
                                class="form-control"
                                id="password_confirmation"
                                placeholder="Password confirmation"
                            >
                            <p
                                v-if="$v.profile.password_confirmation.$error"
                                class="text-danger"
                            >
                                Password and password confirmation does not match
                            </p>
                        </div>
                        <button
                            @click.prevent="save"
                            type="submit"
                            class="btn btn-primary mr-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileController from "@/controllers/ProfileController";
import {mapActions,mapState} from "vuex";
import {email, minLength, required, sameAs} from "vuelidate/lib/validators";

export default {
    name: "ManageProfile",
    validations(){
        return{
            profile:{
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
                    min: minLength(8)
                },
                password_confirmation: {
                    min: minLength(8),
                    sameAsPassword: sameAs('password')
                }
            }
        }
    },
    data(){
        return {
            profile:{
                firstname:null,
                lastname:null,
                email:null,
                password:null,
                password_confirmation:null,
            }
        }
    },
    computed:{
        ...mapState({
            auth: state => state.auth,
        }),
    },
    methods:{
        ...mapActions({
            'get_auth': 'auth/get_auth',
        }),
        async save(){
            this.$v.profile.$touch();
            if(this.$v.profile.$error)
                return;

            const controller = new ProfileController();
            const response = await controller.updateProfile(this.profile);
            if(response.status){
                await this.get_auth();
                this.profile = Object.assign({}, this.auth.user);
            }
        }
    },
    mounted(){
        this.profile = Object.assign({}, this.auth.user);
    }
}
</script>
