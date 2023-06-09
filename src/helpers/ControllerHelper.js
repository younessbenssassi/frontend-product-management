import { Notification } from 'element-ui';

function handleErrorsFormat(data){
    let errorsAsString = '';
    if(data.errors){
        Object.keys(data.errors).forEach(key => {
            errorsAsString += data.errors[key]+'\n';
        });

        return errorsAsString;
    }
    else
        errorsAsString = data.message;

    return errorsAsString;
}

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
    handleErrorsFormat,
    showSuccessMessage,
    showErrorMessage
}