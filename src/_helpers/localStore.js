export default {
    set: (name, value) => {
        if (typeof value === "object") {
            localStorage.setItem(name, JSON.stringify(value));
        } else {
            localStorage.setItem(name, value);
        }
    },
    get: name => {
        const value = localStorage.getItem(name);
        if (value === 'undefined') {
            return {}
        }
        return JSON.parse(value);
    },
    remove: name => {
        localStorage.removeItem(name);
    }
};
