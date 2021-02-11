import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BalUiLibraryModule } from '@baloise/ui-library-angular/dist';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [BalUiLibraryModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // await fixture.whenRenderingDone();
    // await fixture.whenStable();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should component', () => {
    expect(component).toBeTruthy();
  });

  it('should placeholder', () => {
    const compiled = fixture.nativeElement;
    const balInput: HTMLBalInputElement = compiled.querySelector('bal-input');

    expect(balInput.placeholder).toContain('Enter your firstname');
  });

  fit('should input', () => {
    const compiled = fixture.nativeElement;
    const balInput: HTMLBalInputElement = compiled.querySelector('bal-input');
    const paragraph: HTMLParagraphElement = compiled.querySelector(
      'p#firstname-value'
    );

    balInput.value = 'Bubu';
    balInput.dispatchEvent(new CustomEvent('balInput', { detail: 'Bubu' }));
    fixture.detectChanges();

    expect(balInput.value).toContain('Bubu');
    expect(paragraph.textContent).toContain('Bubu');
  });

  it('should select', async () => {
    const compiled = fixture.nativeElement;
    const balSelect: HTMLBalSelectElement = compiled.querySelector(
      'bal-select'
    );
    const paragraph: HTMLParagraphElement = compiled.querySelector(
      'p#age-value'
    );

    await balSelect.open();
    const balSelectOption: HTMLBalSelectElement = compiled.querySelector(
      'bal-select-option[label="1997"]'
    );
    balSelectOption.click();

    await fixture.whenStable();
    balSelect.dispatchEvent(new Event('balChange'));
    fixture.detectChanges();

    expect(balSelect.value).toContain('1997');
    expect(paragraph.textContent).toContain('1997');
  });
});
