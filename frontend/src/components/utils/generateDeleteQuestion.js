export const generateDeleteQuestion = () => {
    const size = 6; // Array size
    let arr = Array.from({ length: size }, () => Math.floor(Math.random() * 20));

    const targetIndex = Math.floor(Math.random() * size);
    //const targetValue = arr[targetIndex];

    return {
        type: "delete",
        question: `Delete element from index ${targetIndex} and shift elements left.`,
        array: arr,

        targetIndex
    };
};

