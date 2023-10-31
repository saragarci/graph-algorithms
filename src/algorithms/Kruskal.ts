import { Link, LinkState, Node, NodeState } from '../types'
import UnionFind from '../utils/UnionFind'

class Kruskal {
    private delay: number

    constructor(delay: number) {
        this.delay = delay
    }

    public FindShortestPath = async (nodes: Node[], links: Link[], start: number, end: number) : Promise<void> => {
        if (!nodes.length)
            return

        let MSTWeight : number = 0
        const s : UnionFind = new UnionFind(nodes.length)

        // sort links by value (weight)
        links.sort((a, b) => {
            if (a.value < b.value) return -1 
            if (a.value == b.value) return 0
            else return 1
        })
        
        for (const link of links) {
            if (!s.SameComponent(link.source.id, link.target.id)) {
                // Add link and edges to the MST

                link.source.state = NodeState.Discovered
                link.source.Update()
                await new Promise(resolve => setTimeout(resolve, this.delay))

                link.state = LinkState.Discovered
                link.Update()
                await new Promise(resolve => setTimeout(resolve, this.delay))

                link.target.state = NodeState.Discovered
                link.target.Update()
                await new Promise(resolve => setTimeout(resolve, this.delay))

                //link.target.parent = link.source ??
                //link.source.parent = link.target ??

                MSTWeight += link.value
                s.UnionSets(link.source.id, link.target.id)
            }
        }
    }
}

export default Kruskal
