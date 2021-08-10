const AccessControl = require('accesscontrol');

let grantsObject = {
    admin:{
        profile:{
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    user:{
        profile:{
            'read:own': ['*', '!password', '!role', '!_id'],
            'update:own': ['*'],
        }
    }
}


const roles = new AccessControl(grantsObject);

module.exports = { roles }