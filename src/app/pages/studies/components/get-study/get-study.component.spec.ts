import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStudyComponent } from './get-study.component';

describe('GetStudyComponent', () => {
  let component: GetStudyComponent;
  let fixture: ComponentFixture<GetStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetStudyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
