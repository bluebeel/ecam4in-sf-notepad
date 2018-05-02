import {Category} from "./category";

export class Note {
  id: number;
  title: string = '';
  content: string = '';
  date: Date;
  category: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
