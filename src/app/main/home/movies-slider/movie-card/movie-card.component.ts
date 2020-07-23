import { Component, OnInit, Input } from "@angular/core";
import { movie } from "../../../movies.service";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styles: [
    `
      mat-card {
        position: relative;
        top: 0;
        height: 200px;
        /* background: url("https://wallpapercave.com/wp/wp4770368.jpg"); */
        background-position: center;
        background-size: cover;
        color: white;
        box-shadow: 2px 1px 7px 1px rgba(0, 0, 0, 0.3) !important;
      }
      mat-card:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 4px;
        background-image: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.9));
      }
      .text-overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    `,
  ],
})
export class MovieCardComponent implements OnInit {
  @Input("movieDetail") movieDetail: movie;

  ngOnInit(): void {}
}
