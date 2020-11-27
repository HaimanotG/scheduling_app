import getAuthHeader from "../_helpers/authHeader";
import axios from "./axios";

export default {
    login: async (email, password) => {
        try {
            const response = await axios.post('/users/login', { email, password });
            const { username, role } = response.data;
            return {
                success: true,
                data: {
                    sessionToken: response.headers.authorization,
                    username,
                    role
                }
            }
        } catch (e) {
            const { success, error } = e.response.data;
            const { message } = error;
            return {
                success, error: message, response: null
            }
        }
    },
    loginMocked: (email, password) =>
        new Promise(resolve => {
            setInterval(() => {
                resolve({
                    success: true,
                    data: {
                        sessionToken: "gibrishtoken",
                        username: "Haimanot Getu",
                        role: "admin"
                    }
                });
            }, 1000);
        }),
    loginMockedError: (email, password) =>
        new Promise(resolve => {
            setInterval(() => {
                resolve({ success: false, error: "Something went wrong!" });
            }, 500);
        }),
    checkSessionTokenMocked: () =>
        new Promise(resolve => {
            resolve({ success: true });
        }),
    checkSessionToken: async () => {
        try {
            await axios.get('/users/checkSessionToken', { headers: await getAuthHeader() });
            return {
                success: true
            }
        } catch (e) {
            return {
                success: false
            }
        }
    },
    register: async (username, email, password) => {
        try {
            const response = await axios.post('/users/register', { username, email, password });
            return {
                success: true,
                data: response.data
            }
        } catch (e) {
            const { success, error } = e.response.data;
            const { message } = error;
            return {
                success, error: message, response: null
            }
        }
    }
};
