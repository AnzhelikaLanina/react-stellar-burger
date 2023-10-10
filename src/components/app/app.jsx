import React from "react";
import styles from "./app.module.css";
import { OnlyAuth, OnlyUnAuth } from "../../pages/protected-route";
import { closeModalIngredientDetails, getIngredients } from "../../services/actions/ingredient";
import { checkUserAuth } from "../../services/actions/auth";
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from "../../pages/home-page/home-page";
import LoginPage from "../../pages/login-page/login-page";
import PasswordForgotPage from "../../pages/password-forgot-page/password-forgot-page";
import PasswordResetPage from "../../pages/password-reset-page/password-reset-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import RegistrationPage from "../../pages/registration-page/registration-page";
import InfoIngredientPage from "../../pages/info-ingredient-page/info-ingredient-page";
import NotFound404 from "../../pages/not-found-page/not-found-page";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Profile from "../profile/profile";
import Orders from "../orders/orders";
import FeedPage from "../../pages/feed-page/feed-page";
import OrderInfoMain from "../order-info-main/order-info-main";
import OrderInfoPage from "../../pages/order-info-page/order-info-page";

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const closeModal = () => {
        navigate(-1);
        dispatch(closeModalIngredientDetails());
    };


    React.useEffect(() => {
        dispatch(checkUserAuth());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

  return (
      <div className={styles.app}>
          <AppHeader />
          <main className={styles.main}>
              <Routes location={background || location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>}/>}/>
                  <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage/>}/>}/>
                  <Route path="/forgot-password" element={<OnlyUnAuth component={<PasswordForgotPage/>}/>}/>
                  <Route path="/reset-password" element={<OnlyUnAuth component={<PasswordResetPage/>}/>}/>
                  <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>}/>}>
                      <Route index element={<OnlyAuth component={ <Profile />} />} />
                      <Route path="/profile/orders" element={<OnlyAuth component={ <Orders />} />} />
                  </Route>
                  <Route path="/profile/orders/:id" element={<OnlyAuth component={ <OrderInfoPage />} />} />
                  <Route path='/ingredients/:id' element={<InfoIngredientPage />} />
                  <Route path="/feed" element={<FeedPage />} />
                  <Route path="/feed/:id" element={<OrderInfoPage />} />
                  <Route path="*" element={<NotFound404 />} />
              </Routes>
          </main>
          {background && (
              <Routes>
                  <Route
                      path='/ingredients/:id'
                      element={
                      <Modal closeModal={closeModal}>
                          <IngredientDetails closeModal={closeModal} />
                      </Modal>
                  }
                  />
                  <Route
                      path='/feed/:id'
                      element={
                          <Modal closeModal={closeModal}>
                              <OrderInfoMain closeModal={closeModal} />
                          </Modal>
                      }
                  />
                  <Route
                      path='/profile/orders/:id'
                      element={
                          <Modal closeModal={closeModal}>
                              <OrderInfoMain closeModal={closeModal} />
                          </Modal>
                      }
                  />
              </Routes>
          )}
      </div>
  );
}

export default App;
