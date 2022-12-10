const catchAsync = (fn) => {
    return (...args) => {
        fn(...args).catch((e) => {
            console.log("ERROR IN FUNCTION =>", e.message);
        });
    };
};

export default catchAsync;