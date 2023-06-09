import api from '@/resources/api.resource'

export default {
    getProducts(params){
        return api.get(`/products`,{params})
    },
    getProduct(hash){
        return api.get(`/products/${hash}`)
    },
    createProduct(payload){
        return api.post(`/products`,payload)
    },
    updateProduct(payload,hash){
        return api.put(`/products/${hash}`,payload)
    },
    deleteProduct(hash){
        return api.delete(`/products/${hash}`)
    },
}
