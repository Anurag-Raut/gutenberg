/**
 * Internal dependencies
 */
import hiddenCaretRangeFromPoint from './hidden-caret-range-from-point';
import { assertIsDefined } from '../utils/assert-is-defined';
import isInputOrTextArea from './is-input-or-text-area';
import isRTL from './is-rtl';

/**
 * Gets the range to place.
 *
 * @param {HTMLElement}      container Focusable element.
 * @param {boolean}          isReverse True for end, false for start.
 * @param {number|undefined} x         X coordinate to vertically position.
 *
 * @return {Range|null} The range to place.
 */
function getRange( container, isReverse, x ) {
	const { ownerDocument } = container;
	// In the case of RTL scripts, the horizontal edge is at the opposite side.
	const isReverseDir = isRTL( container ) ? ! isReverse : isReverse;
	const containerRect = container.getBoundingClientRect();
	// When placing at the end (isReverse), find the closest range to the bottom
	// right corner. When placing at the start, to the top left corner.
	// Ensure x is defined and within the container's boundaries. When it's
	// exactly at the boundary, it's not considered within the boundaries.
	if ( x === undefined ) {
		x = isReverse ? containerRect.right - 1 : containerRect.left + 1;
	} else if ( x <= containerRect.left ) {
		x = containerRect.left + 1;
	} else if ( x >= containerRect.right ) {
		x = containerRect.right - 1;
	}
	const y = isReverseDir ? containerRect.bottom - 1 : containerRect.top + 1;
	return hiddenCaretRangeFromPoint( ownerDocument, x, y, container );
}

/**
 * Places the caret at start or end of a given element.
 *
 * @param {HTMLElement}      container Focusable element.
 * @param {boolean}          isReverse True for end, false for start.
 * @param {number|undefined} x         X coordinate to vertically position.
 */
export default function placeCaretAtEdge( container, isReverse, x ) {
	if ( ! container ) {
		return;
	}

	let editor = container;

	if ( ! container.ownerDocument.activeElement?.contains( container ) ) {
		while ( editor.parentElement?.closest( '[contenteditable]' ) ) {
			editor = /** @type {HTMLElement} */ (
				editor.parentElement.closest( '[contenteditable]' )
			);
		}
		editor.focus();
	}

	if ( isInputOrTextArea( container ) ) {
		// The element may not support selection setting.
		if ( typeof container.selectionStart !== 'number' ) {
			return;
		}

		container.focus();

		if ( isReverse ) {
			container.selectionStart = container.value.length;
			container.selectionEnd = container.value.length;
		} else {
			container.selectionStart = 0;
			container.selectionEnd = 0;
		}

		return;
	}

	if ( container.getAttribute( 'contenteditable' ) !== 'true' ) {
		return;
	}

	const parentEditable = /** @type {HTMLElement} */ (
		container.closest( '[contenteditable="true"]' )
	);

	if ( parentEditable ) {
		parentEditable.contentEditable = 'false';
	}

	let range = getRange( container, isReverse, x );

	// If no range range can be created or it is outside the container, the
	// element may be out of view.
	if (
		! range ||
		! range.startContainer ||
		! container.contains( range.startContainer )
	) {
		container.scrollIntoView( isReverse );
		range = range = getRange( container, isReverse, x );

		if (
			! range ||
			! range.startContainer ||
			! container.contains( range.startContainer )
		) {
			return;
		}
	}

	if ( parentEditable ) {
		parentEditable.contentEditable = 'true';
	}

	const { commonAncestorContainer } = range;
	let parentElement;

	if (
		commonAncestorContainer.nodeType ===
		commonAncestorContainer.ELEMENT_NODE
	) {
		parentElement = /** @type {HTMLElement} */ ( commonAncestorContainer );
	} else {
		parentElement = commonAncestorContainer.parentElement;
	}

	const { ownerDocument } = container;
	const { defaultView } = ownerDocument;
	assertIsDefined( defaultView, 'defaultView' );
	const selection = defaultView.getSelection();
	assertIsDefined( selection, 'selection' );
	selection.removeAllRanges();

	if ( parentElement?.closest( '[contenteditable]' ) !== container ) {
		container.dispatchEvent(
			new defaultView.FocusEvent( 'focusin', { bubbles: true } )
		);
		return;
	}

	selection.addRange( range );
}
