import api from '@/resources/api.resource'

export default {
    updateProfile(payload){
        return api.put(`/update-profile`,payload)
    },
}
