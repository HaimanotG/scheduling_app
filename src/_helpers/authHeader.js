import localStore from "./localStore";

export default async () => {
    const user = await localStore.get("user");
    if (user && user.sessionToken) {
        return {
            "x-auth-token": `${user.sessionToken}`
        };
    } else {
        return {};
    }
};