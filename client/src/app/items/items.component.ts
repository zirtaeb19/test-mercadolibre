import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  data: any;
  constructor(public activatedRoute: ActivatedRoute, public router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.searchProduct(params.get('search'));
    })
  }

  private searchProduct(value): void {
    this.http.get("http://localhost:3000/api/items", { params: { q: value } })
      .subscribe(
        values => this.httpSuccess(values),
        (err: Response) => err);
  }

  private httpSuccess(values) {
    this.data = values.items;
    console.log(values.items);
  }

  public goToDetail(id) {
    this.router.navigate(['/items/', id]);
  }

}
