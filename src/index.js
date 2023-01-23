document.getElementById("btn-1").addEventListener("click", addFields, false);
document.getElementById("btn-2").addEventListener("click", submit, false);   


var variable_count = document.getElementById("variable_count").value;                   
var variable_no = document.getElementById("variable_no");                               
var variable_max = document.getElementById("variable_max");                             
var variable_min = document.getElementById("variable_min");                             
var csvContent

var arr_variable =[] 
var arr_max = [];
var arr_min = [];
var arr =[]
var ias = []
var arr5 = []
var global_variable = []
var pagination_variable = []
var no;
var tempo;
var temp2;
var result = []



function addFields(){
    var variable_count = Number(document.getElementById("variable_count").value);
    var variable_no = document.getElementById("variable_no");
    var variable_max = document.getElementById("variable_no");
    var variable_min = document.getElementById("variable_no");  
    var question = document.getElementById("question").value;
    var formula = document.getElementById("formula").value;
    var solution = document.getElementById("solution").value;

    if(question == null || solution == null || formula == null)
    {
        alert("Please enter a question or formula or solution");
    }
    if(variable_count === 0)
    {
        alert("Please enter a variable number.");
    }

    for(var i=0;i<variable_count;i++){
        variable_no.appendChild(document.createTextNode("variable : "+(i + 1)));

        // variable_no.appendChild(document.createElement("br"));

        // var input = document.createElement("input");
        // input.type = "text";
        // input.id = "variable_no"+i;
        // input.class = "form-control";
        // input.placeholder = "Variable";
        // variable_no.appendChild(input);
        // arr_variable[i] = input.id;

        // variable_no.appendChild(document.createElement("br"));
        variable_no.appendChild(document.createElement("br"));



        var max = document.createElement("input");
        max.id = "max_variable_no"+i;
        max.class = "form-control";
        max.placeholder = "Maximum or Array";
        variable_max.appendChild(max);
        arr_max[i] = max.id;

        variable_no.appendChild(document.createElement("br"));
        variable_no.appendChild(document.createElement("br"));


        var min = document.createElement("input");
        min.id = "min_variable_no"+i;
        min.class = "form-control";
        min.placeholder = "Minimum";
        variable_min.appendChild(min);
        arr_min[i] = min.id;

        // variable_arr.appendChild(document.createTextNode("Array"+(i)));
        // var array = document.createElement("input");
        // array.id = "min_variable_no"+i;
        // variable_arr.appendChild(array);
        // arr_t[i] = array.id;
        

                                                                                                
        variable_no.appendChild(document.createElement("br"));
        variable_no.appendChild(document.createElement("br"));

        event.preventDefault();
        
    }

} 

var no = 1
function submit(){
    var variable_counts = Number(document.getElementById("variable_count").value);
    for(var i=0;i<variable_counts;i++)
    {
        var variable_max = document.getElementById(arr_max[i]).value;
        variable_max = variable_max.split(",");
        console.log(variable_max)
        if(variable_max == ""){
            alert("Please enter a valid variable number.");
        }

        if(variable_max.length == 1){
            var arr = []
            var variable_max = Number(document.getElementById(arr_max[i]).value);
            var variable_min = Number(document.getElementById(arr_min[i]).value);

            var question = document.getElementById("question").value;
            var formula = document.getElementById("formula").value;
            var solution = document.getElementById("solution").value;

            if(question == null || solution == null || formula == null)
            {
                alert("Please enter a question or formula or solution");
            }

            if(variable_max < variable_min){
                alert("enter values correctly");
            }

            for(var k=variable_min; k<=variable_max; k++)
            {
                arr.push(k)
            }
            global_variable.push(arr)
        } 
        else {
            global_variable.push(variable_max)
        }

    }

    for(var p = 0; p < global_variable.length; p++) 
    {
        ias[p] = global_variable[p]
        p = p + 1
        for(var q = p; q < global_variable.length; q++)
        {
            ias[q] = global_variable[q]
        }
    }
     
    var a = cartesian(ias)
    var answer;
    for(var i = 0; i < a.length; i++){
       [...new Set(a[i])].length == 1 ? a.splice(i,1) : false;
    }

    for(var i = 0; i < a.length; i++)
    {
        var question = document.getElementById("question").value; 
        var formula  = document.getElementById("formula").value; 
        var solution = document.getElementById("solution").value; 
        var option1  = document.getElementById("option1").value; 
        var option2  = document.getElementById("option2").value; 
        var option3  = document.getElementById("option3").value; 

        tempo = a[i]
        for(var j = 0; j < tempo.length; j++)
        {
            temp2 = "var" + j 
            question = question.replace(temp2,tempo[j])
            formula = replaceAll(formula,temp2,tempo[j])
            option1 = replaceAll(option1,temp2,tempo[j])
            option2 = replaceAll(option2,temp2,tempo[j])
            option3 = replaceAll(option3,temp2,tempo[j])
            solution = replaceAll(solution,temp2,tempo[j])
        }
        answer = (eval(formula))
        option1 = (eval(option1))
        option2 = (eval(option2))
        option3 = (eval(option3))
        if(Number.isInteger(answer))
        {   
            result.push([no+`:`+question+'\n'
            +solution+'\n'+option1+'\n'+option2+'\n'+option3+'\n\n'+answer]);
            no = no + 1
        }
        // res = document.getElementById("test").innerHTML += result
         csvContent = "data:text/csv;question_generator," + result.map(e => e.join(",")).join("\n");
        
    }
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);

    const list_element = document.getElementById('list');
    const pagination_element = document.getElementById('pagination');

    let current_page = 1;
    let rows = 25;

    function DisplayList (items, wrapper, rows_per_page, page) {
	wrapper.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end);

	for (let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i];

		let item_element = document.createElement('p');
		item_element.classList.add('item');
		item_element.innerText = item;
		
		wrapper.appendChild(item_element);
	}

    // for (let i = 0; i < items.length; i++) {
	// 	let item = items[i];    
        
	// 	let item_element = document.createElement('span');
	// 	item_element.classList.add('item');
	// 	item_element.innerText = item;
	// 	console.log(item+"hi")
	// 	wrapper.appendChild(item_element);
	// }
}

    function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

    function PaginationButton (page, items) 
    {
        let button = document.createElement('button');
        button.innerText = page;

        if (current_page == page) button.classList.add('active');

        button.addEventListener('click', function () {
            current_page = page;
            DisplayList(items, list_element, rows, current_page);

            let current_btn = document.querySelector('.pagenumbers button.active');
            current_btn.classList.remove('active');

            button.classList.add('active');
        });

        return button;
    }
    console.log('res',result);
    DisplayList(result, list_element, rows, current_page);
    SetupPagination(result, pagination_element, rows);

    event.preventDefault(); 
}

function cartesian(arg) {
    var r = [], max = arg.length-1;
    function helper(arr, i) {
        while(typeof arg[i] === "undefined") {
            i += 1;
        }
        for (var j=0, l=arg[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(arg[i][j]);
            if (i==max) {
                r.push(a);
            } else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}



//filter out integers
// a != b
//option
//question paraphrase
//