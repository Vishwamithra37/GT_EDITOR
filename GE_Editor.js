
// $(document).ready(function () {
//     var editor = new GEditor();
//     let ed_class="w-full h-2/6 bg-gray-900 p-2 pl-4 outline-none text-gray-200"
//     let tool_bar_options={};
//     var editor_div = editor.geditor(ed_class,tool_bar_options);
//     document.body.appendChild(editor_div[0]);
// });

class GEditor{
    geditor(editable_div_class,tool_bar_options, placeholder_text){
        let wrapper_div = document.createElement("div");
        let Editable_Div = document.createElement("div");
        Editable_Div.setAttribute("contenteditable", "true");
        Editable_Div.setAttribute("class", editable_div_class);
        Editable_Div.setAttribute('placeholder', placeholder_text);

        let tool_bar = new Tool_Bar(Editable_Div);
        let tool_bar_main = tool_bar.tool_bar(tool_bar_options);
        let bottom_bar2= new bottom_bar().main_div(tool_bar_options);

        wrapper_div.appendChild(tool_bar_main);
        wrapper_div.appendChild(Editable_Div);
        wrapper_div.appendChild(bottom_bar2);

        return [wrapper_div,Editable_Div,bottom_bar2]
    }

}

class Tool_Bar{

    constructor(Editable_Div_Area){
        this.Editable_Div_Area=Editable_Div_Area;
    }


    tool_bar(options){
        console.log(this.Editable_Div_Area);
        let tool_bar = document.createElement("div");
        tool_bar.setAttribute("class", "flex flex-row bg-gray-900 pl-2 border-b-2 border-gray-700");
        let bold_button = this.tool_bar_bold();
        let italics_button = this.tool_bar_italics();
        let underline_button = this.tool_bar_underline();
        let unordered_list_button = this.tool_bar_unordered_list();
        let ordered_list_button = this.tool_bar_ordered_list();
        let text_counter = this.tool_bar_text_counter();
        tool_bar.appendChild(bold_button);
        tool_bar.appendChild(italics_button);
        tool_bar.appendChild(underline_button);
        tool_bar.appendChild(unordered_list_button);
        tool_bar.appendChild(ordered_list_button);
        for(let i=0;i<options["Addons"].length;i++){
            tool_bar.appendChild(options["Addons"][i]);
        }
        tool_bar.appendChild(text_counter[0]);

        return tool_bar;
    }

    tool_bar_text_counter(){
        let wrapper_div=document.createElement('div')
        let counter=0;
        $(wrapper_div).addClass('text-white font-bold p-2 rounded border-r-2 border-gray-700 float-right ml-auto pt-3')
        $(wrapper_div).text(counter+"/1000")
        // Basically count the text in editable div nad then increment the charecters as necessary.
        let guDiv = this.Editable_Div_Area;
        guDiv.addEventListener('input', (e) => {
            let child_Text_length = $(guDiv).text().length;  
            if(child_Text_length>1000){
                $(wrapper_div).removeClass('text-white');
                $(wrapper_div).addClass('text-red-500');
                $(wrapper_div).text(child_Text_length + "/1000");
            }else{
                $(wrapper_div).removeClass('text-red-500');
                $(wrapper_div).addClass('text-white');
                $(wrapper_div).text(child_Text_length + "/1000");
            }
        });
        return [wrapper_div,counter]

    }

    tool_bar_bold(){
        let button = document.createElement("button");
        button.setAttribute("class", "text-white font-bold p-2  rounded border-r-2 border-gray-700 ");
        button.innerHTML = "B";
        const guDiv = this.Editable_Div_Area;
        guDiv.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'b') {
                e.preventDefault();
                document.execCommand('bold', false, null);
            }
        });
        // COnstantly check if the content is bold or not.
        guDiv.addEventListener('input', (e) => {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let bold = document.queryCommandState('bold');
            if (bold) {
                $(button).addClass('text-yellow-500');
                $(button).removeClass('text-white');

            }
            else {
                
                $(button).addClass('text-white');
                $(button).removeClass('text-yellow-500');
            }
   
        });

        $(button).click(function () {
            $(guDiv).focus();
            document.execCommand('bold', false, null);
        });
        return button;
    }

    tool_bar_italics(){
        let button = document.createElement("button");
        button.setAttribute("class", "text-white font-bold p-2  rounded border-r-2 border-gray-700");
        button.innerHTML = "I";
        const guDiv = this.Editable_Div_Area;
        guDiv.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                document.execCommand('italic', false, null);
            }
        });
        // COnstantly check if the content is bold or not.
        guDiv.addEventListener('input', (e) => {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let bold = document.queryCommandState('italic');
            if (bold) {
                $(button).addClass('text-yellow-500');
                $(button).removeClass('text-white');
            }
            else {
                $(button).addClass('text-white');
                $(button).removeClass('text-yellow-500');
            }

        });
        $(button).click(function () {
            $(guDiv).focus();
            document.execCommand('italic', false, null);
        });
        return button;
    }

    tool_bar_underline(){
        let button = document.createElement("button");
        button.setAttribute("class", "text-white font-bold p-2   rounded border-r-2 border-gray-700");
        button.innerHTML = "U";
        const guDiv = this.Editable_Div_Area;
        guDiv.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                document.execCommand('underline', false, null);
            }
        });
        // COnstantly check if the content is bold or not.
        guDiv.addEventListener('input', (e) => {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let bold = document.queryCommandState('underline');
            if (bold) {
                $(button).addClass('text-yellow-500');
                $(button).removeClass('text-white');
            }
            else {
                $(button).addClass('text-white');
                $(button).removeClass('text-yellow-500');
            }
        });
        $(button).click(function () {
            $(guDiv).focus();
            document.execCommand('underline', false, null);
        });
        return button;
    }

    tool_bar_unordered_list(){
        let button = document.createElement("button");
        button.setAttribute("class", "text-white font-bold  p-2  rounded border-r-2 border-gray-700");
        let unorderedlist_png = document.createElement("img");
        unorderedlist_png.setAttribute("src", "/static/EditorImages/unorderedlist.png");
        unorderedlist_png.setAttribute("class", "w-8 h-8 bg-white rounded ");
        $(button).append(unorderedlist_png);

        // button.innerHTML = "UL";
        const guDiv = this.Editable_Div_Area;
        guDiv.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                document.execCommand('insertUnorderedList', false, null);
            }
        });

        // COnstantly check if the content is bold or not.
        guDiv.addEventListener('input', (e) => {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let bold = document.queryCommandState('insertUnorderedList');
            if (bold) {
                $(unorderedlist_png).addClass('bg-yellow-500');
                $(orderedlist_png).removeClass('bg-white');
            }else {
                $(unorderedlist_png).addClass('bg-white');
                $(unorderedlist_png).removeClass('bg-yellow-500');
            }
        });
        $(button).click(function () {
            $(guDiv).focus();
            document.execCommand('insertUnorderedList', false, null);
        });
        return button;
    }

    tool_bar_ordered_list(){
        let button = document.createElement("button");
        button.setAttribute("class", " text-white font-bold p-2  rounded border-r-2 border-gray-700");
        let orderedlist_png = document.createElement("img");
        orderedlist_png.setAttribute("src", "/static/EditorImages/orderedlist.png");
        orderedlist_png.setAttribute("class", "w-8 h-8 bg-white rounded ");
        $(button).append(orderedlist_png);
        const guDiv = this.Editable_Div_Area;
        guDiv.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'o') {
                e.preventDefault();
                document.execCommand('insertOrderedList', false, null);
            }
        });
        // COnstantly check if the content is bold or not.
        guDiv.addEventListener('input', (e) => {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let bold = document.queryCommandState('insertOrderedList');
            if (bold) {
                $(orderedlist_png).addClass('bg-yellow-500');
                $(orderedlist_png).removeClass('bg-white');
            }else {
                $(orderedlist_png).addClass('bg-white');
                $(orderedlist_png).removeClass('bg-yellow-500');
            }
        });
        $(button).click(function () {
            $(guDiv).focus();
            document.execCommand('insertOrderedList', false, null);
        });
        return button;
    }
} // End of class GU_Editor Tools

class Add_Ons{
    add_image_addon(){
        let lavel = document.createElement("div");
        lavel.setAttribute("class", "text-white font-bold p-2 pt-2.5  rounded border-r-2 border-gray-700 ");
        let image_png = document.createElement("img");
        image_png.setAttribute("src", "/static/EditorImages/image.png");
        image_png.setAttribute("class", "w-7 h-7 bg-gray-400 hover:bg-gray-300 cursor-pointer rounded ");
        let image_text= document.createElement("span");
        image_text.innerHTML = "🖼";
        image_text.setAttribute("class", "text-white font-bold text-white hover:text-yellow-500 cursor-pointer ");
        $(lavel).append(image_text);
        let file_input = document.createElement("input");
        file_input.setAttribute("type", "file");
        file_input.setAttribute("accept", "image/*");
        file_input.setAttribute("class", "hidden");
        $(lavel).append(file_input);
        let image_base64;
        $(file_input).change(function () {
            // Convert to base64 and store.
            let file = file_input.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
                image_base64 = reader.result;
            }
        });
        $(image_text).click(function (e) { 
            e.preventDefault();
            $(file_input).click();        
        });
        return [lavel, image_base64]
    }

    add_pdf_addon(){
        let lavel = document.createElement("div");
        lavel.setAttribute("class", "text-white font-bold p-2  rounded border-r-2 border-gray-700 ");
        let pdf_png = document.createElement("img");
        pdf_png.setAttribute("src", "/static/EditorImages/pdf_image.png");
        pdf_png.setAttribute("class", "w-8 h-8 bg-gray-900 hover:bg-gray-700 cursor-pointer rounded ");
        $(lavel).append(pdf_png);
        let file_input = document.createElement("input");
        file_input.setAttribute("type", "file");
        file_input.setAttribute("accept", "application/pdf");
        file_input.setAttribute("class", "hidden");
        $(lavel).append(file_input);
        let pdf_base64;
        $(file_input).change(function () {
            // Convert to base64 and store.
            let file = file_input.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
                pdf_base64 = reader.result;
            }
        });
        $(pdf_png).click(function (e) { 
            e.preventDefault();
            $(file_input).click();        
        });
        return [lavel, pdf_base64]
    }

    add_submit_button(){
        let right_div= document.createElement("div");
        right_div.setAttribute("class", "p-2 text-center bg-green-600 text-sm text-gray-200 cursor-pointer font-bold rounded float-right ml-auto hover:bg-green-800");
        right_div.innerHTML = "Submit";
        return right_div;
    }

    image_pdf_tags_placeholder_div_bar_addon(){
        let div = document.createElement("div");
        div.setAttribute("class", "flex flex-row border-r-2 border-gray-700 bg-gray-900");
        return div;
    }

}

class bottom_bar{
    main_div(options){
        let wrapperdiv = document.createElement("div");
        wrapperdiv.setAttribute("class", "flex flex-row border-t-2 border-gray-700 bg-gray-900 ");
        for(let i=0; i<options["Bottombar"].length; i++){
            $(wrapperdiv).append(options["Bottombar"][i]);
        }
        return wrapperdiv;
    }


}

// Tailwind cheaters. -- "list-disc"