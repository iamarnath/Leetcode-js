// using linkedlist approach as it is efficent during push
/*
Node{
    next:Node|null
    prev:Node|null
    value:value
}
*/

class LRUCache{
    constructor(capacity){
        this.length=0;
        this.capacity = Number(capacity);
        this.map = new Map(); // <key>:<node_address>
        this.head= null;
        this.tail=null;
    }
    // remove node
    #removeNode(node){
        if(!node) return;
        if(node.prev){
            node.prev.next = node.next;
        }
        if(node.next){
            node.next.prev = node.prev;
        }
        if(node === this.head){
            this.head = node.next;
        }
          if(node === this.tail){
            this.tail = node.prev;
        }
    }
    get(key){
        if(!this.map.has(key)) return null;
        const node = this.map.get(key);
        this.#removeNode(node);
        node.prev= null;
        node.next = this.head;
        if(this.head != null){
            this.head.prev = node;
        }
        this.head = node;
        return node.value;
    }
    put(key,value){
        //check if we have capacity
        if(this.length === this.capacity){
            if(!this.map.has(key)){
                this.#removeNode(this.tail);
                this.length -= 1;
            }
        }
        // Case 1. if key is already available in the cache
        if(this.map.has(key)){
            // 1. remove older node         //remove existing node
            this.#removeNode(this.map.get(key));
        }
        
        //create a new node 
         const node = {
            next:this.head,
            prev:null,
            value,
            key

         }
         if(this.head !== null){
            this.head.prev = node;
         }
         
         this.map.set(key,node);
        // add it to the head
         this.head = node;
         if(this.tail === null){
            this.tail = node;
         }
         this.length += 1;
    }

    debug(){
        let current = this.head;
        let arr = [];
        while(current !=null){
            arr.push(current);
            current = current.next;
        }
       return  arr.reduce((acc,curr)=> acc.concat(`--> [[${curr.key}]: [${curr.value}] -->`),"")
    }
}

const cache = new LRUCache(3);
cache.put(1,10);
cache.put(2,20);
console.log(cache.get(1));
cache.put(3,30);
console.log(cache.get(1));
console.log(cache.get(1));
console.log(cache.get(2));
cache.put(4,40);
// cache.put(5,50);
// cache.put(6,60);
console.log(cache.debug())