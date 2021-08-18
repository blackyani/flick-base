import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

export default [
    {
        route: '/',
        icon: HomeIcon,
        label: 'Home'
    },
    {
        route: '/contact',
        icon: MailIcon,
        label: 'Contact'
    },
    {
        route: '/auth',
        icon: VpnKeyIcon,
        label: 'Sign in'
    },
    {
        route: '/auth',
        icon: VpnKeyIcon,
        label: 'Sign out'
    }
]