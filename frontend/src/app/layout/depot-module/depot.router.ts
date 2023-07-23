import {RouterModule, Routes} from "@angular/router";
import {DepotComponent} from "./depot.component";
import {DepotCreationComponent} from "./depot-creation/depot-creation.component";
import {DepotModificationComponent} from "./depot-modification/depot-modification.component";

const routes: Routes = [{
  path: '',
  component: DepotComponent,
  children: [
    {
      path: 'creer',
      component: DepotCreationComponent
    },
    {
      path: 'modifidier',
      component: DepotModificationComponent
    }
  ]
}]

export const DepotRouter = RouterModule.forChild(routes)
