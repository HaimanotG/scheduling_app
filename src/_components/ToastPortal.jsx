import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';

import Toast from './Toast';

const ToastPortal = props => {
    const portalRoot = document.getElementById('portal-root');
    // const toastContainer = useMemo(() => () => document.createElement("div"), [])
    const toastContainer = document.createElement("div");
    useEffect(() => {
        portalRoot.appendChild(toastContainer);
        return () => {
            portalRoot.removeChild(toastContainer);
        }
    })
    if (props.message.text) {
        return ReactDom.createPortal(<Toast />, portalRoot);
    } else {
        return ReactDom.createPortal(<div />, portalRoot);
    }
}
const mapStateToProps = state => ({
    message: state.ui.message,
})
export default connect(mapStateToProps)(ToastPortal);