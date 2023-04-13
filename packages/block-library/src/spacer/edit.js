/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	getSpacingPresetCssVar,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ResizableBox } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { View } from '@wordpress/primitives';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import SpacerControls from './controls';
import { MIN_SPACER_SIZE } from './constants';

const ResizableSpacer = ( {
	orientation,
	onResizeStart,
	onResize,
	onResizeStop,
	isSelected,
	isResizing,
	setIsResizing,
	...props
} ) => {
	const getCurrentSize = ( elt ) => {
		return orientation === 'horizontal'
			? elt.clientWidth
			: elt.clientHeight;
	};

	const getNextVal = ( elt ) => {
		return `${ getCurrentSize( elt ) }px`;
	};

	return (
		<ResizableBox
			className={ classnames( 'block-library-spacer__resize-container', {
				'resize-horizontal': orientation === 'horizontal',
				'is-resizing': isResizing,
				'is-selected': isSelected,
			} ) }
			onResizeStart={ ( _event, _direction, elt ) => {
				const nextVal = getNextVal( elt );
				onResizeStart( nextVal );
				onResize( nextVal );
			} }
			onResize={ ( _event, _direction, elt ) => {
				onResize( getNextVal( elt ) );
				if ( ! isResizing ) {
					setIsResizing( true );
				}
			} }
			onResizeStop={ ( _event, _direction, elt ) => {
				const nextVal = getCurrentSize( elt );
				onResizeStop( `${ nextVal }px` );
				setIsResizing( false );
			} }
			__experimentalShowTooltip={ true }
			__experimentalTooltipProps={ {
				axis: orientation === 'horizontal' ? 'x' : 'y',
				position: 'corner',
				isVisible: isResizing,
			} }
			showHandle={ isSelected }
			{ ...props }
		/>
	);
};

const SpacerEdit = ( {
	attributes,
	isSelected,
	setAttributes,
	toggleSelection,
	context,
	__unstableParentLayout: parentLayout,
	className,
} ) => {
	const disableCustomSpacingSizes = useSelect( ( select ) => {
		const editorSettings = select( blockEditorStore ).getSettings();
		return editorSettings?.disableCustomSpacingSizes;
	} );
	const { orientation } = context;
	const { orientation: parentOrientation, type } = parentLayout || {};
	// Check if the spacer is inside a flex container.
	const isFlexLayout = type === 'flex';
	// If the spacer is inside a flex container, it should either inherit the orientation
	// of the parent or use the flex default orientation.
	const inheritedOrientation =
		! parentOrientation && isFlexLayout
			? 'horizontal'
			: parentOrientation || orientation;
	const { height, width, style: blockStyle = {} } = attributes;

	const { layout = {} } = blockStyle;
	const { selfStretch, flexSize } = layout;

	const [ isResizing, setIsResizing ] = useState( false );
	const [ temporaryHeight, setTemporaryHeight ] = useState( null );
	const [ temporaryWidth, setTemporaryWidth ] = useState( null );

	const onResizeStart = () => toggleSelection( false );
	const onResizeStop = () => toggleSelection( true );

	const handleOnVerticalResizeStop = ( newHeight ) => {
		onResizeStop();

		if ( isFlexLayout ) {
			setAttributes( {
				style: {
					...blockStyle,
					layout: {
						...layout,
						flexSize: newHeight,
						selfStretch: 'fixed',
					},
				},
			} );
		}

		setAttributes( { height: newHeight } );
		setTemporaryHeight( null );
	};

	const handleOnHorizontalResizeStop = ( newWidth ) => {
		onResizeStop();

		if ( isFlexLayout ) {
			setAttributes( {
				style: {
					...blockStyle,
					layout: {
						...layout,
						flexSize: newWidth,
						selfStretch: 'fixed',
					},
				},
			} );
		}

		setAttributes( { width: newWidth } );
		setTemporaryWidth( null );
	};

	const getHeightForVerticalBlocks = () => {
		if ( isFlexLayout && selfStretch === 'fit' ) {
			return undefined;
		} else if ( isFlexLayout && flexSize ) {
			return temporaryHeight || flexSize;
		}
		return temporaryHeight || getSpacingPresetCssVar( height ) || undefined;
	};

	const getWidthForHorizontalBlocks = () => {
		if ( isFlexLayout && selfStretch === 'fit' ) {
			return undefined;
		} else if ( isFlexLayout && flexSize ) {
			return temporaryWidth || flexSize;
		}
		return temporaryWidth || getSpacingPresetCssVar( width ) || undefined;
	};

	const sizeConditionalOnOrientation =
		inheritedOrientation === 'horizontal'
			? getWidthForHorizontalBlocks()
			: getHeightForVerticalBlocks();

	const style = {
		height:
			inheritedOrientation === 'horizontal'
				? 24
				: getHeightForVerticalBlocks(),
		width:
			inheritedOrientation === 'horizontal'
				? getWidthForHorizontalBlocks()
				: undefined,
		// In vertical flex containers, the spacer shrinks to nothing without a minimum width.
		minWidth:
			inheritedOrientation === 'vertical' && isFlexLayout
				? 48
				: undefined,
		// Add flex-basis so temporary sizes are respected.
		flexBasis: isFlexLayout ? sizeConditionalOnOrientation : undefined,
		// Remove flex-grow when resizing.
		flexGrow: isFlexLayout && isResizing ? 0 : undefined,
	};

	const resizableBoxWithOrientation = ( blockOrientation ) => {
		if ( blockOrientation === 'horizontal' ) {
			return (
				<ResizableSpacer
					minWidth={ MIN_SPACER_SIZE }
					enable={ {
						top: false,
						right: true,
						bottom: false,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					orientation={ blockOrientation }
					onResizeStart={ onResizeStart }
					onResize={ setTemporaryWidth }
					onResizeStop={ handleOnHorizontalResizeStop }
					isSelected={ isSelected }
					isResizing={ isResizing }
					setIsResizing={ setIsResizing }
				/>
			);
		}

		return (
			<>
				<ResizableSpacer
					minHeight={ MIN_SPACER_SIZE }
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					orientation={ blockOrientation }
					onResizeStart={ onResizeStart }
					onResize={ setTemporaryHeight }
					onResizeStop={ handleOnVerticalResizeStop }
					isSelected={ isSelected }
					isResizing={ isResizing }
					setIsResizing={ setIsResizing }
				/>
			</>
		);
	};

	useEffect( () => {
		if ( inheritedOrientation === 'horizontal' && ! width ) {
			setAttributes( {
				height: '0px',
				width: '72px',
			} );
		}
		if (
			isFlexLayout &&
			selfStretch !== 'fill' &&
			selfStretch !== 'fit' &&
			! flexSize
		) {
			const newSize =
				inheritedOrientation === 'horizontal'
					? getSpacingPresetCssVar( width ) || '72px'
					: getSpacingPresetCssVar( height ) || '100px';
			setAttributes( {
				style: {
					...blockStyle,
					layout: {
						...layout,
						flexSize: newSize,
						selfStretch: 'fixed',
					},
				},
			} );
		} else if (
			isFlexLayout &&
			( selfStretch === 'fill' || selfStretch === 'fit' )
		) {
			if ( inheritedOrientation === 'horizontal' ) {
				setAttributes( {
					width: '0px',
				} );
			} else {
				setAttributes( {
					height: '0px',
				} );
			}
		}
	}, [
		blockStyle,
		flexSize,
		height,
		inheritedOrientation,
		isFlexLayout,
		layout,
		selfStretch,
		setAttributes,
		width,
	] );

	return (
		<>
			<View
				{ ...useBlockProps( {
					style,
					className: classnames( className, {
						'custom-sizes-disabled': disableCustomSpacingSizes,
					} ),
				} ) }
			>
				{ resizableBoxWithOrientation( inheritedOrientation ) }
			</View>
			{ ! isFlexLayout && (
				<SpacerControls
					setAttributes={ setAttributes }
					height={ temporaryHeight || height }
					width={ temporaryWidth || width }
					orientation={ inheritedOrientation }
					isResizing={ isResizing }
				/>
			) }
		</>
	);
};

export default SpacerEdit;
