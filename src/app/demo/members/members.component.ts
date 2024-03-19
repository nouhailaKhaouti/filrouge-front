import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Member } from 'src/app/model/member.model';
import { MemberService } from 'src/app/services/member/member.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [SharedModule,
  FormsModule,
  NgxPaginationModule,
  MatButtonModule,
  MatStepperModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDatepickerModule,
  MatSelectModule],
  providers:[provideNativeDateAdapter()],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {
  @ViewChild('profAdd') memberModal: any;
  @ViewChild('roleModal') roleModal: any;
  currentmember: Member;
  currentIndex = -1;
  search = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  Members: Member[] = [];
  Member: Member = {
    num:0,
    name:'',
    familyName:'',
    nationality:'',
    identityDocument:'',
    identityNumber:'',
    accountApproved:false,
    role:'PROF',
    email:''
  };
  constructor(private MemberService: MemberService) { }

  ngOnInit(): void {
    // this.fetchMemberData();
    this.retrievemembers();
  }

  getRequestParams(search: string, page: number, pageSize: number): any {
    let params: any = {};

    if (search) {
      params[`search`] = search;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrievemembers(): void {
    const params = this.getRequestParams(this.search, this.page, this.pageSize);
    console.log(params);
    this.MemberService.getMembersData(params)
    .subscribe(
      response => {
        const { members, totalMembers } = response;
        this.Members = members;
        this.count = totalMembers;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    console.log(event);
    this.page = event;
    this.retrievemembers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievemembers();
  }


  searchTitle(): void {
    this.page = 1;
    this.retrievemembers();
  }

  openModal(): void {
    this.memberModal.nativeElement.classList.add('show');
    this.memberModal.nativeElement.style.display = 'block';
    }

  closeModal(): void {
    this.memberModal.nativeElement.classList.add('hide');
    this.memberModal.nativeElement.style.display = 'none';
    
    this.Member={
      num:0,
      name:'nouhaila',
      familyName:'khaouti',
      nationality:'morocco',
      identityDocument:'CIN',
      identityNumber:'EE123456',
      accountApproved:false,
      role:'PROF',
      email:'jaouralive90@gmail.com'
    };

  }

  deleteModal(member:Member){
    this.deleteMember(member);
  }

  openRoleModal(num:Number): void {
    this.Member.num=num;
    this.roleModal.nativeElement.classList.add('show');
    this.roleModal.nativeElement.style.display = 'block';
    }

  closeRoleModal(): void {
    this.Member.num=0;
    this.roleModal.nativeElement.classList.add('hide');
    this.roleModal.nativeElement.style.display = 'none';
  }

  approveMember(member: Member): void{
    let params: any = {};
    if (member.num) {
      params[`member`] = member.num;
    }
      this.MemberService.accountApproved(params).subscribe(
        (response) => {
          console.log('Member data sent successfully:', response);
            this.retrievemembers();
            Swal.fire('Success', 'This member has been approved successfully!', 'success');
  
          },
          (error) => {
            console.error('Error sending competition data:', error);
  
            if (Array.isArray(error.error.error)) {
              const errorMessage = error.error.error.join('<br>'); 
              Swal.fire({
                icon: 'error',
                title: 'Error',
                html: errorMessage  
              });
            } else {
              console.log('Unexpected error structure:', error.error);
              Swal.fire('Error', error.error, 'error'); 
            }
    
          }
      );
  }

  submitForm(): void {
    this.closeModal();
    this.MemberService.addMemberData(this.Member).subscribe(
      (response) => {
        console.log('Member data sent successfully:', response);
          this.retrievemembers();
          Swal.fire('Success', 'This member has been registred successfully!', 'success');

        },
        (error) => {
          console.error('Error sending competition data:', error);

          // Check if error.error.error is an array
          if (Array.isArray(error.error.error)) {
            const errorMessage = error.error.error.join('<br>'); 
            Swal.fire({
              icon: 'error',
              title: 'Error',
              html: errorMessage  
            });
          } else {
            console.log('Unexpected error structure:', error.error);
            Swal.fire('Error', error.error, 'error'); 
          }
  
        }
    );
    // this.closeModal();
  }

  submitFormRole(): void {
    this.closeRoleModal();
    this.MemberService.changeRole(this.Member.role,this.Member.num).subscribe(
      (response) => {
        console.log('Member data sent successfully:', response);
          this.retrievemembers();
          Swal.fire('Success', 'the Role is Updated successfully!', 'success');
        },
        (error) => {
          console.error('Error sending competition data:', error);
          // Check if error.error.error is an array
          if (Array.isArray(error.error.error)) {
            const errorMessage = error.error.error.join('<br>'); 
            Swal.fire({
              icon: 'error',
              title: 'Error',
              html: errorMessage  
            });
          } else {
            console.log('Unexpected error structure:', error.error);
            Swal.fire('Error', error.error, 'error'); 
          }
  
        }
    );
    // this.closeModal();
  }

  deleteMember(member:Member): void {
    this.MemberService.deleteMember(member).subscribe(
      (response) => {
        console.log('Member data deleted successfully:', response);
          this.retrievemembers();
          Swal.fire('Success', 'the user deleted successfully!', 'success');
        },
        (error) => {
          console.error('Error sending competition data:', error);
          // Check if error.error.error is an array
          if (Array.isArray(error.error.error)) {
            const errorMessage = error.error.error.join('<br>'); 
            Swal.fire({
              icon: 'error',
              title: 'Error',
              html: errorMessage  
            });
          } else {
            console.log('Unexpected error structure:', error.error);
            Swal.fire('Error', error.error, 'error'); 
          }
  
        }
    );
    // this.closeModal();
  }
}
