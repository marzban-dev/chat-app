import {useEffect, useState} from "react";
import urlBase64ToUint8Array from "utils/url-base-64-to-uint-8-array";

const usePushNotification = () => {
    const [subscription, setSubscription] = useState(null);

    const getSubscription = async (reg) => {
        // Get the server's public key
        // const response = await fetch('http://192.168.1.14:3000/api/vapid-public-key');
        const response = await fetch('http://localhost:3000/api/vapid-public-key');
        const vapidPublicKey = await response.text();

        // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
        // urlBase64ToUint8Array() is defined in /tools.js
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

        // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
        // send notifications that don't have a visible effect for the user).
        const newSubscription = reg.pushManager?.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
        });

        setSubscription(newSubscription);
    }

    useEffect(() => {
        // if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
        navigator.serviceWorker.ready.then(reg => {
            reg.pushManager.getSubscription().then(async sub => {
                if (sub) {
                    setSubscription(sub);
                } else {
                    getSubscription(reg);
                }
            });
        });
    }, []);

    return subscription;
}

export default usePushNotification;