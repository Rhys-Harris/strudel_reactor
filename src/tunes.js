export const mtaf_tune = `
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
`;

export const stranger_tune = `
samples('github:algorave-dave/samples');
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json');
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json');

const gain_patterns = [
  "2",
  "{0.75 2.5}*4",
    "{0.75 2.5!9 0.75 2.5!5 0.75 2.5 0.75 2.5!7 0.75 2.5!3 <2.5 0.75> 2.5}%16",
];

const drum_structure = [
"~",
"x*4",
"{x ~!9 x ~!5 x ~ x ~!7 x ~!3 < ~ x > ~}%16",
];

const basslines = [
  "[[eb1, eb2]!16 [f2, f1]!16 [g2, g1]!16 [f2, f1]!8 [bb2, bb1]!8]/8",
  "[[eb1, eb2]!16 [bb2, bb1]!16 [g2, g1]!16 [f2, f1]!4 [bb1, bb2]!4 [eb1, eb2]!4 [f1, f2]!4]/8"
];

const arpeggiator1 = [
"{d4 bb3 eb3 d3 bb2 eb2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
"{d4 bb3 g3 d3 bb2 g2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
];

const arpeggiator2 = [
"{d4 bb3 eb3 d3 bb2 eb2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
"{d4 bb3 g3 d3 bb2 g2}%16",
"{d5 bb4 g4 d4 bb3 g3 d4 bb3 eb3 d3 bb2 eb2}%16",
];

const pattern = 0;
const bass = 0;

bassline:
note(pick(basslines, bass))
.sound("supersaw")
.postgain(2)
.room(0.6)
.lpf(700)
.room(0.4)
.postgain(pick(gain_patterns, pattern));


main_arp: 
note(pick(arpeggiator1, "<0 1 2 3>/2"))
.sound("supersaw")
.lpf(300)
.adsr("0:0:.5:.1")
.room(0.6)
.lpenv(3.3)
.postgain(pick(gain_patterns, pattern))
.log();


drums:
stack(
  s("tech:5")
  .postgain(6)
  .pcurve(2)
  .pdec(1)
  .struct(pick(drum_structure, pattern)),

  s("sh").struct("[x!3 ~!2 x!10 ~]")
  .postgain(0.5).lpf(7000)
  .bank("RolandTR808")
  .speed(0.8).jux(rev).room(sine.range(0.1,0.4)).gain(0.6),

  s("{~ ~ rim ~ cp ~ rim cp ~!2 rim ~ cp ~ < rim ~ >!2}%8 *2")
  .bank("[KorgDDM110, OberheimDmx]").speed(1.2)
  .postgain(0.25)
);

drums2: 
stack(
  s("[~ hh]*4").bank("RolandTR808").room(0.3).speed(0.75).gain(1.2),
  s("hh").struct("x*16").bank("RolandTR808")
  .gain(0.6)
  .jux(rev)
  .room(sine.range(0.1,0.4))
  .postgain(0.5),
  
  s("[psr:[2|5|6|7|8|9|12|24|25]*16]?0.1")
  .gain(0.1)
  .postgain(pick(gain_patterns, pattern))
  .hpf(1000)
  .speed(0.5)
  .rarely(jux(rev))
);

//Remixed and reproduced from Algorave Dave's code found here: https://www.youtube.com/watch?v=ZCcpWzhekEY
// all(x => x.gain(mouseX.range(0,1)))
// all(x => x.log())

// @version 1.2`;

export const egypt_tune = `
samples('github:algorave-dave/samples');
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json');
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json');

melody:
    note("{ [~ ~ d3 ds3]  [fs3 g3 [fs3 g3 fs3] ds3] a3 a3 [a3 [d3 ds3]] [fs3 g3 [fs3 g3 fs3] ds3] [fs3 d3 ~ d3] d3}%8")
    .sound("gm_sitar")
    .room(0.5)
    .log();

backup:
    note("{ ~ ~ a2 a2 as2 ~ ~ d2}%8")
    .sound("gm_sitar")
    .room(0.75)
    .log();

bass2:
   note("{ c2 d2 ds2 f2 }")
    .sound("sawtooth")
    .lpf(700);

bass:
   note("{ c2 d2 ds2 f2 }")
    .sound("gm_fretless_bass")
    .gain(1.5)
    .room(0.5);

chords:
   note("{ [c3, c4] [d3, d4] [ds3, ds4] [f3, f4] }")
    .sound("gm_synth_strings_2")
    .gain(0.6)
    .room(0.5);

chords_high:
   note("{ c5 d5 ds5 f5 }")
    .sound("gm_synth_strings_2")
    .gain(0.6)
    .room(0.5);

chord_harmony:
   note("{ c5 fs4 g4 d3 }")
    .sound("gm_synth_strings_2")
    .gain(0.6)
    .room(0.5);

flute:
    note("{ [d5 ~ ~] ~ ~ ~ ~ ~ ~ [d5 c5 [b4 c5] g5 [fs5 g5]]}%8")
      .room(0.5)
    .sound("gm_flute");

bassdrum:
   s("bd*8")
     .bank("RolandTR909")
     .room(0.5);

clap:
   s("{~ cp}*4")
     .bank("RolandTR909")
     .room(0.5);

tick:
   s("{~ ~ sh sh}*8")
     .bank("RolandTR808")
     .gain(0.8)
     .room(0.3);
`;
