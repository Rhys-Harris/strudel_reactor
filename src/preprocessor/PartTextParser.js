import { TOKEN_CODES, Token } from "./Token";
import { NODE_CODES, Node } from "./Node";

export class PartTextParser {
    constructor(source) {
        // List of tokens to parse
        this.source = source;

        // Where in the list we currently are
        this.curIndex = 0;

        // What token are we on?
        this.curTok = source[0];
    }

    // In case we ever need to backtrack
    prevTok() {
        this.curIndex--;
        this.curTok = this.source[this.curIndex];
    }

    // In case we need more context
    peekTok() {
        const index = this.curIndex+1;
        if (index >= this.source.length) {
            return  new Token(TOKEN_CODES.T_ILLEGAL, "");
        }
        return this.source[index];
    }

    // Moves on to the next token in the source
    nextTok() {
        this.curIndex++;

        // Don't error if we go out of bounds,
        // just give back dummy value
        if (this.curIndex >= this.source.length) {
            this.curTok = new Token(TOKEN_CODES.T_ILLEGAL, "");
            return;
        }
        this.curTok = this.source[this.curIndex];
    }

    parse() {
        const parentNode = new Node(NODE_CODES.N_INSTRUMENT, "");

        // Expect that an instrument starts with a single function call
        const startFunc = this.parseFuncCall();
        if (startFunc.kind === NODE_CODES.N_ILLEGAL) {
            return parentNode;
        }
        parentNode.children.push(startFunc);
        this.nextTok();

        let curChain = startFunc;

        // Maybe some chaining?
        let chainFunc = this.parseChain();
        while (chainFunc.kind !== NODE_CODES.N_ILLEGAL) {
            curChain.chain = chainFunc;
            curChain = curChain.chain;
            this.nextTok();
            chainFunc = this.parseChain();
        }

        return parentNode;
    }

    parseFuncCall() {
        const funcCall = new Node(NODE_CODES.N_FUNC_CALL, "");
    
        // Name of the function
        if (this.curTok.kind !== TOKEN_CODES.T_IDENTIFIER) {
            return new Node(NODE_CODES.N_ILLEGAL, "");
        }
        funcCall.children.push(new Node(NODE_CODES.N_IDENTIFIER, this.curTok.text));
        this.nextTok();
    
        // Opening brace
        if (this.curTok.kind !== TOKEN_CODES.T_L_BRACE) {
            return new Node(NODE_CODES.N_ILLEGAL, "");
        }
        funcCall.children.push(new Node(NODE_CODES.N_L_BRACE, this.curTok.text));
        this.nextTok();

        // Argument within the brackets
        const value = this.parseValue();
        if (value.kind === NODE_CODES.N_ILLEGAL) {
            return new Node(NODE_CODES.N_ILLEGAL, "");
        }
        funcCall.children.push(value);
        this.nextTok();

        while (this.curTok.kind === TOKEN_CODES.T_COMMA) {
            funcCall.children.push(new Node(NODE_CODES.N_COMMA, this.curTok.text));
            this.nextTok();

            // Next argument within the brackets
            const value = this.parseValue();
            if (value.kind === NODE_CODES.N_ILLEGAL) {
                return new Node(NODE_CODES.N_ILLEGAL, "");
            }
            funcCall.children.push(value);
            this.nextTok();
        }

        // Closing brace
        if (this.curTok.kind !== TOKEN_CODES.T_R_BRACE) {
            return new Node(NODE_CODES.N_ILLEGAL, "");
        }
        funcCall.children.push(new Node(NODE_CODES.N_R_BRACE, this.curTok.text));

        return funcCall;
    }

    parseChain() {
        const chain = new Node(NODE_CODES.N_CHAIN, "");

        // The dot
        if (this.curTok.kind !== TOKEN_CODES.T_DOT) {
            return new Node(NODE_CODES.N_ILLEGAL, "");
        }
        chain.children.push(new Node(NODE_CODES.N_DOT, this.curTok.text));
        this.nextTok();

        // The chained function
        const funcCall = this.parseFuncCall();
        if (funcCall.kind === NODE_CODES.N_ILLEGAL) {
            return new Node(NODE_CODES.N_ILLEGAL, "");
        }
        chain.children.push(funcCall);

        // Another chain?
        if (this.peekTok().kind === TOKEN_CODES.T_DOT) {
            this.nextTok();
            const newChain = this.parseChain();
            if (newChain.kind === NODE_CODES.N_ILLEGAL) {
                // Return invalid state
                return new Node(NODE_CODES.N_ILLEGAL, "");
            }

            funcCall.chain = newChain;
        }

        return chain;
    }

    // Anything that can be a value (e.g., num, string, function call)
    parseValue() {
        // This function wraps `parseRawValue` and adds
        // logic for chaining
        const rawValue = this.parseRawValue();

        // Initiate a chain
        if (this.peekTok().kind === TOKEN_CODES.T_DOT) {
            this.nextTok();
            const chain = this.parseChain();
            if (chain.kind === NODE_CODES.N_ILLEGAL) {
                // Return invalid state
                return new Node(NODE_CODES.N_ILLEGAL, "");
            }

            rawValue.chain = chain;
        }

        return rawValue;
    }

    parseRawValue() {
        switch (this.curTok.kind) {
            case TOKEN_CODES.T_NUM:
                return new Node(NODE_CODES.N_NUM, this.curTok.text);
            case TOKEN_CODES.T_STRING:
                return new Node(NODE_CODES.N_STRING, this.curTok.text);
            case TOKEN_CODES.T_IDENTIFIER:
                if (this.peekTok().kind === TOKEN_CODES.T_L_BRACE) {
                    return this.parseFuncCall();
                } else {
                    return new Node(NODE_CODES.N_IDENTIFIER, this.curTok.text);
                }
            default:
                return new Node(NODE_CODES.N_ILLEGAL, "");
        }
    }
}
