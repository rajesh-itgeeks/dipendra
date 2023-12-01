module.exports = {
    sendResponse: function (res,statusCode,status,message,result) {
            res.status(statusCode).json({status,statusCode, message, result});
    },
}