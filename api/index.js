let rootUrl = 'https://cnodejs.org/';

export default {
    getList(params, success) {
        wx.request({
            url: rootUrl + 'api/v1/topics',
            data: params,
            method: 'GET',
            success: success
        });
    },
    getDetail(params, success) {
        wx.request({
            url: rootUrl + `api/v1/topic/${params.id}`,
            method: 'GET',
            success: success
        });
    }
};