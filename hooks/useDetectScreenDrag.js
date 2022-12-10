import {useEffect, useRef, useState} from "react";

const useDetectScreenDrag = (axis, moveDistance = 100) => {
    const [isDraggedOnAxis, setIsDraggedOnAxis] = useState(false);
    const firstClientXValue = useRef(0);
    const lastClientXValue = useRef(0);

    useEffect(() => {
        document.addEventListener("touchstart", (e) => {
            firstClientXValue.current = e.touches[0].clientX;
        });

        document.addEventListener("touchmove", (e) => {
            lastClientXValue.current = e.touches[0].clientX;
        });

        document.addEventListener("touchend", () => {
            const moveDifference = Math.abs(lastClientXValue.current) - Math.abs(firstClientXValue.current)
            if (Math.abs(moveDifference) > moveDistance) {
                if (moveDifference > 0) setIsDraggedOnAxis(axis === "right");
                else setIsDraggedOnAxis(axis === "left");
            }
        });
    }, []);

    return isDraggedOnAxis;
}

export default useDetectScreenDrag;