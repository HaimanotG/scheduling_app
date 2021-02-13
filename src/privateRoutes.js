import {
    Admin,
    HeadList,
    DepartmentForm,
    DepartmentList,
    HeadForm
} from "./AdminPages";

import {
    Head,
    TeacherList,
    TeacherForm,
    RoomList,
    RoomForm,
    BatchList,
    BatchForm,
    CourseForm,
    CourseList,
    ViewSchedule,
    EditSchedule
} from "./HeadPages";

import {
    ChangePassword, Profile
} from './SharedPages';

import {
    UserRole
} from './_helpers';

export default [{
        path: "/change-password",
        component: ChangePassword,
        role: 'ALL'
    },
    {
        path: "/change-profile",
        component: Profile,
        role: 'ALL'
    },
    {
        path: "/admin",
        component: Admin,
        role: UserRole.ADMIN
    },
    {
        path: "/admin/head",
        component: HeadList,
        role: UserRole.ADMIN
    },
    {
        path: "/admin/head/add",
        component: HeadForm,
        role: UserRole.ADMIN
    },
    {
        path: "/admin/department",
        component: DepartmentList,
        role: UserRole.ADMIN
    },
    {
        path: "/admin/department/add",
        component: DepartmentForm,
        role: UserRole.ADMIN
    },
    {
        path: "/admin/head/:userId/edit",
        component: HeadForm,
        isEditing: true,
        role: UserRole.ADMIN
    },
    {
        path: "/admin/department/:departmentId/edit",
        component: DepartmentForm,
        isEditing: true,
        role: UserRole.ADMIN
    },
    {
        path: "/head",
        component: Head,
        role: UserRole.HEAD
    },
    {
        path: "/head/teacher",
        component: TeacherList,
        role: UserRole.HEAD
    },
    {
        path: "/head/teacher/add",
        component: TeacherForm,
        role: UserRole.HEAD
    },
    {
        path: "/head/teacher/:teacherId/edit",
        component: TeacherForm,
        isEditing: true,
        role: UserRole.HEAD
    },
    {
        path: "/head/room",
        component: RoomList,
        role: UserRole.HEAD
    },
    {
        path: "/head/room/add",
        component: RoomForm,
        role: UserRole.HEAD
    },
    {
        path: "/head/room/:roomId/edit",
        component: RoomForm,
        isEditing: true,
        role: UserRole.HEAD
    },
    {
        path: "/head/batch",
        component: BatchList,
        role: UserRole.HEAD
    },
    {
        path: "/head/batch/add",
        component: BatchForm,
        role: UserRole.HEAD
    },
    {
        path: "/head/batch/:batchId/edit",
        component: BatchForm,
        isEditing: true,
        role: UserRole.HEAD
    },
    {
        path: "/head/batch/:batchId/course",
        component: CourseList,
        role: UserRole.HEAD
    },
    {
        path: "/head/batch/:batchId/course/add",
        component: CourseForm,
        role: UserRole.HEAD
    },
    {
        path: "/head/batch/:batchId/course/edit/:courseId",
        component: CourseForm,
        isEditing: true,
        role: UserRole.HEAD
    },
    {
        path: "/head/schedule",
        component: ViewSchedule,
        role: UserRole.HEAD
    },
    {
        path: "/head/schedule/:department/:batch",
        component: ViewSchedule,
        role: UserRole.HEAD
    },
    {
        path: "/head/editSchedule/:scheduleId",
        component: EditSchedule,
        role: UserRole.HEAD
    }
];