import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AppMaterialModule } from "../app-material.module";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AppMaterialModule,
  ],
})
export class AuthModule {}
