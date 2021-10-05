const {
  createMachine,
  Interpreter,
  interpret,
  send,
  assign,
} = require("xstate");

const multiColoredBulbMachine = createMachine({
  id: "multiColoredBulb",
  initial: "unlit",
  context: {
    color: "#fff",
  },
  states: {
    lit: {
      on: {
        BREAK: "broken",
        TOGGLE: "unlit",
        CHANGE_COLOR: {
          // actions: assign ({
          //     color: (context, event) =>{
          //         event.color
          //     }
          // }) - Object

          actions: [
            assign((context, event) => ({
              color: event.color,
            })),
            (ctx) => console.log(ctx),
          ],
        },
      },
    },
    unlit: {
      on: {
        BREAK: "broken",
        TOGGLE: "lit",
      },
    },
    broken: {},
  },
});

const service = interpret(multiColoredBulbMachine);

service.onEvent((event) => {
  const serializedValue = JSON.stringify(event);
  if (!serializedValue.includes("xstate.init"))
    console.log(`Valor inserido: ${serializedValue}`);
});

service.start();

service.send({
  type: "CHANGE_COLOR",
  color: "blue",
});

console.log(`Valor inicial: ${JSON.stringify(service.state.context)}`);
