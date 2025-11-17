export const stranger_tune = `
samples('github:algorave-dave/samples');
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json');
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json');

melody:
    note("{ [~ ~ d3 ds3]  [fs3 g3 [fs3 g3 fs3] ds3] a3 a3 [a3 [d3 ds3]] [fs3 g3 [fs3 g3 fs3] ds3] [fs3 d3 ~ d3] d3}%8")
    .sound("gm_sitar")
    .room(0.5);

backup:
    note("{ ~ ~ a2 a2 as2 ~ ~ d2}%8")
    .sound("gm_sitar")
    .room(0.75);

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
