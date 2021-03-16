import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.getAll();
phrase: string= '';
filterPhrase: string='';
filterKey: string='name';

sortby: string = 'id';
sorterDirection: number = 0;
@Output() delete:EventEmitter<User>= new EventEmitter()

  constructor(
    private userService: UserService,
  ) { }


  ngOnInit(): void {
  }




select(event: Event): void {
  this.filterKey = (event.target as HTMLInputElement).value;
}
changeOrder(param: string): void {
  if (this.sortby === '' || this.sortby != param) {
    this.sorterDirection = 1;
  }
  if (this.sortby === param) {
    if (this.sorterDirection === 1) this.sorterDirection = 2;
    else this.sorterDirection = 1;
  }
  this.sortby = param;
}

onDelete(user: User): void {
  of(this.userService.remove(user)).subscribe
  (      () => alert('Biztosan törölni kívánja az adott felhasználót?')    );  }
}

