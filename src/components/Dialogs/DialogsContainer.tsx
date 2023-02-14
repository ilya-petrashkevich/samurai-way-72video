import React from 'react';
import {sendMessageAC, updateNewMessageBodyAC} from "../redux/dialogs-reduser"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {compose, Dispatch} from "redux";
import WithAuthRedirect from "../../hoc/withAuthRedirect";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody,
        // isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyAC(body))
        },
        sendMessage: () => {
            dispatch(sendMessageAC());
        }
    }
}
export default WithAuthRedirect(compose/*<FC>*/(connect(mapStateToProps, mapDispatchToProps))(Dialogs))
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
//
// export default DialogsContainer;