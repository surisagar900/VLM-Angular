import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { UserTableComponent } from "./user-table/user-table.component";
import { AdminGuard } from "../auth/admin.guard";
import { MoviesTableComponent } from "./movies-table/movies-table.component";
import { RecordsTableComponent } from "./records-table/records-table.component";
import { AddMovieComponent } from "./add-movie/add-movie.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: "users", component: UserTableComponent },
      { path: "allmovies", component: MoviesTableComponent },
      { path: "records", component: RecordsTableComponent },
      { path: "addMovie", component: AddMovieComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
