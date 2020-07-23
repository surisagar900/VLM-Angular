import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MoviesService, movie } from "../movies.service";
import { RecordsService } from "../records.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styles: [
    `
      mat-card {
        position: relative;
        top: 0;
        height: 350px;
        background: url("https://wallpapercave.com/wp/wp4770368.jpg");
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
        background-image: linear-gradient(
          to left,
          transparent 50%,
          rgba(0, 0, 0, 0.8) 70%
        );
      }
      .text-overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 50%;
        padding: 20px;
      }
      button {
        font-size: 20px;
      }
    `,
  ],
})
export class MoviesComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private recordsService: RecordsService,
    private _snackBar: MatSnackBar
  ) {}

  movieName: string;
  movieData: movie;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.movieName = params["name"];
    });

    this.moviesService.getMovieByTitle(this.movieName).subscribe(
      (resData: movie) => {
        this.movieData = resData;
      },
      () => {
        this.router.navigate(["/"], { relativeTo: this.route });
      }
    );
  }

  loading: boolean = false;

  rentMovie(movieId: number) {
    this.loading = true;

    this.recordsService
      .addRecordByUser(movieId)
      .pipe(delay(2000))
      .subscribe(
        () => (this.loading = false),
        () => {
          this._snackBar.open("Login first !!", "close", {
            duration: 4000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          });
          this.loading = false;
        },
        () => {
          this._snackBar.open("Successfully Added !!", "close", {
            duration: 4000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          });
        }
      );
  }
}
