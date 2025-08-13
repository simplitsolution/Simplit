import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Expertisedetail } from './expertisedetail';

describe('Expertisedetail', () => {
  let component: Expertisedetail;
  let fixture: ComponentFixture<Expertisedetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Expertisedetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Expertisedetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
