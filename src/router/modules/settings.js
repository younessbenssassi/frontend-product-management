export default [
    {
        path: '/products',
        name: 'ProductsListing',
        component: () => import('@/views/settings/ProductsListing'),
        meta: {
            title: 'Products',
            public:false
        }
    },
    {
        path: '/manage-profile',
        name: 'ManageProfile',
        component: () => import('@/views/settings/ManageProfile'),
        meta: {
            title: 'Manage profile',
            public:false
        }
    },
]
