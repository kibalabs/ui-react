import React from 'react';

// NOTE(krishan711): the typing in react-markdown seems broken as this line should be ReactElement: https://github.com/remarkjs/react-markdown/blob/main/index.d.ts#L27
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ReactMarkdownTypes {
  type Renderer<T> = (props: T) => React.ElementType<T> | React.ReactElement<T>
  export interface Renderers {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: string | Renderer<any>
  }
}
