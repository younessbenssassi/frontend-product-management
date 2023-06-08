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
                                    type="text"
                                    class="form-control form-control-lg"
                                    id="firstname"
                                    placeholder="Firstname"
                                >
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control form-control-lg"
                                    id="lastname"
                                    placeholder="Lastname"
                                >
                            </div>
                            <div class="form-group">
                                <input
                                    type="email"
                                    class="form-control form-control-lg"
                                    id="email"
                                    placeholder="Email"
                                >
                            </div>
                            <div class="form-group">
                                <input
                                    type="password"
                                    class="form-control form-control-lg"
                                    id="password"
                                    placeholder="Password"
                                >
                            </div>
                            <div class="form-group">
                                <input
                                    type="password"
                                    class="form-control form-control-lg"
                                    id="password_confirmation"
                                    placeholder="Password confirmation"
                                >
                            </div>
                            <div class="mt-3">
                                <a class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="#">SIGN UP</a>
                            </div>
                            <div class="text-center mt-4 font-weight-light">
                                Already have an account? <a href="login.html" class="text-primary">Login</a>
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
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Register"
}
</script>
