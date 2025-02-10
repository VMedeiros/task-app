import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './shared/components/tasks/tasks.component';
import { HomeComponent } from './shared/home/home.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'tasks', component: TasksComponent },
    ]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
