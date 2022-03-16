import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from './vocab/Actor';
import { ActorService } from './actor.service';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ActorResolver implements Resolve<Actor> {
  constructor(private http: HttpClient, private actor: ActorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Actor | Observable<Actor> | Promise<Actor> {
    let identifier = route.paramMap.get('identifier') || "";
    return this.actor.getActorWithDetails(identifier);
  }
}
