export const goToLastMessage = (smooth = false) => {
    const messagesContainer = document.querySelector("#messagesContainer");
    messagesContainer.scrollTo({
        left: 0,
        top: messagesContainer.scrollHeight,
        behavior: smooth ? "smooth" : "auto"
    })
}