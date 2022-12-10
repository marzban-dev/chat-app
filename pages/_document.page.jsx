import {Html, Head, Main, NextScript} from "next/document";

const MyDocument = () => {
    return (
        <Html>
            <Head>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff"/>
            </Head>
            <body className="bg-secondary">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}

export default MyDocument;