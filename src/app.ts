import AdjacencyList from './utils/adjacencyList'
import Network from './utils/network'
import NetworkRenderer from './viz/networkRenderer'
import { NetworkType } from './types'
import Bfs from './algorithms/Bfs'
import Dfs from './algorithms/Dfs'
import { Examples } from './utils/exampleAdjacencyList'

class App {
  private adjacencyList: AdjacencyList = new AdjacencyList(NetworkType.Example, Examples.Example9)
  private network: Network = new Network(this.adjacencyList)
  private delay: number = 100

  constructor() {
    this.renderNetwork()
    this.setUpButtons()
  }

  private renderNetwork = () : void => {
    new NetworkRenderer(this.network)
  }

  private setUpButtons = () : void => {
    const self = this
    document.addEventListener('DOMContentLoaded', function() {
      // Create network
      const exampleNetworkBtn = document.getElementById('example-network')
      const smallNetworkBtn = document.getElementById('small-network')
      const mediumNetworkBtn = document.getElementById('medium-network')
      const largeNetworkBtn = document.getElementById('large-network')
      exampleNetworkBtn?.addEventListener('click', () => { self.createNetwork(NetworkType.Example) })
      smallNetworkBtn?.addEventListener('click', () => { self.createNetwork(NetworkType.Small) })
      mediumNetworkBtn?.addEventListener('click', () => { self.createNetwork(NetworkType.Medium) })
      largeNetworkBtn?.addEventListener('click', () => { self.createNetwork(NetworkType.Large) })
  
      // BFS
      const runBfsButton = document.getElementById('run-bfs')
      runBfsButton?.addEventListener('click', async () => {
        const bfs = new Bfs(self.delay)
        self.network.SetStartAndEndNodes(0, 5)
        await bfs.FindShortestPath(self.network.GetNodes(), 0, 5)
        self.network.DrawShortestPath(0, 5)
      })

      // DFS
      const runDfsButton = document.getElementById('run-dfs')
      runDfsButton?.addEventListener('click', async () => {
        const dfs = new Dfs(self.delay)
        self.network.SetStartAndEndNodes(0, 5)
        await dfs.FindShortestPath(self.network.GetNodes(), 0, 5)
        self.network.DrawShortestPath(0, 5)
      })
    })
  }

  private createNetwork = (type: NetworkType) : void => {
    this.adjacencyList = new AdjacencyList(type, type === NetworkType.Example ? Examples.Example9 : undefined)
    this.network = new Network(this.adjacencyList)
    this.renderNetwork()
  }
}

export default App
