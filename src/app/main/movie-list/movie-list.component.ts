import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MoviesSliderComponent } from "../home/movies-slider/movies-slider.component";
import { MoviesService, movie } from "../movies.service";
import { yearsPerPage } from "@angular/material/datepicker";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styles: [],
})
export class MovieListComponent implements OnInit {
  private movieType: string;
  movieTypeName: string;
  getMovies: Array<movie>;
  language: string = "";
  genre: string = "";
  year: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.movieType = params["type"];
      this.movieTypeName = params["name"];
    });

    if (this.movieType == "lang") {
      this.language = this.movieTypeName;
    }
    if (this.movieType == "genre") {
      this.genre = this.movieTypeName;
    }
    if (this.movieType == "year") {
      this.year = this.movieTypeName;
    }

    this.moviesService
      .getAll(this.language, this.genre, this.year)
      .subscribe((resData) => {
        this.getMovies = resData;
      });
  }
}
