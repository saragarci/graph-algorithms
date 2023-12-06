import { NetworkType } from '../types'

class AdjacencyMatrix {
    private adjacencyMatrix: number[][]
    private networkType: NetworkType

    constructor(type: NetworkType, matrix?: number[][]) {
        this.networkType = type
        this.adjacencyMatrix = (matrix !== undefined) ? matrix : this.generateNetwork(type)
    }

    public GetAdjacencyMatrix = () : number[][] => this.adjacencyMatrix

    public GetNetworkType = () : NetworkType => this.networkType

    private generateNetwork = (type: NetworkType) : number[][] => {
        const n = type === NetworkType.Small ? 10 : type === NetworkType.Medium ? 100 : 500
        const adjacencyMatrix = []
        for (let i = 0; i < n; i++) {
            const row = new Array(n).fill(0)
            adjacencyMatrix.push(row) 
        }

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (type === NetworkType.Small) {
                    // For small, it's fully connected
                    const weight = Math.ceil(Math.random() * 10)
                    adjacencyMatrix[i][j] = adjacencyMatrix[j][i] = weight
                } else {
                    // For medium and large, limit connections to 2-4
                    const probability = type === NetworkType.Medium ? 0.01 : 0.001
                    if (Math.random() < probability) {
                        const weight = Math.ceil(Math.random() * 10)
                        adjacencyMatrix[i][j] = adjacencyMatrix[j][i] = weight
                    }
                }
            }
        }

        // Ensure 2-4 connections for medium and large sizes
        if (type === NetworkType.Medium || type === NetworkType.Large) {
            for (let i = 0; i < n; i++) {
                let connectedNodes = adjacencyMatrix[i].filter(val => val > 0).length
                while (connectedNodes < 2) {
                    let j = Math.floor(Math.random() * n)
                    if (j !== i && adjacencyMatrix[i][j] === 0) {
                        const weight = Math.ceil(Math.random() * 10)
                        adjacencyMatrix[i][j] = adjacencyMatrix[j][i] = weight
                        connectedNodes++
                    }
                }
            }
        }

        return adjacencyMatrix
    }
}

export default AdjacencyMatrix
