{{-- modal show  --}}
<div class="modal fade" id="showArcBureau">
<div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" style="background-color:#212121">
        <div class="modal-header text-center bg-primary">
            <h4 class="modal-title w-100 font-weight-bold ml-5" id="nomABureau"></h4>
            <button type="button" class="close text-black" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="container" id="body-ensA">
                <div class="card">
                    <h3 class="card-header text-white text-center">Information sur le bureau </h3>
                    <div class="card-body">
                        <dl class="row">
                            <dt class="col-md-6 col-sm-6">Etat :</dt>
                            <dd class="col-md-6 col-sm-6" id="etats"></dd>
                            <dt class="col-md-6 col-sm-6">Numéro du bureau :</dt>
                            <dd class="col-md-6 col-sm-6" id="nums"></dd>
                            <dt class="col-md-6 col-sm-6">Capacité :</dt>
                            <dd class="col-md-6 col-sm-6" id="capacites"></dd>
                            <dt class="col-md-6 col-sm-6">Date d'Acquisition :</dt>
                            <dd class="col-md-6 col-sm-6" id="dates"></dd>

                        </dl>
                    </div>
                </div>
                <hr>
                <div class="card">
                    <h3 class="card-header text-white text-center">Autres Informations</h3>
                    <div class="card-body">
                        <div class="card-body">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link active" id="MtI-tab" data-toggle="tab" href="#MtI" role="tab" aria-controls="MtI" aria-selected="true">Enseignants</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link" id="MEB-tab" data-toggle="tab" href="#MEB" role="tab" aria-controls="MEB" aria-selected="false">Materiels Partagés</a>
                                </li>
                              </ul>
                              <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="MtI" role="tabpanel" aria-labelledby="MtI-tab">
                                    <div class="row z-depth-5 mt-3 p-0 ml-1">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table id="tableBureau" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                                    <thead>
                                                      <tr>
                                                        <th class="th-sm">Nom

                                                        </th>
                                                        <th class="th-sm">Prenom

                                                        </th>
                                                        <th class="th-sm">Email

                                                        </th>
                                                        <th class="th-sm">Etat

                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <tbody id="tbodyEns">

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="MEB" role="tabpanel" aria-labelledby="MEB-tab">
                                    <div class="row z-depth-5 mt-3 p-0 ml-1">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table id="tableMEB" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                                    <thead>
                                                      <tr>
                                                        <th class="th-sm">Responsable

                                                        </th>
                                                        <th class="th-sm">Matériel

                                                        </th>
                                                        <th class="th-sm"> Etat du matériel

                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <tbody id="tbodypart">

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="MFI" role="tabpanel" aria-labelledby="MFI-tab">
                                    <div class="row z-depth-5 mt-3 p-0 ml-1">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table id="tableMFI" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                                    <thead>
                                                      <tr>
                                                        <th class="th-sm">designation

                                                        </th>
                                                        <th class="th-sm">referance

                                                        </th>
                                                        <th class="th-sm">Quantité

                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <tbody id="tbodyMFIA">

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="MFB" role="tabpanel" aria-labelledby="MFB-tab">
                                    <div class="row z-depth-5 mt-3 p-0 ml-1">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table id="tableMFB" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                                    <thead>
                                                      <tr>
                                                        <th class="th-sm">designation

                                                        </th>
                                                        <th class="th-sm">Quantité

                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <tbody id="tbodyMFBA">

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </div>


                        </div>
                    </div>
                </div>


            </div>

        </div>
    </div>
</div>
</div>
{{-- end modal show --}}
