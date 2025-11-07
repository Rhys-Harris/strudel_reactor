# Rhys Harris React Assignment
EmailID: harrt002
Remote Repo: [GitHub](https://github.com/Rhys-Harris/strudel_reactor)
StudentID: 110443215
Demonstration Video: TODO: Add demonstration video

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
TODO: Fill out

### Permanent Volume Slider

### Dynamic Sliders
TODO: Fill out

## Advanced Controls
These controls are specifically hidden, as they may be unnecessary to most users.

### Slider Defaults
TODO: Fill out

## Video Bonus Points
TODO: Beg

## Music Bonus Points
TODO: Beg
