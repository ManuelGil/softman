import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudiesComponent } from './components/list-studies/list-studies.component';
import { StudiesComponent } from './studies.component';

const routes: Routes = [
  {
    path: '',
    component: StudiesComponent,
    children: [
      {
        path: 'list',
        component: ListStudiesComponent
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudiesRoutingModule { }
