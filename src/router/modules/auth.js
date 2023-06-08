export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login'),
        meta: {
            title: 'Login',
            public:true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/Register'),
        meta: {
            title: 'Register',
            public:true
        }
    },
]
