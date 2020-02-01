export class AdminHomepageCard {
  routerLink: string;
  avatarTemplateName: string;
  title: string;
  description: string;
  iconType: string;

  constructor(routerLink: string, avatarTemplateName: string, title: string, description: string, iconType: string) {
    this.routerLink = routerLink;
    this.avatarTemplateName = avatarTemplateName;
    this.title = title;
    this.description = description;
    this.iconType = iconType;
  }
}
