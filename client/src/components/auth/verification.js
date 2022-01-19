import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { accountVerify } from '../../store/actions/user-actions';

import FavoriteIcon from '@material-ui/icons/Favorite';

const iconStyle = {
    fontSize:"200px"
}

const AccountVerify = (props) => {
    const dispatch = useDispatch();

    const query = new URLSearchParams(props.location.search);
    const token = query.get('t');

    useEffect(()=>{
        dispatch(accountVerify(token)).then(() => {
            props.history.push('/login')
        }).catch(() => {
            props.history.push('/');
        })
    },[dispatch])

    return(
        <>
            <div style={{textAlign:'center'}}>
                <FavoriteIcon style={iconStyle}/>
            </div>
        </>
    )
}

export default AccountVerify;