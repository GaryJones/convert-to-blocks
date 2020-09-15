import ClassicBlockTransformer from './transform/ClassicBlockTransformer';

/**
 * GutenbridgeEditorSupport connects the JS implementation of
 * Gutenbridge to Gutenberg JS.
 */
class GutenbridgeEditorSupport {

	/**
	 * Returns the singleton instance of GutenbridgeEditorSupport.
	 *
	 * @return GutenbridgeEditorSupport
	 */
	static getInstance() {
		if ( ! this.instance ) {
			this.instance = new GutenbridgeEditorSupport();
		}

		return this.instance;
	}

	/**
	 * Activates the GutenbridgeEditorSupport
	 *
	 * @return void
	 */
	enable() {
		document.addEventListener(
			'DOMContentLoaded', this.didBlockEditorLoad.bind( this )
		);
	}

	/**
	 * Executes the classic to block transform.
	 *
	 * @return void
	 */
	didBlockEditorLoad() {
		const transformer = new ClassicBlockTransformer();
		transformer.execute();
	}

}

const support = GutenbridgeEditorSupport.getInstance();
support.enable();

export default GutenbridgeEditorSupport;
