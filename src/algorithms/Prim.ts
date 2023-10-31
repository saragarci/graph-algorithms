import { LinkState, Node, NodeState } from '../types'

class Prim {
    private delay: number

    constructor(delay: number) {
        this.delay = delay
    }

    public FindShortestPath = async (nodes: Node[], start: number, end: number) : Promise<void> => {
        if (!nodes.length)
            return

        const startNode : Node = nodes.at(start)!
        const distances = new Map<number, number>();
        for (const node of nodes) {
            distances.set(node.id, Infinity)
        }
        distances.set(startNode.id, 0)
        let currentNode = startNode
        let minDistance
        while (currentNode.state === NodeState.Undiscovered) {
            if (currentNode.parent !== undefined) {
                const link = currentNode.parent.children.get(currentNode)!
                link.state = LinkState.Discovered
                link.Update()
                await new Promise(resolve => setTimeout(resolve, this.delay))
            }
            currentNode.state = NodeState.Discovered
            currentNode.Update()
            await new Promise(resolve => setTimeout(resolve, this.delay))

            for (const [targetNode, link] of currentNode.children.entries()) {
                if ((distances.get(targetNode.id)! > link.value) && targetNode.state === NodeState.Undiscovered) {
                    distances.set(targetNode.id, link.value)
                    targetNode.parent = currentNode
                }
            }

            minDistance = Infinity
            for (const [nodeId, distance] of distances.entries()) {
                if (nodes[nodeId].state === NodeState.Undiscovered && distance < minDistance) {
                    minDistance = distance
                    currentNode = nodes[nodeId]
                }
            }
        }
    }
}

export default Prim
