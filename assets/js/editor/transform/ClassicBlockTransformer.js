/**
 * ClassicBlockTransformer upgrades classic content on the current document into
 * Gutenberg Blocks.
 *
 * Props: Ty Bailey & Gutenberg Core
 */
class ClassicBlockTransformer {

	/**
	 * Saves a local wp object for later lookup.
	 */
	constructor() {
		this.wp = window.wp;
	}

	/**
	 * Runs the Classic to Gutenberg Block transform on the current document.
	 */
	execute() {
		const coreEditor = this.wp.data.select( 'core/block-editor' );
		const blocks     = coreEditor.getBlocks();

		if ( this.validBlocks( blocks ) ) {
			/* Currently set to do 3 levels of recursion */
			this.convertBlocks( blocks, 1, 3 );
		}
	}

	/**
	 * Converts the specified blocks and it's nested blocks if within
	 * the depth constraints.
	 *
	 * Note: This function is called recursively. Specifying a very high
	 * maxDepth can crash the browser.
	 *
	 * @param {Array}  blocks The list of blocks to convert
	 * @param {number} depth The current call stack depth
	 * @param {number} maxDepth The maximum allowed depth
	 * @return void
	 */
	convertBlocks( blocks, depth = 1, maxDepth = 3 ) {
		const n = blocks.length;
		let i, block, innerBlocks;

		for ( i = 0; i < n; i++ ) {
			block       = blocks[i];
			innerBlocks = { block };

			this.transform( block );

			if ( depth <= maxDepth && this.validBlocks( innerBlocks ) ) {
				this.convertBlocks( innerBlocks, depth + 1, maxDepth );
			}
		}
	}

	/**
	 * If the specified block is a freeform / classic block, replaces it
	 * with corresponding Gutenberg blocks
	 *
	 * @param {Object} block The current block object
	 * @return void
	 */
	transform( block ) {
		if ( this.isFreeformBlock( block ) ) {
			this.wp.data.dispatch( 'core/editor' ).replaceBlocks(
				block.clientId,
				this.blockHandler( block )
			);
		}
	}

	/**
	 * Uses the Core Raw HTML Block Handler to convert classic block to
	 * corresponding blocks
	 *
	 * @param {Object} block The block object
	 * @return object
	 */
	blockHandler( block ) {
		const { blocks } = this.wp;

		return blocks.rawHandler( {
			HTML: blocks.getBlockContent( block ),
		} );
	}

	/* helpers */

	/**
	 * Checks if the blocks specified are valid
	 *
	 * @param {Array} blocks The array of blocks
	 * @return bool
	 */
	validBlocks( blocks ) {
		return blocks && 0 < blocks.length;
	}

	/**
	 * Checks if the specified block is a freeform/classic block
	 *
	 * @param {Object} block The block object
	 * @return bool
	 */
	isFreeformBlock( block ) {
		return 'core/freeform' === block.name;
	}

}

export default ClassicBlockTransformer;

