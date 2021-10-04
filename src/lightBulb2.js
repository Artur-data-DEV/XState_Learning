const { Machine } = require("xstate");

const lit = {
  on: {
    BREAK: "broken",
    TOGGLE: "unlit",
  },
};
const unlit = {
  on: {
    BREAK: "broken",
    TOGGLE: "lit",
  },
};
const broken = {
  type: "final",
};

const states = { lit, unlit, broken };

const initial = "unlit";

const config = {
  id: "lightBulb",
  initial,
  states,
  strict: true,
};

const lightBulbMachine = createMachine(config);
console.log(lightBulbMachine.transition("unlit", "TOGGLE").value);
