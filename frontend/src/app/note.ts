export class Note {
  id: number;
  title: string = '';
  content: string = '';
  date: Date;
  category: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
