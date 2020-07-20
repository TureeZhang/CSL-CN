export class FormOjbect {
  text: string;
  fieldName: string;
  description: string;

  constructor(text: string, fieldName: string, description: string) {
    this.text = text;
    this.fieldName = fieldName;
    this.description = description;
  }
}
