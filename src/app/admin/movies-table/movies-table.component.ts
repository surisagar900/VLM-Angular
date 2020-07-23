import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-movies-table",
  templateUrl: "./movies-table.component.html",
  styles: [],
})
export class MoviesTableComponent implements OnInit {
  constructor(private http: HttpClient) {}

  allMoviesData: any;

  private configURL = environment.BaseURL + "movies";

  ngOnInit() {
    this.http.get(this.configURL).subscribe((res) => {
      this.allMoviesData = res;
    });
  }
}
