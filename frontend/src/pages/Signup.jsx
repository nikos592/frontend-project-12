import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/avatar.jpg';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img
                  className="rounded-circle"
                  src={logo}
                  alt={t('signupPage.alt')}
                />
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
