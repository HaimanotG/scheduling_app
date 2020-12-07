import {
  API,
  FETCH_ROOMS,
  ADD_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM
} from "../_constants/action-types";

export const fetchRooms = () => ({
  type: API,
  payload: {
    url: "/department/rooms",
    method: "get",
    next: FETCH_ROOMS
  }
});

export const addRoom = ({ name, isLab }) => ({
  type: API,
  payload: {
    url: "/department/rooms",
    method: "post",
    body: { name, isLab },
    next: ADD_ROOM,
    successMessage: "1 Room  Added",
    failureMessage: "Failed Adding Room ",
    onSuccessRedirect: "/head/room"
  }
});

export const updateRoom = ({ name, isLab, id }) => ({
  type: API,
  payload: {
    url: `/department/rooms/${id}`,
    method: "patch",
    body: { name, isLab },
    next: UPDATE_ROOM,
    successMessage: "1 Room  Updated",
    failureMessage: "Failed Updating Room ",
    onSuccessRedirect: "/head/room"
  }
});

export const deleteRoom = id => ({
  type: API,
  payload: {
    url: `/department/rooms/${id}`,
    method: "delete",
    next: DELETE_ROOM,
    successMessage: "1 Room  Deleted",
    failureMessage: "Failed Deleting Room ",
    onSuccessRedirect: "/head/room"
  }
});
