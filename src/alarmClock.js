const {
  createMachine,
  Interpreter,
  interpret,
  send,
  assign,
  Machine,
} = require("xstate");

const alarmClockMachine = createMachine(
  {
    id: "alarmClock",
    initial: "idle",
    context: {
      beepCount: 0,
    },
    states: {
      idle: {
        on: { ALARM: "alarming" },
      },
      alarming: {
        activities: ["beeping"],
        on: { STOP: "idle" },
      },
    },
  },
  {
    activities: {
      beeping: (context, event) => {
        const beep = () => {
          console.log("beep");
        };
        beep();
        const intervalID = setInterval(beep, 500);

        return () => clearInterval(intervalID);
      },
    },
  }
);

const service = interpret(alarmClockMachine).start();

service.send({
  type: "ALARM",
});
