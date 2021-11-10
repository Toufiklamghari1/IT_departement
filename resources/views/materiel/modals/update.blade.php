<div id="modalUpdate" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="border border-warning modal-content">
            <div class="modal-header h-50 text-center text-white">
                <h4 class="modal-title w-100 font-weight-bold">Modifier Un Matériel</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="pl-1 ">
                    <div id="update" class="text-center" style='height:30px;'>
                    </div>
                    <form id="updateForm">
                        <!-- type Chois -->
                        <!-- -->
                            <div class="type-chois mb-1">
                                <select class="materiel-type boxChois" disabled="true">
                                    <!--data-placeholder="Choisir un type"  -->
                                    <option value="1">Matériel Informatique</option>
                                    <option value="2">Equipement bureau</option>
                                    <option value="3">Forniture informatique</option>
                                    <option value="4">Forniture bureau</option>
                                </select>
                            </div>
                        <!-- Deseignation Chois -->
                        <!-- -->
                            <div class="same-line pr-2">
                                <div id="addDesignationLabel" class="addfloating-lab div-label"><label
                                        for="designationChois">Designation</label></div>
                                <select class="designation boxChois" ata-placeholder='Designation'></select>
                            </div>
                            <div class="same-line ">
                                <template class="reference">
                                    <div id='addRefLabel' class="addfloating-lab div-label"><label
                                            for="refChois">Reference</label></div>
                                    <select class="reference boxChois  mb-4"></select>
                                </template>
                            </div>
                        <!-- Discription -->
                            <div class="md-form mb-4">
                                <template class="commentaire">
                                    <input type='text' id="Commentaire" class="form-control text-white validate"
                                        autocomplete="off">
                                    <label data-error="wrong" data-success="right"
                                        for="orangeForm-email">Commentaire</label>
                                </template>
                            </div>
                        <!-- Num Inventaire -->
                            <div class="md-form">
                                <template class="num-inventaire">
                                    <input type="number" min="1" id="Num" class="form-control text-white validate">
                                    <label data-error="wrong" data-success="right" for="orangeForm-email">Num
                                        d'Inventaire</label>
                                </template>
                            </div>
                        <!--Quantite -->
                            <div class=" md-form">
                                <template class="quantite">
                                    <input type="number" min="1" id="Quantite" class="form-control text-white validate">
                                    <label data-error="wrong" data-success="right" for="Quantite">Quantite</label>
                                </template>
                            </div>
                        <!-- Date -->
                            <div class="md-form">
                                <template class="date-aqui">
                                    <input type="date" name="Date" id="addForm_date" class="text-white form-control validate">
                                    <label data-error="wrong" data-success="right" for="addForm_date">Date d’acquisition</label>
                                </template>
                            </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <a id="modifier" type="button" class="btn btn-warning">Modifier</a>
                <a type="button" class="btn  btn-dark waves-effect" data-dismiss="modal">Annuler</a>
            </div>
        </div>
    </div>
</div>