import cytoscape from "cytoscape";

const PEOPLE_AMOUNT = 20;

const generatePeople = (amount = 5) => {
  let members = [];
  for (let step = 0; step < amount; step++) {
    const person = {
      group: "nodes",
      data: {
        id: `Person ${step + 1}`,
        index: step,
      },
    };
    members.push(person);
  }

  return {
    total: amount,
    members: members,
  };
};

const data = generatePeople(PEOPLE_AMOUNT);

const cy = cytoscape({
  container: document.querySelector("#cy"),
  elements: data.members,
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

function generateAltruistRelationships(data) {
  console.log(data);
  const { total, members } = data;
  let relationships = [];
  members.map((person, index) => {
    console.log(index, person);
    const thisPerson = index + 1;
    let nextPerson = index + 2;
    if (nextPerson > total) {
      nextPerson = 1;
    }
    relationships.push({
      data: {
        id: `${thisPerson}->${nextPerson} Relationship`,
        source: `Person ${thisPerson}`,
        target: `Person ${nextPerson}`,
      },
    });
  });
  return relationships;
}

const generatedAltruistRelationships = generateAltruistRelationships(data);
console.log(generatedAltruistRelationships);
friendships["altruist"] = generatedAltruistRelationships;

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
