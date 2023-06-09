import productResource from "@/resources/product.resource";
import {showSuccessMessage, showErrorMessage, handleErrorsFormat} from "@/helpers/ControllerHelper";

class ProductController {
    async getProducts(params){
        try {
            const response = await productResource.getProducts(params);
            if (response.data?.status){
                return {
                    status: response.data.status,
                    products: response.data.products,
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
    async getProduct(hash){
        try {
            const response = await productResource.getProduct(hash);
            if (response.data?.status){
                showSuccessMessage(response.data.message);  
                return {
                    status: response.data.status,
                    product: response.data.product,
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
    async createProduct(payload){
        try {
            const response = await productResource.createProduct(payload);
            if (response.data?.status){
                showSuccessMessage(response.data.message);  
                return {
                    status: response.data.status,
                    product: response.data.product,
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
    async updateProduct(payload,hash){
        try {
            let response = await productResource.updateProduct(payload,hash);
            if (response.data?.status){
                showSuccessMessage(response.data.message);  
                return {
                    status: response.data.status,
                    product: response.data.product,
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
    async deleteProduct(hash){
        try {
            const response = await productResource.deleteProduct(hash);
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
export default ProductController;
