export class Gallery {
  url: string;
  id: number;

  constructor(url: string)
  constructor(url: string, id: number)
  constructor(url?: string, id?: number) {
    this.url = url;
    this.id = id;
  }
}
