import { LinkState, Node, NodeState } from '../types'

class Dfs {
    private delay: number

    constructor(delay: number) {
        this.delay = delay
    }

    public FindShortestPath = async (nodes: Node[], start: number, end: number) : Promise<void> => {
        if (!nodes.length)
            return

        const startNode: Node = nodes.at(start)!
        startNode.state = NodeState.Discovered
        startNode.Update()
        
        await new Promise(resolve => setTimeout(resolve, this.delay))
        const stack: Node[] = [startNode]
        while (stack.length) {
            const currentNode: Node = stack.pop()!
            if (currentNode.id === end) {
                currentNode.state = NodeState.Processed
                currentNode.Update()
                await new Promise(resolve => setTimeout(resolve, this.delay))
                return
            }

            for (const [targetNode, link] of currentNode.children.entries()) {
                if (targetNode.state === NodeState.Undiscovered) {
                    // update link state
                    link.state = LinkState.Discovered
                    link.Update()
                    
                    // update node state
                    targetNode.state = NodeState.Discovered
                    targetNode.parent = currentNode
                    targetNode.Update()
                    
                    stack.push(targetNode)
                    await new Promise(resolve => setTimeout(resolve, this.delay))
                }
            }
            
            currentNode.state = NodeState.Processed
            currentNode.Update()
            await new Promise(resolve => setTimeout(resolve, this.delay))
        }
    }
}

export default Dfs
