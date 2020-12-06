import UserRole from './UserRole';

export default  userRole => {
    if (userRole === UserRole.ADMIN) {
        return "/admin/college";
    } else if (userRole === UserRole.DEAN) {
        return "/college";
    } else {
        return "/department";
    }
};