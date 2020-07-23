import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService, UserResponse } from "../../user.service";
import { formatDate } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-profile-edit",
  templateUrl: "./user-profile-edit.component.html",
  styles: [],
})
export class UserProfileEditComponent implements OnInit {
  EditForm: FormGroup;
  loading: boolean;
  errors: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((res) => {
      this.EditForm.setValue({
        username: res.userName,
        firstname: res.firstName,
        lastname: res.lastName,
        dob: res.dob,
        email: res.email,
        phone: res.phone,
      });
    });

    this.EditForm = this.fb.group({
      username: [{ value: null, disabled: true }],
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
      email: [{ value: null, disabled: true }],
      phone: [{ value: null, disabled: true }],
    });
  }

  onSubmit() {
    if (this.EditForm.invalid) {
      return;
    }

    let date = formatDate(
      this.EditForm.get("dob").value,
      "yyyy-MM-dd",
      "en-IN"
    );

    this.errors = "";
    this.loading = true;
    this.EditForm.patchValue({ dob: date });

    this.userService.editUserData(this.EditForm.getRawValue()).subscribe(
      () => {
        this.loading = false;
        this.errors = "";
      },
      (err) => {
        this.loading = false;
        this.errors = err;
        this.EditForm.enable();
      },
      () => this.router.navigate(["../"], { relativeTo: this.route })
    );
  }
}
