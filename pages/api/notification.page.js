import webPush from "web-push";

const NotificationPage = (req, res) => {
    webPush.setVapidDetails(
        "http://localhost:3000/",
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );

    const subscription = req.body.subscription;
    const payload = req.body.payload;
    const options = {
        TTL: req.body.ttl,
    };

    setTimeout(function () {
        webPush
            .sendNotification(subscription, payload, options)
            .then(function () {
                res.status(201).end();
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).end();
            });
    }, req.body.delay * 1000);
}

export default NotificationPage;