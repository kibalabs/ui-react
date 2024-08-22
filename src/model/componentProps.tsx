import { RecursivePartial } from '@kibalabs/core';


export interface IComponentProps<Theme> {
  id?: string;
  className?: string;
  theme?: RecursivePartial<Theme>;
  variant?: string;
}
