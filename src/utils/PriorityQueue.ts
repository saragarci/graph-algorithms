import { PriorityQueueElement } from '../types'

class PriorityQueue<T extends PriorityQueueElement> {
    private heap: T[]

    constructor() {
        this.heap = [];
    }
 
    private getLeftChildIndex = (parentIndex: number) : number => 2 * parentIndex + 1
 
    private getRightChildIndex = (parentIndex: number) : number => 2 * parentIndex + 2
 
    private getParentIndex = (childIndex: number) : number => Math.floor((childIndex - 1) / 2)
 
    private hasLeftChild = (index: number) : boolean => this.getLeftChildIndex(index) < this.heap.length
 
    private hasRightChild = (index: number) : boolean => this.getRightChildIndex(index) < this.heap.length
 
    private hasParent = (index: number) : boolean => this.getParentIndex(index) >= 0
 
    private leftChild = (index: number) : T => this.heap[this.getLeftChildIndex(index)]
 
    private rightChild = (index: number) : T => this.heap[this.getRightChildIndex(index)]
 
    private parent = (index: number) : T => this.heap[this.getParentIndex(index)]
 
    private swap = (indexOne: number, indexTwo: number) : void => {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }

    private heapifyUp = () : void => {
        //const heapifyUpComp = (a: number, b: number) => a < b
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.parent(index).value > this.heap[index].value) { // use comp
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
 
    private heapifyDown = () : void => {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.rightChild(index).value < this.leftChild(index).value) { // use comp
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (this.heap[index].value < this.heap[smallerChildIndex].value) { // use comp
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
 
    public Peek = () : T | null => {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }

    public Remove = () : T | null => {
        if (this.heap.length === 0) {
            return null;
        }
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }
 
    public Add = (item: T) : void => {
        this.heap.push(item);
        this.heapifyUp();
    }

    public Empty = () : boolean => this.heap.length === 0
}

export default PriorityQueue
