import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from "./app/home/home.component";
import { RegisterComponent } from "./app/register/register.component";
import { LoginComponent } from "./app/login/login.component";
import { UserListingComponent } from "./app/user-listing/user-listing.component";
import { AuthGuard } from "./app/guard/auth.guard";


const routes: Routes = [
    {path: '', component:HomeComponent, canActivate: [AuthGuard]},
    {path: 'register', component:RegisterComponent},
    {path: 'login', component:LoginComponent},
    {path: 'user', component:UserListingComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}