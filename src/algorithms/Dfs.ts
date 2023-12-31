import { Link, LinkState, Node, NodeState } from '../types'

class Dfs {
    private delay: number

    constructor(delay: number) {
        this.delay = delay
    }

    public FindShortestPath = async (nodes: Node[], links: Link[], start: number, end: number) : Promise<void> => {
        const currentNode : Node = nodes.at(start)!
        
        if (currentNode.state !== NodeState.Undiscovered)
            return // node has already been discovered or processed
        
        currentNode.state = NodeState.Discovered
        currentNode.Update()
        await new Promise(resolve => setTimeout(resolve, this.delay))

        if (currentNode.id === end)
            return // stop search. End node has been found

        for (const [targetNode, link] of currentNode.children.entries()) {
            if (targetNode.state === NodeState.Undiscovered) {
                // Update link
                link.state = LinkState.Discovered
                link.Update()
                await new Promise(resolve => setTimeout(resolve, this.delay))

                // Update node
                targetNode.parent = currentNode
                await this.FindShortestPath(nodes, links, targetNode.id, end)
            }
        }

        currentNode.state = NodeState.Processed
        currentNode.Update()
        await new Promise(resolve => setTimeout(resolve, this.delay))
    }
}

export default Dfs
