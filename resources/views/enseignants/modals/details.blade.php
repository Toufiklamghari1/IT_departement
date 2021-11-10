<div class="modal fade detailsModal" id="modalDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="border border-info modal-content">
      <div class="modal-header text-center">
        <h4 class="modal-title w-100 font-weight-bold text-white">Detail Du Bureau</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="bureauInfo" class ="text-white text-center">
            <h5 class="modal-title w-100 font-weight-bold text-white text-center">Bureau Info :</h5>
            <span>Numéro : <span class="bureau-info"></span></span><br>
            <span>Capacite : <span class="bureau-info"></span></span><br>
            <span>Date d'Acquisition : <span class="bureau-info"></span></span>
        </div>
        <div>
            <h5 class="modal-title w-100 font-weight-bold text-white text-center">Liste Des Enseignants :</h5>
            <table id="ensList" class="dataTable" width="100%">
            <!-- Table head -->
                <thead>
                    <th class="text-center text-white">Nom</th>
                    <th class="text-center text-white">Prénom</th>
                    <th class="text-center text-white">Grade</th>
                    <th class="text-center text-white">DateD'affectation</th>
                </th>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</div>