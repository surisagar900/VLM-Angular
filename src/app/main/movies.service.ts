import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface movie {
  moviesId?: number;
  title: string;
  director: string;
  language: string;
  genre: string;
  releaseYear: number;
  description: string;
  returnDays: number;
  fine: number;
}

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  private configUrl = environment.BaseURL + "movies";

  getAll(
    language: string = "",
    movieGenre: string = "",
    movieYear: string = ""
  ) {
    let searchParam = new HttpParams();
    if (language != "") {
      searchParam = searchParam.append("lang", language);
    }
    if (movieGenre != "") {
      searchParam = searchParam.append("genre", movieGenre);
    }
    if (movieYear != "") {
      searchParam = searchParam.append("year", movieYear);
    }

    return this.http
      .get<Array<movie>>(this.configUrl, {
        params: searchParam,
      })
      .pipe(catchError(this.handleErrors));
  }

  getMovieByTitle(movieName: string) {
    return this.http
      .get<movie>(this.configUrl + "/" + movieName)
      .pipe(catchError(this.handleErrors));
  }

  getMovieById(movieId: number) {
    return this.http
      .get<movie>(this.configUrl + "/" + movieId)
      .pipe(catchError(this.handleErrors));
  }

  addMovie(addMovie: movie) {
    return this.http
      .post(this.configUrl, addMovie)
      .pipe(catchError(this.handleErrors));
  }

  private handleErrors(errRes: HttpErrorResponse) {
    let errorMessage = "Unknown Error Occurred";
    if (errRes.error.errors) {
      return throwError(errorMessage);
    }
    switch (errRes.error.message) {
      case "NO_MOVIES":
        errorMessage = "No any movies yet";
        break;
      case "MOVIE_ALREADY_EXIST":
        errorMessage = "movie already exist";
        break;
      case "MOVIE_NOT_EXIST":
        errorMessage = "movie not exist";
        break;
      case "MOVIENAME_OCCUPIED":
        errorMessage = "movie occupied";
        break;
    }
    return throwError(errorMessage);
  }
}
