import webPush from "web-push";

const GenerateVapidKeysPage = (req, res) => {
    const vapidKey = webPush.generateVAPIDKeys();
    res.json(vapidKey);
}

export default GenerateVapidKeysPage;