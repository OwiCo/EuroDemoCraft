import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassForgeComponent } from './glass-forge.component';

describe('GlassForgeComponent', () => {
  let component: GlassForgeComponent;
  let fixture: ComponentFixture<GlassForgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassForgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassForgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
