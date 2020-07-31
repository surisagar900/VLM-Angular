import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { UserDashboardRoutingModule } from "./user-dashboard-routing.module";
import { AppMaterialModule } from "src/app/app-material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { UserActionsComponent } from "./user-actions/user-actions.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserRecordsComponent } from "./user-records/user-records.component";
import { UserProfileEditComponent } from "./user-profile-edit/user-profile-edit.component";
import { UserDashboardComponent } from "./user-dashboard.component";

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserActionsComponent,
    UserProfileComponent,
    UserRecordsComponent,
    UserProfileEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserDashboardRoutingModule,
    AppMaterialModule,
    SharedModule,
  ],
})
export class UserDashboardModule {}
