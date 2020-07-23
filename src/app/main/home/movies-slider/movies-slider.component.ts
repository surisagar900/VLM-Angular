import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Subscription, Observable, Subject } from "rxjs";
import { MoviesService, movie } from "../../movies.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-movies-slider",
  templateUrl: "./movies-slider.component.html",
  styles: [
    `
      a {
        color: black;
      }
      a:hover {
        color: blue;
      }
    `,
  ],
})
export class MoviesSliderComponent implements OnInit, OnDestroy {
  getAllSub: Subscription;
  @Input() lang: string = "";
  @Input() genre: string = "";
  @Input() year: string = "";
  getAllMovies: Array<movie>;
  actionName: string = "all";
  actionType: string = "a";

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.lang = this.lang.toLowerCase();
    this.genre = this.genre.toLowerCase();
    this.year = this.year.toLowerCase();

    if (this.lang != "") {
      this.actionType = "lang";
      this.actionName = this.lang;
    }
    if (this.genre != "") {
      this.actionType = "genre";
      this.actionName = this.genre;
    }
    if (this.year != "") {
      this.actionType = "year";
      this.actionName = this.year;
    }

    this.getAllSub = this.moviesService
      .getAll(this.lang, this.genre, this.year)
      .subscribe((res) => {
        this.getAllMovies = res;
      });
  }

  ngOnDestroy() {
    this.getAllSub.unsubscribe();
  }
}
