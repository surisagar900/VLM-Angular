import { Component } from "@angular/core";

@Component({
  selector: "app-homeslider",
  templateUrl: "./homeslider.component.html",
  styles: [
    `
      .carousel-item {
        height: 250px;
      }
      .nav-button-prev {
        color: white;
        background-image: linear-gradient(
          to left,
          transparent,
          rgba(0, 0, 0, 0.5)
        );
      }
      .nav-button-next {
        color: white;
        background-image: linear-gradient(
          to right,
          transparent,
          rgba(0, 0, 0, 0.5)
        );
      }
    `,
  ],
})
export class HomesliderComponent {}
