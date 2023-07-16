import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produit } from 'src/app/core/interfaces/produit';
import { ProduitService } from 'src/app/core/services/produit.service';
import {Utilisateur} from "../../../core/interfaces/utilisateur";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recherche-produit',
  templateUrl: './recherche-produit.component.html',
  styleUrls: ['./recherche-produit.component.css']
})
export class RechercheProduitComponent implements OnInit {

  /** la liste des Produits */
  listProduit: MatTableDataSource<Produit>;

  // La pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // nombre de ligne par page
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize = 5; // nb ligne par page par défaut

  // les noms des colones
  displayedColumns: string[] = ['Nom SRC', 'Nom NORM', 'Densité GCM', 'Densité KGM','actions'];

  /** constructor */
  constructor(private produitService: ProduitService,private router:Router){
  }

  ngOnInit(): void {

    this.produitService.rechercherProduits().subscribe((data) => {
      //alimentation du tableau
    this.listProduit = new MatTableDataSource<Produit>(data);
    this.listProduit.paginator=this.paginator;
    this.listProduit.sort=this.sort;
    });

  }

  redirect(produit: Produit) {
    console.log("produit: ", produit);
  }
  chargerProduit(produit: Produit){
    this.router.navigate(['admin/produit'], {queryParams: {'contextInfo':produit.id }});
  }
}
