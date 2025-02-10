import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ADD_ERROR, ADD_SUCESS, DELETE_ERROR, DELETE_SUCESS, EDIT_ERROR, EDIT_SUCESS, EDIT_WARN, GET_ERROR } from 'src/app/core/mock/alert.mock';
import { Alert } from 'src/app/core/models/alert.model';
import { Task } from 'src/app/core/models/task.model';
import { GenericService } from 'src/app/services/generic.service';
import { AddComponent } from './add/add.component';
import { MOCK_DATA } from 'src/app/core/mock/data.mock';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  @ViewChild(AddComponent) addComponent: AddComponent;

  public showAlert: Alert;
  public isAdd: boolean;
  public gridData: Task[];
  public localData: Task[];
  private destroy$ = new Subject();

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    this.genericService.endpoint = 'tasks';
    if (!this.localData) {
      this.getTasks();
    } else {
      this.gridData = this.localData;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTasks(): void {
    this.isAdd = true;
    this.genericService.getAll().pipe(
      tap((resp) => {
        if (resp) {
          this.gridData = resp;
          this.localData = resp;
          localStorage.setItem('tasks', JSON.stringify(resp));
          this.alertGetSucess();
        }
      }),
      catchError(() => {
        this.setStorage();
        this.alertGetError();
        return of(null);
      })
    ).subscribe({
      error: () => {
        this.setStorage();
        this.alertGetError();
      }
    });
  }

  setStorage(): void {
    this.localData = MOCK_DATA.tasks;
    localStorage.setItem('tasks', JSON.stringify(this.localData));
    this.gridData = this.localData;
  }

  alertAddSucess(): void {
    this.showAlert = ADD_SUCESS;
    this.alertTime();
    this.isAdd = false;
  }

  alertAddError(): void {
    this.showAlert = ADD_ERROR;
    this.alertTime();
    this.isAdd = false;
  }

  alertEditSucess(): void {
    this.showAlert = EDIT_SUCESS;
    this.alertTime();
    this.isAdd = false;
  }

  alertEditWarn(): void {
    this.showAlert = EDIT_WARN;
    this.alertTime();
    this.isAdd = false;
  }

  alertEditError(): void {
    this.showAlert = EDIT_ERROR;
    this.alertTime();
    this.isAdd = false;
  }

  alertDeleteSucess(): void {
    this.showAlert = DELETE_SUCESS;
    this.alertTime();
    this.isAdd = false;
  }

  alertDeleteError(): void {
    this.showAlert = DELETE_ERROR;
    this.alertTime();
    this.isAdd = false;
  }

  alertGetSucess(): void {
    this.alertTime();
    this.isAdd = false;
  }

  alertGetError(): void {
    this.showAlert = GET_ERROR;
    this.alertTime();
    this.isAdd = false;
  }

  alertTime(): void {
    setTimeout(() => {
      this.showAlert = {
        show: false,
      }
    }, this.showAlert?.duration);
  }
}
