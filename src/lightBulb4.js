const { createMachine, Interpreter, interpret } = require("xstate");

const lightBulbMachine = createMachine(
  {
    id: "lightBulb",
    initial: "unlit",
    states: {
      lit: {
        exit: () => {
          console.log("Goodbye!");
        },
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
        entry: ["logBroken"],
      },
    },
  },
  {
    actions: {
      logBroken: (ctx, event) => {
        console.log(`im broken in ${event.location} `);
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

service.send("TOGGLE");
service.send("TOGGLE");
service.send("BREAK");
service.send("BREAK");
