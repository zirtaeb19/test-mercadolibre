import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Search } from './search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search = new Search('');
  constructor(public router: Router, public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.search.query = params.get('search');
    });
  }

  onSubmit() {
    if (this.search.query) {
      this.router.navigate(['/items'], { queryParams: { search: this.search.query } });
    }
  }



}
