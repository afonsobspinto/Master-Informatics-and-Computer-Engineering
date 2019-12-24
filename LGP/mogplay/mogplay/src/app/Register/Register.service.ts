/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { User } from '../com.mog.technologies';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RegisterService {

  private USER_NAMESPACE = 'User';

  constructor(private dataService: DataService<User>) {
  };

  public getAll(): Observable<User[]> {
    return this.dataService.getAll(this.USER_NAMESPACE);
  }

  public addParticipant(itemToAdd: any): Promise<any> {
    return this.dataService.addDb(itemToAdd).toPromise()
  }

  public auth(token: string): Promise<any> {
    return this.dataService.auth(token)
  }
}
