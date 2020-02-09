export class BreadCrumbDto {
  name: string;
  url: string;

  constructor(url: string, name: string) {
    this.name = name;
    this.url = url;
  }
}
