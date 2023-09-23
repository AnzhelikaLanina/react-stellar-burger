import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";


const Protected = ({onlyUnAuth = false, component}) => {
    const isAuthChecked = useSelector(store => store.auth.isAuthChecked);
    const user = useSelector(store => store.auth.user);
    const location = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const {from} = location.state || {from: {pathname: "/"}};
        return <Navigate to={from} replace/>
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({component}) => (
    <Protected onlyUnAuth={true} component={component}/>
);

Protected.propTypes = {
    onlyUnAuth: PropTypes.bool,
    component: PropTypes.element.isRequired,
};