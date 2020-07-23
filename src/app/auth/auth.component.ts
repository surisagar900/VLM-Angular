import { Component, OnInit, ViewEncapsulation, Renderer2 } from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styles: [],
})
export class AuthComponent implements OnInit {
  constructor(private renderer: Renderer2) {
    renderer.setStyle(document.body, "background", 'url("assets/auth-bg.jpg")');
  }

  ngOnInit(): void {}
}
