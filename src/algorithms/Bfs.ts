import * as d3 from "d3"
import { Node, State } from "../types"

class Bfs {
    delay: number;

    constructor() {
        this.delay = 1000;
    }

    public FindShortestPath = async (nodes: Node[], start: number, end: number): Promise<void> => {
        if (!nodes.length)
            return;

        const startNode: Node = nodes.at(start)!;
        startNode.state = State.Discovered;
        this.updateNode(startNode);
        
        await new Promise(resolve => setTimeout(resolve, this.delay)); // pause here
        const queue: Node[] = [startNode];
        while (queue.length) {
            const currentNode: Node = queue.shift()!;
            if (currentNode.id === end) {
                currentNode.state = State.Processed;
                this.updateNode(currentNode);
                await new Promise(resolve => setTimeout(resolve, this.delay));
                this.drawShortestPath(nodes, start, end);
                return;
            }

            for (let i = 0; i < currentNode?.children.length; i++) {
                const child = currentNode.children[i];
          
                if (child.state === State.Undiscovered) {
                    child.state = State.Discovered;
                    child.parent = currentNode;
                    queue.push(child);
                    this.updateNode(child);
                    await new Promise(resolve => setTimeout(resolve, this.delay));
                }
            }
            
            currentNode.state = State.Processed;
            this.updateNode(currentNode);
            await new Promise(resolve => setTimeout(resolve, this.delay));
        }
    }

    private drawShortestPath = (nodes: Node[], start: number, end: number) => {
        const startNode = nodes.at(start)!;
        startNode.isStart = true;
        this.updateNode(startNode);
        
        const endNode = nodes.at(end)!;
        endNode.isEnd = true;
        this.updateNode(endNode);
        
        let currentNode = endNode.parent;
        while (currentNode && currentNode != startNode) {
            currentNode.isPath = true;
            this.updateNode(currentNode);
            currentNode = currentNode.parent;
        }
    }

    private updateNode = (node: Node) : void => {
        const id : number = node.id;
        const color : string = node.GetColor();
        const nodeToUpdate = d3.select(`circle[node-id='${id}']`);
        nodeToUpdate?.attr('fill', color);
    }
}

export default Bfs;
