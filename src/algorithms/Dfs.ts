import { LinkState, Node, NodeState } from '../types'

class Dfs {
    private delay: number

    constructor(delay: number) {
        this.delay = delay
    }

    public FindShortestPath = async (nodes: Node[], start: number, end: number) : Promise<void> => {
        if (!nodes.length || start === end)
            return
        
        const currentNode : Node = nodes.at(start)!
        currentNode.state = NodeState.Discovered
        currentNode.Update()
        await new Promise(resolve => setTimeout(resolve, this.delay))

        // PROCESS NODE EARLY
        for (const [targetNode, link] of currentNode.children.entries()) {
            if (targetNode.state === NodeState.Undiscovered) {
                // Update node
                targetNode.parent = currentNode

                // PROCESS EDGE
                link.state = LinkState.Discovered
                link.Update()
                await new Promise(resolve => setTimeout(resolve, this.delay))

                await this.FindShortestPath(nodes, targetNode.id, end)
            }

            if (targetNode.id == end)
                return
        }

        // PROCESS NODE LATE
        currentNode.state = NodeState.Processed
        currentNode.Update()
        await new Promise(resolve => setTimeout(resolve, this.delay))
    }
}

export default Dfs
