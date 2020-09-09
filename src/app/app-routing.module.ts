import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./main/home/home.component";
import { MovieListComponent } from "./main/movie-list/movie-list.component";
import { MoviesComponent } from "./main/movies/movies.component";
import { MainComponent } from "./main/main.component";

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
