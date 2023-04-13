"use strict";(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[1430],{"./packages/components/src/custom-gradient-picker/gradient-bar/index.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return CustomGradientBar}});var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/react/index.js"),colord=__webpack_require__("./node_modules/colord/index.mjs"),use_instance_id=__webpack_require__("./packages/compose/build-module/hooks/use-instance-id/index.js"),build_module=__webpack_require__("./packages/i18n/build-module/index.js"),plus=__webpack_require__("./packages/icons/build-module/library/plus.js"),src_button=__webpack_require__("./packages/components/src/button/index.tsx"),component=__webpack_require__("./packages/components/src/h-stack/component.tsx"),legacy_adapter=__webpack_require__("./packages/components/src/color-picker/legacy-adapter.tsx"),visually_hidden_component=__webpack_require__("./packages/components/src/visually-hidden/component.tsx"),color_palette=__webpack_require__("./packages/components/src/color-palette/index.tsx");function clampPercent(value){return Math.max(0,Math.min(100,value))}function updateControlPoint(points,index,newPoint){const newValue=points.slice();return newValue[index]=newPoint,newValue}function updateControlPointPosition(points,index,newPosition){if(function isOverlapping(value,initialIndex,newPosition){let minDistance=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;const initialPosition=value[initialIndex].position,minPosition=Math.min(initialPosition,newPosition),maxPosition=Math.max(initialPosition,newPosition);return value.some(((_ref,index)=>{let{position:position}=_ref;return index!==initialIndex&&(Math.abs(position-newPosition)<minDistance||minPosition<position&&position<maxPosition)}))}(points,index,newPosition))return points;return updateControlPoint(points,index,{...points[index],position:newPosition})}function updateControlPointColor(points,index,newColor){return updateControlPoint(points,index,{...points[index],color:newColor})}function getHorizontalRelativeGradientPosition(mouseXCoordinate,containerElement){if(!containerElement)return;const{x:x,width:width}=containerElement.getBoundingClientRect(),absolutePositionValue=mouseXCoordinate-x;return Math.round(clampPercent(100*absolutePositionValue/width))}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ControlPointButton(_ref){let{isOpen:isOpen,position:position,color:color,...additionalProps}=_ref;const descriptionId=`components-custom-gradient-picker__control-point-button-description-${(0,use_instance_id.Z)(ControlPointButton)}`;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(src_button.ZP,{"aria-label":(0,build_module.gB)((0,build_module.__)("Gradient control point at position %1$s%% with color code %2$s."),position,color),"aria-describedby":descriptionId,"aria-haspopup":"true","aria-expanded":isOpen,className:classnames_default()("components-custom-gradient-picker__control-point-button",{"is-active":isOpen}),...additionalProps}),(0,jsx_runtime.jsx)(visually_hidden_component.Z,{id:descriptionId,children:(0,build_module.__)("Use your left or right arrow keys or drag and drop with the mouse to change the gradient position. Press the button to change the color or remove the control point.")})]})}function GradientColorPickerDropdown(_ref2){let{isRenderedInSidebar:isRenderedInSidebar,className:className,...props}=_ref2;const popoverProps=(0,react.useMemo)((()=>({placement:"bottom",offset:8})),[]),mergedClassName=classnames_default()("components-custom-gradient-picker__control-point-dropdown",className);return(0,jsx_runtime.jsx)(color_palette.qK,{isRenderedInSidebar:isRenderedInSidebar,popoverProps:popoverProps,className:mergedClassName,...props})}function ControlPoints(_ref3){let{disableRemove:disableRemove,disableAlpha:disableAlpha,gradientPickerDomRef:gradientPickerDomRef,ignoreMarkerPosition:ignoreMarkerPosition,value:controlPoints,onChange:onChange,onStartControlPointChange:onStartControlPointChange,onStopControlPointChange:onStopControlPointChange,__experimentalIsRenderedInSidebar:__experimentalIsRenderedInSidebar}=_ref3;const controlPointMoveState=(0,react.useRef)(),onMouseMove=event=>{if(void 0===controlPointMoveState.current||null===gradientPickerDomRef.current)return;const relativePosition=getHorizontalRelativeGradientPosition(event.clientX,gradientPickerDomRef.current),{initialPosition:initialPosition,index:index,significantMoveHappened:significantMoveHappened}=controlPointMoveState.current;!significantMoveHappened&&Math.abs(initialPosition-relativePosition)>=5&&(controlPointMoveState.current.significantMoveHappened=!0),onChange(updateControlPointPosition(controlPoints,index,relativePosition))},cleanEventListeners=()=>{window&&window.removeEventListener&&controlPointMoveState.current&&controlPointMoveState.current.listenersActivated&&(window.removeEventListener("mousemove",onMouseMove),window.removeEventListener("mouseup",cleanEventListeners),onStopControlPointChange(),controlPointMoveState.current.listenersActivated=!1)},cleanEventListenersRef=(0,react.useRef)();return cleanEventListenersRef.current=cleanEventListeners,(0,react.useEffect)((()=>()=>{var _cleanEventListenersR;null===(_cleanEventListenersR=cleanEventListenersRef.current)||void 0===_cleanEventListenersR||_cleanEventListenersR.call(cleanEventListenersRef)}),[]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:controlPoints.map(((point,index)=>{const initialPosition=null==point?void 0:point.position;return ignoreMarkerPosition!==initialPosition&&(0,jsx_runtime.jsx)(GradientColorPickerDropdown,{isRenderedInSidebar:__experimentalIsRenderedInSidebar,onClose:onStopControlPointChange,renderToggle:_ref4=>{let{isOpen:isOpen,onToggle:onToggle}=_ref4;return(0,jsx_runtime.jsx)(ControlPointButton,{onClick:()=>{controlPointMoveState.current&&controlPointMoveState.current.significantMoveHappened||(isOpen?onStopControlPointChange():onStartControlPointChange(),onToggle())},onMouseDown:()=>{window&&window.addEventListener&&(controlPointMoveState.current={initialPosition:initialPosition,index:index,significantMoveHappened:!1,listenersActivated:!0},onStartControlPointChange(),window.addEventListener("mousemove",onMouseMove),window.addEventListener("mouseup",cleanEventListeners))},onKeyDown:event=>{"ArrowLeft"===event.code?(event.stopPropagation(),onChange(updateControlPointPosition(controlPoints,index,clampPercent(point.position-10)))):"ArrowRight"===event.code&&(event.stopPropagation(),onChange(updateControlPointPosition(controlPoints,index,clampPercent(point.position+10))))},isOpen:isOpen,position:point.position,color:point.color},index)},renderContent:_ref5=>{let{onClose:onClose}=_ref5;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(legacy_adapter.A,{enableAlpha:!disableAlpha,color:point.color,onChange:color=>{onChange(updateControlPointColor(controlPoints,index,(0,colord.Vi)(color).toRgbString()))}}),!disableRemove&&controlPoints.length>2&&(0,jsx_runtime.jsx)(component.Z,{className:"components-custom-gradient-picker__remove-control-point-wrapper",alignment:"center",children:(0,jsx_runtime.jsx)(src_button.ZP,{onClick:()=>{onChange(function removeControlPoint(points,index){return points.filter(((_point,pointIndex)=>pointIndex!==index))}(controlPoints,index)),onClose()},variant:"link",children:(0,build_module.__)("Remove Control Point")})})]})},style:{left:`${point.position}%`,transform:"translateX( -50% )"}},index)}))})}function InsertPoint(_ref6){let{value:controlPoints,onChange:onChange,onOpenInserter:onOpenInserter,onCloseInserter:onCloseInserter,insertPosition:insertPosition,disableAlpha:disableAlpha,__experimentalIsRenderedInSidebar:__experimentalIsRenderedInSidebar}=_ref6;const[alreadyInsertedPoint,setAlreadyInsertedPoint]=(0,react.useState)(!1);return(0,jsx_runtime.jsx)(GradientColorPickerDropdown,{isRenderedInSidebar:__experimentalIsRenderedInSidebar,className:"components-custom-gradient-picker__inserter",onClose:()=>{onCloseInserter()},renderToggle:_ref7=>{let{isOpen:isOpen,onToggle:onToggle}=_ref7;return(0,jsx_runtime.jsx)(src_button.ZP,{"aria-expanded":isOpen,"aria-haspopup":"true",onClick:()=>{isOpen?onCloseInserter():(setAlreadyInsertedPoint(!1),onOpenInserter()),onToggle()},className:"components-custom-gradient-picker__insert-point-dropdown",icon:plus.Z})},renderContent:()=>(0,jsx_runtime.jsx)(legacy_adapter.A,{enableAlpha:!disableAlpha,onChange:color=>{alreadyInsertedPoint?onChange(function updateControlPointColorByPosition(points,position,newColor){const index=points.findIndex((point=>point.position===position));return updateControlPointColor(points,index,newColor)}(controlPoints,insertPosition,(0,colord.Vi)(color).toRgbString())):(onChange(function addControlPoint(points,position,color){const nextIndex=points.findIndex((point=>point.position>position)),newPoint={color:color,position:position},newPoints=points.slice();return newPoints.splice(nextIndex-1,0,newPoint),newPoints}(controlPoints,insertPosition,(0,colord.Vi)(color).toRgbString())),setAlreadyInsertedPoint(!0))}}),style:null!==insertPosition?{left:`${insertPosition}%`,transform:"translateX( -50% )"}:void 0})}GradientColorPickerDropdown.displayName="GradientColorPickerDropdown",InsertPoint.displayName="InsertPoint",ControlPoints.InsertPoint=InsertPoint;var control_points=ControlPoints;try{ControlPoints.displayName="ControlPoints",ControlPoints.__docgenInfo={description:"",displayName:"ControlPoints",props:{disableRemove:{defaultValue:null,description:"",name:"disableRemove",required:!0,type:{name:"boolean"}},disableAlpha:{defaultValue:null,description:"",name:"disableAlpha",required:!0,type:{name:"boolean"}},gradientPickerDomRef:{defaultValue:null,description:"",name:"gradientPickerDomRef",required:!0,type:{name:"RefObject<HTMLDivElement>"}},ignoreMarkerPosition:{defaultValue:null,description:"",name:"ignoreMarkerPosition",required:!1,type:{name:"number"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"ControlPoint[]"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(controlPoints: ControlPoint[]) => void"}},onStartControlPointChange:{defaultValue:null,description:"",name:"onStartControlPointChange",required:!0,type:{name:"() => void"}},onStopControlPointChange:{defaultValue:null,description:"",name:"onStopControlPointChange",required:!0,type:{name:"() => void"}},__experimentalIsRenderedInSidebar:{defaultValue:null,description:"",name:"__experimentalIsRenderedInSidebar",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/custom-gradient-picker/gradient-bar/control-points.tsx#ControlPoints"]={docgenInfo:ControlPoints.__docgenInfo,name:"ControlPoints",path:"packages/components/src/custom-gradient-picker/gradient-bar/control-points.tsx#ControlPoints"})}catch(__react_docgen_typescript_loader_error){}const customGradientBarReducer=(state,action)=>{switch(action.type){case"MOVE_INSERTER":if("IDLE"===state.id||"MOVING_INSERTER"===state.id)return{id:"MOVING_INSERTER",insertPosition:action.insertPosition};break;case"STOP_INSERTER_MOVE":if("MOVING_INSERTER"===state.id)return{id:"IDLE"};break;case"OPEN_INSERTER":if("MOVING_INSERTER"===state.id)return{id:"INSERTING_CONTROL_POINT",insertPosition:state.insertPosition};break;case"CLOSE_INSERTER":if("INSERTING_CONTROL_POINT"===state.id)return{id:"IDLE"};break;case"START_CONTROL_CHANGE":if("IDLE"===state.id)return{id:"MOVING_CONTROL_POINT"};break;case"STOP_CONTROL_CHANGE":if("MOVING_CONTROL_POINT"===state.id)return{id:"IDLE"}}return state},customGradientBarReducerInitialState={id:"IDLE"};function CustomGradientBar(_ref){let{background:background,hasGradient:hasGradient,value:controlPoints,onChange:onChange,disableInserter:disableInserter=!1,disableAlpha:disableAlpha=!1,__experimentalIsRenderedInSidebar:__experimentalIsRenderedInSidebar=!1}=_ref;const gradientMarkersContainerDomRef=(0,react.useRef)(null),[gradientBarState,gradientBarStateDispatch]=(0,react.useReducer)(customGradientBarReducer,customGradientBarReducerInitialState),onMouseEnterAndMove=event=>{if(!gradientMarkersContainerDomRef.current)return;const insertPosition=getHorizontalRelativeGradientPosition(event.clientX,gradientMarkersContainerDomRef.current);controlPoints.some((_ref2=>{let{position:position}=_ref2;return Math.abs(insertPosition-position)<10}))?"MOVING_INSERTER"===gradientBarState.id&&gradientBarStateDispatch({type:"STOP_INSERTER_MOVE"}):gradientBarStateDispatch({type:"MOVE_INSERTER",insertPosition:insertPosition})},isMovingInserter="MOVING_INSERTER"===gradientBarState.id,isInsertingControlPoint="INSERTING_CONTROL_POINT"===gradientBarState.id;return(0,jsx_runtime.jsxs)("div",{className:classnames_default()("components-custom-gradient-picker__gradient-bar",{"has-gradient":hasGradient}),onMouseEnter:onMouseEnterAndMove,onMouseMove:onMouseEnterAndMove,onMouseLeave:()=>{gradientBarStateDispatch({type:"STOP_INSERTER_MOVE"})},children:[(0,jsx_runtime.jsx)("div",{className:"components-custom-gradient-picker__gradient-bar-background",style:{background:background,opacity:hasGradient?1:.4}}),(0,jsx_runtime.jsxs)("div",{ref:gradientMarkersContainerDomRef,className:"components-custom-gradient-picker__markers-container",children:[!disableInserter&&(isMovingInserter||isInsertingControlPoint)&&(0,jsx_runtime.jsx)(control_points.InsertPoint,{__experimentalIsRenderedInSidebar:__experimentalIsRenderedInSidebar,disableAlpha:disableAlpha,insertPosition:gradientBarState.insertPosition,value:controlPoints,onChange:onChange,onOpenInserter:()=>{gradientBarStateDispatch({type:"OPEN_INSERTER"})},onCloseInserter:()=>{gradientBarStateDispatch({type:"CLOSE_INSERTER"})}}),(0,jsx_runtime.jsx)(control_points,{__experimentalIsRenderedInSidebar:__experimentalIsRenderedInSidebar,disableAlpha:disableAlpha,disableRemove:disableInserter,gradientPickerDomRef:gradientMarkersContainerDomRef,ignoreMarkerPosition:isInsertingControlPoint?gradientBarState.insertPosition:void 0,value:controlPoints,onChange:onChange,onStartControlPointChange:()=>{gradientBarStateDispatch({type:"START_CONTROL_CHANGE"})},onStopControlPointChange:()=>{gradientBarStateDispatch({type:"STOP_CONTROL_CHANGE"})}})]})]})}CustomGradientBar.displayName="CustomGradientBar";try{gradientbar.displayName="gradientbar",gradientbar.__docgenInfo={description:"",displayName:"gradientbar",props:{background:{defaultValue:null,description:"",name:"background",required:!0,type:{name:"Background<string | number>"}},hasGradient:{defaultValue:null,description:"",name:"hasGradient",required:!0,type:{name:"boolean"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"ControlPoint[]"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(newControlPoints: ControlPoint[]) => void"}},disableInserter:{defaultValue:{value:"false"},description:"",name:"disableInserter",required:!1,type:{name:"boolean"}},disableAlpha:{defaultValue:{value:"false"},description:"",name:"disableAlpha",required:!1,type:{name:"boolean"}},__experimentalIsRenderedInSidebar:{defaultValue:{value:"false"},description:"",name:"__experimentalIsRenderedInSidebar",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/custom-gradient-picker/gradient-bar/index.tsx#gradientbar"]={docgenInfo:gradientbar.__docgenInfo,name:"gradientbar",path:"packages/components/src/custom-gradient-picker/gradient-bar/index.tsx#gradientbar"})}catch(__react_docgen_typescript_loader_error){}}}]);