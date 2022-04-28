import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { userService } from '../../services';
import styles from "./login.module.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { createRedirectRoute } from 'next/dist/server/server-route-utils';
// import Image from "next/image";

function LoginScreen() {
    const router = useRouter();
    const [loginState, setLoginState] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        showError: false,
    });

    useEffect(() => {
        if (userService.userValue?.username) {
            router.push("/")
        }
    }, [router]);

    const [showPassword, setShowPassword] = useState(false)
    const onSubmit = () => {
        if (loginState.email !== '' && loginState.password !== '') {
            return userService.login(loginState.email, loginState.password)
                .then(() => {
                    const returnUrl = router.query.returnUrl || '/';
                    router.push(returnUrl);
                }).catch((e) =>
                    alert("Invalid credential!!"))
        } else {
            setLoginState({
                ...loginState,
                showError: true,
            })
        }
    }

    const handleStateChange = (e) => {
        setLoginState({
            ...loginState,
            [e.target.id]: e.target.value,
            [`${e.target.id}Error`]: '',
        })
    }

    const validateEmail = () => {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginState.email))) {
            setLoginState({
                ...loginState,
                showError: true,
                emailError: 'You have entered an invalid email address!'
            })
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    return (
        <div className={styles.boxform}>
            <div className={styles.left}>
                {/* <img src="/assets/image/login-image.jpg" className={styles.loginimage} width="1906" height="1536" alt="" /> */}
            </div>
            <div className={styles.right}>
                <div className={styles.formcontainer}>
                    <form action="" method="">
                        <div className={styles.imgcontainer}>
                            {/* <img src="/assets/image/live-wire-logo.png" width="190" height="39" className="" alt="" /> */}
                        </div>
                        <div className={styles.logintxt}> Login</div>
                        <div className={styles.containerinputs}>
                            <div>
                                <label id="uname" className={styles.username}>Username or Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    value={loginState.email}
                                    id="email"
                                    autoComplete={'off'}
                                    onChange={handleStateChange}
                                    onBlur={validateEmail}
                                    className={styles.inputcont}
                                    placeholder="Enter Username"
                                    required
                                />
                                {loginState.showError && loginState.email === '' && <label className={styles.error}>Email required.</label>}
                                {loginState.showError && loginState.email && <label className={styles.error}>{loginState.emailError}</label>}
                            </div>
                            <label id="psw" className={styles.username}>Password</label>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <input
                                    value={loginState.password}
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete={'off'}
                                    onChange={handleStateChange}
                                    className={styles.inputcont}
                                    placeholder="Enter Password"
                                    required
                                />
                                {showPassword ?
                                    <VisibilityIcon className={styles.eye} onClick={handleShowPassword} /> :
                                    <VisibilityOffIcon className={styles.eye} onClick={handleShowPassword} />
                                }
                            </div>
                            {loginState.showError && loginState.password === '' && <label className={styles.error}>Password required.</label>}
                            {loginState.showError && loginState.password && <label className={styles.error}>{loginState.passwordError}</label>}
                            <Button onClick={onSubmit} className={styles.submitbutton}>Login</Button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default LoginScreen;
