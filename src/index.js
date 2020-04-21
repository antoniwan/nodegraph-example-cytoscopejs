import cytoscape from "cytoscape";

const cy = cytoscape({
  container: document.querySelector("#cy"),
  elements: [
    {
      group: "nodes",
      data: { id: "Person A" },
    },
    {
      group: "nodes",
      data: { id: "Person B" },
    },
    {
      group: "nodes",
      data: { id: "Person C" },
    },
    {
      group: "nodes",
      data: { id: "Person D" },
    },
    {
      group: "nodes",
      data: { id: "Person E" },
    },
  ],
  style: [
    // the stylesheet for the graph
    {
      selector: "node",
      style: {
        label: "data(id)",
        "background-color": "#11479e",
      },
    },
    {
      selector: "edge",
      style: {
        width: 2,
        "target-arrow-shape": "vee",
        "line-color": "#2ecc40",
        "target-arrow-color": "#2ecc40",
        "curve-style": "bezier",
      },
    },
  ],

  layout: {
    name: "circle",
    fit: true,
    padding: "50px",
  },
});

const friendships = [];
friendships["flawed"] = [
  {
    data: { id: "AB Relationship", source: "Person A", target: "Person B" },
  },
  {
    data: { id: "BC Relationship", source: "Person B", target: "Person C" },
  },
  {
    data: { id: "DE Relationship", source: "Person D", target: "Person E" },
  },
  {
    data: { id: "CB Relationship", source: "Person C", target: "Person B" },
  },
  {
    data: { id: "EA Relationship", source: "Person E", target: "Person A" },
  },
];
friendships["altruist"] = [
  {
    data: { id: "AB Relationship", source: "Person A", target: "Person B" },
  },
  {
    data: { id: "BC Relationship", source: "Person B", target: "Person C" },
  },
  {
    data: { id: "CD Relationship", source: "Person C", target: "Person D" },
  },
  {
    data: { id: "DE Relationship", source: "Person D", target: "Person E" },
  },
  {
    data: { id: "EA Relationship", source: "Person E", target: "Person A" },
  },
];

function addFriendships(data) {
  const edges = cy.elements("edge");
  cy.remove(edges);
  cy.add(data);
  cy.animate(
    {
      fit: true,
    },
    {
      duration: 500,
    }
  );
  return;
}

const addFriendshipsCTA = document.querySelectorAll(".add-friendships");
addFriendshipsCTA.forEach((cta) =>
  cta.addEventListener("click", (e) => {
    const relationshipType = e.target.dataset.type;
    addFriendships(friendships[relationshipType]);
  })
);
