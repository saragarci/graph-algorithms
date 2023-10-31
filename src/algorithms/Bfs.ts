import { Link, LinkState, Node, NodeState } from '../types'

class Bfs {
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
        const queue: Node[] = [startNode]
        while (queue.length) {
            const currentNode: Node = queue.shift()!
            // PROCESS NODE EARLY
            if (currentNode.id === end) {
                currentNode.Update()
                await new Promise(resolve => setTimeout(resolve, this.delay))
                return
            }

            for (const [targetNode, link] of currentNode.children.entries()) {
                if (targetNode.state !== NodeState.Processed) {
                    // PROCESS LINK 
                    link.state = LinkState.Discovered
                    link.Update()
                    await new Promise(resolve => setTimeout(resolve, this.delay))
                }

                if (targetNode.state === NodeState.Undiscovered) {
                    queue.push(targetNode)
                    targetNode.state = NodeState.Discovered
                    targetNode.parent = currentNode
                    targetNode.Update()
                    await new Promise(resolve => setTimeout(resolve, this.delay))
                }
            }
            // PROCESS NODE LATE
            currentNode.state = NodeState.Processed
            currentNode.Update()
            await new Promise(resolve => setTimeout(resolve, this.delay))
        }
    }
}

export default Bfs
