//SEARCHING AND SORTING VISUALIZER
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;

function instrumentUserCode(code, algorithmType = "sorting") {
    let ast;
    try {
        ast = parser.parse(code, { sourceType: "module", plugins: ["jsx"] });
    } catch (parseErr) {
        throw new Error("Syntax Error in user code: " + parseErr.message);
    }

    let arrayIdentifierName = "arr"; // Default fallback
    let searchElementIdentifierName = "x"; // Default fallback

    // STEP 1: Detect the array variable name from the function declaration
    traverse(ast, {
        FunctionDeclaration(path) {
            const params = path.node.params;
            if (params.length > 0 && t.isIdentifier(params[0])) {
                arrayIdentifierName = params[0].name;
            }
        },
    });

    traverse(ast, {
        FunctionDeclaration(path) {
            const params = path.node.params;
            if (params.length > 0 && t.isIdentifier(params[1])) {
                searchElementIdentifierName = params[1].name;
            }
        },
    });

    let functionName = null;

    // First, capture the name of the function we're inside (assumes single top-level function)
    traverse(ast, {
        FunctionDeclaration(path) {
            functionName = path.node.id?.name;
        }
    });


    // STEP 2: Inject logs for comparisons and sets/swaps
    traverse(ast, {
        CallExpression(path) {
            if (t.isIdentifier(path.node.callee) && path.node.callee.name === functionName) {
                const line = path.node.loc?.start.line || 0;

                const logRecursiveCall = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("recursiveCall"),
                        t.stringLiteral(functionName),
                        t.arrayExpression(path.node.arguments.map(arg => t.cloneNode(arg))),
                        t.booleanLiteral(false),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(line),
                    ])
                );

                path.insertBefore(logRecursiveCall);
            }
        },
        IfStatement(path) {
            const { test } = path.node;
            const line = path.node.loc?.start.line || 0;

            if (
                t.isBinaryExpression(test) &&
                ["<", ">", "<=", ">=", "==", "==="].includes(test.operator)
            ) {
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(test.left),
                        t.cloneNode(test.right),
                        t.booleanLiteral(false),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(line),
                    ])
                );
                path.insertBefore(logCompare);
            }
        },

        ForStatement(path) {
            const test = path.node.test;
            const body = path.node.body;
            const logsToInject = [];
            const isSwap = false;

            const makeLog = (binExpr, label) => {
                const args = [
                    t.stringLiteral(label), // "compare" or "check"
                    t.cloneNode(binExpr.left),
                    t.cloneNode(binExpr.right),
                    t.booleanLiteral(isSwap),
                    t.callExpression(
                        t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                        []
                    ),
                    t.numericLiteral(path.node.loc?.start.line || 0),
                ];

                // Only include operator if it's a "check"
                if (label === "check") {
                    args.push(t.stringLiteral(binExpr.operator));
                }

                return t.expressionStatement(
                    t.callExpression(t.identifier("log"), args)
                );
            };

            const handleBinExpr = (binExpr) => {
                if (!["<", ">", "==", "===", "<=", ">="].includes(binExpr.operator)) return;

                const isSimple = (node) =>
                    t.isLiteral(node) ||
                    t.isIdentifier(node) ||
                    t.isMemberExpression(node) ||
                    (
                        t.isBinaryExpression(node) &&
                        ["+", "-", "*", "/"].includes(node.operator) &&
                        (
                            (t.isIdentifier(node.left) || t.isMemberExpression(node.left)) &&
                            t.isLiteral(node.right)
                        )
                    );

                const isCheck = isSimple(binExpr.left) && isSimple(binExpr.right);
                const label = isCheck ? "check" : "compare";

                logsToInject.push(makeLog(binExpr, label));
            };


            // Process condition (test) of for loop
            if (t.isLogicalExpression(test)) {
                if (t.isBinaryExpression(test.left)) {
                    handleBinExpr(test.left);
                }
                if (t.isBinaryExpression(test.right)) {
                    handleBinExpr(test.right);
                }
            } else if (t.isBinaryExpression(test)) {
                handleBinExpr(test);
            }

            // Inject logs before loop body
            if (logsToInject.length > 0) {
                if (!t.isBlockStatement(body)) {
                    path.node.body = t.blockStatement([...logsToInject, body]);
                } else {
                    path.node.body.body.unshift(...logsToInject);
                }
            }
        },

        WhileStatement(path) {
            const test = path.node.test;
            const body = path.node.body;
            const logsToInject = [];
            const isSwap = false;

            const makeLog = (binExpr, label) => {
                const args = [
                    t.stringLiteral(label), // "compare" or "check"
                    t.cloneNode(binExpr.left),
                    t.cloneNode(binExpr.right),
                    t.booleanLiteral(isSwap),
                    t.callExpression(
                        t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                        []
                    ),
                    t.numericLiteral(path.node.loc?.start.line || 0),
                ];

                // Only add operator for "check"
                if (label === "check") {
                    args.push(t.stringLiteral(binExpr.operator));
                }

                return t.expressionStatement(
                    t.callExpression(t.identifier("log"), args)
                );
            };

            const handleBinExpr = (binExpr) => {
                if (!["<", ">", "==", "===", "<=", ">="].includes(binExpr.operator)) return;

                const isSimple = (node) =>
                    t.isLiteral(node) ||
                    t.isIdentifier(node) ||
                    t.isMemberExpression(node) ||
                    (
                        t.isBinaryExpression(node) &&
                        ["+", "-", "*", "/"].includes(node.operator) &&
                        (
                            (t.isIdentifier(node.left) || t.isMemberExpression(node.left)) &&
                            t.isLiteral(node.right)
                        )
                    );
                const isCheck = isSimple(binExpr.left) && isSimple(binExpr.right);
                const label = isCheck ? "check" : "compare";

                logsToInject.push(makeLog(binExpr, label));
            };

            // Handle complex conditions like: while (j >= 0 && arr[j] > key)
            if (t.isLogicalExpression(test)) {
                if (t.isBinaryExpression(test.left)) {
                    handleBinExpr(test.left);
                }
                if (t.isBinaryExpression(test.right)) {
                    handleBinExpr(test.right);
                }
            } else if (t.isBinaryExpression(test)) {
                handleBinExpr(test);
            }

            // Inject log statements before while loop body
            if (logsToInject.length > 0) {
                if (!t.isBlockStatement(body)) {
                    path.node.body = t.blockStatement([...logsToInject, body]);
                } else {
                    path.node.body.body.unshift(...logsToInject);
                }
            }
        },

        ExpressionStatement(path) {
            const expr = path.node.expression;
            const line = path.node.loc?.start.line || 0;

            if (
                t.isAssignmentExpression(expr) &&
                t.isMemberExpression(expr.left)
            ) {
                const leftIndex = expr.left.property;
                let rightIndex = expr.right;
                let isSwap = false;

                if (t.isMemberExpression(expr.right)) {
                    rightIndex = expr.right.property;
                    isSwap = true;
                }

                const logSet = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("set"),
                        t.cloneNode(leftIndex),
                        t.cloneNode(rightIndex),
                        t.booleanLiteral(isSwap),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(line),
                    ])
                );

                path.insertAfter(logSet);

                if (algorithmType === "sorting" && isSwap) {
                    const logSwap = t.expressionStatement(
                        t.callExpression(t.identifier("log"), [
                            t.stringLiteral("swap"),
                            t.cloneNode(leftIndex),
                            t.cloneNode(rightIndex),
                            t.booleanLiteral(true),
                            t.callExpression(
                                t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                                []
                            ),
                            t.numericLiteral(line),
                        ])
                    );

                    path.insertBefore(logSwap);
                }
            }
        },

        AssignmentExpression(path) {
            const left = path.node.left;
            const right = path.node.right;
            const line = path.node.loc?.start.line || 0;

            if (
                t.isIdentifier(left) &&
                ["low", "high", "mid"].includes(left.name)
            ) {
                const logSetVar = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("setVar"),
                        t.stringLiteral(left.name),
                        t.cloneNode(right),
                        t.booleanLiteral(false),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(line)
                    ])
                );
                path.insertAfter(logSetVar);
            }
        },
        
        ReturnStatement(path) {
            const argument = path.node.argument;
            const line = path.node.loc?.start.line || 0;

            const isNegativeOne =
                t.isUnaryExpression(argument) &&
                argument.operator === "-" &&
                t.isNumericLiteral(argument.argument) &&
                argument.argument.value === 1;

            if (isNegativeOne) {
                const logNotFound = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("notFound"),
                        t.identifier(searchElementIdentifierName),
                        t.nullLiteral(),
                        t.booleanLiteral(false),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(line),
                    ])
                );
                path.insertBefore(logNotFound);
            } else if (
                t.isIdentifier(argument) ||
                t.isMemberExpression(argument) ||
                t.isNumericLiteral(argument)
            ) {
                // found
                const logFound = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("found"),
                        t.identifier(searchElementIdentifierName),
                        t.cloneNode(argument),
                        t.booleanLiteral(false),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(line),
                    ])
                );
                path.insertBefore(logFound);
            }
        }

    });

    const output = generate(ast, { comments: true });
    return output.code;
}

module.exports = { instrumentUserCode };





//PERFECT SORTING VISUALIZER
/*const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;

function instrumentUserCode(code) {
    let ast;
    try {
        ast = parser.parse(code, { sourceType: "module", plugins: ["jsx"] });
    } catch (parseErr) {
        throw new Error("Syntax Error in user code: " + parseErr.message);
    }

    let arrayIdentifierName = "arr"; // Default fallback

    // STEP 1: Detect the array variable name from the function declaration
    traverse(ast, {
        FunctionDeclaration(path) {
            const params = path.node.params;
            if (params.length > 0 && t.isIdentifier(params[0])) {
                arrayIdentifierName = params[0].name;
            }
        },
    });

    // STEP 2: Inject logs for comparisons and sets/swaps
    traverse(ast, {
        IfStatement(path) {
            const { test } = path.node;
            const line = path.node.loc?.start.line || 0;

            if (
                t.isBinaryExpression(test) &&
                ["<", ">", "<=", ">=", "==", "==="].includes(test.operator)
            ) {
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(test.left),
                        t.cloneNode(test.right),
                        t.booleanLiteral(false),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(line),
                    ])
                );
                path.insertBefore(logCompare);
            }
        },

        ForStatement(path) {
            const test = path.node.test;
            const body = path.node.body;
            const logsToInject = [];
            const isSwap = false;

            const makeLog = (binExpr, label) => {
                const args = [
                    t.stringLiteral(label), // "compare" or "check"
                    t.cloneNode(binExpr.left),
                    t.cloneNode(binExpr.right),
                    t.booleanLiteral(isSwap),
                    t.callExpression(
                        t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                        []
                    ),
                    t.numericLiteral(path.node.loc?.start.line || 0),
                ];

                // Only include operator if it's a "check"
                if (label === "check") {
                    args.push(t.stringLiteral(binExpr.operator));
                }

                return t.expressionStatement(
                    t.callExpression(t.identifier("log"), args)
                );
            };

            const handleBinExpr = (binExpr) => {
                if (!["<", ">", "==", "===", "<=", ">="].includes(binExpr.operator)) return;

                const isSimple = (node) =>
                    t.isLiteral(node) ||
                    t.isIdentifier(node) ||
                    t.isMemberExpression(node) ||
                    (
                        t.isBinaryExpression(node) &&
                        ["+", "-", "*", "/"].includes(node.operator) &&
                        (
                            (t.isIdentifier(node.left) || t.isMemberExpression(node.left)) &&
                            t.isLiteral(node.right)
                        )
                    );

                const isCheck = isSimple(binExpr.left) && isSimple(binExpr.right);
                const label = isCheck ? "check" : "compare";

                logsToInject.push(makeLog(binExpr, label));
            };


            // Process condition (test) of for loop
            if (t.isLogicalExpression(test)) {
                if (t.isBinaryExpression(test.left)) {
                    handleBinExpr(test.left);
                }
                if (t.isBinaryExpression(test.right)) {
                    handleBinExpr(test.right);
                }
            } else if (t.isBinaryExpression(test)) {
                handleBinExpr(test);
            }

            // Inject logs before loop body
            if (logsToInject.length > 0) {
                if (!t.isBlockStatement(body)) {
                    path.node.body = t.blockStatement([...logsToInject, body]);
                } else {
                    path.node.body.body.unshift(...logsToInject);
                }
            }
        },

        WhileStatement(path) {
            const test = path.node.test;
            const body = path.node.body;
            const logsToInject = [];
            const isSwap = false;

            const makeLog = (binExpr, label) => {
                const args = [
                    t.stringLiteral(label), // "compare" or "check"
                    t.cloneNode(binExpr.left),
                    t.cloneNode(binExpr.right),
                    t.booleanLiteral(isSwap),
                    t.callExpression(
                        t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                        []
                    ),
                    t.numericLiteral(path.node.loc?.start.line || 0),
                ];

                // Only add operator for "check"
                if (label === "check") {
                    args.push(t.stringLiteral(binExpr.operator));
                }

                return t.expressionStatement(
                    t.callExpression(t.identifier("log"), args)
                );
            };

            const handleBinExpr = (binExpr) => {
                if (!["<", ">", "==", "===", "<=", ">="].includes(binExpr.operator)) return;

                const isSimple = (node) =>
                    t.isLiteral(node) ||
                    t.isIdentifier(node) ||
                    t.isMemberExpression(node) ||
                    (
                        t.isBinaryExpression(node) &&
                        ["+", "-", "*", "/"].includes(node.operator) &&
                        (
                            (t.isIdentifier(node.left) || t.isMemberExpression(node.left)) &&
                            t.isLiteral(node.right)
                        )
                    );
                const isCheck = isSimple(binExpr.left) && isSimple(binExpr.right);
                const label = isCheck ? "check" : "compare";

                logsToInject.push(makeLog(binExpr, label));
            };

            // Handle complex conditions like: while (j >= 0 && arr[j] > key)
            if (t.isLogicalExpression(test)) {
                if (t.isBinaryExpression(test.left)) {
                    handleBinExpr(test.left);
                }
                if (t.isBinaryExpression(test.right)) {
                    handleBinExpr(test.right);
                }
            } else if (t.isBinaryExpression(test)) {
                handleBinExpr(test);
            }

            // Inject log statements before while loop body
            if (logsToInject.length > 0) {
                if (!t.isBlockStatement(body)) {
                    path.node.body = t.blockStatement([...logsToInject, body]);
                } else {
                    path.node.body.body.unshift(...logsToInject);
                }
            }
        },

        ExpressionStatement(path) {
            const expr = path.node.expression;
            const line = path.node.loc?.start.line || 0;

            if (
                t.isAssignmentExpression(expr) &&
                t.isMemberExpression(expr.left)
            ) {
                const leftIndex = expr.left.property;
                let rightIndex = expr.right;
                let isSwap = false;

                if (t.isMemberExpression(expr.right)) {
                    rightIndex = expr.right.property;
                    isSwap = true;
                }

                const logSet = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("set"),
                        t.cloneNode(leftIndex),
                        t.cloneNode(rightIndex),
                        t.booleanLiteral(isSwap),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(line),
                    ])
                );

                path.insertAfter(logSet);

                if (isSwap) {
                    const logSwap = t.expressionStatement(
                        t.callExpression(t.identifier("log"), [
                            t.stringLiteral("swap"),
                            t.cloneNode(leftIndex),
                            t.cloneNode(rightIndex),
                            t.booleanLiteral(true),
                            t.callExpression(
                                t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                                []
                            ),
                            t.numericLiteral(line),
                        ])
                    );

                    path.insertBefore(logSwap);
                }
            }
        },
    });

    const output = generate(ast, { comments: true });
    return output.code;
}

module.exports = { instrumentUserCode };*/






/*const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;

function instrumentUserCode(code) {
    const ast = parser.parse(code, { sourceType: "module" });

    traverse(ast, {
        IfStatement(path) {
            const test = path.node.test;
            if (
                t.isBinaryExpression(test) &&
                ["<", ">", "==", "===", "<=", ">="].includes(test.operator)
            ) {
                const logCall = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(test.left),
                        t.cloneNode(test.right),
                        t.callExpression(t.memberExpression(t.identifier("arr"), t.identifier("slice")), []),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );
                path.insertBefore(logCall);
            }
        },

        ExpressionStatement(path) {
            const expr = path.node.expression;
            if (
                t.isAssignmentExpression(expr) &&
                t.isMemberExpression(expr.left) &&
                t.isMemberExpression(expr.right)
            ) {
                const logSwap = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("swap"),
                        expr.left.property,
                        expr.right.property,
                        t.callExpression(t.memberExpression(t.identifier("arr"), t.identifier("slice")), []),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );
                path.insertBefore(logSwap);
            }
        },
    });

    const output = generate(ast, { comments: true });
    return output.code;
}

module.exports = { instrumentUserCode };*/


//WITH SWAP AND SET
/*const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;

function instrumentUserCode(code) {
    const ast = parser.parse(code, { sourceType: "module", plugins: ["jsx"] });

    traverse(ast, {
        // 1. Log comparisons (for conditions like arr[i] > arr[j])
        IfStatement(path) {
            const test = path.node.test;
            if (
                t.isBinaryExpression(test) &&
                ["<", ">", "==", "===", "<=", ">="].includes(test.operator)
            ) {
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(test.left),
                        t.cloneNode(test.right),
                        t.callExpression(
                            t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );
                path.insertBefore(logCompare);
            }
        },

        // 2. Log assignments (set/swap)
        ExpressionStatement(path) {
            const expr = path.node.expression;

            if (
                t.isAssignmentExpression(expr) &&
                t.isMemberExpression(expr.left)
            ) {
                let logType = "set";
                let leftIndex = expr.left.property;
                let rightValue;

                // Check if it's a swap: arr[i] = arr[j]
                if (t.isMemberExpression(expr.right)) {
                    logType = "swap";
                    rightValue = expr.right.property;
                } else {
                    // Standard set: arr[i] = value or arr[i] = temp
                    rightValue = expr.right;
                }

                const logCall = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral(logType),
                        t.cloneNode(leftIndex),
                        t.cloneNode(rightValue),
                        t.callExpression(
                            t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );

                path.insertBefore(logCall);
            }
        }
        ,
    });

    const output = generate(ast, { comments: true });
    return output.code;
}

module.exports = { instrumentUserCode };*/

//WITH SET and isSwap ONLY
/*const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;

function instrumentUserCode(code) {
    const ast = parser.parse(code, { sourceType: "module", plugins: ["jsx"] });

    traverse(ast, {
        // 1. Log comparisons (for conditions like arr[i] > arr[j])
        IfStatement(path) {
            const test = path.node.test;
            if (
                t.isBinaryExpression(test) &&
                ["<", ">", "==", "===", "<=", ">="].includes(test.operator)
            ) {
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(test.left),
                        t.cloneNode(test.right),
                        t.callExpression(
                            t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );
                path.insertBefore(logCompare);
            }
        },
        WhileStatement(path) {
            const test = path.node.test;
            if (
                t.isLogicalExpression(test) &&
                t.isBinaryExpression(test.right) &&
                ["<", ">", "==", "===", "<=", ">="].includes(test.right.operator)
            ) {
                const binExpr = test.right;
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(binExpr.left),
                        t.cloneNode(binExpr.right),
                        t.callExpression(
                            t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );
                path.insertBefore(logCompare);
            }
        },
        
        // 2. Log assignments (set/swap)
        ExpressionStatement(path) {
            const expr = path.node.expression;

            // Handle assignments like: arr[i] = arr[j] or arr[j] = temp
            if (
                t.isAssignmentExpression(expr) &&
                t.isMemberExpression(expr.left)
            ) {
                const leftIndex = expr.left.property;
                let rightIndex = expr.right;
                let isSwap = false;

                // Check if assigning from another array element like arr[j]
                if (t.isMemberExpression(expr.right)) {
                    rightIndex = expr.right.property;
                    isSwap = true; // This indicates a swap operation
                }

                const logStatement = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("set"),
                        t.cloneNode(leftIndex), // Index or value being set
                        t.cloneNode(rightIndex), // Value or index being assigned
                        t.callExpression(
                            t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );

                // Insert log AFTER the actual assignment
                path.insertAfter(logStatement);

                // Log swap if detected
                if (isSwap) {
                    const swapLogStatement = t.expressionStatement(
                        t.callExpression(t.identifier("log"), [
                            t.stringLiteral("swap"),
                            t.cloneNode(leftIndex), // Index being swapped
                            t.cloneNode(rightIndex), // Index being swapped with
                            t.callExpression(
                                t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                                []
                            ),
                            t.numericLiteral(path.node.loc?.start.line || 0),
                        ])
                    );

                    // Insert swap log AFTER the swap
                    path.insertBefore(swapLogStatement);
                }
            }

            // Handle comparisons like: if (arr[i] > arr[j])
            else if (
                t.isIfStatement(path.node) &&
                t.isBinaryExpression(path.node.test)
            ) {
                const { left, right } = path.node.test;

                if (
                    t.isMemberExpression(left) &&
                    t.isMemberExpression(right)
                ) {
                    const a = left.property;
                    const b = right.property;

                    const logStatement = t.expressionStatement(
                        t.callExpression(t.identifier("log"), [
                            t.stringLiteral("compare"),
                            t.cloneNode(a),
                            t.cloneNode(b),
                            t.callExpression(
                                t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                                []
                            ),
                            t.numericLiteral(path.node.loc?.start.line || 0),
                        ])
                    );

                    // Insert log BEFORE the comparison
                    path.insertBefore(logStatement);
                }
            }
        }


        ,
    });

    const output = generate(ast, { comments: true });
    return output.code;
}

module.exports = { instrumentUserCode };*/

//FOR LOOP:
/*ForStatement(path) {
            const test = path.node.test;

            // Handle compound condition like: j >= 0 && arr[j] > key
            if (
                t.isLogicalExpression(test) &&
                t.isBinaryExpression(test.right) &&
                ["<", ">", "==", "===", "<=", ">="].includes(test.right.operator)
            ) {
                const binExpr = test.right;

                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(binExpr.left),
                        t.cloneNode(binExpr.right),
                        t.callExpression(
                            t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );

                path.insertBefore(logCompare);
            }

            // Handle simpler condition like: arr[j] > key
            else if (
                t.isBinaryExpression(test) &&
                ["<", ">", "==", "===", "<=", ">="].includes(test.operator)
            ) {
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(test.left),
                        t.cloneNode(test.right),
                        t.callExpression(
                            t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );

                path.insertBefore(logCompare);
            }
        },*/


//WITH ISSWAP AND SET STATEMENT RENDERING
/*const parser = require("@babel/parser");
const { is } = require("@babel/types");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;

function instrumentUserCode(code) {
    const ast = parser.parse(code, { sourceType: "module", plugins: ["jsx"] });

    traverse(ast, {
        // 1. Log comparisons (for conditions like arr[i] > arr[j])
        IfStatement(path) {
            const test = path.node.test;
            let isSwap = false;
            if (
                t.isBinaryExpression(test) &&
                ["<", ">", "==", "===", "<=", ">="].includes(test.operator)
            ) {
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(test.left),
                        t.cloneNode(test.right),
                        t.booleanLiteral(isSwap),
                        t.callExpression(
                            t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );
                path.insertBefore(logCompare);
            }
        },
        WhileStatement(path) {
            const test = path.node.test;
            let isSwap = false;
            if (
                t.isLogicalExpression(test) &&
                t.isBinaryExpression(test.right) &&
                ["<", ">", "==", "===", "<=", ">="].includes(test.right.operator)
            ) {
                const binExpr = test.right;
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(binExpr.left),
                        t.cloneNode(binExpr.right),
                        t.booleanLiteral(isSwap),
                        t.callExpression(
                            t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );
                path.insertBefore(logCompare);
            }
        },
        

        // 2. Log assignments (set/swap)
        ExpressionStatement(path) {
            const expr = path.node.expression;

            // Handle assignments like: arr[i] = arr[j] or arr[j] = temp
            if (
                t.isAssignmentExpression(expr) &&
                t.isMemberExpression(expr.left)
            ) {
                const leftIndex = expr.left.property;
                let rightIndex = expr.right;
                let isSwap = false;

                // Check if assigning from another array element like arr[j]
                if (t.isMemberExpression(expr.right)) {
                    rightIndex = expr.right.property;
                    isSwap = true; // This indicates a swap operation
                }
                

                const logStatement = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("set"),
                        t.cloneNode(leftIndex), // Index or value being set
                        t.cloneNode(rightIndex), // Value or index being assigned
                        t.booleanLiteral(isSwap),
                        t.callExpression(
                            t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );

                // Insert log AFTER the actual assignment
                path.insertAfter(logStatement);

                // Log swap if detected
                if (isSwap) {
                    const swapLogStatement = t.expressionStatement(
                        t.callExpression(t.identifier("log"), [
                            t.stringLiteral("swap"),
                            t.cloneNode(leftIndex), // Index being swapped
                            t.cloneNode(rightIndex), // Index being swapped with
                            t.booleanLiteral(isSwap),
                            t.callExpression(
                                t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                                []
                            ),
                            t.numericLiteral(path.node.loc?.start.line || 0),
                        ])
                    );

                    // Insert swap log AFTER the swap
                    path.insertBefore(swapLogStatement);
                }
            }

            // Handle comparisons like: if (arr[i] > arr[j])
            else if (
                t.isIfStatement(path.node) &&
                t.isBinaryExpression(path.node.test)
            ) {
                const { left, right } = path.node.test;
                let isSwap = false;

                if (
                    t.isMemberExpression(left) &&
                    t.isMemberExpression(right)
                ) {
                    const a = left.property;
                    const b = right.property;

                    const logStatement = t.expressionStatement(
                        t.callExpression(t.identifier("log"), [
                            t.stringLiteral("compare"),
                            t.cloneNode(a),
                            t.cloneNode(b),
                            t.booleanLiteral(isSwap),
                            t.callExpression(
                                t.memberExpression(t.identifier("arr"), t.identifier("slice")),
                                []
                            ),
                            t.numericLiteral(path.node.loc?.start.line || 0),
                        ])
                    );

                    // Insert log BEFORE the comparison
                    path.insertBefore(logStatement);
                }
            }
        }


        ,
    });

    const output = generate(ast, { comments: true });
    return output.code;
}

module.exports = { instrumentUserCode };*/

//CUSTOM ARRAY NAME HANDLED
/*const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;

function instrumentUserCode(code) {

    //const ast = parser.parse(code, { sourceType: "module", plugins: ["jsx"] });
    let ast;
    try {
        ast = parser.parse(code, { sourceType: "module", plugins: ["jsx"] });
    } catch (parseErr) {
        throw new Error("Syntax Error in user code: " + parseErr.message);
    }

    let arrayIdentifierName = "arr"; // default fallback

    // STEP 1: Detect the array variable name from function declaration
    traverse(ast, {
        FunctionDeclaration(path) {
            const params = path.node.params;
            if (params.length > 0 && t.isIdentifier(params[0])) {
                arrayIdentifierName = params[0].name;
            }
        }
    });

    // STEP 2: Instrument the logic
    traverse(ast, {
        IfStatement(path) {
            const test = path.node.test;
            let isSwap = false;

            if (
                t.isBinaryExpression(test) &&
                ["<", ">", "==", "===", "<=", ">="].includes(test.operator)
            ) {
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(test.left),
                        t.cloneNode(test.right),
                        t.booleanLiteral(isSwap),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );
                path.insertBefore(logCompare);
            }
        },

        WhileStatement(path) {
            const test = path.node.test;
            let isSwap = false;

            if (
                t.isLogicalExpression(test) &&
                t.isBinaryExpression(test.right) &&
                ["<", ">", "==", "===", "<=", ">="].includes(test.right.operator)
            ) {
                const binExpr = test.right;
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(binExpr.left),
                        t.cloneNode(binExpr.right),
                        t.booleanLiteral(isSwap),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );
                path.insertBefore(logCompare);
            }
        },

        ExpressionStatement(path) {
            const expr = path.node.expression;

            if (
                t.isAssignmentExpression(expr) &&
                t.isMemberExpression(expr.left)
            ) {
                const leftIndex = expr.left.property;
                let rightIndex = expr.right;
                let isSwap = false;

                if (t.isMemberExpression(expr.right)) {
                    rightIndex = expr.right.property;
                    isSwap = true;
                }

                const logStatement = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("set"),
                        t.cloneNode(leftIndex),
                        t.cloneNode(rightIndex),
                        t.booleanLiteral(isSwap),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(path.node.loc?.start.line || 0),
                    ])
                );

                path.insertAfter(logStatement);

                if (isSwap) {
                    const swapLogStatement = t.expressionStatement(
                        t.callExpression(t.identifier("log"), [
                            t.stringLiteral("swap"),
                            t.cloneNode(leftIndex),
                            t.cloneNode(rightIndex),
                            t.booleanLiteral(isSwap),
                            t.callExpression(
                                t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                                []
                            ),
                            t.numericLiteral(path.node.loc?.start.line || 0),
                        ])
                    );

                    path.insertBefore(swapLogStatement);
                }
            }
        }
    });

    const output = generate(ast, { comments: true });
    return output.code;
}

module.exports = { instrumentUserCode };*/



/*WhileStatement(path) {
    const test = path.node.test;
    const body = path.node.body;
    const logsToInject = [];
    const isSwap = false;

    const makeLog = (binExpr) => {
        return t.expressionStatement(
            t.callExpression(t.identifier("log"), [
                t.stringLiteral("compare"),
                t.cloneNode(binExpr.left),
                t.cloneNode(binExpr.right),
                t.booleanLiteral(isSwap),
                t.callExpression(
                    t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                    []
                ),
                t.numericLiteral(path.node.loc?.start.line || 0),
            ])
        );
    };

    if (t.isLogicalExpression(test)) {
        if (
            t.isBinaryExpression(test.left) &&
            ["<", ">", "==", "===", "<=", ">="].includes(test.left.operator)
        ) {
            logsToInject.push(makeLog(test.left));
        }

        if (
            t.isBinaryExpression(test.right) &&
            ["<", ">", "==", "===", "<=", ">="].includes(test.right.operator)
        ) {
            logsToInject.push(makeLog(test.right));
        }
    } else if (
        t.isBinaryExpression(test) &&
        ["<", ">", "==", "===", "<=", ">="].includes(test.operator)
    ) {
        logsToInject.push(makeLog(test));
    }

    if (logsToInject.length > 0) {
        if (!t.isBlockStatement(body)) {
            path.node.body = t.blockStatement([...logsToInject, body]);
        } else {
            path.node.body.body.unshift(...logsToInject);
        }
    }
},*/

/*WhileStatement(path) {
            const test = path.node.test;
            const line = path.node.loc?.start.line || 0;

            if (
                t.isBinaryExpression(test) &&
                ["<", ">", "<=", ">=", "==", "==="].includes(test.operator)
            ) {
                const logCompare = t.expressionStatement(
                    t.callExpression(t.identifier("log"), [
                        t.stringLiteral("compare"),
                        t.cloneNode(test.left),
                        t.cloneNode(test.right),
                        t.booleanLiteral(false),
                        t.callExpression(
                            t.memberExpression(t.identifier(arrayIdentifierName), t.identifier("slice")),
                            []
                        ),
                        t.numericLiteral(line),
                    ])
                );

                if (!t.isBlockStatement(path.node.body)) {
                    path.node.body = t.blockStatement([logCompare, path.node.body]);
                } else {
                    path.node.body.body.unshift(logCompare);
                }
            }
        }, */

