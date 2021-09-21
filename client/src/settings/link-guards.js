import dashboardLinks from './dashboard-links';

export const authLinks = ['/login'];
export const notAuthLinks = ['/contact', '/sign-out'];
export const roleLinks = {
    admin: dashboardLinks,
    user: dashboardLinks.filter(({route}) => !['/dashboard/articles'].includes(route))
};