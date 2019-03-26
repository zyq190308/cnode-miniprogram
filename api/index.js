let rootUrl = 'https://cnodejs.org/';

let ajax = function ajax(options = {}) {
    const { 
        url,
        data,
        header,
        method,
        dataType,
        responseType,
        complete
    } = options;
    return new Promise(function(resolve, reject) {
        wx.request({
            url,
            data,
            header,
            method,
            dataType,
            responseType,
            success(res) {
                resolve(res);
            },
            fail(err) {
                reject(err);
            },
            complete
        });    
    });
};

export default {
    getList(params) {
        return ajax({
            url: rootUrl + 'api/v1/topics',
            data: params,
            method: 'GET'
        });
    },
    getDetail(params) {
        return ajax({
            url: rootUrl + `api/v1/topic/${params.id}`,
            method: 'GET'
        });
    }
};