import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items-detail',
  templateUrl: './items-detail.component.html',
  styleUrls: ['./items-detail.component.scss']
})
export class ItemsDetailComponent implements OnInit {
  id: any;
  data: any;
  loading: boolean;
  constructor(public router: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.loading = true;
    this.detailProduct();
  }

  private detailProduct(): void {
    this.router.params.subscribe(p => {
      this.id = p['id'];
    });
    this.http.get("http://localhost:3000/items/" + this.id)
      .subscribe(
        values => this.httpSuccess(values),
        (err: Response) => err);
  }

  private httpSuccess(values) {
    this.data = values.item;
    this.loading = false;
    console.log(values.item);
  }

}
