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
    this.loading = false;
    this.detailProduct();
  }

  private detailProduct() {
    // this.router.params.subscribe(p => {
    //   this.id = p['id'];
    // });
    this.data = {"id":"MLA603840814","title":"Lavarropas Drean 096e-a 5.5 Kg 9 Programas Con Bomba","price":{"currency":"ARS","amount":5584,"decimals":5584},"picture":"http://mla-s1-p.mlstatic.com/15502-MLA20103656820_052014-I.jpg","condition":"new","free_shipping":false,"sold_quantity":100,"description":""};
    // this.http.get("http://localhost:3000/api/items/" + this.id)
    //   .subscribe(
    //     values => this.httpSuccess(values),
    //     (err: Response) => err);
  }

  private httpSuccess(values) {
    //this.data = values.item;
    this.data = {"author":{"name":"Beatriz","lastname":"Martínez"},"item":{"id":"MLA603840814","title":"Lavarropas Drean 096e-a 5.5 Kg 9 Programas Con Bomba","price":{"currency":"ARS","amount":5584,"decimals":5584},"picture":"http://mla-s1-p.mlstatic.com/15502-MLA20103656820_052014-I.jpg","condition":"new","free_shipping":false,"sold_quantity":100,"description":""}};
    this.loading = false;
    console.log(values.item);
  }

}
