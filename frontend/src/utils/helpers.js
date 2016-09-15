export function getAsUriParameters(data) {
    return Object.keys(data).map((k) => {
        if (_.isArray(data[k])) {
            const keyE = encodeURIComponent(k + '[]');
            return data[k].map((subData) => {
                return keyE + '=' + encodeURIComponent(subData);
            }).join('&');
        } else {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        }
    }).join('&');
}