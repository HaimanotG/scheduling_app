import getAuthHeader from "../_helpers/authHeader";
import axios from './axios';

export default {
    register: async (username, email, password) => {
        try {
            const response = await axios.post('/users/register',
                { username, email, password },
                { headers: await getAuthHeader() });
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
    },
    getUsers: ({ role }) => async () => {
        try {
            const authHeader = await getAuthHeader();
            const response = await axios.get(role ? `/users?role=${role}` : '/users', {
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
    getUser: async id => {
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
    updateUser: async (username, email, id) => {
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
    },
    deleteUser: async id => {
        try {
            await axios.delete(`users/${id}`, { headers: await getAuthHeader() });
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
    }
};