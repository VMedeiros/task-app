import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Status } from 'src/app/core/enum/status.enum';

@Component({
  selector: 'app-grid-filter',
  templateUrl: './grid-filter.component.html',
  styleUrls: ['./grid-filter.component.scss']
})
export class GridFilterComponent implements OnInit {
  @Output() filter = new EventEmitter();

  public form: FormGroup;
  private destroy$ = new Subject();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      completed: [],
    });
  }

  resetForm(): void {
    this.form.reset();
  }

  disableFilter(): boolean {
    return !this.form.controls.title.value && !this.form.controls.completed.value;
  }

  filterList(): void {
    this.filter.emit(this.form.value);
  }

  resetFilter(): void {
    this.form.controls.title.reset();
    this.form.controls.completed.setValue(Status.All);
    this.filter.emit(this.form.value);
    this.resetForm();
  }
}
