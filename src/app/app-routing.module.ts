import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./main/home/home.component";
import { MovieListComponent } from "./main/movie-list/movie-list.component";
import { MoviesComponent } from "./main/movies/movies.component";
import { UserDashboardComponent } from "./main/user-dashboard/user-dashboard.component";
import { MainComponent } from "./main/main.component";
import { UserProfileComponent } from "./main/user-dashboard/user-profile/user-profile.component";
import { UserProfileEditComponent } from "./main/user-dashboard/user-profile-edit/user-profile-edit.component";
import { UserRecordsComponent } from "./main/user-dashboard/user-records/user-records.component";
import { UserGuard } from "./auth/user.guard";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "list/:type/:name",
        component: MovieListComponent,
      },
      {
        path: "movies/:name",
        component: MoviesComponent,
      },
      {
        path: "my",
        loadChildren: () =>
          import("./main/user-dashboard/user-dashboard.module").then(
            (m) => m.UserDashboardModule
          ),
      },
    ],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((a) => a.AdminModule),
  },
  {
    path: "",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
