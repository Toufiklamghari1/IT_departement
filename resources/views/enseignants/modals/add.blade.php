<!-- add Modal -->
<div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="border border-success modal-content">
            <div class="modal-header h-50 text-center text-white">
                <h4 class="modal-title w-100 font-weight-bold">Ajouter Un Enseignant</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="addForm" class="w-100">
                    <div> 
                        <div>
                            <div id="add" class="text-center" style='height:30px;'>
                            </div>
                            <!-- nom prenom -->
                            <div class="d-flex">
                                <div class="md-form mb-3 d-table-cell w-50 ">
                                    <input type="text" name="Nom" id="nom" autocomplete="off" class="form-control text-white validate">
                                    <label data-error="wrong" data-success="right" for="nom">Nom</label>
                                </div>
                                <div class="md-form mb-3  d-table-cell ml-3 w-50">
                                    <input type="text" name="prenom" id="addForm_capacite" autocomplete="off" class="form-control text-white validate">
                                    <label data-error="wrong" data-success="right" for="prenom">Prenom</label>
                                </div>
                            </div>
                            <!-- Grade Chois -->
                            <div class="md-form d-flex w-100">
                                <!--mail -->
                                <div class="d-table-cell w-75">
                                    <input type="email" class="form-control text-white validate">
                                    <label >Email</label>
                                </div>
                                <template class="grade">
                                    <div id="grade"  class="align-content-center d-table-cell w-20 mr-0 ml-auto">
                                        <label style="display: contents;">Grade</label>
                                        <select name="grade" class="grade boxChois" placeholder='Grade'>
                                            <option value="0">PESA</option>
                                            <option value="1">PH</option>
                                            <option value="2">PES</option>
                                        </select>
                                    </div>
                                </template>
                            </div>
                            <!-- Date -->
                            <div class="md-form">
                                <template class="date-recrutement">
                                    <input type="date" id="Form_date" class="text-white form-control validate">
                                    <label for="Form_date">Date de recrutement</label>
                                </template>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <a id='ajouter' class="btn btn-success">Ajouter</a>
                <a type="button" class="btn  btn-dark waves-effect" data-dismiss="modal">Annuler</a>
            </div>
        </div>
    </div>
</div>