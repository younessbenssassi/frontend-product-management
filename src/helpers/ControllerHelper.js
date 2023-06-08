import { Notification } from 'element-ui';

function showSuccessMessage(mesage){
    Notification.success({
        title: 'Success',
        message: mesage,
      });
}

function showErrorMessage(error){
    Notification.error({
        title: 'Error',
        message: error,
      });
}

export {
    showSuccessMessage,
    showErrorMessage
}