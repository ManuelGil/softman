import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudiesRoutingModule } from './studies-routing.module';
import { StudiesComponent } from './studies.component';
import { ListStudiesComponent } from './components/list-studies/list-studies.component';
import { GetStudyComponent } from './components/get-study/get-study.component';

@NgModule({
  declarations: [
    StudiesComponent,
    ListStudiesComponent,
    GetStudyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StudiesRoutingModule
  ],
})
export class StudiesModule {}
