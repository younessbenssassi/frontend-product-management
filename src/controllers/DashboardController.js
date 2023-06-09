import dashboardResource from "@/resources/dashboard.resource";
import { showErrorMessage, handleErrorsFormat } from "@/helpers/ControllerHelper";

class DashboardController {
    async getDashboardContent(){
        try {
            const response = await dashboardResource.getDashboardContent();
            if (response.data?.status){
                return {
                    status: response.data.status,
                    content: response.data.content,
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
export default DashboardController;
