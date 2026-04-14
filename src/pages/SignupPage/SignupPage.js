import React, { useEffect, useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiBookOpen, FiUser, FiMail, FiLock, FiEye, FiEyeOff,
  FiArrowRight, FiUserPlus
} from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import './Signup.scss';

// ✅ Field Component (OUTSIDE to prevent re-render focus issue)
const Field = memo(({ id, label, type = 'text', value, icon, err, placeholder, right, onChange }) => (
  <div className={`sp-box__field${err ? ' sp-box__field--error' : ''}`}>
    <label htmlFor={id}>{label}</label>
    <div className="sp-box__field-wrap">
      <span className="fi-left">{icon}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        autoComplete={id}
      />
      {right}
    </div>
    {err && <span className="sp-box__field__err">{err}</span>}
  </div>
));

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, isLoggedIn } = useAuth();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErr, setFieldErr] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/students', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const setField = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setFieldErr(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};

    if (!form.firstName.trim()) e.firstName = 'First name required';
    if (!form.lastName.trim()) e.lastName = 'Last name required';

    if (!form.email.trim()) e.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';

    if (!form.password) e.password = 'Password required';
    else if (form.password.length < 6) e.password = 'Min 6 characters';

    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';

    setFieldErr(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // fake delay
    await new Promise(r => setTimeout(r, 800));

    const result = signup(form);

    if (result.ok) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      {/* LEFT BRAND */}
      <aside className="sp-brand">
        <Link to="/" className="sp-brand__logo">
          <div className="sp-brand__logo-icon"><FiBookOpen /></div>
          <span className="sp-brand__logo-text">Edu<span>Manage</span></span>
        </Link>
      </aside>

      {/* RIGHT FORM */}
      <main className="sp-panel">
        <div className="sp-box">

          {/* Mobile Logo */}
          <Link to="/" className="sp-box__mobile-logo">
            <div className="sp-box__mobile-logo-icon"><FiBookOpen /></div>
            <span>Edu<em>Manage</em></span>
          </Link>

          <form className="sp-box__form" onSubmit={handleSubmit} noValidate>

            <div className="sp-box__row">
              <Field
                id="firstName"
                label="First Name"
                value={form.firstName}
                icon={<FiUser />}
                err={fieldErr.firstName}
                placeholder="Aarav"
                onChange={setField}
              />

              <Field
                id="lastName"
                label="Last Name"
                value={form.lastName}
                icon={<FiUser />}
                err={fieldErr.lastName}
                placeholder="Shah"
                onChange={setField}
              />
            </div>

            <Field
              id="email"
              label="Email Address"
              type="email"
              value={form.email}
              icon={<FiMail />}
              err={fieldErr.email}
              placeholder="you@example.com"
              onChange={setField}
            />

            <Field
              id="password"
              label="Password"
              type={showPwd ? 'text' : 'password'}
              value={form.password}
              icon={<FiLock />}
              err={fieldErr.password}
              placeholder="Min 6 characters"
              onChange={setField}
              right={
                <button type="button" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />

            <Field
              id="confirm"
              label="Confirm Password"
              type={showCfm ? 'text' : 'password'}
              value={form.confirm}
              icon={<FiLock />}
              err={fieldErr.confirm}
              placeholder="Repeat password"
              onChange={setField}
              right={
                <button type="button" onClick={() => setShowCfm(v => !v)}>
                  {showCfm ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />

            <button type="submit" className="sp-box__submit" disabled={loading}>
              {loading
                ? 'Creating account…'
                : (<><FiUserPlus /> Create Account <FiArrowRight /></>)}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;