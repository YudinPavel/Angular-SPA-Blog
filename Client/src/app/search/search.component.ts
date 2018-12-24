import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { SearchUserService } from '../services/search-user.service';
import { CookieService } from 'angular2-cookie/core';
import { DeleteUserService } from '../services/delete-user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  str: String = '';

  arr: User[];

  category: String = 'Name';

  categories: String[] = ['Name', 'Post', 'Surname', 'Email'];

  constructor(public searchUserService: SearchUserService,
              private cookieService: CookieService,
              private deleteUserService: DeleteUserService) { }

  search() {
    if (this.category === this.categories[0]) {
      this.searchUsers();
    }
  }

  searchUsers() {
    this.searchUserService.postSearchUser(this.str).subscribe((data: User[]) => {
      this.arr = data;
    });
  }

  setCategory(str: String) {
    this.category = str;
  }

  root() {
    if (this.cookieService.get('root') === 'admin') {
      return true;
    }
    return false;
  }

  deleteUser(user: User) {
    this.deleteUserService.deleteUser(user).subscribe(() => {
      this.search();
    });
  }

  ngOnInit() {
    this.search();
  }

}
