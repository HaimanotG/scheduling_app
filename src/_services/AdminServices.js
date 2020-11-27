import getAuthHeader from "../_helpers/authHeader";
import colleges from "./mocks/admin/colleges";
import axios from "./axios";

export default {
    getColleges: async () => {
        try {
            const authHeader = await getAuthHeader();
            const response = await axios.get("/admin/colleges", {
                headers: authHeader
            });
            return {
                success: true,
                data: response.data
            };
        } catch (e) {
            return {
                success: false,
                error: e.message
            };
        }
    },
    getCollege: async id => {
        try {
            const authHeader = await getAuthHeader();
            const response = await axios.get(`/admin/colleges/${id}`, {
                headers: authHeader
            });
            return {
                success: true,
                data: response.data
            };
        } catch (e) {
            return {
                success: false,
                error: e.message
            };
        }
    },
    getCollegesMocked: () =>
        new Promise(resolve => {
            resolve({
                data: {
                    colleges
                },
                success: true
            });
        }),
    addCollege: async (name, dean) => {
        try {
            const response = await axios.post('/admin/colleges',
                { name, dean },
                { headers: await getAuthHeader() });
            return {
                success: true,
                response: { data: response.data },
            }
        } catch (e) {
            const { success, error } = e.response.data;
            const { message } = error;
            return {
                success, error: message
            }
        }
    },
    updateCollege: async (name, dean, id) => {
        try {
            const response = await axios.patch(`admin/colleges/${id}`,
                { name, dean }, { headers: await getAuthHeader() });
            return {
                success: true,
                response: { data: response.data },
            }
        } catch (e) {
            const { success, error } = e.response.data;
            const { message } = error;
            return {
                success, error: message
            }
        }
    },
    deleteCollege: async id => {
        try {
            await axios.delete(`/admin/colleges/${id}`, { headers: await getAuthHeader() });
            return {
                success: true
            }
        } catch (e) {
            const { success, error } = e.response.data;
            const { message } = error;
            return {
                success, error: message
            }
        }
    },
    addCollegeMocked: () =>
        new Promise(resolve => {
            resolve({
                success: true,
                data: undefined,
                error: ""
            });
        }),
    getDeans: async () => {
        try {
            const authHeader = await getAuthHeader();
            const response = await axios.get("/users", {
                headers: authHeader
            });
            return {
                success: true,
                data: response.data
            };
        } catch (e) {
            return {
                success: false,
                error: e.message
            };
        }
    },
    getDean: async id => {
        try {
            const authHeader = await getAuthHeader();
            const response = await axios.get(`users/${id}`, {
                headers: authHeader
            });
            return {
                success: true,
                data: response.data
            };
        } catch (e) {
            return {
                success: false,
                error: e.message
            };
        }
    },
    updateDean: async (username, email, id) => {
        try {
            const response = await axios.patch(`users/${id}`,
                { username, email }, { headers: await getAuthHeader() });
            return {
                success: true,
                response: { data: response.data },
            }
        } catch (e) {
            const { success, error } = e.response.data;
            const { message } = error;
            return {
                success, error: message
            }
        }
    }
};
