import api from '@/resources/api.resource'

export default {
    Register(payload){
        return api.post(`/register`,payload)
    },
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
