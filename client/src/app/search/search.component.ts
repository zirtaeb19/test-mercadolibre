import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from './search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  search = new Search('null');
  constructor(public router: Router) {

  }

  ngOnInit() {
    
  }

  onSubmit() {
    this.router.navigate(['/items'], { queryParams: { search: this.search.query } });
  }



}
