import AdjacencyList from './utils/adjacencyList'
import Network from './utils/network'
import NetworkRenderer from './viz/networkRenderer'
import { NetworkType } from './types'
import Bfs from './algorithms/Bfs'
import Dfs from './algorithms/Dfs'
import Dijkstra from './algorithms/Dijkstra'
import Prim from './algorithms/Prim'
import { Examples } from './utils/exampleAdjacencyList'
import Kruskal from './algorithms/Kruskal'
import BellmanFord from './algorithms/BellmanFord'
import AStar from './algorithms/AStar'

class App {
  private adjacencyList: AdjacencyList = new AdjacencyList(NetworkType.Example, Examples.Example10)
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
        await bfs.FindShortestPath(self.network.GetNodes(), self.network.GetLinks(), 0, 5)
        self.network.DrawShortestPath(0, 5)
      })

      // DFS
      const runDfsButton = document.getElementById('run-dfs')
      runDfsButton?.addEventListener('click', async () => {
        const dfs = new Dfs(self.delay)
        self.network.SetStartAndEndNodes(0, 5)
        await dfs.FindShortestPath(self.network.GetNodes(), self.network.GetLinks(), 0, 5)
        self.network.DrawShortestPath(0, 5)
      })

      // Prim
      const runPrimButton = document.getElementById('run-prim')
      runPrimButton?.addEventListener('click', async () => {
        const prim = new Prim(self.delay)
        self.network.SetStartAndEndNodes(0, 5)
        await prim.FindShortestPath(self.network.GetNodes(), self.network.GetLinks(), 0, 5)
        self.network.DrawShortestPath(0, 5)
      })

      // Kruskal
      const runKruskalButton = document.getElementById('run-kruskal')
      runKruskalButton?.addEventListener('click', async () => {
        const kruskal = new Kruskal(self.delay)
        self.network.SetStartAndEndNodes(0, 5)
        await kruskal.FindShortestPath(self.network.GetNodes(), self.network.GetLinks(), 0, 5)
        self.network.DrawShortestPath(0, 5)
      })

      // Dijkstra
      const runDijkstraButton = document.getElementById('run-dijkstra')
      runDijkstraButton?.addEventListener('click', async () => {
        const dijkstra = new Dijkstra(self.delay)
        self.network.SetStartAndEndNodes(0, 5)
        await dijkstra.FindShortestPath(self.network.GetNodes(), self.network.GetLinks(), 0, 5)
        self.network.DrawShortestPath(0, 5)
      })

      // Bellman-Ford
      const runBellmanFordButton = document.getElementById('run-bellmanFord')
      runBellmanFordButton?.addEventListener('click', async () => {
        const bellmanFord = new BellmanFord(self.delay)
        self.network.SetStartAndEndNodes(0, 5)
        await bellmanFord.FindShortestPath(self.network.GetNodes(), self.network.GetLinks(), 0, 5)
        self.network.DrawShortestPath(0, 5)
      })

      // A*
      const runAStarButton = document.getElementById('run-aStar')
      runAStarButton?.addEventListener('click', async () => {
        const aStar = new AStar(self.delay)
        self.network.SetStartAndEndNodes(0, 5)
        await aStar.FindShortestPath(self.network.GetNodes(), self.network.GetLinks(), 0, 5)
        self.network.DrawShortestPath(0, 5)
      })
    })
  }

  private createNetwork = (type: NetworkType) : void => {
    this.adjacencyList = new AdjacencyList(type, type === NetworkType.Example ? Examples.Example10 : undefined)
    this.network = new Network(this.adjacencyList)
    this.renderNetwork()
  }
}

export default App
