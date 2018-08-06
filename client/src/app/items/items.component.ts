import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  data: any;
  loading = true;
  constructor(public activatedRoute: ActivatedRoute, public router: Router, private http: HttpClient, private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.searchProduct(params.get('search'));
    })
  }

  private searchProduct(value): void {
    this.http.get(environment.apiURL + "items", { params: { q: value } })
      .subscribe(
        values => this.httpSuccess(values),
        (err: Response) => this.httpError(err));
  }

  private httpSuccess(values) {
    this.data = values;
    this.loading = false;
  }

  private httpError(err) {
    this.messageService.add(`${err.error.message}`);
  }

}
