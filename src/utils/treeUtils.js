import { BinaryTreeNode } from './BinaryTreeNode';

export const DEFAULT_CONFIG = {
    radius: 20,
    nodeWidthSpacing: 55,
    nodeHeightSpacing: 100,
    fontSize: 14
};

export function getRequiredHeightAndWidth(root) {
    if (!root) return { requiredCanvasWidth: 0, requiredCanvasHeight: 0 };
    
    const heightOfTree = root.getHeight();
    const maxLeafNodes = Math.pow(2, heightOfTree);

    const requiredCanvasHeight = heightOfTree * DEFAULT_CONFIG.nodeHeightSpacing;
    const requiredCanvasWidth = maxLeafNodes * DEFAULT_CONFIG.nodeWidthSpacing;

    return {
        requiredCanvasWidth,
        requiredCanvasHeight
    };
}

export function drawNode(context, value, x, y) {
    // Draw Circle
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'lightSalmon';
    context.fill();

    // Draw Circle Border
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.strokeStyle = 'brown';
    context.stroke();

    // Write value
    context.font = `${DEFAULT_CONFIG.fontSize}pt serif`;
    context.fillStyle = 'brown';
    context.textAlign = 'center';
    context.fillText(value, x, y + DEFAULT_CONFIG.fontSize / 2);
}

export function connectEdges(context, xCoordinates, yCoordinates) {
    const { xStart, xEnd } = xCoordinates;
    const { yStart, yEnd } = yCoordinates;

    const xHalf = (xStart + xEnd) / 2;
    const yHalf = (yStart + yEnd) / 2;

    const start = { x: xStart, y: yStart };
    const cpoint1 = { x: xHalf, y: yHalf };
    const cpoint2 = { x: xEnd, y: yHalf };
    const end = { x: xEnd, y: yEnd };

    // Draw curve
    context.beginPath();
    context.strokeStyle = 'brown';
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(cpoint1.x, cpoint1.y, cpoint2.x, cpoint2.y, end.x, end.y);
    context.stroke();
}

export function treeConstructor(input) {
    if (!input) return null;
    
    const values = parseInput(input);
    if (!values.length) return null;

    const queue = [];
    let idx = 0;
    
    const root = new BinaryTreeNode(values[idx++]);
    queue.push(root);

    while (queue.length > 0 && idx < values.length) {
        const node = queue.shift();

        // Left child
        if (idx < values.length) {
            if (values[idx] !== null) {
                const leftNode = new BinaryTreeNode(values[idx]);
                node.setLeft(leftNode);
                queue.push(leftNode);
            }
            idx++;
        }

        // Right child
        if (idx < values.length) {
            if (values[idx] !== null) {
                const rightNode = new BinaryTreeNode(values[idx]);
                node.setRight(rightNode);
                queue.push(rightNode);
            }
            idx++;
        }
    }

    return root;
}

function parseInput(input) {
    return input
        .replace(/\s/g, '')
        .split(',')
        .map(elem => {
            if (elem === 'null' || elem === '') return null;
            return parseInt(elem, 10);
        });
} 