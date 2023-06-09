import api from '@/resources/api.resource'

export default {
    getDashboardContent(){
        return api.get(`/dashboard`)
    },
}
