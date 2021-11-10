<div id="modalUpdate" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="border border-warning modal-content">
            <div class="modal-header h-50 text-center text-white">
                <h4 class="modal-title w-100 font-weight-bold">Modifier Un Enseignant</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="pl-1 ">
                    <div id="update" class="text-center" style='height:30px;'>
                    </div>
                    <form id="updateForm">
                    <div> 
                        <div>
                            <div id="add" class="text-center" style='height:30px;'>
                            </div>
                            <!-- nom prenom -->
                            <div class="md-form d-flex">
                                <div class="d-table-cell w-50 ">
                                    <input type="text" autocomplete="off" class="form-control text-white validate">
                                    <label >Nom</label>
                                </div>
                                <div class="md-form d-table-cell ml-3 w-50">
                                    <input type="text" name="Prenom" autocomplete="off" class="form-control text-white validate">
                                    <label >Prenom</label>
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
                                <div>
                                    <template class="date-recrutement">
                                        <input type="date" id="Form_date" class="text-white form-control validate">
                                        <label data-error="wrong" data-success="right" for="Form_date">Date de recrutement</label>
                                    </template>
                                </div>
                            </div>
                        </div>
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