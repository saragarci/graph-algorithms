import { NetworkType } from '../types'

class AdjacencyList {
    adjacencyList: number[][]

    constructor(type: NetworkType) {
        this.adjacencyList = (type === NetworkType.Example)
            ? this.getExampleAdjacencyList()
            : this.generateNetwork(type);
    }

    public GetAdjacencyList = () : number[][] => this.adjacencyList;

    private generateNetwork = (type: NetworkType) : number[][] => {
        const n = type === NetworkType.Small ? 10 : type === NetworkType.Medium ? 100 : 500;
        const adjacencyList = [];
        for (let i = 0; i < n; i++) {
            const row = new Array(n).fill(0);
            adjacencyList.push(row);
        }

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (type === NetworkType.Small) {
                    // For small, it's fully connected
                    adjacencyList[i][j] = adjacencyList[j][i] = Math.ceil(Math.random() * 10);
                } else {
                    // For medium and large, limit connections to 2-4
                    const probability = type === NetworkType.Medium ? 0.01 : 0.001;
                    if (Math.random() < probability) { // You can change this probability
                        adjacencyList[i][j] = adjacencyList[j][i] = Math.ceil(Math.random() * 10);
                    }
                }
            }
        }

        // Ensure 2-4 connections for medium and large sizes
        // TO-DO: fixme
        if (type === NetworkType.Medium || type === NetworkType.Large) {
            for (let i = 0; i < n; i++) {
                let connectedNodes = adjacencyList[i].filter(val => val > 0).length;
                while (connectedNodes < 2) {
                    let j = Math.floor(Math.random() * n);
                    if (j !== i && adjacencyList[i][j] === 0) {
                        adjacencyList[i][j] = adjacencyList[j][i] = Math.ceil(Math.random() * 10);
                        connectedNodes++;
                    }
                }
            }
        }

        return adjacencyList;
    } 

    private getExampleAdjacencyList = () : number[][] => {
        return [
            [0, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0]
        ]
    }
}

export default AdjacencyList
