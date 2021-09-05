import * as users from './index';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const registerUser = (values) => {
    // return async (dispatch, getState) =>  {
    //     try {
    //         const {email, password} = params;
    //         console.log(params);
    //         const {data} = await axios.post('api/users/register', params);
    //         console.log(data);
    //         // let newArticles = [...data];
    //
    //         // if (prevArticles) {
    //         //     newArticles = [...prevArticles, ...data];
    //         // }
    //         // dispatch(articles.getArticles(newArticles));
    //
    //     } catch (error) {
    //         // dispatch(articles.notificationShow('error', error.message));
    //     }
    // }

    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/users/register`,{
                email: values.email,
                password: values.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            console.log(user);
            // dispatch(users.authUser({data: user.data, auth: true }))
            // dispatch(users.successGlobal('Welcome !!.Check you email and validate your account'))
        } catch(error){
            dispatch(users.notificationShow('error', error.message));
        }
    }
}

export const loginUser = (params) => {
    return async (dispatch, getState) =>  {
        try {
            const {data} = await axios.post('api/users/sign-in', params);
            console.log(data);

            // dispatch(users.auth(data));

        } catch (error) {
            // console.log(JSON.parse(JSON.stringify(error)));
            // dispatch(articles.notificationShow('error', error.message));
        }
    }
}