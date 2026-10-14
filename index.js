function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const vertices = Object.keys(graph);

  // Initialize all distances to Infinity.
  for (const vertex of vertices) {
    distances[vertex] = Infinity;
  }

  // The distance from the starting vertex to itself is 0.
  if (!(start in graph)) {
    throw new Error("Starting vertex does not exist in the graph.");
  }

  distances[start] = 0;

  while (visited.size < vertices.length) {
    let current = null;
    let shortestDistance = Infinity;

    // Find the unvisited vertex with the smallest distance.
    for (const vertex of vertices) {
      if (!visited.has(vertex) && distances[vertex] < shortestDistance) {
        shortestDistance = distances[vertex];
        current = vertex;
      }
    }

    if (current === null) {
      break;
    }

    visited.add(current);

    // Update the distances to neighboring vertices.
    for (const neighbor in graph[current]) {
      const weight = graph[current][neighbor];
      const newDistance = distances[current] + weight;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
      }
    }
  }

  return distances;
}

// Test Case 1: The graph provided in the checkpoint.
const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3 },
  D: { B: 10, C: 3 },
};

console.log("Test Case 1: Starting from A");

const result1 = dijkstra(graph, "A");

console.log(result1);

// Test Case 2: Starting from a different vertex.
console.log("\nTest Case 2: Starting from C");

const result2 = dijkstra(graph, "C");

console.log(result2);

// Test Case 3: A graph containing an unreachable vertex.
const disconnectedGraph = {
  A: { B: 2 },
  B: { A: 2 },
  C: {},
};

console.log("\nTest Case 3: Disconnected graph");

const result3 = dijkstra(disconnectedGraph, "A");

console.log(result3);
