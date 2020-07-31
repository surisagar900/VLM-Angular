import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { TopNavbarComponent } from "./top-navbar/top-navbar.component";
import { UserTableComponent } from "./user-table/user-table.component";
import { RecordsTableComponent } from "./records-table/records-table.component";
import { AddMovieComponent } from "./add-movie/add-movie.component";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AppMaterialModule } from "../app-material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { MoviesTableComponent } from "./movies-table/movies-table.component";

@NgModule({
  declarations: [
    AdminComponent,
    TopNavbarComponent,
    UserTableComponent,
    MoviesTableComponent,
    RecordsTableComponent,
    AddMovieComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AppMaterialModule,
    SharedModule,
  ],
})
export class AdminModule {}
