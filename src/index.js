import cytoscape from "cytoscape";

const generatePeople = (amount = 5) => {
  let members = [];
  for (let step = 0; step < amount; step++) {
    const person = {
      group: "nodes",
      data: {
        id: `Person ${step + 1}`,
      },
    };
    members.push(person);
  }

  return {
    total: amount,
    members: members,
  };
};

const friendships = [];
const PEOPLE_AMOUNT = 30;
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
    animate: true,
    animationDuration: 500,
    ready: function () {
      console.log("Re-rendered the layout!");
    },
  },
});

function generateAltruistRelationships(data) {
  const { total, members } = data;
  let relationships = [];
  members.map((person, index) => {
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

function generateFlawedRelationships(data) {
  const { total, members } = data;
  let relationships = [];
  members.map((person, index) => {
    const thisPerson = index + 1;
    let nextPerson = Math.floor(Math.random() * (total - 1) + 1);
    if (nextPerson === thisPerson) {
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

friendships["altruist"] = generateAltruistRelationships(data);
friendships["flawed"] = generateFlawedRelationships(data);

function addFriendships(data) {
  const edges = cy.elements("edge");
  cy.remove(edges);
  cy.add(data);
  return;
}

const addFriendshipsCTA = document.querySelectorAll(".add-friendships");
addFriendshipsCTA.forEach((cta) =>
  cta.addEventListener("click", (e) => {
    const relationshipType = e.target.dataset.type;
    addFriendships(friendships[relationshipType]);
  })
);

cy.on("add", function (e) {
  const layout = cy.layout({
    name: "cose",
    fit: true,
    animate: true,
  });
  layout.run();
});
