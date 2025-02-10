import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  @Input() isAdd: boolean;
  @Output() isAdded = new EventEmitter();
  @Output() isAddedError = new EventEmitter();
  @Output() getList = new EventEmitter();

  public form: FormGroup;
  private destroy$ = new Subject();

  constructor(private fb: FormBuilder, private genericService: GenericService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      completed: [false],
    });
    this.genericService.endpoint = 'tasks';
  }

  resetForm(): void {
    this.form.reset();
    this.form.controls.completed.setValue(false);
    this.isAdd = false;
  }

  addItem(): void {
    this.isAdd = true;
    this.genericService.add(this.form.value).pipe(
      tap((resp) => {
        if (resp) {
          this.getList.emit();
          this.isAdded.emit();
          this.resetForm();
        }
      }),
      catchError(() => {
        this.isAddedError.emit();
        return of(null);
      })
    ).subscribe({
      error: () => {
        this.isAddedError.emit();
      }
    });
  }
}
