const getBaseUrl = (): string => {
    // return "https://gupb-manager-back.herokuapp.com/api/v1/";
    return "http://localhost:8080/api/v1/";
}

const getSocketUrl = (): string => {
    // return "https://gupb-manager-back.herokuapp.com/ws-message/";
    return "http://localhost:8080/ws-message/";
}

export const urls = {
    getBaseUrl,
    getSocketUrl
}
