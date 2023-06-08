import api from '@/resources/api.resource'

export default {
    getAdmins(params){
        return api.get(`/admins`,{params})
    },
    getAdmin(hash){
        return api.get(`/admins/${hash}`)
    },
    createAdmin(payload){
        return api.post(`/admins`,payload)
    },
    updateAdmin(payload,hash){
        return api.put(`/admins/${hash}`,payload)
    },
    deleteAdmin(hash){
        return api.delete(`/admins/${hash}`)
    },
}
