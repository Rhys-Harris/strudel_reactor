export const stranger_tune = `
base12String:
    note("{d3 a3 d4 [g4, d4] d3 [gb4, d4] d3 d4 c3 g3 d3 b2 g3 d3 g2 d3 }%8")
    .sound("supersaw")
    .log();

high12String:
    note("{d4 a4 d4 [g4, d4] d4 [gb4, d4] d4 d4 c4 g4 d4 b3 g4 d4 g3 d4 }%8")
    .sound("supersaw");

bass:
    note("{d2 d2 d2 d2 c2 [c2 b1] b1 g1 }%4")
    .sound("supersaw")
    .postgain(2)
    .room(0.6)
    .lpf(700)
    .room(0.4);

brad:
    note(
      \`
      {
      [e3 gb3] a3 a3 a3 b3 b3 a3 a3 a3 a3 g3 gb3 d3 d3 d3 d3
      [e3 gb3] a3 a3 a3 b3 b3 a3 a3 b3 c4 [c4 d4] d4 [c4 b3] b3 b3 b3
      [e3 gb3] a3 a3 a3 b3 b3 a3 a3 a3 a3 g3 gb3 g3 g3 g3 g3
      d4 g4 g4 a4 a4 d5 d5 a4 gb4 g4 a4 a4 b4 b4 b4 b4
      }%8
      \`)
    .sound("supersaw")
    .postgain(2);
// @version 1.2`;
