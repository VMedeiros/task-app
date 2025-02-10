import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertMessage } from 'src/app/core/enum/alert.enum';
import { Status } from 'src/app/core/enum/status.enum';
import { Task, TaskFilter } from 'src/app/core/models/task.model';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {

  @Input() gridData: Task[];
  @Output() isUpdated = new EventEmitter();
  @Output() isUpdatedWarn = new EventEmitter();
  @Output() isUpdatedError = new EventEmitter();
  @Output() isDeleted = new EventEmitter();
  @Output() isDeletedError = new EventEmitter();
  @Output() getList = new EventEmitter();

  public filterItem: TaskFilter;
  public selectedItem: Task;
  public gridDataInitial: Task[];
  public isDeleteModalOpen: boolean;
  public confirmationDeleteMessage = AlertMessage.ConfirmationDelete;
  private destroy$ = new Subject();

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    this.genericService.endpoint = 'tasks';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getStatus(status: boolean): string {
    return status ? Status.Completed : Status.Incompleted;
  }

  editItem(item: Task): void {
    item.completed = !item.completed;
    this.genericService.update(item).pipe(
      tap((resp) => {
        if (resp) {
          this.getList.emit();
          if (item.completed) {
            this.isUpdated.emit();
          } else {
            this.isUpdatedWarn.emit();
          }
        }
      }),
      catchError(() => {
        this.isUpdatedError.emit();
        return of(null);
      })
    ).subscribe({
      error: () => {
        this.isUpdatedError.emit();
      }
    });
  }

  deleteItem(id: number): void {
    this.genericService.delete(id).pipe(
      tap(() => {
        this.getList.emit();
        this.isDeleted.emit();
        this.isDeleteModalOpen = false;
      }),
      catchError(() => {
        this.isDeletedError.emit();
        return of(null);
      })
    ).subscribe({
      error: () => {
        this.isDeletedError.emit();
      }
    });
  }

  confirmationDelete(item: Task): void {
    this.selectedItem = item;
    this.isDeleteModalOpen = true;
  }

  gridLoad(): void {
    if (!this.gridDataInitial) {
      this.gridDataInitial = this.gridData;
    }
  }

  filterList(filter: TaskFilter): void {
    this.gridData = this.gridDataInitial;
    if (filter.title || filter.completed !== Status.All) {
      this.gridData = this.gridData?.filter((item) => {
        return (!filter.title || item.title.toLowerCase().includes(filter.title.toLowerCase())) &&
          (filter.completed === Status.All || item.completed === (filter.completed === Status.Completed));
      });
    } else {
      this.gridData = this.gridDataInitial;
    }
  }
}
