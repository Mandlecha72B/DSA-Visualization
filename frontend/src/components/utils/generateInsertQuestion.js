export const generateInsertQuestion = () => {
    const size = 6; // Array size
    let arr = Array.from({ length: size - 1 }, () => Math.floor(Math.random() * 20));
    arr.push(null); // Empty slot at the end

    const targetValue = Math.floor(Math.random() * 20);
    const targetIndex = Math.floor(Math.random() * (size - 1));

    return {
        type: "insert",
        question: `Shift elements and insert ${targetValue} at index ${targetIndex}.`,
        array: arr,
        targetValue,
        targetIndex
    };
};
