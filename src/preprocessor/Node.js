// All the different types of nodes
// that can appear in an instrument definition
export const NODE_CODES = {
    N_ILLEGAL:   -1,
    N_IDENTIFIER: 0,
    N_L_BRACE:    1,
    N_R_BRACE:    2,
    N_DOT:        3,
    N_STRING:     4,
    N_NUM:        5,
    N_COMMA:      6,
    N_INSTRUMENT: 7, // Overarching node
    N_FUNC_CALL:  8, // e.g. lpf(700)
    N_CHAIN:      9, // e.g. lpf(700).room(0.4) 
};

// An object that gives context to a node
export class Node {
    constructor(kind, text) {
        // Token code
        this.kind = kind;

        // Original text
        this.text = text;

        // Any children
        this.children = [];

        // A chained function (if applicable)
        this.chain = null;
    }

    getText() {
        if (this.children.length === 0) {
            return this.text;
        }

        let finalText = "";

        for (let i = 0; i < this.children.length; ++i) {
            finalText += this.children[i].getText();
        }

        return finalText;
    }
}
