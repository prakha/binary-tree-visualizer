export class BinaryTreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    setLeft(node) {
        this.left = node;
    }

    setRight(node) {
        this.right = node;
    }

    getHeight() {
        return this.calculateHeight(this);
    }

    calculateHeight(node) {
        if (node === null) return 0;

        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }
} 