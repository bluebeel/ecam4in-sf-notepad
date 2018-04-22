import { Note } from './note';

export class Category {
  id: number;
  libelle: string = '';
  notes: Note[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
