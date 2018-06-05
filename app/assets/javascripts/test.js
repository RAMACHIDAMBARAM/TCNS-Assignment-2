var DISABLED = "disabled", SELECTED = "selected", HAS_COMBO = "has-combo", STANDARD_ALIGNMENT = "standard-alignment", CHECKED = "checked", STANDARD_ORDER = "standard_order";
var COMBO_ID = "combo_id" , STANDARD_ID = "standard_id", CLICK = "click";

var GA_MANAGE_SUBJECTS_CATEGORY_CONSTANTS = {
    MANAGE_SUBJECTS: 'Manage Subjects',
    NEW_ACADEMIC_GROUP: 'New Academic Group',
    NEW_NON_ACADEMIC_GROUP: 'New Non Academic Group',
    CHANGE_SUBJECT_ORDER: 'Change Subject Ordering',

}
var MODULE_NAME = "Manage Subjects";
gaFootprint.setModule(MODULE_NAME)
gaFootprint.setEventCategories(GA_MANAGE_SUBJECTS_CATEGORY_CONSTANTS)



$(document).ready(function() {
    var $standards_cnr = $('.standards-cnr');
    var $initialized_cnr = $('#initialized-cnr');
    var $uninitialized_cnr = $('#uninitialized-cnr');
    var $initialized_std_cnr = $('#initialized-std-cnr');
    var $uninitialized_std_cnr = $('#uninitialized-std-cnr');
    var $manage_subjects_button = $("#manage-subjects-btn");

    if($standards_cnr.children().hasClass(HAS_COMBO))
        $standards_cnr.addClass(HAS_COMBO);

    if($initialized_cnr.find('.standards-cnr').children().length == 0)
        $initialized_std_cnr.remove();

    if($uninitialized_cnr.find('.standards-cnr').children().length == 0)
        $uninitialized_std_cnr.remove();

    $standards_cnr.on(CLICK, ".entity-name", function(){
        $(this).prev().trigger(CLICK);
    });

    $standards_cnr.find(".combo-check").on("change", function () {
        var $standard_check_box = $(this).closest(".item").find(".standard-check");
        $standard_check_box.checkbox(SELECTED, $(this).is(':checked'));
    });

    $(".standard-check, .combo-check").on('change', function(){
        var $checked_standards = $standards_cnr.find('input:checked');
        if ($checked_standards.length > 0) {
            $manage_subjects_button.attr(DISABLED, false);
        } else {
            $manage_subjects_button.attr(DISABLED, true);
        }
    });

    $manage_subjects_button.on(CLICK, function (event) {
        var $checked_standards = $standards_cnr.find('input:checked');
        var standard_ids = $.map($checked_standards, function (n) {
            return $(n).data(STANDARD_ID)
        });
        if (standard_ids.length > 0 && validate()) {
            showLoadingPanel("#loading-groups-page");
            if( wizard_phase ){
                document.location.href = "/school_setup/wizards/select_group?standard_ids=" + standard_ids + "&is_academic=" + is_academic
            }
            else{
                document.location.href = "/manage/groups/select_group?standard_ids=" + standard_ids + "&is_academic=" + is_academic
            }
        }
        else if(standard_ids.length==0)
            showFailurePanel("#no-std-validation-content")
        event.preventDefault()
    });

    $(".toggle").arrowToggle({default_open: true});
    $('input[type="checkbox"]').checkbox();
    $('input[type="radio"]').radio();
    $("#manage-subjects-panel").stickyPanelFooter()
});

function validate(){
    var $checked_standards = $('.standards-cnr input:checked');
    var validation = true;

    var combo_ids = $.map($checked_standards, function (n){return $(n).data(COMBO_ID)});

    if ( getUnique(combo_ids).length > 1){
        validation = false;
        showFailurePanel("#validation-content")
    }

    return validation
}
