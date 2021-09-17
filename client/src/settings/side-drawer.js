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
        route: '/login',
        icon: VpnKeyIcon,
        label: 'Sign in'
    },
    {
        route: '/sign-out',
        icon: VpnKeyIcon,
        label: 'Sign out'
    }
]