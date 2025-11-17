import './App.css';
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import { FindParts, PreprocessText } from './preprocessor/Preprocessor.js'
import { SoundController } from './soundcontroller/SoundController';
import SoundBoard from './components/SoundBoard';

let globalEditor = null;
let soundBoard = new SoundController();

const handleD3Data = (event) => {
    console.log(event.detail);
};

export function applyPreprocessing() {
    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = PreprocessText(proc_text, soundBoard);
    globalEditor.setCode(proc_text_replaced)
}

export function ProcAndPlay(running) {
    if (globalEditor == null) {
        return;
    }

    applyPreprocessing();
    if (running) {
        evaluate();
    }
}

export function StopAudio() {
    globalEditor.stop();
}

// Stops very quickly repeated evaluation calls
let allowEvaluate = true;

// Is another caller trying to trigger an evaluation?
let evaluationPending = false;

function evaluate() {
    // Someone else will trigger the evaluation,
    // therefore, don't worry
    if (evaluationPending) {
        return;
    }

    if (!allowEvaluate) {
        // Ask for an evaluation once we're ready
        evaluationPending = true;
    }

    // Cooldown is off
    // Trigger the evaluation
    globalEditor.evaluate();

    // Don't allow anymore evaluations
    allowEvaluate = false;
    evaluationPending = false;

    // In a second, unlock evaluation
    setTimeout(() => {
        allowEvaluate = true;

        // Redo, because we were asked
        if (evaluationPending) {
            evaluationPending = false;
            evaluate();
        }
    }, 1000);
}

export default function StrudelDemo() {
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) {
            return;
        }

        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;

        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            
        //init canvas
        const canvas = document.getElementById('roll');
        canvas.width = canvas.width * 2;
        canvas.height = canvas.height * 2;
        const drawContext = canvas.getContext('2d');
        const drawTime = [-2, 2]; // time window of drawn haps
        globalEditor = new StrudelMirror({
            defaultOutput: webaudioOutput,
            getTime: () => getAudioContext().currentTime,
            transpiler,
            root: document.getElementById('editor'),
            drawTime,
            onDraw: (haps, time) => {
                drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 })
            },
            prebake: async () => {
                initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                const loadModules = evalScope(
                    import('@strudel/core'),
                    import('@strudel/draw'),
                    import('@strudel/mini'),
                    import('@strudel/tonal'),
                    import('@strudel/webaudio'),
                );
                await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
            },
        });
            
        document.getElementById('proc').value = stranger_tune
        applyPreprocessing();
    }, []);

    return (
        <div>
            <main>

                <div className="container-fluid">
                    <div className="row text-center">
                        <h2>Strudel Demo</h2>
                    </div>
                    <div className="row">
                    <div className="col-md-6" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                        <div className="row" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <textarea className="form-control" rows="14" id="proc" style={{resize: 'none'}} ></textarea>
                        </div>
                        <div className="row" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                    </div>
                    <SoundBoard soundBoard={soundBoard}></SoundBoard>
                </div>
                </div>
            </main >
        </div >
    );
}
