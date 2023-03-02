import { RecursivePartial } from '@kibalabs/core';

export interface IMoleculeProps<Theme> {
  id?: string;
  className?: string;
  theme?: RecursivePartial<Theme>;
}

export const defaultMoleculeProps = {
  className: '',
};
