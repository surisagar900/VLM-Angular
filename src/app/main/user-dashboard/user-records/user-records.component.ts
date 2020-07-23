import { Component, OnInit, ViewChild } from "@angular/core";
import { RecordsService, UserRecord } from "../../records.service";
import { MatAccordion } from "@angular/material/expansion";
import { MatSnackBar } from "@angular/material/snack-bar";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-user-records",
  templateUrl: "./user-records.component.html",
  styles: [],
})
export class UserRecordsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  userRecords: UserRecord;

  constructor(
    private recordsService: RecordsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.recordsService.getUserRecords().subscribe((res) => {
      this.userRecords = res;
    });
  }

  loading: boolean = false;

  onReturn(recordId: number) {
    this.loading = true;
    this.recordsService
      .deleteRecord(recordId)
      .pipe(delay(2000))
      .subscribe(
        () => {},
        () => {},
        () => {
          this._snackBar.open("Successfully Returned !!", "close", {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          });
          window.location.reload();
          this.loading = false;
        }
      );
  }
}
