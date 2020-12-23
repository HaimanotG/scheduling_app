import {
    API,
    FETCH_COURSES,
    ADD_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE
} from "../_constants/action-types";

export const fetchTeachers = () => ({
    type: API,
    payload: {
        url: "/department/courses",
        method: "get",
        next: FETCH_COURSES
    }
});

export const addCourse = ({ name, semester, code, totalCreditHours, labCreditHours }) => ({
    type: API,
    payload: {
        url: "/department/courses",
        method: "post",
        body: { name, semester, code, totalCreditHours, labCreditHours },
        next: ADD_COURSE,
        successMessage: "1 Course Added",
        failureMessage: "Failed Adding Course",
        onSuccessRedirect: "/head/teacher"
    }
});

export const updateCourse = ({  name, semester, code, totalCreditHours, labCreditHours, id }) => ({
    type: API,
    payload: {
        url: `/department/courses/${id}`,
        method: "patch",
        body: {  name, semester, code, totalCreditHours, labCreditHours },
        next: UPDATE_COURSE,
        successMessage: "1 Course Updated",
        failureMessage: "Failed Updating Course",
        onSuccessRedirect: "/head/teacher"
    }
});

export const deleteCourse = id => ({
    type: API,
    payload: {
        url: `/department/courses/${id}`,
        method: "delete",
        next: DELETE_COURSE,
        successMessage: "1 Course Deleted",
        failureMessage: "Failed Deleting Course",
        onSuccessRedirect: "/head/teacher"
    }
});
