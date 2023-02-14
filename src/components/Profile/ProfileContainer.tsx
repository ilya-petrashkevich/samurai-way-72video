import React, {FC} from 'react';
import Profile from "./Profile";
import {PostsType, ProfileType} from "../redux/store";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {compose} from "redux";
import {getUserProfile} from "../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import WithAuthRedirect from "../../hoc/withAuthRedirect";

type PathParamsType = {
    userId: string
}

type MapStatePropsType = {
    posts: PostsType[]
    newPostText: string
    profile: ProfileType
    // isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
}

type ProfileContainerPropsType =
    MapStatePropsType
    & MapDispatchPropsType;

type NewProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType;

class ProfileContainer extends React.Component<NewProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            //мой id '26879' //this.props.profile.userId.toString(); <=== это потом понадобится!!!!!! и работает видимо что бы получить свой id с сервера когда залогинен!!!!!!!
            userId = this.props.profile.userId.toString();
        }
        // console.log(userId)
        this.props.getUserProfile(userId);
        // console.log(this.props.profile)
    }

    render() {

        //if (!this.props.isAuth) return <Redirect to={"/login"}/>

        return (
            <div>
                <Profile
                    {...this.props}
                    posts={this.props.posts}
                    newPostText={this.props.newPostText}
                    profile={this.props.profile}
                />
            </div>
        )
    }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        // isAuth: state.auth.isAuth
    }
}

export default WithAuthRedirect( compose<FC>(connect(mapStateToProps, {getUserProfile}), withRouter)(ProfileContainer) )
