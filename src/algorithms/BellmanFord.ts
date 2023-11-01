import { Link, LinkState, Node, NodeState, PriorityQueueElement } from '../types'

class BellmanFord {
    private delay: number

    constructor(delay: number) {
        this.delay = delay
    }

    public FindShortestPath = async (nodes: Node[], links: Link[], start: number, end: number) : Promise<void> => {
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
        
        distances.set(startNode.id, 0)
        
        // Relax edges repeatedly
        for (const node of nodes) {
            for (const link of links) {
                let sourceNode = nodes[link.source.id]
                let targetNode = nodes[link.target.id]

                if (distances.get(targetNode.id)! > distances.get(sourceNode.id)! + link.value) {
                    distances.set(targetNode.id, distances.get(sourceNode.id)! + link.value)
                    targetNode.parent = sourceNode

                    link.state = LinkState.Discovered
                    link.Update()
                    await new Promise(resolve => setTimeout(resolve, this.delay))

                    targetNode.state = NodeState.Discovered
                    targetNode.Update()
                    await new Promise(resolve => setTimeout(resolve, this.delay))
                }
            }
        }

        // Check for negative weight cycles
        for (const link of links) {
            if (distances.get(link.target.id)! > distances.get(link.source.id)! + link.value) {
                throw new Error("Graph contains a negative weight cycle")
            }
        }
    }
}

export default BellmanFord
