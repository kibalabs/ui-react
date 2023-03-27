import { RecursivePartial } from '@kibalabs/core';

import { ITextTheme } from './theme';
import { mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';

export const buildTextThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base?: PartialThemeMap<ITextTheme>): ThemeMap<ITextTheme> => {
  const textTheme: ITextTheme = {
    'font-size': dimensions.fontSize,
    'font-family': '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    'font-weight': 'normal',
    color: '$colors.text',
    'line-height': '1.5em',
    'text-decoration': 'none',
    margin: '0',
    'text-align': 'inherit',
    'text-shadow': 'inherit',
    'text-transform': 'inherit',
  };

  const inheritTextTheme: ITextTheme = {
    'font-size': 'inherit',
    'font-family': 'inherit',
    'font-weight': 'inherit',
    color: 'inherit',
    'line-height': 'inherit',
    'text-decoration': 'inherit',
    margin: 'inherit',
    'text-align': 'inherit',
    'text-shadow': 'inherit',
    'text-transform': 'inherit',
  };

  const inlineTextTheme: RecursivePartial<ITextTheme> = {
  };

  const paragraphTextTheme: RecursivePartial<ITextTheme> = {
  };

  const boldTextTheme: RecursivePartial<ITextTheme> = {
    'font-weight': 'bolder',
  };

  const strongTextTheme: RecursivePartial<ITextTheme> = {
    'font-weight': 'bolder',
  };

  const italicTextTheme: RecursivePartial<ITextTheme> = {
    'font-style': 'italic',
  };

  const emphasisTextTheme: RecursivePartial<ITextTheme> = {
    'font-style': 'italic',
  };

  const underlineTextTheme: RecursivePartial<ITextTheme> = {
    'text-decoration': 'underline',
  };

  const markTextTheme: RecursivePartial<ITextTheme> = {
  };

  const smallTextTheme: RecursivePartial<ITextTheme> = {
    'font-size': 'smaller',
  };

  const smallerTextTheme: RecursivePartial<ITextTheme> = {
    'font-size': 'smaller',
  };

  const largeTextTheme: RecursivePartial<ITextTheme> = {
    'font-size': 'larger',
  };

  const deletedTextTheme: RecursivePartial<ITextTheme> = {
    'text-decoration': 'line-through',
  };

  const insertedTextTheme: RecursivePartial<ITextTheme> = {
    'text-decoration': 'underline',
  };

  const subscriptTextTheme: RecursivePartial<ITextTheme> = {
    'vertical-align': 'sub',
    'font-size': 'smaller',
  };

  const superscriptTextTheme: RecursivePartial<ITextTheme> = {
    'vertical-align': 'super',
    'font-size': 'smaller',
  };

  // /////////////

  const header1TextTheme: RecursivePartial<ITextTheme> = {
    'font-size': '3.0rem',
    'font-weight': '800',
    color: '$colors.text',
    'line-height': '1.2em',
  };

  const headerTextTheme = header1TextTheme;

  const header2TextTheme: RecursivePartial<ITextTheme> = {
    'font-size': '2.0rem',
    'font-weight': '700',
    color: '$colors.text',
    'line-height': '1.2em',
  };

  const titleTextTheme = header2TextTheme;

  const header3TextTheme: RecursivePartial<ITextTheme> = {
    'font-size': '1.4rem',
    'font-weight': '700',
    color: '$colors.text',
    'line-height': '1.2em',
  };

  const subtitleTextTheme = header3TextTheme;

  const header4TextTheme: RecursivePartial<ITextTheme> = {
    'font-size': '1.3rem',
    'font-weight': '600',
    color: '$colors.text',
    'text-decoration': 'underline',
    'line-height': '1.2em',
  };

  const header5TextTheme: RecursivePartial<ITextTheme> = {
    'font-size': '1.2rem',
    'font-weight': '600',
    color: '$colors.text',
    'line-height': '1.2em',
  };

  const header6TextTheme: RecursivePartial<ITextTheme> = {
    'font-size': '1.1rem',
    'font-weight': '600',
    color: '$colors.text',
    'line-height': '1.2em',
  };

  const noteTextTheme: RecursivePartial<ITextTheme> = {
    'font-size': '0.8rem',
    color: '$colors.textLight25',
  };

  const supersizeTextTheme: RecursivePartial<ITextTheme> = {
    'font-size': '3rem',
  };

  const unmarginedTextTheme: RecursivePartial<ITextTheme> = {
    margin: '0',
  };

  const marginedTextTheme: RecursivePartial<ITextTheme> = {
    margin: '1em 0 0.5em 0',
  };

  const brandedTextTheme: RecursivePartial<ITextTheme> = {
    color: '$colors.brandPrimary',
  };

  const errorTextTheme: RecursivePartial<ITextTheme> = {
    color: '$colors.error',
  };

  const successTextTheme: RecursivePartial<ITextTheme> = {
    color: '$colors.success',
  };

  return mergeThemeMap<ITextTheme>({
    default: textTheme,
    inherit: inheritTextTheme,
    paragraph: paragraphTextTheme,
    inline: inlineTextTheme,
    bold: boldTextTheme,
    strong: strongTextTheme,
    italic: italicTextTheme,
    emphasis: emphasisTextTheme,
    underline: underlineTextTheme,
    mark: markTextTheme,
    small: smallTextTheme,
    smaller: smallerTextTheme,
    large: largeTextTheme,
    deleted: deletedTextTheme,
    inserted: insertedTextTheme,
    subscript: subscriptTextTheme,
    superscript: superscriptTextTheme,
    header: headerTextTheme,
    title: titleTextTheme,
    subtitle: subtitleTextTheme,
    header1: header1TextTheme,
    header2: header2TextTheme,
    header3: header3TextTheme,
    header4: header4TextTheme,
    header5: header5TextTheme,
    header6: header6TextTheme,
    note: noteTextTheme,
    supersize: supersizeTextTheme,
    unmargined: unmarginedTextTheme,
    margined: marginedTextTheme,
    colored: brandedTextTheme,
    branded: brandedTextTheme,
    error: errorTextTheme,
    success: successTextTheme,
  }, (base || {}));
};
