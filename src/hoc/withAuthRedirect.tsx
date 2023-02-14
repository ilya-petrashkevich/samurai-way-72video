import React, {Component, ComponentType, FC} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../components/redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}
export function WithAuthRedirect <T>(Component:FC<T> ) {

    const RedirectComponent = (props: MapStatePropsType) => {
        const {isAuth, ...restProps} = props;

        if (!isAuth) return <Redirect to={"/login"}/>

        return <Component {...restProps as T}/>
    }
    // let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    // return ConnectedRedirectComponent;
    return connect(mapStateToProps)(RedirectComponent)
};

export default WithAuthRedirect;