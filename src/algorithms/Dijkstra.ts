import { LinkState, Node, NodeState, PriorityQueueElement } from '../types'
import PriorityQueue from '../utils/PriorityQueue'

class NodeWithDistance implements PriorityQueueElement {
    public node: Node
    public value: number

    constructor(node: Node, distance: number) {
        this.node = node
        this.value = distance
    }
}

class Dijkstra {
    private delay: number

    constructor(delay: number) {
        this.delay = delay
    }

    public FindShortestPath = async (nodes: Node[], start: number, end: number) : Promise<void> => {
        if (!nodes.length)
            return

        const startNode : Node = nodes.at(start)!
        startNode.state = NodeState.Discovered
        startNode.Update()
        await new Promise(resolve => setTimeout(resolve, this.delay))

        const distances = new Map<number, number>();
        for (const node of nodes) {
            distances.set(node.id, Infinity)
        }
        
        const queue: PriorityQueue<NodeWithDistance> = new PriorityQueue<NodeWithDistance>()
        
        distances.set(startNode.id, 0)
        queue.Add(new NodeWithDistance(startNode, 0))
        
        while (!queue.Empty()) {
            const { node: currentNode, value: dist} = queue.Peek()!
            queue.Remove();

            if (currentNode.id === end) {
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
                    const newDist = dist + link.value
                    if (newDist < distances.get(targetNode.id)!) {
                        distances.set(targetNode.id, newDist)
                        queue.Add(new NodeWithDistance(targetNode, newDist))
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
}

export default Dijkstra
