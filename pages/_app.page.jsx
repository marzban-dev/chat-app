import {QueryClientProvider, Hydrate, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useRef} from "react";
import store from "store";
import {Provider} from "react-redux";
import AppWrapper from "layout/app-wrapper";
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
    const queryClient = useRef(new QueryClient());

    return (
        <QueryClientProvider client={queryClient.current}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <AppWrapper>
                        <Component {...pageProps} />
                    </AppWrapper>
                </Provider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </Hydrate>
        </QueryClientProvider>
    )
}

export default MyApp;
