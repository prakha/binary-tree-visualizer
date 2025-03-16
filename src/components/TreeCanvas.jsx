import { useEffect, useRef } from 'react';
import { DEFAULT_CONFIG, drawNode, connectEdges, getRequiredHeightAndWidth } from '../utils/treeUtils';

export function TreeCanvas({ root }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !root) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Clear previous drawing
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate dimensions
        const { requiredCanvasWidth, requiredCanvasHeight } = getRequiredHeightAndWidth(root);
        const windowWidthCenter = canvas.width / 2;
        const requiredWidthCenter = requiredCanvasWidth / 2;

        const xStart = windowWidthCenter - requiredWidthCenter;
        const xEnd = windowWidthCenter + requiredWidthCenter;

        // Draw tree
        drawTree(root, context, 0.5, { xStart, xEnd });
    }, [root]);

    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current || !root) return;
            
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);

            const { requiredCanvasWidth } = getRequiredHeightAndWidth(root);
            const windowWidthCenter = canvas.width / 2;
            const requiredWidthCenter = requiredCanvasWidth / 2;

            const xStart = windowWidthCenter - requiredWidthCenter;
            const xEnd = windowWidthCenter + requiredWidthCenter;

            drawTree(root, context, 0.5, { xStart, xEnd });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [root]);

    return <canvas ref={canvasRef} style={{ display: 'block' }} />;
}

function drawTree(root, context, currentLine, horizontalConfig) {
    if (!root) return;

    const { xStart, xEnd } = horizontalConfig;
    const xPos = (xStart + xEnd) / 2;
    const yPos = currentLine * DEFAULT_CONFIG.nodeHeightSpacing;

    drawNode(context, root.value, xPos, yPos);

    if (root.left) {
        const leftConfig = { xStart, xEnd: xPos };
        drawTree(root.left, context, currentLine + 1, leftConfig);

        connectEdges(context, 
            {
                xStart: xPos,
                xEnd: (xStart + xPos) / 2
            },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLine + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius
            }
        );
    }

    if (root.right) {
        const rightConfig = { xStart: xPos, xEnd };
        drawTree(root.right, context, currentLine + 1, rightConfig);

        connectEdges(context,
            {
                xStart: xPos,
                xEnd: (xPos + xEnd) / 2
            },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLine + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius
            }
        );
    }
} 