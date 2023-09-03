class AdjacencyList {
    adjacencyList: number[][];

    constructor() {
        this.adjacencyList = [
            [0, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    GetAdjacencyList = () => this.adjacencyList;
}

export default AdjacencyList;
