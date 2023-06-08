import adminResource from "@/resources/admin.resource";
import { showSuccessMessage, showErrorMessage, handleErrorsFormat } from "@/helpers/ControllerHelper";

class AdminController {
    async getAdmins(params){
        try {
            const response = await adminResource.getAdmins(params);
            if (response.data?.status){
                //showSuccessMessage(response.data.message);  
                return {
                    status: response.data.status,
                    admins: response.data.admins,
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
    async getAdmin(hash){
        try {
            const response = await adminResource.getAdmin(hash);
            if (response.data?.status){
                showSuccessMessage(response.data.message);  
                return {
                    status: response.data.status,
                    admin: response.data.admin,
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
    async createAdmin(payload){
        try {
            const response = await adminResource.createAdmin(payload);
            if (response.data?.status){
                showSuccessMessage(response.data.message);  
                return {
                    status: response.data.status,
                    admin: response.data.admin,
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
    async updateAdmin(payload,hash){
        try {
            let response = await adminResource.updateAdmin(payload,hash);
            if (response.data?.status){
                showSuccessMessage(response.data.message);  
                return {
                    status: response.data.status,
                    admin: response.data.admin,
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
    async deleteAdmin(hash){
        try {
            const response = await adminResource.deleteAdmin(hash);
            if (response.data?.status)
                showSuccessMessage(response.data.message);  
            else
                showErrorMessage(handleErrorsFormat(response.data));

            return {
                status: response.data.status,
            };
        } catch (error) {
            console.error(error);
        }
    }

}
export default AdminController;
