import {
    API,
    FETCH_COURSES,
    ADD_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE,
    FETCH_SEMESTERS
} from "../_constants/action-types";

export const fetchCourses = semester => ({
    type: API,
    payload: {
        url: `/department/semesters/${semester}/courses`,
        method: "get",
        next: FETCH_COURSES
    }
});

export const addCourse = (fields, batchId, more = false) => ({
    type: API,
    payload: {
        url: "/department/courses",
        method: "post",
        body: { ...fields },
        next: ADD_COURSE,
        successMessage: "1 Course Added",
        failureMessage: "Failed Adding Course",
        onSuccessRedirect: more ? `/head/batch/${batchId}/course/add` :
            `/head/batch/${batchId}/course?semester=${fields.semester}`
    }
});

export const updateCourse = (fields, batchId) => ({
    type: API,
    payload: {
        url: `/department/courses/${fields.id}`,
        method: "patch",
        body: { ...fields },
        next: UPDATE_COURSE,
        successMessage: "1 Course Updated",
        failureMessage: "Failed Updating Course",
        onSuccessRedirect: `/head/batch/${batchId}/course?semester=${fields.semester}`
    }
});

export const deleteCourse = (id, batchId, semester) => ({
    type: API,
    payload: {
        url: `/department/courses/${id}`,
        method: "delete",
        next: DELETE_COURSE,
        successMessage: "1 Course Deleted",
        failureMessage: "Failed Deleting Course",
        onSuccessRedirect: `/head/batch/${batchId}/course?semester=${semester}`
    }
});

export const fetchSemesters = batchId => ({
    type: API,
    payload: {
        url: `/department/batches/${batchId}/semesters`,
        method: "get",
        next: FETCH_SEMESTERS
    }
})