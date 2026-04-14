import React, { useEffect, useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiBookOpen, FiUser, FiMail, FiLock, FiEye, FiEyeOff,
  FiArrowRight, FiUserPlus, FiArrowLeft, FiShield, FiCheckCircle
} from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import './Signup.scss';

// ✅ Field Component (OUTSIDE to prevent re-render focus issue)
const Field = memo(({ id, label, type = 'text', value, icon, err, placeholder, right, onChange }) => (
  <div className={`sp-box__field${err ? ' sp-box__field--error' : ''}`}>
    <label htmlFor={id}>{label}</label>
    <div className="sp-box__field-wrap">
      <span className="sp-box__field-icon-left">{icon}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        autoComplete={id}
        style={{ paddingRight: right ? '44px' : '16px' }}
      />
      {right && <span className="sp-box__field-icon-right">{right}</span>}
    </div>
    {err && <span className="sp-box__field__err">{err}</span>}
  </div>
));

const ANIMATED_WORDS = ['Smarter.', 'Faster.', 'Together.', 'Simpler.'];

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

  const [showPwd, setShowPwd]   = useState(false);
  const [showCfm, setShowCfm]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [fieldErr, setFieldErr] = useState({});
  const [mounted, setMounted]   = useState(false);
  const [wordIdx, setWordIdx]   = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isLoggedIn) navigate('/students', { replace: true });
  }, [isLoggedIn, navigate]);

  // Word cycling animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % ANIMATED_WORDS.length);
        setWordVisible(true);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const setField = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setFieldErr(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name required';
    if (!form.lastName.trim())  e.lastName  = 'Last name required';
    if (!form.email.trim())     e.email     = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password)         e.password  = 'Password required';
    else if (form.password.length < 6) e.password = 'Min 6 characters';
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    setFieldErr(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = signup(form);
    if (result.ok) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  };

  return (
    <div className={`signup-page${mounted ? ' signup-page--mounted' : ''}`}>

      {/* ── Left brand panel ─────────────────────────────────────────── */}
      <aside className="sp-brand">

        {/* Back button */}
        <button className="sp-brand__back" onClick={() => navigate('/')} aria-label="Back to home">
          <FiArrowLeft />
          <span>Back to Home</span>
        </button>

        <Link to="/" className="sp-brand__logo">
          <div className="sp-brand__logo-icon"><FiBookOpen /></div>
          <span className="sp-brand__logo-text">Edu<span>Manage</span></span>
        </Link>

        <div className="sp-brand__center">
          <h1 className="sp-brand__headline">
            Admin Portal.<br />
            <em className={`sp-brand__word${wordVisible ? ' sp-brand__word--visible' : ''}`}>
              {ANIMATED_WORDS[wordIdx]}
            </em>
          </h1>
          <p className="sp-brand__sub">
            Create your administrator account to manage students,
            track academic performance, and run campus operations — all from one place.
          </p>

          <div className="sp-brand__features">
            {[
              { icon: <FiShield />,      cls: 'teal',   title: 'Admin Access',       desc: 'Secure role-based portal entry' },
              { icon: <FiUserPlus />,    cls: 'purple',  title: 'Student Management', desc: 'Add, edit & track students easily' },
              { icon: <FiCheckCircle />, cls: 'orange',  title: 'Real-time Data',     desc: 'Live dashboards & analytics' },
            ].map((f, i) => (
              <div key={i} className={`sp-brand__feature sp-brand__feature--${i}`}>
                <div className={`sp-brand__feature-icon sp-brand__feature-icon--${f.cls}`}>{f.icon}</div>
                <div className="sp-brand__feature-text">
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Right form panel ─────────────────────────────────────────── */}
      <main className="sp-panel">

        {/* Mobile back button */}
        <button className="sp-panel__back" onClick={() => navigate('/')} aria-label="Back to home">
          <FiArrowLeft />
        </button>

        <div className="sp-box">

          {/* Mobile Logo */}
          <Link to="/" className="sp-box__mobile-logo">
            <div className="sp-box__mobile-logo-icon"><FiBookOpen /></div>
            <span>Edu<em>Manage</em></span>
          </Link>

          <div className="sp-box__head">
            <div className="sp-box__tag"><span />Admin Registration</div>
            <h2 className="sp-box__title">Create Account 🚀</h2>
            <p className="sp-box__sub">Fill in your details to get started.</p>
          </div>

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
                <button type="button" className="sp-box__eye" onClick={() => setShowPwd(v => !v)}>
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
                <button type="button" className="sp-box__eye" onClick={() => setShowCfm(v => !v)}>
                  {showCfm ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />

            <button type="submit" className="sp-box__submit" disabled={loading}>
              {loading
                ? <><div className="spin" /> Creating account…</>
                : <><FiUserPlus /> Create Account <FiArrowRight /></>}
            </button>

            <div className="sp-box__div">or</div>

            <p className="sp-box__foot">
              Already have an account? <Link to="/login">Sign in →</Link>
            </p>

          </form>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;