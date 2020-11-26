import request from './index';
import getAuthHeader from "../_helpers/authHeader";

export default {
    getTeachers: () => new Promise(async resolve => {
        const header = await getAuthHeader();
        request.get('/departments/teachers',header.authorization)
            .then(r => {
                const {error, body} = r;
                if (error || body.error) {
                    let reason = {success: false};
                    if (!body.success && body.error){
                        reason = {...reason, error: body.error.message}
                    }
                    resolve(reason);
                }
                resolve({
                    success: body.success || true,
                    data: {
                        teachers: body
                    }
                })
            }).catch(e => {
            resolve({success: false,error:e.message});
        });
    }),
};