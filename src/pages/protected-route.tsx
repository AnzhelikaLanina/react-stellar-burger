import { Navigate, useLocation } from "react-router-dom";
import {useSelector} from "../services/types/hooks";
import {TComponentProps, TProtectedRouteProps} from "../utils/types";


const Protected = ({onlyUnAuth = false, component}: TProtectedRouteProps) => {
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
export const OnlyUnAuth = ({component}: TComponentProps) => (
    <Protected onlyUnAuth={true} component={component}/>
);