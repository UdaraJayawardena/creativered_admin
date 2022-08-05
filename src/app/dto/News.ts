export class News {
  header: string;
  newsDate: string;
  newsTime: string;
  description: string;
  image: string;
  status: string;
  id: number;
  item_id: number;

  constructor(header?: string, newsDate?: string, newsTime?: string, description?: string, image?: string, status?: string, item_id?: number)
  constructor(header: string, newsDate: string, newsTime: string, description: string, image: string, status: string, id: number, item_id: number)
  constructor(header?: string, newsDate?: string, newsTime?: string, description?: string, image?: string, status?: string, id?: number, item_id?: number) {
    this.header = header;
    this.newsDate = newsDate;
    this.newsTime = newsTime;
    this.description = description;
    this.image = image;
    this.status = status;
    this.id = id;
    this.item_id = item_id;
  }
}

export class News1 {
  header: string;
  newsDate: string;
  newsTime: string;
  description: string;
  image: string;
  status: string;
  item_id: number;

  constructor(header: string, newsDate: string, newsTime: string, description: string, image: string, status: string, item_id: number)
  constructor(header?: string, newsDate?: string, newsTime?: string, description?: string, image?: string, status?: string, item_id?: number) {
    this.header = header;
    this.newsDate = newsDate;
    this.newsTime = newsTime;
    this.description = description;
    this.image = image;
    this.status = status;
    this.item_id = item_id;
  }
}
