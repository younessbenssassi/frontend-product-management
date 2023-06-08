import profileResource from "@/resources/profile.resource";
import { showSuccessMessage, showErrorMessage, handleErrorsFormat } from "@/helpers/ControllerHelper";

class ProfileController {
    async updateProfile(payload){
        try {
            const response = await profileResource.updateProfile(payload);
            if (response.data?.status){
                showSuccessMessage(response.data.message);  
                return {
                    status: response.data.status,
                    profile: response.data.user,
                };
            }
            else{
                showErrorMessage(handleErrorsFormat(response.data));
                return {
                    status: response.data.status,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
}
export default ProfileController;
