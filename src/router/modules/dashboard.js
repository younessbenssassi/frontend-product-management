export default [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard'),
        meta: {
            title: 'Dashboard',
            public:false
        }
    },
]
