import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-actions",
  templateUrl: "./user-actions.component.html",
  styles: [
    `
      a {
        color: black;
      }
      .active-btn {
        font-weight: 600;
      }
    `,
  ],
})
export class UserActionsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
