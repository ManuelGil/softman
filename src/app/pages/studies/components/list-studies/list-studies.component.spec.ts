import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudiesComponent } from './list-studies.component';

describe('ListStudiesComponent', () => {
  let component: ListStudiesComponent;
  let fixture: ComponentFixture<ListStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListStudiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
