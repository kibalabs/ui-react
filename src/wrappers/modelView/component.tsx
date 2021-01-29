import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';
import { getResponsiveCss, ResponsiveField } from '../../util';
import { defaultWrapperProps, IWrapperProps } from '../wrapperProps';
import { wrappingComponent } from '../wrappingComponent';

/*
interface for base component
theme
size
*/

/*
interface for returnable component
theme
size
props for transition (like duration , style)
props for scrollability
padding
backdrop
onClose
onKeyDown
isOpen
children
*/

/*
modelView is a wrapper and a parent component to dialog boxes , popover , drawers, etc
this is a component will provide overlay functions for it's children
*/