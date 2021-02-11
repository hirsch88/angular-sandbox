import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { balToastController } from '@baloise/ui-library';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';

  form = new FormGroup({
    name: new FormControl('Dummy', [Validators.required]),
    age: new FormControl(['1997'], [Validators.required]),
    dueDate: new FormControl(new Date(), [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    checkbox: new FormControl(true, [Validators.requiredTrue]),
    comment: new FormControl(null, [Validators.required]),
  });

  constructor(public translate: TranslateService) {}

  changeLanguage() {
    const lang = this.translate
      .getLangs()
      .filter((l) => l !== this.translate.currentLang)[0];
    this.translate.use(lang);
  }

  updateName() {
    this.form.patchValue({
      name: 'Nancy',
    });
  }

  onSubmit() {
    console.log('onSubmit', this.form.value);
    balToastController.create({
      message: 'Successfully Submitted!',
    });
  }
}
