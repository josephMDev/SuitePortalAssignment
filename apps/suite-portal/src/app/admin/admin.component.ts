import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MaintenanceRequest, ServiceType } from '@suiteportal/api-interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from '../auth/auth.service';
import { UserServices, MaintenanceRequestWithId } from '../services/resident.services';
import { LocalStorageService } from '../services/local-storage.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

export interface MaintenanceRequestPosition extends MaintenanceRequestWithId {
  position: number;
}

@Component({
  selector: 'sp-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

  private subscriptions: Subscription[] = [];
  public displayedColumns: string[] = ['select', 'position', 'id', 'name', 'email', 'unitNumber', 'serviceType', 'summary', 'details', 'status', 'submittedAt'];
  public dataSource = new MatTableDataSource<MaintenanceRequestPosition>();
  
  public selection = new SelectionModel<MaintenanceRequestPosition>(true, []);

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authService: AuthService, private userService: UserServices, 
    private localStorageService: LocalStorageService, private cdr: ChangeDetectorRef,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.getOpenRequests();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: MaintenanceRequestPosition): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getOpenRequests(): void {
    this.userService.adminGetRequests().subscribe(
      (response) => {
        this.dataSource.data = response.map((request, index) => ({
          ...request,
          position: index + 1
        }) as MaintenanceRequestPosition);
        this.isLoadingResults = false;
        return;
      },
      (error) => {
        console.error('Error getting open requests', error);
        this.isLoadingResults = false;
        return;
      }
    );
  }

  closeRequests(): void {
    if (this.selection.selected.length > 1) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'Warning: You are about to close multiple requests.Please ensure you have taken the necessary steps to resolve all open requests...'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.closeSelectedRequests();
        }
      });
    } else {
      this.closeSelectedRequests();
    }
  }
  
  closeSelectedRequests(): void {
    this.selection.selected.forEach((request) => {
      this.userService.adminCloseByID(request).subscribe(
        () => {

            this.getOpenRequests();


        },
        (error) => {
          console.error('Error closing request', error);
        }
      );
    });
    // Deselect all checks on the row
    this.selection.clear();   
    // Run change detection
    this.cdr.detectChanges();
    alert('Requests closed successfully');
  }

  logout(): void {
    this.authService.logout();
  }
}
