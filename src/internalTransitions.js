const { createMachine, Interpreter, interpret } = require("xstate");

const idleMachine = createMachine(
  {
    id: "idle",
    initial: "idle",

    states: {
      idle: {
        entry: "logEntry",
        exit: "logExit",
      },
    },
    on: {
      DO_NOTHING: "idle",
      //DO_NOTHING: ".idle" - internal
    },
  },
  {
    actions: {
      logEntry: () => {
        console.log("entered");
      },
      logExit: () => {
        console.log("exited");
      },
    },
  }
);

const service = interpret(idleMachine).start();

service.send({
  type: "DO_NOTHING",
});
