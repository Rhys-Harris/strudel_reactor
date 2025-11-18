# Rhys Harris React Assignment
EmailID: harrt002
Remote Repo: [GitHub](https://github.com/Rhys-Harris/strudel_reactor)
StudentID: 110443215
Demonstration Video: [YouTube](https://www.youtube.com/watch?v=OI0G7COacbU)

## Global Controls
### Play & Pause
These buttons control whether the music plays or not.
Although the pause button is not that interesting, the play button has a little
extra functionality.
It also triggers the preprocessing step, which takes the original text,
applies the current settings from the sound board onto it, then writes it to
the output.
After all that, then it plays the music.
In this way, if any changes you made don't appear in the music, hitting the
play button should reactivate them.

### CPM Slider
This simply controls the speed of the song in cycles per minute.
CPM is used rather than CPS to be closer to the real musical term of BPM.
The slider assumes 4/4 time (4 quarter notes per bar). The slider has quite a
generous range, and allows for floating point values.

### Volume Slider
The volume slider is extremely similar to the CPM slider, except that it
specifically allows global control of volume on each instrument.
The volume of each instrument is maintained from a relative standpoint,
so if the melody is twice as loud as the bass, this is retained.

### Update Board
This button takes the original text, finds all instruments in it, and all
effects the user has defined on them.
It then attempts to create as many sliders as it can on these instruments
dynamically.
After pressing this button, the bottom right of the screen should populate with
instruments, including their name, a mute button for each, and sliders.

## Dynamic Controls
These are the controls that appear once the `update board` button is pressed.
Each columns of controls will include the name of the effected instrument.

### Mute
Each instrument comes with a mute button automatically.
Simply press is to toggle whether an instrument plays,

### Permanent Volume Slider
Each instrument comes with a gain slider automatically.
If the instrument didn't already have one, it defaults to gain of 1.0.
Otherwise, it works exactly like other dynamic sliders.

### Dynamic Sliders
An instrument will attempt to create as many dynamic sliders as it can.
For example, a slider for `lpf`, `room`, and `gain` might be created.
These sliders update the music after letting go of the knob.
The range for these sliders can be pre-picked (described below).

## Advanced Controls
These controls are specifically hidden, as they may be unnecessary to most users.

### Slider Defaults
A slider default allows you to define the range of newly created sliders.
For example, the range for `lpf` can be set to `0` to `1000`.
This will override the default logic, allowing for more customisation.

### Save / Load
The slider defaults can be saved to and loaded from local storage.

## Music Bonus Points
How could I not get some bonus points for that sitar?
Here is my process for creating my egyptian beat.

First, I was playing my real guitar, and was messing around with that generic
scale.
After some noodling, I decided that it was perfect for my strudel demo.
From this, I transfered my little lick into sitar on strudel.
Next, I obviously needed some bass, so using my spanish guitar technique I
created a D, D#, F, C chord progression.
This 1st Major to an increase of a semitone but retaining the major nature is
very flamenco.
So I used 2 basses, one for a smooth sound, and one for a dirtier sound.
This gives it a fuller sound.
I just felt like adding flute, so I did, by spamming notes right at the end.
The drums are very simple, I split them up into seperate instruments because I
wanted to control them seperately.
It's just a classic thump clap beat, with a tick that gives it that moving
feeling (normal for triplets).
With all this done, I felt like it could do with a good build up, so I added
the chords using a string instrument.
This meant I could slowly add more and more layers with more intensity.
After designing these instruments, I slapped room on basically everything,
because reverb is the best.
And then ended it with lpf on one of the basses.
I actually write my own music, but it's usually guitars and organs, so using
electronic sitars and sawtooths was a cool change.

These beats were definitely being played by pharaoh on his JBL speaker as he
chased the Israelites out of Egypt.
