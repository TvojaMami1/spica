import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings.component';
import { UsersComponent } from './users.component';
import { AbsencesComponent } from './absences.component';

export const routes: Routes = [
    {
        path: "",
        title: "Home Page",
        component: AppComponent,
    },
    {
        path: "settings",
        title: "Settings",
        component: SettingsComponent,
    },
    {
        path: "users",
        title: "Users",
        component: UsersComponent,
    },
    {
        path: "absences",
        title: "Absences",
        component: AbsencesComponent,
    }
];
