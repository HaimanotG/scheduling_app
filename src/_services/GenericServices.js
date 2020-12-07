import axiosInstance from "../_services/axios";
import { authHeader } from "../_helpers";

class GenericAPIServices {

    async _genericRequest({ url, method, body }) {
        try {
            switch (method) {
                case "get":
                    return await axiosInstance.get(url, { headers: await authHeader() });
                case "post":
                    return await axiosInstance.post(url, body, { headers: await authHeader() });
                case "patch":
                    return await axiosInstance.patch(url, body, { headers: await authHeader() });
                case "delete":
                    return await axiosInstance.delete(url, { headers: await authHeader() });
                default:
                    return {
                        success: false,
                    };
            }
        } catch (e) {
            const { success, error } = e.response.data;
            const { message } = error;
            return {
                success, error: message
            }
        }
    };

    async get(url) {
        return this._genericRequest({ url, method: "get" })
    };

    post(url, body) {
        return this._genericRequest({ url, method: "post", body })
    }

    patch(url, body) {
        return this._genericRequest({ url, method: "patch", body })
    }

    delete(url) {
        return this._genericRequest({ url, method: "delete" })
    }
}

export default new GenericAPIServices();