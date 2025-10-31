// All the different types of tokens
// that can appear in an instrument definition
export const TOKEN_CODES = {
    T_ILLEGAL:   -1,
    T_IDENTIFIER: 0,
    T_L_BRACE:    1,
    T_R_BRACE:    2,
    T_DOT:        3,
    T_STRING:     4,
    T_NUM:        5,
    T_COMMA:      6,
};

// An object that gives context to a token
export class Token {
    constructor(kind, text) {
        // Token code
        this.kind = kind;

        // Original text
        this.text = text;
    }
}
