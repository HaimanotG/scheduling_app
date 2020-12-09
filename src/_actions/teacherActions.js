import {
  API,
  FETCH_TEACHERS,
  ADD_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER
} from "../_constants/action-types";

export const fetchTeachers = () => ({
  type: API,
  payload: {
    url: "/department/teachers",
    method: "get",
    next: FETCH_TEACHERS
  }
});

export const addTeacher = ({ name }) => ({
  type: API,
  payload: {
    url: "/department/teachers",
    method: "post",
    body: { name },
    next: ADD_TEACHER,
    successMessage: "1 Teacher Added",
    failureMessage: "Failed Adding Teacher",
    onSuccessRedirect: "/head/teacher"
  }
});

export const updateTeacher = ({ name, id }) => ({
  type: API,
  payload: {
    url: `/department/teachers/${id}`,
    method: "patch",
    body: { name },
    next: UPDATE_TEACHER,
    successMessage: "1 Teacher Updated",
    failureMessage: "Failed Updating Teacher",
    onSuccessRedirect: "/head/teacher"
  }
});

export const deleteTeacher = id => ({
  type: API,
  payload: {
    url: `/department/teachers/${id}`,
    method: "delete",
    next: DELETE_TEACHER,
    successMessage: "1 Teacher Deleted",
    failureMessage: "Failed Deleting Teacher",
    onSuccessRedirect: "/head/teacher"
  }
});
