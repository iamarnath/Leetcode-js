class Node {
    constructor(val) {
        this.left = null;
        this.val = val;
        this.right = null;
    }
}
class BST {
    constructor() {
        this.root = null;
    }
    insert(key) {
        let node = new Node();
        if (this.root === null) {
            this.root = node;
            return;
        }
        let prev = null;
        let temp = this.root;
        while (temp != null) {
            if (temp.val > key) {
                prev=temp;
                temp=temp.left;
            }
            else if(temp.val < key){
                prev =temp;
                temp=temp.right;
            }
        }
        if(prev.val>key) prev 
    }
}

