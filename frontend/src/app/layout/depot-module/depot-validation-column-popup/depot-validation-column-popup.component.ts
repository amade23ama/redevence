import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppConfigService} from "../../../core/services/app-config.service";
import {DepotService} from "../../../core/services/depot.service";
import {ActionBtn} from "../../../core/interfaces/actionBtn";
import {Actions} from "../../../core/enum/actions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileInfo} from "../../../core/interfaces/file.info";

@Component({
  selector: 'app-depot-validation-column-popup',
  templateUrl: './depot-validation-column-popup.component.html',
  styleUrls: ['./depot-validation-column-popup.component.scss']
})
export class DepotValidationColumnPopupComponent implements OnInit{
  btns: ActionBtn[] = [];
  mappingForm: FormGroup;
  fichierColonnes: string[] = [];
  dbColonnes: string[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public appConfig: AppConfigService,
              public dialogRef: MatDialogRef<DepotValidationColumnPopupComponent>,
              public depotService: DepotService,
              private builder: FormBuilder,) {
  }
  ngOnInit(): void {
    this.initListbtns()
    this.initierdbColonnes()
    this.initierfichierColonnes()
    this.createForm()
    this.majBtnActive()

  }
  private initListbtns() {
    this.btns.push(new ActionBtn(this.appConfig.getLabel('dcsom.actions.annuler'),
      Actions.ANNULER, true, false, true, true, 'keyboard_arrow_left'));
    this.btns.push(new ActionBtn(this.appConfig.getLabel('dcsom.actions.enregistrer'),
      Actions.ENREGISTRER, this.isEnrgBtnDisplayed(), true, true, true, 'save'));
    return this.btns;
  }
  isEnrgBtnDisplayed(){
    return true
  }
  validerAction(event: Actions){
    console.log(" tes",this.mappingForm)
    if (event === Actions.ENREGISTRER) {
      this.data.file.append('mapEntete',JSON.stringify(Object.fromEntries(this.formGroupToMap())));
      this.depotService.deposerFichier(this.data.file).subscribe(()=>{})
      this.dialogRef.close();
    }
  }
  initierdbColonnes(){
    this.dbColonnes=  ['dbPrenom','dbnom','dbchauffeur'];
    //todo a remplacer avec les colonnes en base
   // this.dbColonnes=this.data.fileInfo.colonnedb;
  }
  initierfichierColonnes(){
   this.fichierColonnes=this.data.fileInfo.enteteFile
  }
  createForm() {
    const formGroupControls = {};
    this.fichierColonnes.forEach((column) => {
      formGroupControls[column] = new FormControl('', Validators.required);
    });
    this.mappingForm = this.builder.group(formGroupControls);
  }
  formGroupToMap(): Map<string, any> {
    const formValues = this.mappingForm.value;
    return new Map(Object.entries(formValues));
  }


  majBtnActive(){
    this.mappingForm?.valueChanges.subscribe((res)=>{
      if(this.mappingForm.invalid){
        this.btns.forEach(b=>{
          b.disabled=true
        });
      }else{
        this.btns.forEach(b=>{
          b.disabled=false
        });
      }
    })
    if(!this.mappingForm.invalid){
      this.btns.forEach(b=>{
        b.disabled=false
      });
    }
  }
}
