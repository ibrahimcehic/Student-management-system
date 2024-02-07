import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Student } from '../../shared/models/student';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  studentsList: Student[] = [];
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobile: string = '';

  studentObj: Student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  }
  constructor(private auth: AuthService, private data: DataService) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  logout() {
    this.auth.logout();
  }

  getAllStudents() {
    this.data.getAllStudents().subscribe(
      (res) => {
        this.studentsList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching students data');
      }
    );
  }

  resetForm(){
    this.id= '',
    this.firstName= '',
    this.lastName= '',
    this.email= '',
    this.mobile= ''
  }

  addStudent() {
    if(this.firstName == '' || this.lastName == '' || this.email == '' || this.mobile == '')
    {
      alert('Fill all input fields!')
      return
    }
    this.studentObj.id = '',
    this.studentObj.email = this.email;
    this.studentObj.firstName = this.firstName;
    this.studentObj.lastName = this.lastName
    this.studentObj.mobile = this.mobile;

    this.data.addStudent(this.studentObj)
    this.resetForm()
  }

  updateStudent() {}

  deleteStudent(student: Student) {
    if (
      window.confirm(
        'Are you sure that you wanto to delete' +
          student.firstName +
          ' ' +
          student.lastName
      )
    )
      this.data.deleteStudent(student);
  }
}
