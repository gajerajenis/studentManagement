import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiBookOpen, FiUser, FiMail, FiLock, FiEye, FiEyeOff,
  FiArrowRight, FiCheckCircle, FiUserPlus,
  FiShield,
  FiUsers,
  FiBarChart2,
  FiAlertCircle,
  FiLogIn
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Login.scss';


/* ✅ MOVE OUTSIDE */
const Field = ({ id, label, type = 'text', value, onChange, icon, err, placeholder, noIcon, right, setFieldErr, setError }) => (
  <div className={`lp-box__field${noIcon ? ' lp-box__field--no-icon' : ''}${err ? ' lp-box__field--error' : ''}`}>
    <label htmlFor={id}>{label}</label>
    <div className="lp-box__field-wrap">
      {!noIcon && <span className="fi-left">{icon}</span>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => {
          onChange(e.target.value);
          setFieldErr(fe => ({ ...fe, [id]: '' }));
          setError('');
        }}
        placeholder={placeholder}
        autoComplete={id}
      />
      {right}
    </div>
    {err && <span className="lp-box__field__err">{err}</span>}
  </div>
);


const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErr, setFieldErr] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/students', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    setFieldErr(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 900));

    const result = login({ email, password });

    if (result.ok) {
      setSuccess(`Welcome back, ${result.user.firstName}! Redirecting…`);
      setTimeout(() => navigate('/students'), 1000);
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      
      <aside className="lp-brand">
        <Link to="/" className="lp-brand__logo">
          <div className="lp-brand__logo-icon"><FiBookOpen /></div>
          <span className="lp-brand__logo-text">Edu<span>Manage</span></span>
        </Link>

        <div className="lp-brand__center">
          <h1 className="lp-brand__headline">Your Campus.<br /><em>Fully Connected.</em></h1>
          <p className="lp-brand__sub">
            Sign in to access your dashboard — manage students, track performance,
            and stay on top of academic operations in real time.
          </p>

          <div className="lp-brand__features">
            {[
              { icon: <FiShield />, cls: 'teal', title: 'Secure Access', desc: 'Role-based login with encryption' },
              { icon: <FiBarChart2 />, cls: 'purple', title: 'Live Analytics', desc: 'Real-time performance dashboards' },
              { icon: <FiUsers />, cls: 'orange', title: 'Student Management', desc: 'Full CRUD with advanced filters' },
            ].map((f, i) => (
              <div key={i} className="lp-brand__feature">
                <div className={`lp-brand__feature-icon lp-brand__feature-icon--${f.cls}`}>{f.icon}</div>
                <div className="lp-brand__feature-text">
                  <strong>{f.title}</strong><span>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="lp-panel">
        <div className="lp-box">
 <Link to="/" className="lp-box__mobile-logo">
            <div className="lp-box__mobile-logo-icon"><FiBookOpen /></div>
            <span>Edu<em>Manage</em></span>
          </Link>

          <div className="lp-box__head">
            <div className="lp-box__tag"><span />Secure Portal</div>
            <h2 className="lp-box__title">Welcome back 👋</h2>
            <p className="lp-box__sub">Sign in to your account to continue.</p>
          </div>

          <form className="lp-box__form" onSubmit={handleSubmit} noValidate>

            {error && <div className="lp-box__error"><FiAlertCircle /> {error}</div>}
            {success && <div className="lp-box__success"><FiCheckCircle /> {success}</div>}

            <Field
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
              icon={<FiMail />}
              err={fieldErr.email}
              placeholder="you@example.com"
              setFieldErr={setFieldErr}
              setError={setError}
            />

            <Field
              id="password"
              label="Password"
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              icon={<FiLock />}
              err={fieldErr.password}
              placeholder="Enter your password"
              setFieldErr={setFieldErr}
              setError={setError}
              right={
                <button type="button" className="eye" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />

            
            <div className="lp-box__opts">
              <label>
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                Remember me
              </label>
              <a href="#forgot">Forgot password?</a>
            </div>

            <button type="submit" className="lp-box__submit" disabled={loading}>
              {loading ? <><div className="spin" /> Signing in…</> : <><FiLogIn /> Sign In <FiArrowRight /></>}
            </button>

            <div className="lp-box__div">or</div>

            <p className="lp-box__foot">
              Don't have an account? <Link to="/signup">Create one →</Link>
            </p>

          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;