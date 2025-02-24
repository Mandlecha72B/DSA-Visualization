export const generateUpdateQuestion = () => {
    const size = 6; // Array size
    let arr = Array.from({ length: size }, () => Math.floor(Math.random() * 20));


    const targetValue = Math.floor(Math.random() * 20);
    const targetIndex = Math.floor(Math.random() * size);

    return {
        type: "update",
        question: `update array index   ${targetIndex} with a value ${targetValue}.`,
        array: arr,
        targetValue,
        targetIndex
    };
};
