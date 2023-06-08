import authResource from "@/resources/auth.resource";
import { showSuccessMessage, showErrorMessage } from "@/helpers/ControllerHelper";

class UsersController{
    async Login(payload){
        try {
            const response = await authResource.Login(payload);
            if (response.data?.status){
                showSuccessMessage(response.data.message);  
                return {
                    status: response.data.status,
                    auth: response.data.auth,
                };
            }
            else{
                showErrorMessage(response.data.errors);
                return {
                    status: response.data.status,
                };
            }
                
        } catch (error) {
            console.error(error);
        }
    }
    async Logout(){
        try {
            const response = await authResource.Logout();

            if (response.data?.status){
                showSuccessMessage(response.data.message);  
                return {
                    status: response.data.status,
                    auth: response.data.auth,
                };
            }
            else{
                showErrorMessage(response.data.errors);
                return {
                    status: response.data.status,
                };
            }

        } catch (error) {
            console.error(error);
        }
    }
}
export default UsersController;
