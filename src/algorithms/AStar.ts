import { Link, LinkState, Node, NodeState, PriorityQueueElement } from '../types'
import PriorityQueue from '../utils/PriorityQueue'

class NodeWithDistance implements PriorityQueueElement {
    public node: Node
    public value: number

    constructor(node: Node, distance: number) {
        this.node = node
        this.value = distance
    }
}

class AStar {
    private delay: number

    constructor(delay: number) {
        this.delay = delay
    }

    public FindShortestPath = async (nodes: Node[], links: Link[], start: number, end: number) : Promise<void> => {
        if (!nodes.length)
            return

        const startNode : Node = nodes.at(start)!
        const endNode : Node = nodes.at(end)!
        startNode.state = NodeState.Discovered
        startNode.Update()
        await new Promise(resolve => setTimeout(resolve, this.delay))

        const distances = new Map<number, number>();
        for (const node of nodes) {
            distances.set(node.id, Infinity)
        }
        
        const queue: PriorityQueue<NodeWithDistance> = new PriorityQueue<NodeWithDistance>()
        
        distances.set(startNode.id, 0)
        queue.Add(new NodeWithDistance(startNode, this.heuristic(startNode, endNode)))
        
        while (!queue.Empty()) {
            const { node: currentNode, value: dist } = queue.Peek()!
            queue.Remove();

            if (currentNode.id === end) { // TODO: Remove this?
                currentNode.state = NodeState.Processed
                currentNode.Update()
                await new Promise(resolve => setTimeout(resolve, this.delay))
                continue
            }

            for (const [targetNode, link] of currentNode.children.entries()) {
                if (targetNode.state !== NodeState.Processed) {
                    link.state = LinkState.Discovered
                    link.Update()
                    await new Promise(resolve => setTimeout(resolve, this.delay))
                }

                if (targetNode.state === NodeState.Undiscovered) {
                    const newDist = distances.get(currentNode.id)! + link.value
                    const heuristicCost = newDist + this.heuristic(targetNode, endNode)
                    if (newDist < distances.get(targetNode.id)!) {
                        distances.set(targetNode.id, newDist)
                        queue.Add(new NodeWithDistance(targetNode, heuristicCost))
                        targetNode.state = NodeState.Discovered
                        targetNode.parent = currentNode
                        targetNode.Update()
                        await new Promise(resolve => setTimeout(resolve, this.delay))
                    }
                }
            }

            currentNode.state = NodeState.Processed
            currentNode.Update()
            await new Promise(resolve => setTimeout(resolve, this.delay))
        }
    }

    private heuristic = (node: Node, endNode: Node) : number => {
        // Calculate Euclidean distance between a node and the end node
        return Math.sqrt(Math.pow(node.x! - endNode.x!, 2) + Math.pow(node.y! - endNode.y!, 2))
    }
}

export default AStar
