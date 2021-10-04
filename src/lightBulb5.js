const { createMachine, Interpreter, interpret } = require("xstate");

const lightBulbMachine = createMachine(
  {
    id: "lightBulb",
    initial: "unlit",
    states: {
      lit: {
        on: {
          BREAK: "broken",
          TOGGLE: "unlit",
        },
      },
      unlit: {
        on: {
          BREAK: "broken",
          TOGGLE: "lit",
        },
      },
      broken: {
        entry: ["logLocation", "buyANewBulb"],
      },
    },
  },
  {
    actions: {
      logLocation: (ctx, event) => {
        console.log(` I have broken in ` + event.location);
      },
      buyANewBulb: () => {
        console.group("You have to buy a new bulb");
      },
    },
  }
);

const service = interpret(lightBulbMachine).start();

service.onTransition((state) => {
  if (state.matches("lit")) {
    console.log("Im lit");
  }
  if (state.matches("unlit")) {
    console.log("Im unlit");
  }
  if (state.matches("broken")) {
    console.log("Im broken");
  }
});

service.send({
  type: "BREAK",
  location: "office",
});
