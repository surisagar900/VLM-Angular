import { Component, OnInit, ViewEncapsulation, Renderer2 } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(private renderer: Renderer2) {
    renderer.setStyle(document.body, "background", "white");
  }

  ngOnInit(): void {}
}
