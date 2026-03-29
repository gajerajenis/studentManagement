import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FiBookOpen, FiUser, FiMail, FiLock, FiEye, FiEyeOff,
    FiArrowRight, FiCheckCircle, FiUserPlus
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Signup.scss';

const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
};

const STEPS = [
    { n: 1, title: 'Create Account', desc: 'Fill in your personal details' },
    { n: 2, title: 'Set Password', desc: 'Choose a strong password' },
    { n: 3, title: 'Verify & Submit', desc: 'Confirm and create your account' },
    { n: 4, title: 'Access Dashboard', desc: 'Log in and manage students' },
];

/* ✅ FIXED: Field component OUTSIDE */
const Field = React.memo(({ id, label, type = 'text', value, icon, err, placeholder, right, onChange }) => (
    <div className={`sp-box__field${err ? ' sp-box__field--error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <div className="sp-box__field-wrap">
            <span className="fi-left">{icon}</span>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
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
    const [error, setError] = useState('');
    const [fieldErr, setFieldErr] = useState({});
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/students', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    const set = (k, v) => {
        setForm(f => ({ ...f, [k]: v }));
        setFieldErr(e => ({ ...e, [k]: '' }));
        setError('');
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
        setError('');
        if (!validate()) return;

        setLoading(true);
        await new Promise(r => setTimeout(r, 1000));

        const result = signup(form);
        if (result.ok) {
            setDone(true);
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">

            <aside className="sp-brand">
                <Link to="/" className="sp-brand__logo">
                    <div className="sp-brand__logo-icon"><FiBookOpen /></div>
                    <span className="sp-brand__logo-text">Edu<span>Manage</span></span>
                </Link>

                <div className="sp-brand__center">
                    <h1 className="sp-brand__headline">Join the<br /><em>Future of Learning.</em></h1>
                    <p className="sp-brand__sub">
                        Create your free account in seconds and unlock a powerful student
                        management dashboard built for modern educators.
                    </p>

                    <div className="sp-brand__steps">
                        {STEPS.map((s, i) => (
                            <div key={s.n} className="sp-brand__step">
                                <div className="sp-brand__step-line">
                                    <div className={`sp-brand__step-dot sp-brand__step-dot--${i < 3 ? 'active' : 'default'}`}>
                                        {i < 3 ? <FiCheckCircle /> : s.n}
                                    </div>
                                    {i < STEPS.length - 1 && <div className="sp-brand__step-connector" />}
                                </div>
                                <div className="sp-brand__step-body">
                                    <div className="sp-brand__step-title">{s.title}</div>
                                    <div className="sp-brand__step-desc">{s.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.4)' }}>
                    © 2025 EduManage · Created by Mr. Gajera Jenis
                </div>
            </aside>

            <main className="sp-panel">
                <div className="sp-box">
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
                                onChange={(e) => set('firstName', e.target.value)}
                            />

                            <Field
                                id="lastName"
                                label="Last Name"
                                value={form.lastName}
                                icon={<FiUser />}
                                err={fieldErr.lastName}
                                placeholder="Shah"
                                onChange={(e) => set('lastName', e.target.value)}
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
                            onChange={(e) => set('email', e.target.value)}
                        />

                        <Field
                            id="password"
                            label="Password"
                            type={showPwd ? 'text' : 'password'}
                            value={form.password}
                            icon={<FiLock />}
                            err={fieldErr.password}
                            placeholder="Min 6 characters"
                            right={
                                <button type="button" className="eye" onClick={() => setShowPwd(v => !v)}>
                                    {showPwd ? <FiEyeOff /> : <FiEye />}
                                </button>
                            }
                            onChange={(e) => set('password', e.target.value)} // ✅ FIXED
                        />

                        <Field
                            id="confirm"
                            label="Confirm Password"
                            type={showCfm ? 'text' : 'password'}
                            value={form.confirm}
                            icon={<FiLock />}
                            err={fieldErr.confirm}
                            placeholder="Repeat password"
                            right={
                                <button type="button" className="eye" onClick={() => setShowCfm(v => !v)}>
                                    {showCfm ? <FiEyeOff /> : <FiEye />}
                                </button>
                            }
                            onChange={(e) => set('confirm', e.target.value)}
                        />

                        <button type="submit" className="sp-box__submit" disabled={loading}>
                            {loading
                                ? <>Creating account…</>
                                : <><FiUserPlus /> Create Account <FiArrowRight /></>
                            }
                        </button>

                    </form>
                </div>
            </main>
        </div>
    );
};

export default SignupPage;