import { BaseApiService } from './base-api.service';
import { ApplicationUser } from '@models/application-user';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Assertion from '@shared/validation/assertion';
import { map } from 'rxjs/operators';
import { PaginatedList } from '@models/paginated-list';
import { defaultPageParams, PageParams } from '@models/page-params';
import { ConvertObjectToHttpParams } from '@shared/value-objects/convert-object-to-http';

@Injectable()
export class UserService extends BaseApiService<ApplicationUser> {
  constructor(api: ApiService) {
    super(api, 'users');
  }

  search(query: string, pageParams: PageParams = defaultPageParams): Observable<PaginatedList<ApplicationUser>> {
    Assertion.notNull(query, 'query');

    let params = new ConvertObjectToHttpParams(pageParams).get();
    params = params.set('q', query);

    return this.api.get<PaginatedList<ApplicationUser>>(this.apiUrl + 'search' + '?' + params);
  }
  sendInvitationEmail(userId: number): Observable<void> {
    return this.api.post(this.apiUrl + `send-invite-email/${userId}`);
  }
}
