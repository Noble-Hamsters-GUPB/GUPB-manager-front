const getBaseUrl = (): string => {
    return "https://gupb-manager-back.herokuapp.com/api/v1/";
}

const getSocketUrl = (): string => {
    return "https://gupb-manager-back.herokuapp.com/ws-message/";
}

export const urls = {
    getBaseUrl,
    getSocketUrl
}
