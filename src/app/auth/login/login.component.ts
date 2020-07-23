import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [
    `
      mat-card {
        background: rgba(255, 255, 255, 0.95);
      }
    `,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  loading: boolean = false;
  hide: boolean = true;
  UserRole: string;
  LoginForm: FormGroup;
  errors: string;

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
          Validators.pattern("^[a-z0-9]{6,25}$"),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern("^[a-zA-Z0-9@*#]{8,20}$"),
        ],
      ],
      role: [null],
    });
  }

  loginSub: Subscription;

  onSubmit() {
    if (this.LoginForm.invalid) {
      return;
    }

    this.errors = "";
    this.loading = true;
    this.LoginForm.patchValue({ role: this.UserRole });
    this.LoginForm.disable();

    this.loginSub = this.authService.login(this.LoginForm.value).subscribe(
      (res) => {
        this.loading = false;
        this.LoginForm.enable();
        this.errors = "";
        this.LoginForm.reset();
        if (res.role == "Admin") {
          this.router.navigate(["/admin"]);
        } else {
          this.router.navigate(["/"]);
        }
      },
      (err) => {
        this.loading = false;
        this.errors = err;
        this.LoginForm.enable();
      }
    );
  }

  ngOnDestroy() {
    if (this.loginSub) this.loginSub.unsubscribe();
  }
}
