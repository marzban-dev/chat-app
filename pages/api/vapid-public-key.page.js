const VapidPublicKeyPage = (req, res) => {
    res.send(process.env.VAPID_PUBLIC_KEY);
}

export default VapidPublicKeyPage;