import moment from 'moment';


function ParseDateTimeFormat(dateTime,fromat = 'MMMM Do YYYY, h:mm:ss a'){
    return moment(dateTime).format(fromat);
}

export {
    ParseDateTimeFormat,
}