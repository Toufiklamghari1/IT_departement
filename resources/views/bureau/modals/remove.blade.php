
<!--Modal: modalConfirmDelete-->
  <div class="modal fade" id="modalRemove" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
    <div class="modal-dialog modal-sm modal-notify" role="document">
      <!--Content-->
      <div class="modal-content border border-danger text-center">
        <!--Header-->
        <div class="modal-header d-flex justify-content-center border-bottom border-white">
          <h4 class="modal-title w-100 font-weight-bold text-white">Supprimer un Bureau</h4>
        </div> 

        <!--Body-->
        <div class="modal-body  text-white mb-2">
          <span>Suprimer le Bureau : <span id="bureau-name"></span> ?</span>
          <div id="remove" class="text-center" style = 'height:15px;'>
          </div>
          <i class="text-danger fas fa-times fa-4x animated rotateIn mt-1"></i>
          <div class=" text-white" id="msg">
          </div>
        </div>
        <!--Footer-->
        <div class="modal-footer flex-center" >
          <a type="button" id="destroy"class="btn  btn-danger">Oui</a>
          <a type="button" id="deleteHide" class="btn  btn-dark waves-effect" data-dismiss="modal">Non</a>
        </div>
      </div>
      <!--/.Content--> 
    </div>
  </div>
<!--Modal: modalConfirmDelete-->