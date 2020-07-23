import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "textshort",
})
export class TextshortPipe implements PipeTransform {
  transform(text: string, characters: number = 70): string {
    if (text.length > characters) {
      return text.substr(0, characters) + "...";
    }
    return text;
  }
}
