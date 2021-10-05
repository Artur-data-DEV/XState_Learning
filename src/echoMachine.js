const { createMachine, Interpreter, interpret, send } = require("xstate");

const echoMachine = createMachine({
  id: "echo",
  initial: "listening",
  states: {
    listening: {
      on: {
        SPEAK: {
          actions: send({ type: "ECHO" }),
        },
        ECHO: {
          actions: () => {
            console.log("Echo", "echo");
          },
        },
      },
    },
  },
});

const service = interpret(echoMachine).start();

service.send({
  type: "SPEAK",
});
