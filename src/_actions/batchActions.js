import {
    API,
    FETCH_BATCHES,
    ADD_BATCH,
    UPDATE_BATCH,
    DELETE_BATCH
} from "../_constants/action-types";

export const fetchBatches = () => ({
    type: API,
    payload: {
        url: "/department/batches",
        method: "get",
        next: FETCH_BATCHES
    }
});

export const addBatch = ({  name, classRoom, labRoom, more=false }) => ({
    type: API,
    payload: {
        url: "/department/batches",
        method: "post",
        body: {  name, classRoom, labRoom, },
        next: ADD_BATCH,
        successMessage: "1 Batch Added",
        failureMessage: "Failed Adding Batch ",
        onSuccessRedirect: more ? "/head/batch/add" : "/head/batch"
    }
});

export const updateBatch = ({ name, classRoom, labRoom, id  }) => ({
    type: API,
    payload: {
        url: `/department/batches/${id}`,
        method: "patch",
        body: { name, classRoom, labRoom },
        next: UPDATE_BATCH,
        successMessage: "1 Batch Updated",
        failureMessage: "Failed Updating Batch ",
        onSuccessRedirect: "/head/batch"
    }
});

export const deleteBatch = id => ({
    type: API,
    payload: {
        url: `/department/batches/${id}`,
        method: "delete",
        next: DELETE_BATCH,
        successMessage: "1 Batch Deleted",
        failureMessage: "Failed Deleting Batch ",
        onSuccessRedirect: "/head/batch"
    }
});
