const processData = require('../helpers').processData;

const isBigCave = (name) => name.toUpperCase() === name;

const nextRoom = (connections, route) => {
  const currentRoom = route[route.length - 1];
  let routes = [];

  connections[currentRoom].forEach(connection => {
    if (connection === 'end') {
      routes.push([...route, connection]);
    } else if(isBigCave(connection) || !route.includes(connection)) {
      routes = [...routes, ...nextRoom(connections, [...route, connection])];
    }
  });

  return routes;
}

const solver = (data) => {
  const lines = data.split('\n');
  const connections = lines.reduce((connections, line) => {
    const [start, end] = line.split('-');
    connections[start] = connections[start] ? [...connections[start], end] : [end];
    connections[end] = connections[end] ? [...connections[end], start] : [start];
    return connections;
  }, {});

  const routes = nextRoom(connections, ['start']);

  return routes.length;
}

processData("12/input.txt", solver);
