import {
    API,
    FETCH_DEPARTMENTS,
    FETCH_HEADS,
    ADD_DEPARTMENT,
    DELETE_DEPARTMENT,
    UPDATE_DEPARTMENT,
    ADD_HEAD,
    UPDATE_HEAD,
    DELETE_HEAD
} from "../_constants/action-types";

export const fetchDepartments = () => ({
    type: API,
    payload: {
        url: "/admin/departments",
        method: "get",
        next: FETCH_DEPARTMENTS
    }
});

export const fetchHeads = () => ({
    type: API,
    payload: {
        url: "/users?role=head",
        method: "get",
        next: FETCH_HEADS
    }
});

export const registerHead = ({ username, password }) => ({
    type: API,
    payload: {
        url: "/users/register",
        body: { username, password },
        method: "post",
        next: ADD_HEAD,
        successMessage: "1 Head Registered",
        failureMessage: "Failed Registering Head",
        onSuccessRedirect: "/admin/head"
    },
})

export const updateHead = ({ username, id }) => ({
    type: API,
    payload: {
        url: `/users/${id}`,
        body: { username },
        method: "patch",
        next: UPDATE_HEAD,
        successMessage: "1 Head Updated",
        failureMessage: "Failed Deleting Head",
        onSuccessRedirect: "/admin/head"
    },
})

export const deleteHead = id => ({
    type: API,
    payload: {
        url: `/users/${id}`,
        method: "delete",
        next: DELETE_HEAD,
        successMessage: "1 Head Deleted",
        failureMessage: "Failed Deleting Head",
        onSuccessRedirect: "/admin/head"
    }
})

export const addDepartment = ({ name, head }) => ({
    type: API,
    payload: {
        url: "/admin/departments",
        body: { name, head },
        method: "post",
        next: ADD_DEPARTMENT,
        successMessage: "1 Department Added",
        failureMessage: "Failed Adding Department",
        onSuccessRedirect: "/admin/department"
    },
})

export const updateDepartment = ({ name, head, id }) => ({
    type: API,
    payload: {
        url: `/admin/departments/${id}`,
        body: { name, head },
        method: "patch",
        next: UPDATE_DEPARTMENT,
        successMessage: "1 Department Updated Successfully",
        failureMessage: "Failed Updating Department",
        onSuccessRedirect: "/admin/department"
    }
})

export const deleteDepartment = id => ({
    type: API,
    payload: {
        url: `/admin/departments/${id}`,
        method: "delete",
        next: DELETE_DEPARTMENT,
        successMessage: "1 Department Deleted",
        failureMessage: "Failed Deleting Department",
        onSuccessRedirect: "/admin/department"
    }
})