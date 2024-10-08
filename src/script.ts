/**
 * @fileoverview This file handles script building. Its made easy to just chain with .next()
 */

import CodeBlock from "./code_block";
import type { Opcode } from "./opcodes";
import type { Block } from "./types";

/**
 * This class allows scripts to be built with ease, just create a new instance and chain .next()
 */
export default class ScriptBuilder {
	private script: Array<CodeBlock>;
	private last: CodeBlock;

	constructor(opcode: Opcode) {
		this.script = [];

		this.last = new CodeBlock(opcode, null);
		this.script.push(this.last)
	}

	/**
	 * This function allows the script to be built upon and chained.
	 * @param opcode The next code block to be added
	 * @param inputs Inputs field in raw format, this will be changed later.
	 * @returns The current ScriptBuilder being used.
	 */
	public next(opcode: Opcode, inputs?: {[input: string]: Array<unknown>}): ScriptBuilder {
		const child = new CodeBlock(opcode, this.last.uid, inputs);
		this.last.nextUid = child.uid;
		this.last = child;
		this.script.push(this.last);
		return this;
	}

	/**
	 * This function is used internally, it provides the script in a raw format.
	 * @returns Raw script format
	 */
	public export(): {[uid: string]: Block} {
		let result: {[uid: string]: Block} = {};
		this.script.forEach((block) => {
			result[block.uid] = block.export();
		})
		return result;
	}
}