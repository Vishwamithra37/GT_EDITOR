$(document).ready(function () {
    var editor = new GEditor();
    let ed_class="w-full h-56 bg-gray-900 p-2 pl-4 outline-none text-gray-200 overflow-y-auto"
    let imager_addon=new Add_Ons().add_image_addon();
    let pdf_addon=new Add_Ons().add_pdf_addon();
    let submit_button=new Add_Ons().add_submit_button();
    let tool_bar_options={"Addons": [imager_addon[0],pdf_addon[0]], "Bottombar": [submit_button]}
    var editor_div = editor.geditor(ed_class,tool_bar_options,'Type your answer here...');
   
    $('#Asker').append(editor_div[0]);    
});
