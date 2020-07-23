import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  loading: boolean = false;
  hide: boolean = true;
  UserRole: string;
  RegisterForm: FormGroup;
  errors: string;
  registerSub: Subscription;

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
          Validators.pattern("^[0-9a-z]{6,25}$"),
        ],
      ],
      firstname: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.pattern("^[A-Za-z]{1,30}$"),
        ],
      ],
      lastname: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.pattern("^[A-Za-z]{1,30}$"),
        ],
      ],
      dob: [{ value: null, disabled: true }, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._]+@[a-z0-9.-]+.[a-z]{2,}$"),
        ],
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]{10}$"),
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
    });
  }

  onSubmit() {
    if (this.RegisterForm.invalid) {
      return;
    }

    let date = formatDate(
      this.RegisterForm.get("dob").value,
      "yyyy-MM-dd",
      "en-IN"
    );

    this.errors = "";
    this.loading = true;
    this.RegisterForm.disable();
    this.RegisterForm.patchValue({ dob: date });

    this.registerSub = this.authService
      .register(this.RegisterForm.value)
      .subscribe(
        () => {
          this.loading = false;
          this.RegisterForm.enable();
          this.errors = "";
          this.RegisterForm.reset();
        },
        (err) => {
          this.loading = false;
          this.errors = err;
          this.RegisterForm.enable();
        },
        () => this.router.navigate(["/"])
      );
  }

  ngOnDestroy() {
    if (this.registerSub) this.registerSub.unsubscribe();
  }
}
