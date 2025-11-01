declare module 'react-curved-text' {
  import { CSSProperties } from 'react';

  interface ReactCurvedTextProps {
    width: number;
    height: number;
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    startOffset?: number;
    reversed?: boolean;
    text: string;
    textProps?: {
      style?: CSSProperties;
    };
    textPathProps?: {
      style?: CSSProperties;
    };
    tspanProps?: {
      dy?: string;
    };
  }

  const ReactCurvedText: React.FC<ReactCurvedTextProps>;
  export default ReactCurvedText;
}
