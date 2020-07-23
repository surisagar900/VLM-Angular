import { Component, OnInit, Renderer2 } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styles: [],
})
export class AdminComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(document.body, "background", "white");
  }
}
