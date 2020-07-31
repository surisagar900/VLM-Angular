import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserDashboardComponent } from "./user-dashboard.component";
import { UserGuard } from "src/app/auth/user.guard";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserProfileEditComponent } from "./user-profile-edit/user-profile-edit.component";
import { UserRecordsComponent } from "./user-records/user-records.component";

const routes: Routes = [
  {
    path: "",
    component: UserDashboardComponent,
    canActivate: [UserGuard],
    children: [
      { path: "profile", component: UserProfileComponent },
      { path: "profile/edit", component: UserProfileEditComponent },
      { path: "records", component: UserRecordsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
