import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-records-table",
  templateUrl: "./records-table.component.html",
  styles: [],
})
export class RecordsTableComponent implements OnInit {
  constructor(private http: HttpClient) {}

  allRecordsData: any;

  private configURL = environment.BaseURL + "records";

  ngOnInit() {
    this.http.get(this.configURL).subscribe((res) => {
      this.allRecordsData = res;
    });
  }
}
