import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { userService } from '../services';
// import { Provider } from "react-redux";
// import configureStore from "../redux/store"

// import '../styles/styles.css';
// import 'bootstrap/dist/css/bootstrap.css'

// import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Script from 'next/script';
// import Loader from '../components/common/loader';

function MyApp({ Component, pageProps }) {

    // const store = configureStore();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        setUser(userService.userValue);
        const publicPaths = ['/login'];
        const path = url.split('?')[0];

        if (!userService?.userValue?.username && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: router.asPath === '/' && '/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
                    crossOrigin="anonymous"
                />
            </Head>
            <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                crossorigin="anonymous" />
            {authorized &&
                < Component {...pageProps} />
            }
        </>
    )
}

export default MyApp
