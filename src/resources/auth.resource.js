import api from '@/resources/api.resource'

export default {
    Login(payload){
        return api.post(`/login`,payload)
    },
    Logout(){
        return api.post(`/logout`)
    },
    getAuthState(payload){
        return api.get(`/get-auth-state`,payload)
    },
}
