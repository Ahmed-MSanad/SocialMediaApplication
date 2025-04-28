import { Pipe, PipeTransform } from '@angular/core';
import { IProfileUser } from '../interfaces/iprofile-user';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(allUsers : IProfileUser[] | null, searchUser : string | null): unknown {
    if(allUsers)
      return allUsers.filter((user) => user.fullName.toLowerCase().includes(searchUser!.toLowerCase()));
    else
      return null;
  }

}
